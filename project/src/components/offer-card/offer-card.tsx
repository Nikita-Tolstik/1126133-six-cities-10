import React, { useEffect, useRef } from 'react';
import { Offer } from '../../types/offers';
import { getCountStars, capitalizeFirstLetter } from '../../utils/utils';
import { PageCardClass, ButtonClass, ImageSize, AppRoute } from '../../const';
import { Link } from 'react-router-dom';
import BookmarkButton from '../bookmark-button/bookmark-button';


type OfferCardProps = {
  offer: Offer;
  cardClass: PageCardClass;
  onActiveCard?: (value: number | null) => void;
};

const TIMER = 500;


const OfferCard: React.FC<OfferCardProps> = (props) => {
  const { offer, cardClass, onActiveCard } = props;

  const countStars = getCountStars(offer.rating);
  const offerType = capitalizeFirstLetter(offer.type);

  const isFavoriteStyle = cardClass === PageCardClass.Favorite;
  const imageSize = isFavoriteStyle ? ImageSize.Small : ImageSize.Big;

  const timerRef = useRef<NodeJS.Timeout | undefined>(undefined);

  const handleActiveCard = () => {
    if (onActiveCard !== undefined) {
      timerRef.current = setTimeout(() => onActiveCard(offer.id), TIMER);
    }
  };

  const handleInactiveCard = () => {
    if (onActiveCard !== undefined) {
      onActiveCard(null);
      clearTimeout(timerRef.current);
    }
  };

  useEffect(
    () =>
      () =>
        clearTimeout(timerRef.current), []);

  return (
    <article
      onMouseEnter={handleActiveCard}
      onMouseLeave={handleInactiveCard}
      className={`${cardClass}__card place-card`}
    >

      <div
        className="place-card__mark"
        hidden={!offer.isPremium}
      >
        <span>Premium</span>
      </div>

      <div className={`${cardClass}__image-wrapper place-card__image-wrapper`}>
        <a style={{ pointerEvents: 'none' }} href="/">
          <img
            className="place-card__image"
            src={offer.previewImage}
            width={imageSize.width}
            height={imageSize.height}
            alt={offer.title}
          />
        </a>
      </div>

      <div
        className={`place-card__info ${isFavoriteStyle ? 'favorites__card-info' : ''}`}
      >
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{offer.price}&nbsp;</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>

          <BookmarkButton
            buttonClass={ButtonClass.OfferCard}
            isFavorite={offer.isFavorite}
          />

        </div>

        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">

            <span style={{ width: countStars }} />

            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">

          <Link
            to={`${AppRoute.Property}/${offer.id}`}
          >
            {offer.title}
          </Link>

        </h2>
        <p className="place-card__type">{offerType}</p>
      </div>
    </article>
  );
};

export default OfferCard;
