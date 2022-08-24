import React from 'react';
import classNames from 'classnames';
import { useAppSelector } from '../../hooks';
import { getOffersListLoadStatus, getIsEmptyOffers } from '../../store/offer-list-data/selectors';
import Header from '../../components/header/header';
import CitiesTabs from '../../components/cities-tabs/cities-tabs';
import MainOffers from '../../components/main-offers/main-offers';
import MainOffersEmpty from '../../components/main-offers-empty/main-offers-empty';
import LoadingScreen from '../loading-screen/loading-screen';


const MainScreen: React.FC = () => {
  const isEmptyOffers = useAppSelector(getIsEmptyOffers);
  const isDataLoading = useAppSelector(getOffersListLoadStatus);

  const mainClass = classNames('page__main page__main--index', {
    'page__main--index-empty': isEmptyOffers
  });

  if (isDataLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="page page--gray page--main">
      <Header />

      <main className={mainClass}>
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <CitiesTabs />
          </section>
        </div>

        <div className="cities">
          {isEmptyOffers ? <MainOffersEmpty /> : <MainOffers />}
        </div>
      </main>
    </div>
  );
};

export default MainScreen;
