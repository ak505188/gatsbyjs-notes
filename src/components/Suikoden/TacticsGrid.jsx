import React from 'react';
import './TacticsFormation.scss';

// Takes 2 dimensional array
// Name for character, null for unusable tile, empty for unused tile.
// Takes array of objects with x,y, and name fields
// X and Y start with 0

/*
const sampleFormation = [
  { name: 'Andarc', x: 0, y: 0 },
  { name: 'Flare', x: 2, y: 0 },
  { name: 'Trishtan', x: 4, y: 0 },
  { name: 'Kyril', x: 1, y: 1 },
  { name: 'Seneca', x: 3, y: 1 },
  { name: 'Maxine', x: 2, y: 2 },
  { name: 'Kika', x: 1, y: 3 }
];
*/

function getDimensions(formation) {
  let maxX = 0;
  let maxY = 0;
  formation.forEach(unit => {
    if (unit.x > maxX) maxX = unit.x;
    if (unit.y > maxY) maxY = unit.y;
  });
  return { x: maxX, y: maxY };
}

function createGrid(x, y, formation) {
  const grid = new Array(y + 1).fill(null).map(()=>new Array(x + 1).fill(null));
  console.log(grid);
  formation.forEach(unit => grid[unit.y][unit.x] = unit.name);
  return grid;
}


const PartyFormation = ({ formation }) => {
  const dimensions = getDimensions(formation);
  console.log(formation);
  const grid = createGrid(dimensions.x, dimensions.y, formation);
  console.log(grid);
  return (
    <div className="party-formation-container">
      {grid.map((row, i) => {
        return (
          <ol key={i} className="party-formation-row">
            {row.map((cell, j) => {
              return <li key={j} className={cell === null ? 'empty' : 'character'}>{cell}</li>
            })}
          </ol>
        );
      })}
    </div>
  );
};

export default PartyFormation;
