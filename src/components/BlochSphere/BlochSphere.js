import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import {
  STATES, GATES, FIXED_GATES, ROTATION_GATES,
  makeGate, applyMatrix, blochVector, rotate, formatComplex, polarAngles,
} from './blochMath';
import './BlochSphere.css';

// Site theme colors
const COLORS = {
  sphere: 0x6b4dff,
  grid: 0x8a86a3,
  axis: 0x6f6a8c,
  label: '#e8e6f3',
  arrow: 0x5cf08a,
  rotAxis: 0xe22514,
  trail: 0xd9c2ff,
};

const TRAIL_MAX = 4000;          // max points kept in the path trail
const BASE_DURATION = 1100;      // ms for a 180° rotation

// Bloch coords (z up) -> three.js coords (y up)
const toThree = (v) => new THREE.Vector3(v.y, v.z, v.x);

// Text label drawn on a canvas, shown as a sprite that always faces the camera
function makeLabel(text, color = COLORS.label) {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 128;
  const ctx = canvas.getContext('2d');
  ctx.font = '600 64px "Open Sans", Arial, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = color;
  ctx.fillText(text, 128, 64);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  const sprite = new THREE.Sprite(
    new THREE.SpriteMaterial({ map: texture, transparent: true, depthWrite: false })
  );
  sprite.scale.set(0.42, 0.21, 1);
  return sprite;
}

// Circle of radius 1 in the plane perpendicular to `normal`
function makeCircle(normal, opacity) {
  const pts = [];
  for (let i = 0; i <= 128; i++) {
    const t = (i / 128) * Math.PI * 2;
    pts.push(new THREE.Vector3(Math.cos(t), Math.sin(t), 0));
  }
  const geo = new THREE.BufferGeometry().setFromPoints(pts);
  const line = new THREE.Line(
    geo,
    new THREE.LineBasicMaterial({ color: COLORS.grid, transparent: true, opacity })
  );
  line.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), normal.clone().normalize());
  return line;
}

// Arrow made of a cylinder + cone, pointing along +y before rotation
function makeArrow(color) {
  const group = new THREE.Group();
  const mat = new THREE.MeshStandardMaterial({ color, roughness: 0.35, metalness: 0.1 });
  const shaft = new THREE.Mesh(new THREE.CylinderGeometry(0.018, 0.018, 0.86, 16), mat);
  shaft.position.y = 0.43;
  const head = new THREE.Mesh(new THREE.ConeGeometry(0.055, 0.14, 24), mat);
  head.position.y = 0.93;
  const tip = new THREE.Mesh(new THREE.SphereGeometry(0.035, 16, 16), mat);
  tip.position.y = 1.0;
  group.add(shaft, head, tip);
  return group;
}

function easeInOut(t) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

const UP = new THREE.Vector3(0, 1, 0);

