import React from 'react';
import "./ScrollingCarousel.css";

const ScrollingCarousel = () => {
  const topItems = ['Quantum', 'Computing', 'Innovation', 'Future'];
  const bottomItems = ['Entanglement', 'Superposition', 'Qubits', 'Algorithm'];
  
  // Duplicate items more times for smoother looping
  const repeatedTop = [...topItems, ...topItems, ...topItems, ...topItems];
  const repeatedBottom = [...bottomItems, ...bottomItems, ...bottomItems, ...bottomItems];

  return (
    <div className="carousel-bg">
      <div className="carousel-track carousel-track-top">
        {repeatedTop.map((item, index) => (
          <span key={`top-${index}`} className="carousel-item">
            {item}
          </span>
        ))}
      </div>
      <div className="carousel-track carousel-track-bottom">
        {repeatedBottom.map((item, index) => (
          <span key={`bottom-${index}`} className="carousel-item">
            {item}
          </span>
        ))}
      </div>
    </div>
  );
};

export default ScrollingCarousel;