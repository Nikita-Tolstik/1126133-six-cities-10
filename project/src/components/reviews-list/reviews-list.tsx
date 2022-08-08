import React, { Fragment } from 'react';
import { Reviews } from '../../types/reviews';
import UserReview from '../user-review/user-review';

type ReviewsListProps = {
  reviews: Reviews;
}

const ReviewsList: React.FC<ReviewsListProps> = ({ reviews }) => (
  <ul className="reviews__list">
    {reviews.map((review) => (
      <Fragment key={review.id}>
        <UserReview
          review={review}
        />
      </Fragment>)
    )}
  </ul>
);

export default ReviewsList;
