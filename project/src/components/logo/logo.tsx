import React, { MouseEvent } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AppRoute, City, LogoParameter } from '../../const';
import { useAppDispatch } from '../../hooks';
import { setActiveCity } from '../../store/app-process/app-process';


const Logo: React.FC = () => {
  const dispatch = useAppDispatch();

  const currentPath = useLocation().pathname;
  const logoParameter = currentPath === AppRoute.Main ? LogoParameter.Disabled : LogoParameter.Active;

  return (
    <Link
      onClick={(evt: MouseEvent<HTMLAnchorElement>) => {
        dispatch(setActiveCity(City.Paris));
      }}
      to={AppRoute.Main}
      className="header__logo-link"
      style={{ pointerEvents: logoParameter }}
    >
      <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
    </Link>
  );
};

export default Logo;
