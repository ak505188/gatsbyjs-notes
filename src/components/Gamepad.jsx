import React, { useContext, useEffect } from 'react';
import { SettingsContext } from './Settings';

import Gamepad from 'react-gamepad';

let scrollBy = 0;

function getDirection(axis) {
  return axis >= 0 ? -1 : 1;
}

function setScrollBy(value) {
  scrollBy = value;
}

export default props => {
  const settings = useContext(SettingsContext);

  useEffect(() => {
    const interval = setInterval(() => {
      window.scrollBy(0, scrollBy);
    }, 10);
    return () => clearInterval(interval);
  }, []);

  const defaultConnectHandler = (gamepadIndex) => {
    console.log(`Gamepad ${gamepadIndex} connected !`)
  };

  const defaultDisconnectHandler = (gamepadIndex) => {
    console.log(`Gamepad ${gamepadIndex} disconnected !`)
  };

  const defaultButtonChangeHandler = (buttonName, down) => {
    console.log(buttonName, down)
  };

  const defaultAxisChangeHandler = (axisName, value, previousValue) => {
    console.log(axisName, value)
    if (axisName === 'RightStickY' && settings.gamepadScroll) {
      setScrollBy(Math.abs(value) >= Math.abs(previousValue) ?  getDirection(value) * 15 : 0);
    }
  };

  const defaultButtonDownHandler = (buttonName) => {
    console.log(buttonName, 'down')
  };

  const defaultButtonUpHandler = (buttonName) => {
    console.log(buttonName, 'up')
  };

  const {
    connectHandler = defaultConnectHandler,
    disconnectHandler = defaultDisconnectHandler,
    buttonChangeHandler = defaultButtonChangeHandler,
    axisChangeHandler = defaultAxisChangeHandler,
    buttonDownHandler = defaultButtonDownHandler,
    buttonUpHandle = defaultButtonUpHandler
  } = props;

  return (
    <Gamepad
      onConnect={connectHandler}
      onDisconnect={disconnectHandler}
      onButtonChange={buttonChangeHandler}
      onAxisChange={axisChangeHandler}
      onButtonDown={buttonDownHandler}
      onButtonUp={buttonUpHandle}
    >
      <React.Fragment/>
    </Gamepad>
  );
}
