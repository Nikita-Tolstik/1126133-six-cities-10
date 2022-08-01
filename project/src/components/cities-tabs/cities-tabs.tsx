import React, { MouseEvent } from 'react';
import { City, city } from '../../const';
import { useAppDispatch } from '../../hooks';
import { changeCity } from '../../store/action';


type CitiesTabsProps = {
  activeCity: City;
}


const CitiesTabs: React.FC<CitiesTabsProps> = ({ activeCity }) => {
  const dispatch = useAppDispatch();

  return (
    <ul className="locations__list tabs__list">
      {city.map((cityName) => (
        <li
          key={cityName}
          className="locations__item"
        >
          <a
            onClick={(evt: MouseEvent<HTMLAnchorElement>) => {
              evt.preventDefault();
              dispatch(changeCity(cityName));
            }}
            className={`locations__item-link tabs__item ${activeCity === cityName ? 'tabs__item--active' : ''}`}
            href="/"
          >
            <span>{cityName}</span>
          </a>
        </li>)
      )}
    </ul>
  );
};


export default CitiesTabs;
