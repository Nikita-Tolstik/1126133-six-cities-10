import React from 'react';
import { ButtonClass, ButtonSize } from '../../const';

type FavoriteButtonProps = {
  buttonClass: ButtonClass,
  isFavorite: boolean;
}


const FavoriteButton: React.FC<FavoriteButtonProps> = ({ buttonClass, isFavorite }) => {
  const buttonSize = buttonClass === ButtonClass.OfferCard ? ButtonSize.Small : ButtonSize.Big;

  return (
    <button
      className={`${buttonClass}__bookmark-button button ${isFavorite ? `${buttonClass}__bookmark-button--active` : ''}`}
      type="button"
    >
      <svg
        className="place-card__bookmark-icon"
        width={buttonSize.width}
        height={buttonSize.height}
      >
        <use xlinkHref="#icon-bookmark"></use>
      </svg>
      <span className="visually-hidden">To bookmarks</span>
    </button>
  );
};


export default FavoriteButton;
