import { useParams } from 'react-router-dom';
import { Offers } from '../../types/offers';
import { Reviews } from '../../types/reviews';
import { ImagePropertyCount, ButtonClass, PageCardClass } from '../../const';
import { getCountStars, capitalizeFirstLetter } from '../../utils/utils';
import Logo from '../../components/logo/logo';
import NotFoundScreen from '../not-found-screen/not-found-screen';
import PropertyImage from '../../components/property-image/property-image';
import BookmarkButton from '../../components/bookmark-button/bookmark-button';
import PropertyGoods from '../../components/property-goods/property-goods';
import OffersList from '../../components/offers-list/offers-list';
import UserReview from '../../components/user-review/user-review';
import FormReview from '../../components/form-review/form-review';


type PropertyScreenProps = {
  offers: Offers;
  nearPlacesOffers: Offers;
  reviews: Reviews
}

function PropertyScreen({ offers, nearPlacesOffers, reviews }: PropertyScreenProps): JSX.Element {
  const { id } = useParams();
  const numId = Number(id);
  const offer = offers.find((item) => item.id === numId);
  const isNaN = !numId;
  const isNotOffer = !offer;

  if (isNaN || isNotOffer) {
    return <NotFoundScreen />;
  }

  const images = offer.images.slice(ImagePropertyCount.Start, ImagePropertyCount.End);
  const countStars = getCountStars(offer.rating);
  const offerType = capitalizeFirstLetter(offer.type);

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
                hidden={!offer.isPremium}
              >
                <span>Premium</span>
              </div>

              <div className="property__name-wrapper">
                <h1 className="property__name">
                  {offer.title}
                </h1>

                <BookmarkButton
                  buttonClass={ButtonClass.Property}
                  isFavorite={offer.isFavorite}
                />
              </div>

              <div className="property__rating rating">
                <div className="property__stars rating__stars">
                  <span style={{ width: countStars }}></span>
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="property__rating-value rating__value">{offer.rating}</span>
              </div>

              <ul className="property__features">
                <li className="property__feature property__feature--entire">
                  {offerType}
                </li>
                <li className="property__feature property__feature--bedrooms">
                  {`${offer.bedrooms} Bedrooms`}
                </li>
                <li className="property__feature property__feature--adults">
                  {`Max ${offer.maxAdults} adults`}
                </li>
              </ul>
              <div className="property__price">
                <b className="property__price-value">&euro;{offer.price}</b>
                <span className="property__price-text">&nbsp;night</span>
              </div>

              <PropertyGoods goods={offer.goods} />

              <div className="property__host">
                <h2 className="property__host-title">Meet the host</h2>
                <div className="property__host-user user">
                  <div className="property__avatar-wrapper property__avatar-wrapper--pro user__avatar-wrapper">
                    <img className="property__avatar user__avatar" src={offer.host.avatarUrl} width="74" height="74"
                      alt="Host avatar"
                    />
                  </div>
                  <span className="property__user-name">
                    {offer.host.name}
                  </span>
                  <span className="property__user-status">
                    {offer.host.isPro ? 'Pro' : ''}
                  </span>
                </div>
                <div className="property__description">
                  <p className="property__text">
                    {offer.description}
                  </p>
                </div>
              </div>


              <section className="property__reviews reviews">
                <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">1</span></h2>
                <ul className="reviews__list">

                  <UserReview
                    reviews={reviews}
                  />

                </ul>

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
}

export default PropertyScreen;
