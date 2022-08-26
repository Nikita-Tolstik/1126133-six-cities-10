import React from 'react';
import { Reviews } from '../../types/reviews';
import UserReview from '../user-review/user-review';

type ReviewsListProps = {
  reviews: Reviews
}


const ReviewsList: React.FC<ReviewsListProps> = ({ reviews }) => (
  <ul className="reviews__list">
    {reviews.map((review) => (
      <UserReview
        key={review.id}
        review={review}
      />)
    )}
  </ul>
);

export default ReviewsList;
