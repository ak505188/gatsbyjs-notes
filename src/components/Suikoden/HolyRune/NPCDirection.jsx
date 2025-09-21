import React from 'react';

const NPCDirection = ({ name, direction, setDirection }) => {
  const data = [
    { className: 'clear', label: 'C', direction_int: -1 },
    { className: 'down', label: 'D', direction_int: 0 },
    { className: 'up', label: 'U', direction_int: 1 },
    { className: 'left', label: 'L', direction_int: 2 },
    { className: 'right', label: 'R', direction_int: 3 },
  ]
  return (
  <div className="palace-npc control">
    {data.map(({ className, label, direction_int }) => (
      <div className={`palace-npc input ${className}`}>
        <input
          id={`${name.replace(' ','_')}-${label}`}
          type="radio"
          className={className}
          name={name}
          value={direction_int}
          checked={direction === direction_int}
          onClick={() => setDirection(direction_int)}
        />
        <label for={`${name.replace(' ', '_')}-${label}`}>{label}</label>
      </div>
    ))}
  </div>);
};

export default NPCDirection;
