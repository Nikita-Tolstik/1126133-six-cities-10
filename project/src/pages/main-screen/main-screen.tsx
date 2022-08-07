import React from 'react';
import { PageCardClass } from '../../const';
import { useAppSelector } from '../../hooks';
import Header from '../../components/header/header';
import CitiesTabs from '../../components/cities-tabs/cities-tabs';
import MainOffers from '../../components/main-offers/main-offers';
import MainOffersEmpty from '../../components/main-offers-empty/main-offers-empty';
import { filterActiveCityOffers } from '../../store/app-data/selectors';
import { getActiveCity } from '../../store/app-process/selectors';


const MainScreen: React.FC = () => {

  const activeCity = useAppSelector(getActiveCity);
  const activeCityOffers = useAppSelector(filterActiveCityOffers);

  const offersCount = activeCityOffers.length;
  const isEmptyOffers = !offersCount;

  return (
    <div className="page page--gray page--main">

      <Header />

      <main
        className={`page__main page__main--index ${isEmptyOffers ? 'page__main--index-empty' : ''}`}
      >
        <h1 className="visually-hidden">Cities</h1>

        <div className="tabs">
          <section className="locations container">

            <CitiesTabs activeCity={activeCity} />

          </section>
        </div>

        <div className="cities">

          {isEmptyOffers
            ? <MainOffersEmpty activeCity={activeCity} />
            : <MainOffers offersCount={offersCount} activeCityOffers={activeCityOffers} cardClass={PageCardClass.Main} activeCity={activeCity} />}

        </div>
      </main>
    </div>
  );
};


export default MainScreen;
