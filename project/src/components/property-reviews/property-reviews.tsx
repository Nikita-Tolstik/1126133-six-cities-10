import React from 'react';
import { AuthorizationStatus } from '../../const';
import { useAppSelector } from '../../hooks';
import { getAuthorizationStatus } from '../../store/user-process/selectors';
import { Reviews } from '../../types/reviews';
import { getSortedReviews } from '../../utils/utils';
import FormReview from '../form-review/form-review';
import ReviewsList from '../reviews-list/reviews-list';

type PropertyReviewsProps = {
  offerId: number,
  reviews: Reviews
}


const PropertyReviews: React.FC<PropertyReviewsProps> = ({ offerId, reviews }) => {
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const isShowForm = authorizationStatus === AuthorizationStatus.Auth;
  const sortedReviews = getSortedReviews(reviews);

  return (
    <section className="property__reviews reviews">
      <h2 className="reviews__title">Reviews &middot;&nbsp;
        <span className="reviews__amount">{sortedReviews.length}</span>
      </h2>

      <ReviewsList
        reviews={sortedReviews}
      />

      {isShowForm && <FormReview offerId={offerId} />}
    </section>
  );
};

export default PropertyReviews;
