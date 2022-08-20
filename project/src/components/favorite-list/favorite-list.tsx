import React, { Fragment } from 'react';
import { PageCardClass } from '../../const';
import { useAppSelector } from '../../hooks';
import { getFavoriteList } from '../../store/favorite-data/selectors';
import { getCitiesOffers } from '../../utils/utils';
import FavoriteCity from '../favorite-city/favorite-city';
import OffersList from '../offers-list/offers-list';


const FavoriteOffers: React.FC = () => {
  const favoriteList = useAppSelector(getFavoriteList);
  const citiesOffers = getCitiesOffers(favoriteList);

  return (
    <Fragment>
      <h1 className="favorites__title">Saved listing</h1>
      <ul className="favorites__list">
        {citiesOffers.map((items) => {
          const [city, cityOffers] = items;
          return (
            <li
              key={city}
              className="favorites__locations-items"
            >

              <FavoriteCity city={city} />

              <div className="favorites__places">
                <OffersList
                  offers={cityOffers}
                  cardClass={PageCardClass.Favorite}
                />
              </div>
            </li>);
        }
        )}
      </ul>
    </Fragment>
  );
};

export default FavoriteOffers;
