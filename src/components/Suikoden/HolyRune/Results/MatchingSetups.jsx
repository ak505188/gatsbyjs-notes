import React from 'react';

const MatchingSetups = ({ setups }) => (
  <ul className='matching-setups'>
    {setups.map((setup, index) => <MatchingSetup key={index} setup={setup}/>)}
  </ul>
);

const MatchingSetup = ({ setup }) => (
  <li className='setup'>
    <div>Index: {setup.index}</div>
    <div>Frame: {setup.frame}</div>
    <div>TS Index: {setup.ts_index}</div>
    <div>Bird 1: {setup.birds[0]}</div>
    <div>Final Index: {setup.final_index}</div>
  </li>
);

export default MatchingSetups;
