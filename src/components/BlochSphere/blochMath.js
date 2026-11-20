// Quantum math for the Bloch sphere demo.
// A qubit state is [alpha, beta], two complex numbers { re, im }.

// ---------- Complex numbers ----------
export const c = (re, im = 0) => ({ re, im });
const add = (a, b) => c(a.re + b.re, a.im + b.im);
const mul = (a, b) => c(a.re * b.re - a.im * b.im, a.re * b.im + a.im * b.re);
const conj = (a) => c(a.re, -a.im);
const abs2 = (a) => a.re * a.re + a.im * a.im;
const expi = (t) => c(Math.cos(t), Math.sin(t));

const S2 = Math.SQRT1_2; // 1/sqrt(2)
const PI = Math.PI;

// ---------- States ----------
export const STATES = [
  { id: '0', label: '|0⟩', amps: [c(1), c(0)] },
  { id: '1', label: '|1⟩', amps: [c(0), c(1)] },
  { id: '+', label: '|+⟩', amps: [c(S2), c(S2)] },
  { id: '-', label: '|−⟩', amps: [c(S2), c(-S2)] },
  { id: '+i', label: '|+i⟩', amps: [c(S2), c(0, S2)] },
  { id: '-i', label: '|−i⟩', amps: [c(S2), c(0, -S2)] },
];

// Apply a 2x2 complex matrix to a state
export function applyMatrix(m, [a, b]) {
  return [
    add(mul(m[0][0], a), mul(m[0][1], b)),
    add(mul(m[1][0], a), mul(m[1][1], b)),
  ];
}

// State -> point on the Bloch sphere {x, y, z}
export function blochVector([a, b]) {
  const ab = mul(conj(a), b);
  return { x: 2 * ab.re, y: 2 * ab.im, z: abs2(a) - abs2(b) };
}

// Rotate vector v about unit axis n by angle (Rodrigues' formula)
export function rotate(v, n, angle) {
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  const dot = n.x * v.x + n.y * v.y + n.z * v.z;
  const cross = {
    x: n.y * v.z - n.z * v.y,
    y: n.z * v.x - n.x * v.z,
    z: n.x * v.y - n.y * v.x,
  };
  return {
    x: v.x * cos + cross.x * sin + n.x * dot * (1 - cos),
    y: v.y * cos + cross.y * sin + n.y * dot * (1 - cos),
    z: v.z * cos + cross.z * sin + n.z * dot * (1 - cos),
  };
}

// R_n(theta) = cos(theta/2) I - i sin(theta/2) (n . sigma)
export function rotationMatrix(n, theta) {
  const co = Math.cos(theta / 2);
  const s = Math.sin(theta / 2);
  return [
    [c(co, -s * n.z), c(-s * n.y, -s * n.x)],
    [c(s * n.y, -s * n.x), c(co, s * n.z)],
  ];
}

// ---------- Gates ----------
// Every single-qubit gate is a rotation of the Bloch sphere (up to a global
// phase). `axis` and `angle` drive the animation; `matrix` updates the state.
const X_AXIS = { x: 1, y: 0, z: 0 };
const Y_AXIS = { x: 0, y: 1, z: 0 };
const Z_AXIS = { x: 0, y: 0, z: 1 };
const H_AXIS = { x: S2, y: 0, z: S2 };

