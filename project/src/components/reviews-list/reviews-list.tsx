import React from 'react';
import { Reviews } from '../../types/reviews';
import UserReview from '../user-review/user-review';

type ReviewsListProps = {
  reviews: Reviews;
}

const MAX_COMMENT = 10;

const ReviewsList: React.FC<ReviewsListProps> = ({ reviews }) => {
  const reviewsCopy = [...reviews];
  const sortedReviews = reviewsCopy.sort((a, b) => Date.parse(b.date) - Date.parse(a.date));
  const limitedReviews = sortedReviews.length > MAX_COMMENT ? sortedReviews.slice(0, MAX_COMMENT) : sortedReviews;

  return (
    <ul className="reviews__list">
      {limitedReviews.map((review) => (
        <UserReview
          key={review.id}
          review={review}
        />)
      )}
    </ul>
  );
};

export default ReviewsList;
