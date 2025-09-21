import React from 'react';

const BirdDirections = ({ addBirdDirection, undo, clear }) => {
  return (
    <div className="bird-directions container">
      <h6>Top Right Bird Directions</h6>
      <div>
        <button onClick={() => undo()}>Undo</button>
        <button onClick={() => clear()}>Clear</button>
      </div>
      <button
        className="bird-directions down"
        onClick={() => addBirdDirection(0)}
      >
        D
      </button>
      <button
        className="bird-directions up"
        onClick={() => addBirdDirection(1)}
      >
        U
      </button>
      <button
        className="bird-directions left"
        onClick={() => addBirdDirection(2)}
      >
        L
      </button>
      <button
        className="bird-directions right"
        onClick={() => addBirdDirection(3)}
      >
        R
      </button>
    </div>
  );
};

export default BirdDirections;
