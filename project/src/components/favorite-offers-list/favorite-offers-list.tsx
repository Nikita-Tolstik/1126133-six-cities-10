import React, { Fragment } from 'react';
import { Offers } from '../../types/offers';
import { getCitiesOffers } from '../../utils/utils';
import { PageCardClass } from '../../const';
import FavoriteCity from '../../components/favorite-city/favorite-city';
import OffersList from '../../components/offers-list/offers-list';

type FavoriteOffersListProps = {
  offers: Offers;
  cardClass: PageCardClass;
}


const FavoriteOffersList: React.FC<FavoriteOffersListProps> = ({ offers, cardClass }) => {
  const citiesOffers = getCitiesOffers(offers);

  return (
    <Fragment>
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
                cardClass={cardClass}
              />
            </div>
          </li>);
      }
      )}
    </Fragment >
  );
};

export default FavoriteOffersList;
