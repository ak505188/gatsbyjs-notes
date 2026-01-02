import React from 'react';
import './Menu.scss';

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export const MenuItem = ({ children, type }) => {
  // console.log(children.split('\r'));
  const content = children.props !== undefined ?
    children :
    <ol>
      {children.split('\n').map((line, i) => <li key={i}>{line.trim()}</li>)}
    </ol>;

  return (
    <div className={`menu-item ${type}`}>
      <h5>{capitalize(type)}</h5>
      <div>
        {content}
      </div>
    </div>
  );
};

export const Menu = props => {
  const { children, timing } = props;
  return (
    <div className="menu">
      {timing &&
        <p className="timing"><strong>Timing</strong>: {timing}</p>
      }
      <div className="menu-content">
        {children}
      </div>
    </div>
  );
};
