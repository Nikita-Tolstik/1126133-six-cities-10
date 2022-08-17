import React from 'react';
import HeaderUserSection from '../header-user-section/header-user-section';
import Logo from '../logo/logo';

type HeaderProps = {
  isHideUserSection?: boolean
}


const Header: React.FC<HeaderProps> = ({ isHideUserSection }) => (
  <header className="header">
    <div className="container">
      <div className="header__wrapper">
        <div className="header__left">
          <Logo />
        </div>

        {!isHideUserSection && <HeaderUserSection />}
      </div>
    </div>
  </header>
);

export default Header;
