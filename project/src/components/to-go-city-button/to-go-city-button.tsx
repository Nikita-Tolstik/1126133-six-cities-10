import React, { MouseEvent } from 'react';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import { useAppDispatch } from '../../hooks';
import { setActiveCity } from '../../store/app-process/app-process';
import { getRandomCity } from '../../utils/utils';


const ToGoCityButton: React.FC = () => {
  const dispatch = useAppDispatch();
  const city = getRandomCity();


  return (
    <section className="locations locations--login locations--current">
      <div className="locations__item">
        <Link
          onClick={(evt: MouseEvent<HTMLAnchorElement>) => {
            dispatch(setActiveCity(city));
          }}
          to={AppRoute.Main}
          className="locations__item-link"
        >
          <span>{city}</span>
        </Link>
      </div>
    </section>
  );
};

export default ToGoCityButton;
