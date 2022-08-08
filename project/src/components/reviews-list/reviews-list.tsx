import React from 'react';
import { Reviews } from '../../types/reviews';
import UserReview from '../user-review/user-review';

type ReviewsListProps = {
  reviews: Reviews;
}

const MAX_COMMENT = 10;

const ReviewsList: React.FC<ReviewsListProps> = ({ reviews }) => {
  const orderedReviews = reviews.sort((a, b) => Date.parse(b.date) - Date.parse(a.date));
  const limitReviews = orderedReviews.length > MAX_COMMENT ? orderedReviews.slice(0, MAX_COMMENT) : orderedReviews;

  return (
    <ul className="reviews__list">
      {limitReviews.map((review) => (
        <UserReview
          key={review.id}
          review={review}
        />)
      )}
    </ul>
  );
};

export default ReviewsList;
