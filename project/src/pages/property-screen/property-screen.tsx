import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ComponentClass, PageCardClass, MapClass } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getOfferDataLoadStatus, getOffer, getNearOffers, getReviews } from '../../store/app-data/selectors';
import { getActiveCity } from '../../store/app-process/selectors';
import { fetchNearOffersAction, fetchOfferAction, fetchRewiesAction } from '../../store/api-actions';
import { setOfferDataLoadStatus } from '../../store/app-data/app-data';
import NotFoundScreen from '../not-found-screen/not-found-screen';
import FavoriteButton from '../../components/favorite-button/favorite-button';
import PropertyGoods from '../../components/property-goods/property-goods';
import OffersList from '../../components/offers-list/offers-list';
import Map from '../../components/map/map';
import ImagesList from '../../components/images-list/images-list';
import Header from '../../components/header/header';
import RatingBlock from '../../components/rating-block/rating-block';
import PremiumMark from '../../components/premium-mark/premium-mark';
import PropertyFeatures from '../../components/property-features/property-features';
import PropertyHost from '../../components/property-host/property-host';
import PropertyReviews from '../../components/property-reviews/property-reviews';
import LoadingScreen from '../loading-screen/loading-screen';


const PropertyScreen: React.FC = () => {

  const dispatch = useAppDispatch();
  const { id } = useParams();

  useEffect(() => {
    const promiseOffer = dispatch(fetchOfferAction(id));
    const promiseNearOffers = dispatch(fetchNearOffersAction(id));
    const promiseReviews = dispatch(fetchRewiesAction(id));

    Promise.allSettled([promiseOffer, promiseNearOffers, promiseReviews])
      .then(() => dispatch(setOfferDataLoadStatus(false)));

    return () => {
      promiseOffer.abort();
      promiseNearOffers.abort();
      promiseReviews.abort();
    };
  }, [id, dispatch]);

  const activeCity = useAppSelector(getActiveCity);
  const activeOffer = useAppSelector(getOffer);
  const nearOffers = useAppSelector(getNearOffers);
  const reviews = useAppSelector(getReviews);

  const isDataLoading = useAppSelector(getOfferDataLoadStatus);
  const isNotFoundOffer = activeOffer === null;

  if (isDataLoading) {
    return <LoadingScreen />;
  }

  if (isNotFoundOffer) {
    return <NotFoundScreen />;
  }

  const offersList = [activeOffer, ...nearOffers];

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

              <RatingBlock
                rating={activeOffer.rating}
                componentClass={ComponentClass.Property}
              />

              <PropertyFeatures offer={activeOffer} />

              <div className="property__price">
                <b className="property__price-value">&euro;{activeOffer.price}</b>
                <span className="property__price-text">&nbsp;night</span>
              </div>

              <PropertyGoods goods={activeOffer.goods} />

              <PropertyHost offer={activeOffer} />

              <PropertyReviews offerId={activeOffer.id} reviews={reviews} />

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
                offers={nearOffers}
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
