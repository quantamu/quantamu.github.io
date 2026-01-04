import React, { useEffect, useRef } from 'react';
import { animate, stagger } from 'animejs';
import './QubitAnimation.css';

const QubitAnimation = () => {
  const containerRef = useRef(null);
  const qubitsRef = useRef([]);

  useEffect(() => {
    // Create continuous floating motion paths for qubits
    const animateQubits = () => {
      qubitsRef.current.forEach((qubit, index) => {
        if (!qubit) return;

        // Each qubit gets unique motion characteristics
        const delay = index * 400;
        const duration = 15000 + (index * 2000); // Longer, slower movements

        // Create circular/organic motion paths
        const xAmplitude = 150 + (index * 40); // How far it moves horizontally
        const yAmplitude = 100 + (index * 30); // How far it moves vertically

        // Different phase for each qubit creates unique paths
        const phaseX = index * 0.5;
        const phaseY = index * 0.7;

        // Continuous circular floating motion
        animate(qubit, {
          translateX: [
            { to: Math.sin(phaseX) * xAmplitude, duration: duration * 0.25 },
            { to: Math.sin(phaseX + Math.PI/2) * xAmplitude, duration: duration * 0.25 },
            { to: Math.sin(phaseX + Math.PI) * xAmplitude, duration: duration * 0.25 },
            { to: Math.sin(phaseX + (3*Math.PI)/2) * xAmplitude, duration: duration * 0.25 },
            { to: Math.sin(phaseX) * xAmplitude, duration: 0 }
          ],
          translateY: [
            { to: Math.cos(phaseY) * yAmplitude, duration: duration * 0.25 },
            { to: Math.cos(phaseY + Math.PI/2) * yAmplitude, duration: duration * 0.25 },
            { to: Math.cos(phaseY + Math.PI) * yAmplitude, duration: duration * 0.25 },
            { to: Math.cos(phaseY + (3*Math.PI)/2) * yAmplitude, duration: duration * 0.25 },
            { to: Math.cos(phaseY) * yAmplitude, duration: 0 }
          ],
          ease: 'inOut(sine)',
          delay: delay,
          loop: true
        });

        // Rotation animation
        animate(qubit.querySelector('.qubit-sphere'), {
          rotate: 360,
          duration: 8000 + (index * 1000),
          ease: 'linear',
          loop: true
        });

        // Pulsing glow animation
        animate(qubit.querySelector('.qubit-glow'), {
          scale: [1, 1.3, 1],
          opacity: [0.5, 0.8, 0.5],
          duration: 3000,
          ease: 'inOut(quad)',
          delay: delay,
          loop: true
        });
      });
    };

    // Animate entanglement lines
    const lines = containerRef.current?.querySelectorAll('.entanglement-line');
    if (lines) {
      lines.forEach(line => {
        const length = line.getTotalLength();
        line.style.strokeDasharray = length;
        line.style.strokeDashoffset = length;

        animate(line, {
          strokeDashoffset: [length, 0],
          opacity: [0.3, 0.6, 0.3],
          duration: 4000,
          ease: 'inOut(sine)',
          loop: true
        });
      });
    }

    animateQubits();

    // Stagger animation for initial appearance
    animate('.qubit', {
      opacity: [0, 1],
      scale: [0.5, 1],
      duration: 1500,
      delay: stagger(200),
      ease: 'out(elastic, 1, .8)'
    });

  }, []);

  return (
    <div className="qubit-animation-container" ref={containerRef}>
      <svg className="entanglement-svg" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="lineGradient1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ff4d4d" />
            <stop offset="50%" stopColor="#0085ff" />
            <stop offset="100%" stopColor="#00ff7f" />
          </linearGradient>
          <linearGradient id="lineGradient2" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#00ff7f" />
            <stop offset="50%" stopColor="#ff4d4d" />
            <stop offset="100%" stopColor="#0085ff" />
          </linearGradient>
        </defs>
        {/* Entanglement connections between qubits */}
        <line className="entanglement-line" x1="10%" y1="10%" x2="50%" y2="35%" stroke="url(#lineGradient1)" strokeWidth="1.5" strokeDasharray="5,5" />
        <line className="entanglement-line" x1="85%" y1="20%" x2="50%" y2="35%" stroke="url(#lineGradient1)" strokeWidth="1.5" strokeDasharray="5,5" />
        <line className="entanglement-line" x1="5%" y1="50%" x2="25%" y2="80%" stroke="url(#lineGradient2)" strokeWidth="1.5" strokeDasharray="5,5" />
        <line className="entanglement-line" x1="90%" y1="60%" x2="80%" y2="85%" stroke="url(#lineGradient2)" strokeWidth="1.5" strokeDasharray="5,5" />
        <line className="entanglement-line" x1="25%" y1="80%" x2="50%" y2="35%" stroke="url(#lineGradient1)" strokeWidth="1.5" strokeDasharray="5,5" />
        <line className="entanglement-line" x1="80%" y1="85%" x2="90%" y2="60%" stroke="url(#lineGradient2)" strokeWidth="1.5" strokeDasharray="5,5" />
      </svg>

      {/* Qubit 1 */}
      <div
        className="qubit qubit-1"
        ref={el => qubitsRef.current[0] = el}
      >
        <div className="qubit-glow"></div>
        <div className="qubit-sphere">
          <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <radialGradient id="qubitGradient1">
                <stop offset="0%" stopColor="#ff4d4d" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#0085ff" stopOpacity="0.6" />
              </radialGradient>
            </defs>
            <circle cx="50" cy="50" r="40" fill="url(#qubitGradient1)" opacity="0.8" />
            <circle cx="50" cy="50" r="35" fill="none" stroke="#00ff7f" strokeWidth="2" opacity="0.6" />
            <ellipse cx="50" cy="50" rx="40" ry="15" fill="none" stroke="#0085ff" strokeWidth="1.5" opacity="0.7" />
            <ellipse cx="50" cy="50" rx="15" ry="40" fill="none" stroke="#ff4d4d" strokeWidth="1.5" opacity="0.7" />
            <line x1="50" y1="10" x2="50" y2="90" stroke="#fff" strokeWidth="1.5" opacity="0.5" />
          </svg>
        </div>
      </div>

      {/* Qubit 2 */}
      <div
        className="qubit qubit-2"
        ref={el => qubitsRef.current[1] = el}
      >
        <div className="qubit-glow"></div>
        <div className="qubit-sphere">
          <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <radialGradient id="qubitGradient2">
                <stop offset="0%" stopColor="#0085ff" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#00ff7f" stopOpacity="0.6" />
              </radialGradient>
            </defs>
            <circle cx="50" cy="50" r="40" fill="url(#qubitGradient2)" opacity="0.8" />
            <circle cx="50" cy="50" r="35" fill="none" stroke="#ff4d4d" strokeWidth="2" opacity="0.6" />
            <ellipse cx="50" cy="50" rx="40" ry="15" fill="none" stroke="#00ff7f" strokeWidth="1.5" opacity="0.7" />
            <ellipse cx="50" cy="50" rx="15" ry="40" fill="none" stroke="#0085ff" strokeWidth="1.5" opacity="0.7" />
            <line x1="50" y1="10" x2="50" y2="90" stroke="#fff" strokeWidth="1.5" opacity="0.5" />
          </svg>
        </div>
      </div>

      {/* Qubit 3 */}
      <div
        className="qubit qubit-3"
        ref={el => qubitsRef.current[2] = el}
      >
        <div className="qubit-glow"></div>
        <div className="qubit-sphere">
          <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <radialGradient id="qubitGradient3">
                <stop offset="0%" stopColor="#00ff7f" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#ff4d4d" stopOpacity="0.6" />
              </radialGradient>
            </defs>
            <circle cx="50" cy="50" r="40" fill="url(#qubitGradient3)" opacity="0.8" />
            <circle cx="50" cy="50" r="35" fill="none" stroke="#0085ff" strokeWidth="2" opacity="0.6" />
            <ellipse cx="50" cy="50" rx="40" ry="15" fill="none" stroke="#ff4d4d" strokeWidth="1.5" opacity="0.7" />
            <ellipse cx="50" cy="50" rx="15" ry="40" fill="none" stroke="#00ff7f" strokeWidth="1.5" opacity="0.7" />
            <line x1="50" y1="10" x2="50" y2="90" stroke="#fff" strokeWidth="1.5" opacity="0.5" />
          </svg>
        </div>
      </div>

      {/* Qubit 4 */}
      <div
        className="qubit qubit-4"
        ref={el => qubitsRef.current[3] = el}
      >
        <div className="qubit-glow"></div>
        <div className="qubit-sphere">
          <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <radialGradient id="qubitGradient4">
                <stop offset="0%" stopColor="#0085ff" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#ff4d4d" stopOpacity="0.6" />
              </radialGradient>
            </defs>
            <circle cx="50" cy="50" r="40" fill="url(#qubitGradient4)" opacity="0.8" />
            <circle cx="50" cy="50" r="35" fill="none" stroke="#00ff7f" strokeWidth="2" opacity="0.6" />
            <ellipse cx="50" cy="50" rx="40" ry="15" fill="none" stroke="#0085ff" strokeWidth="1.5" opacity="0.7" />
            <ellipse cx="50" cy="50" rx="15" ry="40" fill="none" stroke="#ff4d4d" strokeWidth="1.5" opacity="0.7" />
            <line x1="50" y1="10" x2="50" y2="90" stroke="#fff" strokeWidth="1.5" opacity="0.5" />
          </svg>
        </div>
      </div>

      {/* Qubit 5 */}
      <div
        className="qubit qubit-5"
        ref={el => qubitsRef.current[4] = el}
      >
        <div className="qubit-glow"></div>
        <div className="qubit-sphere">
          <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <radialGradient id="qubitGradient5">
                <stop offset="0%" stopColor="#ff4d4d" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#00ff7f" stopOpacity="0.6" />
              </radialGradient>
            </defs>
            <circle cx="50" cy="50" r="40" fill="url(#qubitGradient5)" opacity="0.8" />
            <circle cx="50" cy="50" r="35" fill="none" stroke="#0085ff" strokeWidth="2" opacity="0.6" />
            <ellipse cx="50" cy="50" rx="40" ry="15" fill="none" stroke="#00ff7f" strokeWidth="1.5" opacity="0.7" />
            <ellipse cx="50" cy="50" rx="15" ry="40" fill="none" stroke="#0085ff" strokeWidth="1.5" opacity="0.7" />
            <line x1="50" y1="10" x2="50" y2="90" stroke="#fff" strokeWidth="1.5" opacity="0.5" />
          </svg>
        </div>
      </div>

      {/* Qubit 6 */}
      <div
        className="qubit qubit-6"
        ref={el => qubitsRef.current[5] = el}
      >
        <div className="qubit-glow"></div>
        <div className="qubit-sphere">
          <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <radialGradient id="qubitGradient6">
                <stop offset="0%" stopColor="#00ff7f" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#0085ff" stopOpacity="0.6" />
              </radialGradient>
            </defs>
            <circle cx="50" cy="50" r="40" fill="url(#qubitGradient6)" opacity="0.8" />
            <circle cx="50" cy="50" r="35" fill="none" stroke="#ff4d4d" strokeWidth="2" opacity="0.6" />
            <ellipse cx="50" cy="50" rx="40" ry="15" fill="none" stroke="#0085ff" strokeWidth="1.5" opacity="0.7" />
            <ellipse cx="50" cy="50" rx="15" ry="40" fill="none" stroke="#00ff7f" strokeWidth="1.5" opacity="0.7" />
            <line x1="50" y1="10" x2="50" y2="90" stroke="#fff" strokeWidth="1.5" opacity="0.5" />
          </svg>
        </div>
      </div>

      {/* Qubit 7 */}
      <div
        className="qubit qubit-7"
        ref={el => qubitsRef.current[6] = el}
      >
        <div className="qubit-glow"></div>
        <div className="qubit-sphere">
          <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <radialGradient id="qubitGradient7">
                <stop offset="0%" stopColor="#0085ff" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#00ff7f" stopOpacity="0.6" />
              </radialGradient>
            </defs>
            <circle cx="50" cy="50" r="40" fill="url(#qubitGradient7)" opacity="0.8" />
            <circle cx="50" cy="50" r="35" fill="none" stroke="#ff4d4d" strokeWidth="2" opacity="0.6" />
            <ellipse cx="50" cy="50" rx="40" ry="15" fill="none" stroke="#ff4d4d" strokeWidth="1.5" opacity="0.7" />
            <ellipse cx="50" cy="50" rx="15" ry="40" fill="none" stroke="#00ff7f" strokeWidth="1.5" opacity="0.7" />
            <line x1="50" y1="10" x2="50" y2="90" stroke="#fff" strokeWidth="1.5" opacity="0.5" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default QubitAnimation;
