import React from 'react';
import BlochSphere from './components/BlochSphere/BlochSphere';

function QuantumGates() {
  return (
    <main className='gates-page'>
      <h1 className='gates-page-title'>Quantum Gates</h1>
      <p className='gates-page-intro'>
        Every single-qubit gate is a rotation of the Bloch sphere. Pick a starting state,
        apply gates, and watch the qubit move. Try H → T → H, or apply Z to |0⟩ and see
        what happens.
      </p>
      <BlochSphere />
    </main>
  );
}

export default QuantumGates;