export default function BlochSphere() {
  const mountRef = useRef(null);
  const sceneApi = useRef(null);       // functions for driving the 3D scene
  const ampsRef = useRef(STATES[0].amps);
  const queueRef = useRef([]);
  const busyRef = useRef(false);

  const [amps, setAmps] = useState(STATES[0].amps);
  const [startId, setStartId] = useState('0');
  const [history, setHistory] = useState([]);
  const [lastGate, setLastGate] = useState(null);
  const [degrees, setDegrees] = useState(90);
  const [note, setNote] = useState('');

  // ---------- Three.js scene setup (runs once) ----------
  useEffect(() => {
    const mount = mountRef.current;
    const reduceMotion =
      window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
    // Classic textbook view: x toward the viewer (lower left), y right, z up
    camera.position.set(1.5, 1.35, 3.6);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enablePan = false;
    controls.enableDamping = true;

    scene.add(new THREE.AmbientLight(0xffffff, 0.75));
    const light = new THREE.DirectionalLight(0xffffff, 1.4);
    light.position.set(3, 4, 5);
    scene.add(light);

    // Sphere shell
    const sphere = new THREE.Mesh(
      new THREE.SphereGeometry(1, 64, 48),
      new THREE.MeshPhongMaterial({
        color: COLORS.sphere, transparent: true, opacity: 0.1, depthWrite: false, shininess: 60,
      })
    );
    scene.add(sphere);

    // Equator, two meridians and faint latitude lines
    scene.add(makeCircle(new THREE.Vector3(0, 1, 0), 0.7));
    scene.add(makeCircle(new THREE.Vector3(1, 0, 0), 0.45));
    scene.add(makeCircle(new THREE.Vector3(0, 0, 1), 0.45));
    [-0.5, 0.5].forEach((h) => {
      const ring = makeCircle(new THREE.Vector3(0, 1, 0), 0.18);
      const r = Math.sqrt(1 - h * h);
      ring.scale.set(r, r, r);
      ring.position.y = h;
      scene.add(ring);
    });

    // Axes and basis-state labels
    const axisMat = new THREE.LineBasicMaterial({ color: COLORS.axis });
    [
      [{ x: 1, y: 0, z: 0 }, '|+⟩', '|−⟩', 'x'],
      [{ x: 0, y: 1, z: 0 }, '|+i⟩', '|−i⟩', 'y'],
      [{ x: 0, y: 0, z: 1 }, '|0⟩', '|1⟩', 'z'],
    ].forEach(([dir, posLabel, negLabel, name]) => {
      const d = toThree(dir);
      const geo = new THREE.BufferGeometry().setFromPoints([
        d.clone().multiplyScalar(-1.18), d.clone().multiplyScalar(1.18),
      ]);
      scene.add(new THREE.Line(geo, axisMat));
      const pos = makeLabel(posLabel);
      pos.position.copy(d.clone().multiplyScalar(1.36));
      const neg = makeLabel(negLabel);
      neg.position.copy(d.clone().multiplyScalar(-1.36));
      const axisName = makeLabel(name, '#8a86a3');
      axisName.scale.multiplyScalar(0.7);
      axisName.position.copy(d.clone().multiplyScalar(1.22)).add(new THREE.Vector3(0.07, 0.07, 0));
      scene.add(pos, neg, axisName);
    });

    // State arrow
    const arrow = makeArrow(COLORS.arrow);
    scene.add(arrow);

    // Rotation axis (shown while a gate animates)
    const rotAxis = new THREE.Mesh(
      new THREE.CylinderGeometry(0.012, 0.012, 2.7, 12),
      new THREE.MeshBasicMaterial({ color: COLORS.rotAxis, transparent: true, opacity: 0 })
    );
    scene.add(rotAxis);

    // Path trail
    const trailPositions = new Float32Array(TRAIL_MAX * 3);
    const trailGeo = new THREE.BufferGeometry();
    trailGeo.setAttribute('position', new THREE.BufferAttribute(trailPositions, 3));
    trailGeo.setDrawRange(0, 0);
    const trail = new THREE.Line(
      trailGeo,
      new THREE.LineBasicMaterial({ color: COLORS.trail, transparent: true, opacity: 0.9 })
    );
    scene.add(trail);
    let trailCount = 0;

    const addTrailPoint = (p) => {
      if (trailCount >= TRAIL_MAX) return;
      trailPositions.set([p.x, p.y, p.z], trailCount * 3);
      trailCount += 1;
      trailGeo.setDrawRange(0, trailCount);
      trailGeo.attributes.position.needsUpdate = true;
    };

    const setArrow = (v) => {
      const p = toThree(v);
      const len = p.length();
      if (len > 1e-6) arrow.quaternion.setFromUnitVectors(UP, p.clone().divideScalar(len));
    };

    const showAxis = (axis) => {
      rotAxis.quaternion.setFromUnitVectors(UP, toThree(axis).normalize());
      rotAxis.material.opacity = 0.9;
    };

    let anim = null;   // current animation
    let fadeAxis = 0;  // fades the rotation axis after a gate finishes

    sceneApi.current = {
      setArrow,
      clearTrail: () => {
        trailCount = 0;
        trailGeo.setDrawRange(0, 0);
      },
      cancel: () => {
        anim = null;
        rotAxis.material.opacity = 0;
      },
      animate: (from, axis, angle, onDone) => {
        showAxis(axis);
        fadeAxis = 0;
        const duration = reduceMotion
          ? 0
          : Math.max(450, BASE_DURATION * (Math.abs(angle) / Math.PI));
        anim = { from, axis, angle, start: performance.now(), duration, onDone };
      },
    };
    setArrow(blochVector(ampsRef.current));

    // Keep the canvas sized to its container, and back the camera up far
    // enough that the sphere and its labels fit on narrow screens too
    const FIT_RADIUS = 1.6;
    const resize = () => {
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      if (!w || !h) return;
      renderer.setSize(w, h, false); // CSS controls the displayed size
      camera.aspect = w / h;
      camera.updateProjectionMatrix();

      const vHalf = THREE.MathUtils.degToRad(camera.fov / 2);
      const hHalf = Math.atan(Math.tan(vHalf) * camera.aspect);
      const fitDistance = FIT_RADIUS / Math.sin(Math.min(vHalf, hHalf));
      camera.position.setLength(fitDistance);
      controls.minDistance = fitDistance * 0.65;
      controls.maxDistance = fitDistance * 1.8;
    };
    const observer = new ResizeObserver(resize);
    observer.observe(mount);
    resize();

    // Render loop
    let frame;
    const tick = (now) => {
      frame = requestAnimationFrame(tick);
      controls.update();

      if (anim) {
        const t = anim.duration ? Math.min(1, (now - anim.start) / anim.duration) : 1;
        const v = rotate(anim.from, anim.axis, anim.angle * easeInOut(t));
        setArrow(v);
        addTrailPoint(toThree(v));
        if (t >= 1) {
          const done = anim.onDone;
          anim = null;
          fadeAxis = now;
          done();
        }
      } else if (fadeAxis && rotAxis.material.opacity > 0) {
        rotAxis.material.opacity = Math.max(0, 0.9 - (now - fadeAxis) / 900);
      }

      renderer.render(scene, camera);
    };
    frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      controls.dispose();
      scene.traverse((obj) => {
        if (obj.geometry) obj.geometry.dispose();
        if (obj.material) {
          if (obj.material.map) obj.material.map.dispose();
          obj.material.dispose();
        }
      });
      renderer.dispose();
      mount.removeChild(renderer.domElement);
      sceneApi.current = null;
    };
  }, []);

  // ---------- Gate queue ----------
  // Gates clicked during an animation wait their turn.
  function runNext() {
    const api = sceneApi.current;
    const gate = queueRef.current.shift();
    if (!gate || !api) {
      busyRef.current = false;
      return;
    }
    busyRef.current = true;

    const before = ampsRef.current;
    const from = blochVector(before);
    const after = applyMatrix(gate.matrix, before);
    const n = gate.axis;
    const onAxis = Math.abs(from.x * n.x + from.y * n.y + from.z * n.z) > 0.9999;

    setLastGate(gate);
    setNote(
      onAxis
        ? `The state lies on ${gate.label}'s rotation axis, so the arrow doesn't move. ` +
          'The gate only changes the global phase, which the Bloch sphere can\'t show.'
        : ''
    );

    api.animate(from, n, gate.angle, () => {
      ampsRef.current = after;
      setAmps(after);
      setHistory((h) => [...h, gate.label]);
      api.setArrow(blochVector(after)); // snap to the exact result
      runNext();
    });
  }

  function applyGate(key) {
    queueRef.current.push(makeGate(key, degrees));
    if (!busyRef.current) runNext();
  }

  function chooseStart(id) {
    const state = STATES.find((s) => s.id === id);
    queueRef.current = [];
    busyRef.current = false;
    ampsRef.current = state.amps;
    setStartId(id);
    setAmps(state.amps);
    setHistory([]);
    setLastGate(null);
    setNote('');
    if (sceneApi.current) {
      sceneApi.current.cancel();
      sceneApi.current.clearTrail();
      sceneApi.current.setArrow(blochVector(state.amps));
    }
  }

  // ---------- Readout values ----------
  const v = blochVector(amps);
  const { theta, phi } = polarAngles(v);
  const startLabel = STATES.find((s) => s.id === startId).label;
  const fmt = (x) => (Math.abs(x) < 5e-4 ? '0.00' : x.toFixed(2)).replace('-', '−');

  return (
    <section className='bloch'>
      <div className='bloch-stage'>
        <div ref={mountRef} className='bloch-canvas' aria-label='Interactive Bloch sphere' />
        <p className='bloch-hint'>Drag to rotate · Scroll to zoom</p>
      </div>

      <aside className='bloch-panel'>
        <div className='bloch-group'>
          <h3>Start state</h3>
          <div className='bloch-buttons'>
            {STATES.map((s) => (
              <button
                key={s.id}
                type='button'
                className={`bloch-btn state ${startId === s.id ? 'active' : ''}`}
                onClick={() => chooseStart(s.id)}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>

        <div className='bloch-group'>
          <h3>Gates</h3>
          <div className='bloch-buttons gates'>
            {FIXED_GATES.map((key) => (
              <button
                key={key}
                type='button'
                className='bloch-btn gate'
                title={GATES[key].desc}
                onClick={() => applyGate(key)}
              >
                {GATES[key].label}
              </button>
            ))}
          </div>
        </div>

        <div className='bloch-group'>
          <h3>
            Rotations <span className='bloch-theta'>θ = {degrees}°</span>
          </h3>
          <input
            className='bloch-slider'
            type='range'
            min='0'
            max='360'
            step='5'
            value={degrees}
            onChange={(e) => setDegrees(Number(e.target.value))}
            aria-label='Rotation angle in degrees'
          />
          <div className='bloch-buttons'>
            {ROTATION_GATES.map((key) => (
              <button key={key} type='button' className='bloch-btn gate' onClick={() => applyGate(key)}>
                {key}(θ)
              </button>
            ))}
          </div>
        </div>

        <div className='bloch-group bloch-readout'>
          <h3>Current state</h3>
          <p className='bloch-ket'>
            |ψ⟩ = <span>({formatComplex(amps[0])})</span>|0⟩ + <span>({formatComplex(amps[1])})</span>|1⟩
          </p>
          <p className='bloch-coords'>
            Bloch vector ({fmt(v.x)}, {fmt(v.y)}, {fmt(v.z)}) · θ = {theta.toFixed(0)}°, φ = {phi.toFixed(0)}°
          </p>
        </div>

        {lastGate && (
          <div className='bloch-group bloch-gate-info'>
            <h3>{lastGate.label}</h3>
            <p>{lastGate.desc}</p>
            <div className='bloch-matrix'>
              {lastGate.display.prefix && <span className='bloch-prefix'>{lastGate.display.prefix}</span>}
              <div className='bloch-matrix-grid'>
                {lastGate.display.rows.flat().map((cell, i) => (
                  <span key={i}>{cell}</span>
                ))}
              </div>
            </div>
          </div>
        )}

        {note && <p className='bloch-note'>{note}</p>}

        <div className='bloch-group'>
          <h3>Circuit</h3>
          <p className='bloch-history'>
            {startLabel}
            {history.map((g, i) => (
              <span key={i}> → {g}</span>
            ))}
          </p>
          <button type='button' className='bloch-reset' onClick={() => chooseStart(startId)}>
            Reset
          </button>
        </div>
      </aside>
    </section>
  );
}
