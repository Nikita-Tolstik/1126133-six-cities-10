import React, { useEffect, useRef } from 'react';
import classNames from 'classnames';
import { Offer } from '../../types/offers';
import { capitalizeFirstLetter } from '../../utils/utils';
import { PageCardClass, ComponentClass, ImageSize, AppRoute, Timer } from '../../const';
import { Link } from 'react-router-dom';
import FavoriteButton from '../favorite-button/favorite-button';
import RatingBlock from '../rating-block/rating-block';
import PremiumMark from '../premium-mark/premium-mark';

type OfferCardProps = {
  offer: Offer;
  cardClass: PageCardClass;
  onActiveCard?: (value: number | null) => void;
};


const OfferCard: React.FC<OfferCardProps> = (props) => {
  const { offer, cardClass, onActiveCard } = props;

  const offerType = capitalizeFirstLetter(offer.type);

  const isFavoriteStyle = cardClass === PageCardClass.Favorite;
  const imageSize = isFavoriteStyle ? ImageSize.Small : ImageSize.Big;

  const cardInfoClass = classNames('place-card__info', {
    'favorites__card-info': isFavoriteStyle
  });

  const timerRef = useRef<NodeJS.Timeout | undefined>(undefined);

  const handleActiveCard = () => {
    if (onActiveCard !== undefined) {
      timerRef.current = setTimeout(() => onActiveCard(offer.id), Timer.OfferCard);
    }
  };

  const handleInactiveCard = () => {
    if (onActiveCard !== undefined) {
      onActiveCard(null);
      clearTimeout(timerRef.current);
      timerRef.current = undefined;
    }
  };

  useEffect(
    () =>
      () => {
        if (timerRef.current) {
          clearTimeout(timerRef.current);
        }
      }, []);

  return (
    <article
      onMouseEnter={handleActiveCard}
      onMouseLeave={handleInactiveCard}
      className={`${cardClass}__card place-card`}
    >

      <PremiumMark
        isPremium={offer.isPremium}
        componentClass={ComponentClass.OfferCard}
      />

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

      <div className={cardInfoClass}>
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{offer.price}&nbsp;</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>

          <FavoriteButton
            buttonClass={ComponentClass.OfferCard}
            isFavorite={offer.isFavorite}
          />

        </div>

        <RatingBlock
          rating={offer.rating}
          componentClass={ComponentClass.OfferCard}
        />

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
