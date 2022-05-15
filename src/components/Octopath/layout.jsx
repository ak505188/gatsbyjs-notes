import React from 'react';
import SEO from '../seo';
import { MDXProvider } from '@mdx-js/react';
import { Grid, Turn } from '../Grid/Grid';
import CaitProvider, { Cait, NoCait } from './Cait';
import { Menu, Equipment, Jobs, Items, Formation, Skills } from '../Menu/Menu';
import { Battle } from '../Battle/Battle.jsx';

import Gamepad from '../Gamepad';
import '../../styles/reset.css';
import '../../styles/layout.scss';

const shortCodes = { SEO, Battle, Menu, Equipment, Jobs, Items, Formation, Skills, Cait, NoCait, Grid, Turn };

export default (props) => (
  <MDXProvider components={shortCodes}>
    <div id="main">
      <Gamepad/>
      <CaitProvider>
        {props.children}
      </CaitProvider>
    </div>
  </MDXProvider>
);
