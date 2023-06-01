import React from 'react'
import { MDXProvider } from '@mdx-js/react';
import PropTypes from 'prop-types'

import { Grid, Turn } from './Grid/Grid';
import Gamepad from './Gamepad';
import { SettingsContextProvider, Settings } from './Settings';
import { Menu } from './Menu/Menu';
import Image from './image';
import SEO from './seo';
import '../styles/reset.css';
import '../styles/layout.scss';

const shortCodes = { Menu, Grid, Image, Turn, SEO };

const Layout = ({ children }) => (
  <MDXProvider components={shortCodes}>
    <SettingsContextProvider>
      <div id="main">
        <Settings/>
        <Gamepad/>
        {children}
      </div>
    </SettingsContextProvider>
  </MDXProvider>
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
