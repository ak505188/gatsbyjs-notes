import React, { useState } from 'react';
import { StaticQuery, Link, graphql } from 'gatsby';
import './navigation.scss';

function pathToArray(path) {
  return { path, pathArray: path.slice(1, path.length - 1).replace(/-/g, ' ').split('/') };
}

function arrayToObject(arr, obj, path) {
  if (arr.length < 2) {
    return obj;
  }

  const nextKey = arr.shift();

  if (arr.length === 1) {
    obj[nextKey] = obj[nextKey] || [];
    obj[nextKey].push({ name: arr.shift(), path });
    return obj;
  }

  obj[nextKey] = obj[nextKey] || {};
  obj[nextKey] = arrayToObject(arr, obj[nextKey], path);
  return obj;
}


export default () => (
  <StaticQuery
    query={query}
    render={data => (
      <Navigation nodes={data.allSitePage.nodes}/>
    )}
  />
);

const Navigation = ({ nodes }) => {
  const routeMap = {};
  nodes.map(({ path }) => pathToArray(path)).filter(({ pathArray }) => pathArray.length > 1)
    .forEach(({ path, pathArray }) => arrayToObject(pathArray, routeMap, path));

  return NavList(routeMap);
}

const NavAccordian = ({ name, children }) => {
  const [open, setOpen] = useState(true);

  return (
    <>
      <button
        className={`nav-accordian ${open ? 'open' : 'closed'}`}
        onClick={() => setOpen(prevOpen => !prevOpen)}
      >
        {name}
      </button>
      { open ?
        children :
        null
      }
    </>
  );
}

const NavList = map => (
  <ul className="navigation-list">
    { Object.entries(map).map(([dir, list]) => (
      <li key={dir}>
        <NavAccordian name={dir}>
          <ul style={{ paddingLeft: '1rem' }}>
            {
              Array.isArray(list) ?
              list.map(listItem => (
                NavListLink(listItem)
              )) :
              NavList(list)
            }
          </ul>
        </NavAccordian>
      </li>
    ))}
  </ul>
);

const NavListLink = listItem => (
  <li key={listItem.name}>
    <Link to={listItem.path}>
      {listItem.name}
    </Link>
  </li>
);

const query = graphql`
  query BlahQuery {
    allSitePage {
      nodes {
        path
      }
    }
  }
`;
