import React, { Fragment } from 'react';
import { Offers } from '../../types/offers';
import { PageCardClass } from '../../const';
import OfferCard from '../offer-card/offer-card';


type OffersListProps = {
  offers: Offers,
  cardClass: PageCardClass,
  onActiveCard?: (value: number | null) => void
};


const OffersList: React.FC<OffersListProps> = ({ offers, cardClass, onActiveCard }) => (
  <Fragment>
    {offers.map((offer) => (
      <OfferCard
        key={offer.id}
        offer={offer}
        cardClass={cardClass}
        onActiveCard={onActiveCard}
      />)
    )}
  </Fragment>
);


export default React.memo(OffersList);
