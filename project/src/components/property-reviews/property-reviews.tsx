import React from 'react';
import { Reviews } from '../../types/reviews';
import FormReview from '../form-review/form-review';
import ReviewsList from '../reviews-list/reviews-list';

type PropertyReviewsProps = {
  reviews: Reviews
}

const PropertyReviews: React.FC<PropertyReviewsProps> = ({ reviews }) => (
  <section className="property__reviews reviews">
    <h2 className="reviews__title">Reviews &middot;&nbsp;
      <span className="reviews__amount">{reviews.length}</span>
    </h2>

    <ReviewsList
      reviews={reviews}
    />

    <FormReview />
  </section>
);

export default PropertyReviews;
