import React, { Fragment, useState } from 'react';
import { Offers } from '../../types/offers';
import { PageCardClass } from '../../const';
import OfferCard from '../offer-card/offer-card';


type OffersListProps = {
  offers: Offers;
  cardClass: PageCardClass;
};


const OffersList: React.FC<OffersListProps> = ({ offers, cardClass }) => {

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [activeCard, setActiveCard] = useState<number | null>(null);


  return (
    <Fragment>
      {offers.map((offer) => (
        <OfferCard
          key={offer.id}
          offer={offer}
          cardClass={cardClass}
          onActive={() => setActiveCard(offer.id)}
          onInactive={() => setActiveCard(null)}
        />)
      )}
    </Fragment>
  );
};

export default OffersList;