export const GATES = {
  X: {
    label: 'X', axis: X_AXIS, angle: PI,
    matrix: [[c(0), c(1)], [c(1), c(0)]],
    display: { rows: [['0', '1'], ['1', '0']] },
    desc: 'Bit flip. 180° rotation about the x-axis: swaps |0⟩ and |1⟩.',
  },
  Y: {
    label: 'Y', axis: Y_AXIS, angle: PI,
    matrix: [[c(0), c(0, -1)], [c(0, 1), c(0)]],
    display: { rows: [['0', '−i'], ['i', '0']] },
    desc: 'Bit and phase flip. 180° rotation about the y-axis.',
  },
  Z: {
    label: 'Z', axis: Z_AXIS, angle: PI,
    matrix: [[c(1), c(0)], [c(0), c(-1)]],
    display: { rows: [['1', '0'], ['0', '−1']] },
    desc: 'Phase flip. 180° rotation about the z-axis: swaps |+⟩ and |−⟩.',
  },
  H: {
    label: 'H', axis: H_AXIS, angle: PI,
    matrix: [[c(S2), c(S2)], [c(S2), c(-S2)]],
    display: { prefix: '1/√2', rows: [['1', '1'], ['1', '−1']] },
    desc: 'Hadamard. 180° rotation about the axis halfway between x and z: turns |0⟩ into |+⟩.',
  },
  S: {
    label: 'S', axis: Z_AXIS, angle: PI / 2,
    matrix: [[c(1), c(0)], [c(0), c(0, 1)]],
    display: { rows: [['1', '0'], ['0', 'i']] },
    desc: 'Phase gate. 90° rotation about the z-axis: turns |+⟩ into |+i⟩.',
  },
  Sdg: {
    label: 'S†', axis: Z_AXIS, angle: -PI / 2,
    matrix: [[c(1), c(0)], [c(0), c(0, -1)]],
    display: { rows: [['1', '0'], ['0', '−i']] },
    desc: 'Inverse of S. −90° rotation about the z-axis.',
  },
  T: {
    label: 'T', axis: Z_AXIS, angle: PI / 4,
    matrix: [[c(1), c(0)], [c(0), expi(PI / 4)]],
    display: { rows: [['1', '0'], ['0', 'e^(iπ/4)']] },
    desc: 'π/8 gate. 45° rotation about the z-axis.',
  },
  Tdg: {
    label: 'T†', axis: Z_AXIS, angle: -PI / 4,
    matrix: [[c(1), c(0)], [c(0), expi(-PI / 4)]],
    display: { rows: [['1', '0'], ['0', 'e^(−iπ/4)']] },
    desc: 'Inverse of T. −45° rotation about the z-axis.',
  },
};

export const FIXED_GATES = ['X', 'Y', 'Z', 'H', 'S', 'Sdg', 'T', 'Tdg'];

const ROTATION_AXES = { Rx: X_AXIS, Ry: Y_AXIS, Rz: Z_AXIS };
export const ROTATION_GATES = Object.keys(ROTATION_AXES);

// Build a gate object for a fixed gate key, or Rx/Ry/Rz with an angle in degrees
export function makeGate(key, degrees) {
  if (GATES[key]) return { key, ...GATES[key] };

  const axis = ROTATION_AXES[key];
  const theta = (degrees * PI) / 180;
  const matrix = rotationMatrix(axis, theta);
  const name = key.slice(1); // "x", "y" or "z"
  return {
    key,
    label: `${key}(${degrees}°)`,
    axis,
    angle: theta,
    matrix,
    display: { rows: matrix.map((row) => row.map(formatComplex)) },
    desc: `Rotation by ${degrees}° about the ${name}-axis.`,
  };
}

// ---------- Formatting ----------
function formatReal(v) {
  if (Math.abs(v - S2) < 5e-4) return '1/√2';
  if (Math.abs(v + S2) < 5e-4) return '−1/√2';
  const s = (Math.round(v * 1000) / 1000).toString();
  return s.replace('-', '−');
}

export function formatComplex(z) {
  const re = Math.abs(z.re) < 5e-4 ? 0 : z.re;
  const im = Math.abs(z.im) < 5e-4 ? 0 : z.im;
  if (re === 0 && im === 0) return '0';
  if (im === 0) return formatReal(re);

  let imPart;
  if (Math.abs(Math.abs(im) - 1) < 5e-4) imPart = 'i';
  else if (Math.abs(Math.abs(im) - S2) < 5e-4) imPart = 'i/√2';
  else imPart = `${formatReal(Math.abs(im))}i`;

  if (re === 0) return im < 0 ? `−${imPart}` : imPart;
  return `${formatReal(re)} ${im < 0 ? '−' : '+'} ${imPart}`;
}

// Polar angles of a Bloch vector, in degrees
export function polarAngles(v) {
  const theta = Math.acos(Math.max(-1, Math.min(1, v.z)));
  let phi = Math.atan2(v.y, v.x);
  if (phi < 0) phi += 2 * PI;
  const onPole = Math.abs(Math.sin(theta)) < 1e-6;
  return {
    theta: (theta * 180) / PI,
    phi: onPole ? 0 : (phi * 180) / PI,
  };
}
