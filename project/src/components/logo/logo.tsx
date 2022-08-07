import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AppRoute } from '../../const';


const Logo: React.FC = () => {
  const currentPath = useLocation().pathname;
  const logoParameter = currentPath === AppRoute.Main ? 'none' : 'auto';

  return (
    <Link
      to={AppRoute.Main}
      className="header__logo-link"
      style={{ pointerEvents: logoParameter }}
    >
      <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
    </Link>
  );
};

export default Logo;
