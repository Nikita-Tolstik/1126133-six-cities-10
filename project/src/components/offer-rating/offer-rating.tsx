import React from 'react';
import { ComponentClass } from '../../const';
import { Offer } from '../../types/offers';
import { getCountStars } from '../../utils/utils';

type OfferRatingProps = {
  offer: Offer,
  componentClass: ComponentClass,
}

const OfferRating: React.FC<OfferRatingProps> = ({ offer, componentClass }) => {
  const starsCount = getCountStars(offer.rating);
  const isShowRatingValue = componentClass === ComponentClass.Property;

  return (
    <div className={`${componentClass}__rating rating`}>
      <div className={`${componentClass}__stars rating__stars`}>
        <span style={{ width: starsCount }}></span>
        <span className="visually-hidden">Rating</span>
      </div>
      {isShowRatingValue && <span className="property__rating-value rating__value">{offer.rating}</span>}
    </div>
  );
};

export default OfferRating;
