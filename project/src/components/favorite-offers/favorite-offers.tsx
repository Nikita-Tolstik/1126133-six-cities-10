import React, { Fragment } from 'react';
import { PageCardClass } from '../../const';
import { Offers } from '../../types/offers';
import FavoriteOffersList from '../favorite-offers-list/favorite-offers-list';

type FavoriteOffersProps = {
  offers: Offers
}


const FavoriteOffers: React.FC<FavoriteOffersProps> = ({ offers }) => (
  <Fragment>
    <h1 className="favorites__title">Saved listing</h1>
    <ul className="favorites__list">
      <FavoriteOffersList
        offers={offers}
        cardClass={PageCardClass.Favorite}
      />
    </ul>
  </Fragment>
);

export default FavoriteOffers;
