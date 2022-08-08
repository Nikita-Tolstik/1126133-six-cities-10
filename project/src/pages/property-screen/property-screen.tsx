import React from 'react';
import { useParams } from 'react-router-dom';
import { Offers } from '../../types/offers';
import { Reviews } from '../../types/reviews';
import { ImagePropertyCount, ButtonClass, PageCardClass } from '../../const';
import { getCountStars, capitalizeFirstLetter } from '../../utils/utils';
import { useAppSelector } from '../../hooks';
import { getOffers } from '../../store/app-data/selectors';
import Logo from '../../components/logo/logo';
import NotFoundScreen from '../not-found-screen/not-found-screen';
import PropertyImage from '../../components/property-image/property-image';
import BookmarkButton from '../../components/bookmark-button/bookmark-button';
import PropertyGoods from '../../components/property-goods/property-goods';
import OffersList from '../../components/offers-list/offers-list';
import FormReview from '../../components/form-review/form-review';
import ReviewsList from '../../components/reviews-list/reviews-list';


type PropertyScreenProps = {
  nearPlacesOffers: Offers;
  reviews: Reviews
}


const PropertyScreen: React.FC<PropertyScreenProps> = (props) => {
  const { nearPlacesOffers, reviews } = props;

  const offers = useAppSelector(getOffers);

  const { id } = useParams();
  const numId = Number(id);

  const activeOffer = offers.find((offer) => offer.id === numId);

  const isNaN = !numId;
  const isNotOffer = !activeOffer;

  if (isNaN || isNotOffer) {
    return <NotFoundScreen />;
  }

  const images = activeOffer.images.slice(ImagePropertyCount.Start, ImagePropertyCount.End);
  const starsCount = getCountStars(activeOffer.rating);
  const reviewsCount = reviews.length;
  const offerType = capitalizeFirstLetter(activeOffer.type);

  return (
    <div className="page">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Logo />
            </div>
            <nav className="header__nav">
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <a className="header__nav-link header__nav-link--profile" href="/">
                    <div className="header__avatar-wrapper user__avatar-wrapper" />
                    <span className="header__user-name user__name">Oliver.conner@gmail.com</span>
                    <span className="header__favorite-count">3</span>
                  </a>
                </li>
                <li className="header__nav-item">
                  <a className="header__nav-link" href="/">
                    <span className="header__signout">Sign out</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      <main className="page__main page__main--property">
        <section className="property">
          <div className="property__gallery-container container">
            <div className="property__gallery">

              {images.map((src) => <PropertyImage key={src} src={src} />)}

            </div>
          </div>
          <div className="property__container container">
            <div className="property__wrapper">

              <div
                className="property__mark"
                hidden={!activeOffer.isPremium}
              >
                <span>Premium</span>
              </div>

              <div className="property__name-wrapper">
                <h1 className="property__name">
                  {activeOffer.title}
                </h1>

                <BookmarkButton
                  buttonClass={ButtonClass.Property}
                  isFavorite={activeOffer.isFavorite}
                />
              </div>

              <div className="property__rating rating">
                <div className="property__stars rating__stars">
                  <span style={{ width: starsCount }}></span>
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="property__rating-value rating__value">{activeOffer.rating}</span>
              </div>

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

          <section className="property__map map"></section>
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
