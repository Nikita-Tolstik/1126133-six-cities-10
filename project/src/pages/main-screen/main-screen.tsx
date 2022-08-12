import React from 'react';
import classNames from 'classnames';
import { useAppSelector } from '../../hooks';
import { getIsEmptyOffers } from '../../store/app-data/selectors';
import Header from '../../components/header/header';
import CitiesTabs from '../../components/cities-tabs/cities-tabs';
import MainOffers from '../../components/main-offers/main-offers';
import MainOffersEmpty from '../../components/main-offers-empty/main-offers-empty';


const MainScreen: React.FC = () => {
  const isEmptyOffers = useAppSelector(getIsEmptyOffers);

  const mainClass = classNames('page__main page__main--index', {
    'page__main--index-empty': isEmptyOffers
  });

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
