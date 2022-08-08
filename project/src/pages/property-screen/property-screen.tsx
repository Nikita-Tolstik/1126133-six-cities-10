import React from 'react';
import { useParams } from 'react-router-dom';
import { Offers } from '../../types/offers';
import { Reviews } from '../../types/reviews';
import { ComponentClass, PageCardClass, MapClass } from '../../const';
import { capitalizeFirstLetter } from '../../utils/utils';
import { useAppSelector } from '../../hooks';
import { getOffers } from '../../store/app-data/selectors';
import { getActiveCity } from '../../store/app-process/selectors';
import NotFoundScreen from '../not-found-screen/not-found-screen';
import FavoriteButton from '../../components/favorite-button/favorite-button';
import PropertyGoods from '../../components/property-goods/property-goods';
import OffersList from '../../components/offers-list/offers-list';
import FormReview from '../../components/form-review/form-review';
import ReviewsList from '../../components/reviews-list/reviews-list';
import Map from '../../components/map/map';
import ImagesList from '../../components/images-list/images-list';
import Header from '../../components/header/header';
import OfferRating from '../../components/offer-rating/offer-rating';
import PremiumMark from '../../components/premium-mark/premium-mark';


type PropertyScreenProps = {
  nearPlacesOffers: Offers;
  reviews: Reviews
}


const PropertyScreen: React.FC<PropertyScreenProps> = (props) => {
  const { nearPlacesOffers, reviews } = props;

  const activeCity = useAppSelector(getActiveCity);
  const offers = useAppSelector(getOffers);

  const { id } = useParams();
  const numId = Number(id);

  const activeOffer = offers.find((offer) => offer.id === numId);

  const isNaN = !numId;
  const isNotOffer = !activeOffer;

  if (isNaN || isNotOffer) {
    return <NotFoundScreen />;
  }

  const reviewsCount = reviews.length;
  const offerType = capitalizeFirstLetter(activeOffer.type);
  const offersList = [activeOffer, ...nearPlacesOffers];

  return (
    <div className="page">

      <Header />

      <main className="page__main page__main--property">
        <section className="property">
          <div className="property__gallery-container container">

            <ImagesList imagesList={activeOffer.images} />

          </div>
          <div className="property__container container">
            <div className="property__wrapper">

              <PremiumMark
                isPremium={activeOffer.isPremium}
                componentClass={ComponentClass.Property}
              />

              <div className="property__name-wrapper">
                <h1 className="property__name">
                  {activeOffer.title}
                </h1>

                <FavoriteButton
                  buttonClass={ComponentClass.Property}
                  isFavorite={activeOffer.isFavorite}
                />
              </div>

              <OfferRating
                offer={activeOffer}
                componentClass={ComponentClass.Property}
              />

              <ul className="property__features">
                <li className="property__feature property__feature--entire">
                  {offerType}
                </li>
                <li className="property__feature property__feature--bedrooms">
                  {`${activeOffer.bedrooms} Bedrooms`}
                </li>
                <li className="property__feature property__feature--adults">
                  {`Max ${activeOffer.maxAdults} adults`}
                </li>
              </ul>
              <div className="property__price">
                <b className="property__price-value">&euro;{activeOffer.price}</b>
                <span className="property__price-text">&nbsp;night</span>
              </div>

              <PropertyGoods goods={activeOffer.goods} />

              <div className="property__host">
                <h2 className="property__host-title">Meet the host</h2>
                <div className="property__host-user user">
                  <div className="property__avatar-wrapper property__avatar-wrapper--pro user__avatar-wrapper">
                    <img className="property__avatar user__avatar" src={activeOffer.host.avatarUrl} width="74" height="74"
                      alt="Host avatar"
                    />
                  </div>
                  <span className="property__user-name">
                    {activeOffer.host.name}
                  </span>
                  <span className="property__user-status">
                    {activeOffer.host.isPro ? 'Pro' : ''}
                  </span>
                </div>
                <div className="property__description">
                  <p className="property__text">
                    {activeOffer.description}
                  </p>
                </div>
              </div>


              <section className="property__reviews reviews">
                <h2 className="reviews__title">Reviews &middot;&nbsp;
                  <span className="reviews__amount">{reviewsCount}</span>
                </h2>

                <ReviewsList
                  reviews={reviews}
                />

                <FormReview />
              </section>


            </div>
          </div>

          <Map
            activeCity={activeCity}
            activeCityOffers={offersList}
            activeCardId={activeOffer.id}
            mapClass={MapClass.Property}
          />
        </section>


        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <div className="near-places__list places__list">

              <OffersList
                offers={nearPlacesOffers}
                cardClass={PageCardClass.Property}
              />

            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default PropertyScreen;
