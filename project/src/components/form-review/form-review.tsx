import React, { ChangeEvent, MouseEvent, useEffect, useState } from 'react';
import { ButtonName, TextLength } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { postUserReviewAction } from '../../store/api-actions';
import { resetReviewSendSuccessStatus } from '../../store/app-data/app-data';
import { getReviewSendStatus, getReviewSendSuccessStatus } from '../../store/app-data/selectors';
import { ReviewData } from '../../types/app-data';
import { CommentForm } from '../../types/reviews';
import FormRatingInput from '../form-rating-input/form-rating-input';

type FormReviewProps = {
  offerId: number,
}


const FormReview: React.FC<FormReviewProps> = ({ offerId }) => {
  const [review, setReview] = useState<CommentForm>({ rating: null, comment: '' });

  const dispatch = useAppDispatch();

  const isReviewSending = useAppSelector(getReviewSendStatus);
  const isReviewSendSuccess = useAppSelector(getReviewSendSuccessStatus);

  const isDisabledBtn = review.rating === null || review.comment.length < TextLength.Min || isReviewSending;
  const buttonName = isReviewSending ? ButtonName.Sending : ButtonName.Submit;

  useEffect(() => {
    if (isReviewSendSuccess) {
      setReview({ rating: null, comment: '' });
      dispatch(resetReviewSendSuccessStatus());
    }
  }, [isReviewSendSuccess, dispatch]);

  const onSubmit = (reviewData: ReviewData) => {
    dispatch(postUserReviewAction(reviewData));
  };

  const handleSubmit = (evt: MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();

    if (review.rating) {
      onSubmit({
        id: offerId,
        rating: review.rating,
        comment: review.comment
      });
    }
  };

  return (
    <form className="reviews__form form" action="#" method="post">
      <label className="reviews__label form__label" htmlFor="review">Your review</label>

      <div
        onChange={({ target }: ChangeEvent<HTMLInputElement>) => {

          setReview({
            ...review,
            rating: Number(target.value),
          });
        }}
        className="reviews__rating-form form__rating"
      >
        <FormRatingInput isDisabled={isReviewSending} rating={review.rating} />
      </div>

      <textarea
        onChange={({ target }: ChangeEvent<HTMLTextAreaElement>) => {
          setReview({
            ...review,
            comment: target.value,
          });
        }}
        value={review.comment}
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        minLength={TextLength.Min}
        maxLength={TextLength.Max}
        disabled={isReviewSending}
      >
      </textarea>

      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe your
          stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>

        <button
          onClick={handleSubmit}
          disabled={isDisabledBtn}
          className="reviews__submit form__submit button"
          type="submit"
        >
          {buttonName}
        </button>
      </div>
    </form >
  );
};

export default FormReview;
