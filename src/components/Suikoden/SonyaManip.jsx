import React, { useState } from 'react';
import Data from './SonyaManipData';
import './SonyaManip.scss';

const BOTTOM = 'Bottom';
const TOP = 'Top';
const MIDDLE = 'Middle';
const LEFT = 'Left';
const RIGHT = 'Right';
const UNKNOWN = 'Unknown';

const SonyaManipContainer = () => {
  const [selectedQuadrants, setSelectedQuadrants] = useState({
    main: {
      horizontal: UNKNOWN,
      vertical: UNKNOWN
    },
    secondary: {
      horizontal: UNKNOWN,
      vertical: UNKNOWN
    }
  });

  return (
    <>
      <div className="ui container">
        <SonyaManipQuadrant
          quadrant='Main Quadrant'
          current={selectedQuadrants.main}
          update={(selected) => setSelectedQuadrants({ ...selectedQuadrants, main: selected })}
        />
        <SonyaManipQuadrant
          quadrant='Secondary Quadrant'
          current={selectedQuadrants.secondary}
          update={(selected) => setSelectedQuadrants({ ...selectedQuadrants, secondary: selected })}
        />
      </div>
      <SonyaImages data={Data} selectedQuadrants={selectedQuadrants}/>
    </>
  );
}

const SonyaImages = ({ data, selectedQuadrants }) => {
  const filteredData = data.filter(manip =>
    (selectedQuadrants.main.horizontal === UNKNOWN || selectedQuadrants.main.horizontal === manip.main.horizontal) &&
    (selectedQuadrants.main.vertical === UNKNOWN || selectedQuadrants.main.vertical === manip.main.vertical) &&
    (selectedQuadrants.secondary.horizontal === UNKNOWN || selectedQuadrants.secondary.horizontal === manip.secondary.horizontal) &&
    (selectedQuadrants.secondary.vertical === UNKNOWN || selectedQuadrants.secondary.vertical === manip.secondary.vertical));

  return (
    <div className='manip images container'>
      { filteredData.map(data =>
        <div className='manip image container'>
          <h6>Main: {data.main.vertical}-{data.main.horizontal}</h6>
          <h6>Secondary: {data.secondary.vertical}-{data.secondary.horizontal}</h6>
          <h6>{data.additionalInfo.reduce((accu, cur, index) => { return accu + (index > 0 ? ', ' : '') + cur }, '')}&nbsp;</h6>
          <img src={data.image} alt='' />
        </div>
      )}
    </div>
  );
}

const SonyaManipQuadrant = ({ quadrant, current, update }) => {
  const isCurrent = cell =>
    cell.horizontal === current.horizontal && cell.vertical === current.vertical
      ? 'current'
      : '';

  const cells = [
    { horizontal: UNKNOWN, vertical: UNKNOWN },
    { horizontal: LEFT, vertical: UNKNOWN },
    { horizontal: MIDDLE, vertical: UNKNOWN },
    { horizontal: RIGHT, vertical: UNKNOWN },
    { horizontal: UNKNOWN, vertical: TOP },
    { horizontal: LEFT, vertical: TOP },
    { horizontal: MIDDLE, vertical: TOP },
    { horizontal: RIGHT, vertical: TOP },
    { horizontal: UNKNOWN, vertical: MIDDLE },
    { horizontal: LEFT, vertical: MIDDLE },
    { horizontal: MIDDLE, vertical: MIDDLE },
    { horizontal: RIGHT, vertical: MIDDLE },
    { horizontal: UNKNOWN, vertical: BOTTOM },
    { horizontal: LEFT, vertical: BOTTOM },
    { horizontal: MIDDLE, vertical: BOTTOM },
    { horizontal: RIGHT, vertical: BOTTOM },
  ];

  return (
    <div>
      <h3>{quadrant}</h3>
      <div className="quadrant container">
        { cells.map((cell, index) =>
          <button key={index} className={`${isCurrent(cell)}`} onClick={() => update(cell)}/>
        )}
      </div>
    </div>
  );
};

function generateSonyaObject(str) {
  const data = str.split(',');
  const obj = { image: UNKNOWN, additionalInfo: [] };
  const keys = ['seed', 'mainVertical', 'mainHorizontal', 'secondaryVertical', 'secondaryHorizontal', 'additionalInfo' ];
  for (let i = 0; i < data.length; i++) {
    if (keys[i] === 'additionalInfo') {
      obj[keys[i]] = [data[i]];
    } else {
      obj[keys[i]] = data[i];
    }
  }
  return obj;
}

export default SonyaManipContainer;

// Toggles for quadrants
// Grid of images + additionalInfo?
// Possible link from images to notes or notes once selected
