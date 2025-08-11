import React, { useContext, useEffect, useRef, useState } from 'react';
import SettingIcon from '../images/settings-icon.png';
import '../styles/settings.scss';

const defaultSettings = {
  gamepadScroll: true,
  showSettingsButton: true,
  gamepadIndex: 0
};

export const SettingsContext = React.createContext({});

export const SettingsContextProvider = ({ children }) => {
  const [settings, setSettings] = useState(defaultSettings);
  const saveSettings = (settings) => localStorage.setItem('settings', JSON.stringify(settings));

  const changeSetting = (setting, value) => {
    const newSettings = { ...settings, [setting]: value };
    setSettings(newSettings);
    saveSettings(newSettings);
  }

  useEffect(() => {
    const localStorageSettings = localStorage.getItem('settings');
    if (localStorageSettings) {
      setSettings(JSON.parse(localStorageSettings));
    }
  }, []);

  return (
    <SettingsContext.Provider value={{ ...settings, changeSetting }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const Settings = ({ alwaysShow }) => {
  const dialogRef = useRef(null);
  const settings = useContext(SettingsContext);
  const [gamepads, setGamepads] = useState(navigator.getGamepads());

  const updateGamepadCount = () => {
    console.log(navigator.getGamepads());
    setGamepads(navigator.getGamepads());
  }

  const updateSelectedGamepad = (index) => {
    if (index < 0 || index >= gamepads.length) {
      console.error('Invalid gamepad index selected. Setting to default (0)');
      index = 0;
    }

    settings.changeSetting('gamepadIndex', index);
  }

  window.addEventListener('gamepadconnected', () => {
    updateGamepadCount();
  })

  window.addEventListener('gamepaddisconnected', () => {
    updateGamepadCount();
  })


  const handleClick = () => {
    dialogRef.current.showModal();
  }

  const dialogClick = e => {
    if (e.target.tagName === "DIALOG") {
      e.target.close();
    }
  }

  const showButton = alwaysShow ? true : settings.showSettingsButton;

  return (
    <>
      { showButton &&
        <button
          className="settings"
          onClick={handleClick}
        >
          <img src={SettingIcon} alt="Settings Icon"/>
        </button>
      }
      <dialog onClick={dialogClick} ref={dialogRef}>
        <div className="container">
          <div>
            <label>
              <input
                name="gamepadScroll"
                type="checkbox"
                checked={settings.gamepadScroll}
                onChange={e => settings.changeSetting(e.currentTarget.name, e.currentTarget.checked)}
              />
              Enable Gamepad Scroll
            </label>
          </div>
          <div>
          { gamepads.map((gamepad, index) => (
            <label>
              <input
                key={index}
                value={index}
                type="radio"
              />
              {`${index}: ${gamepad.id}`}
            </label>
          ))}
          </div>
          <div>
            <label>
              <input
                name="showSettingsButton"
                type="checkbox"
                checked={settings.showSettingsButton}
                onChange={e => settings.changeSetting(e.currentTarget.name, e.currentTarget.checked)}
              />
              Show Settings Button
            </label>
            <div>Button will always show on home page.</div>
          </div>
        </div>
      </dialog>
    </>
  );
}
