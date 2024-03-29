import React from 'react';
import { ComponentClass } from '../../const';
import { getCountStars } from '../../utils/utils';

type RatingBlockProps = {
  rating: number,
  componentClass: ComponentClass
}


const RatingBlock: React.FC<RatingBlockProps> = ({ rating, componentClass }) => {
  const starsCount = getCountStars(rating);
  const isShowRatingValue = componentClass === ComponentClass.Property;

  return (
    <div className={`${componentClass}__rating rating`}>
      <div className={`${componentClass}__stars rating__stars`}>
        <span style={{ width: starsCount }}></span>
        <span className="visually-hidden">Rating</span>
      </div>
      {isShowRatingValue && <span className="property__rating-value rating__value">{rating}</span>}
    </div>
  );
};

export default RatingBlock;
