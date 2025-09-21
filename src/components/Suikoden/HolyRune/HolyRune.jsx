import React, { useState } from 'react';
import BirdDirections from './BirdDirections';
import NPCDirection from './NPCDirection';
import Steps from './Steps';
import Results from './Results/Results';
import { TS_SETTINGS, NPC_ALIGNMENT } from './enums';
import './HolyRune.scss';

const HolyManipContainer = () => {
  const [steps, setSteps] = useState(0)
  const [palaceNPCs, setPalaceNPCs] = useState([-1,-1,-1,-1,-1])
  const [defaultTsSetting, setDefaultTsSetting] = useState(TS_SETTINGS.ANY)
  const [tsSetting, setTsSetting] = useState(defaultTsSetting)
  const [npcAlignment, setNPCAlignment] = useState(0)
  const [birdDirections, setBirdDirections] = useState([])

  const reset = () => {
    setPalaceNPCs([-1,-1,-1,-1,-1])
    setTsSetting(defaultTsSetting)
    setNPCAlignment(0)
    setBirdDirections([])
  }

  const updatePalaceNPC = (dir, index) => {
    setPalaceNPCs([
      ...palaceNPCs.slice(0, index),
      dir,
      ...palaceNPCs.slice(index + 1)
    ])
  }

  return (
    <div className="holy ui container">
      <div>
        <button onClick={() => reset()}>Reset</button>
        <span>
          Default Text Skip Setting:&nbsp;
          {Object.values(TS_SETTINGS).map(setting => (
            <span key={setting}>
              <label className={`${tsSetting === setting ? 'selected' : ''}`} for={`default_ts_${setting}`}>{setting}</label>
              <input id={`default_ts_${setting}`} type="radio" value={setting} name="default-ts-setting" checked={defaultTsSetting === setting} onClick={() => setDefaultTsSetting(setting)}/>
            </span>
          ))}
        </span>
      </div>
      <Steps steps={steps} setSteps={steps => setSteps(steps)}/>
      <div className="palace-npc container">
      {palaceNPCs.map((dir, index) => {
        return (
          <NPCDirection
            name={`NPC ${index+1}`}
            setDirection={(dir) => updatePalaceNPC(dir, index)}
            direction={dir}
          />
        )
      })}
      </div>
      <div className="ts-setting container">
        <h2>Town Text Skip</h2>
        <div className="ts-setting control">
          {Object.values(TS_SETTINGS).map(setting => (
            <button
              className={`${tsSetting === setting ? 'selected' : ''}`}
              onClick={() => setTsSetting(setting)}
            >
              {setting}
            </button>
          ))}
        </div>
      </div>
      <div className="npc-alignment">
        NPC 9&amp;10 Alignment:&nbsp;
        {NPC_ALIGNMENT.map((alignment, index) => (
          <span key={alignment}>
            <label>{alignment}</label>
            <input type="radio" value={alignment} name="npc-alignment" checked={npcAlignment === index} onClick={() => setNPCAlignment(index)}/>
          </span>
        ))}
      </div>
      <BirdDirections
        addBirdDirection={(direction => setBirdDirections([...birdDirections, direction]))}
        undo={() => setBirdDirections([...birdDirections.slice(0, birdDirections.length - 1)])}
        clear={() => setBirdDirections([])}
      />
      <Results
        steps={steps}
        palace_npcs={palaceNPCs}
        npc_alignment={npcAlignment}
        ts_setting={tsSetting}
        bird_directions={birdDirections}
      />
    </div>
  );
}

export default HolyManipContainer;
