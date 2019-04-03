import * as React from 'react';
import './Header.less';
const nexusLogo = require('../../../../assets/logo.svg');
const epflLogo = require('../../../../assets/epfl-logo.svg');

export interface HeaderProps {
  children?: React.ReactChild;
}

const Header: React.FunctionComponent<HeaderProps> = ({ children }) => {
  return (
    <header className="Header">
      <a href="https://epfl.ch" target="_blank">
        <div className="logo-block">
          <img src={epflLogo} alt="EPFL" className="logo" />
        </div>
      </a>
      <div className="logo-block -left">
        <span>Blue Brain Atlas</span>
      </div>
      <div className="selectors">{children}</div>
      {/* <div className="logo-block">
        <a className="logo" href="">
          {
            // must add inline styling to prevent this big svg from
            // flashing the screen on dev mode before styles are loaded
          }
          <img style={{ height: '2em', width: '2em' }} src={logo} alt="Nexus" />
          <h1>Nexus</h1>
        </a>
      </div> */}
    </header>
  );
};

export default Header;
