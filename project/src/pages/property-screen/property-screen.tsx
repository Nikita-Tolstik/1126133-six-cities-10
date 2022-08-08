import React from 'react';
import { useParams } from 'react-router-dom';
import { Offers } from '../../types/offers';
import { Reviews } from '../../types/reviews';
import { ComponentClass, PageCardClass, MapClass } from '../../const';
import { useAppSelector } from '../../hooks';
import { getOffers } from '../../store/app-data/selectors';
import { getActiveCity } from '../../store/app-process/selectors';
import NotFoundScreen from '../not-found-screen/not-found-screen';
import FavoriteButton from '../../components/favorite-button/favorite-button';
import PropertyGoods from '../../components/property-goods/property-goods';
import OffersList from '../../components/offers-list/offers-list';
import Map from '../../components/map/map';
import ImagesList from '../../components/images-list/images-list';
import Header from '../../components/header/header';
import OfferRating from '../../components/offer-rating/offer-rating';
import PremiumMark from '../../components/premium-mark/premium-mark';
import PropertyFeatures from '../../components/property-features/property-features';
import PropertyHost from '../../components/property-host/property-host';
import PropertyReviews from '../../components/property-reviews/property-reviews';


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

              <PropertyFeatures offer={activeOffer} />

              <div className="property__price">
                <b className="property__price-value">&euro;{activeOffer.price}</b>
                <span className="property__price-text">&nbsp;night</span>
              </div>

              <PropertyGoods goods={activeOffer.goods} />

              <PropertyHost offer={activeOffer} />

              <PropertyReviews reviews={reviews} />

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
