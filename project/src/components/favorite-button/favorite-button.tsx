import React from 'react';
import { ComponentClass, ButtonSize } from '../../const';

type FavoriteButtonProps = {
  buttonClass: ComponentClass,
  isFavorite: boolean;
}


const FavoriteButton: React.FC<FavoriteButtonProps> = ({ buttonClass, isFavorite }) => {
  const buttonSize = buttonClass === ComponentClass.OfferCard ? ButtonSize.Small : ButtonSize.Big;

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