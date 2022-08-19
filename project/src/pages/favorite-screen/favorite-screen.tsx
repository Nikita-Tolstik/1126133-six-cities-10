import React from 'react';
import { Offers } from '../../types/offers';
import classNames from 'classnames';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import FavoriteOffers from '../../components/favorite-offers/favorite-offers';
import FavoriteOffersEmpty from '../../components/favorite-offers-empty/favorite-offers-empty';

type FavoriteScreenProps = {
  offers: Offers
}

const FavoriteScreen: React.FC<FavoriteScreenProps> = ({ offers }) => {
  const IsEmptyFavoriteOffers = !offers.length;

  const divClass = classNames('page', {
    'page--favorites-empty': IsEmptyFavoriteOffers
  });

  const mainClass = classNames('page__main page__main--favorites', {
    'page__main--favorites-empty': IsEmptyFavoriteOffers
  });

  const sectionClass = classNames('favorites', {
    'favorites--empty': IsEmptyFavoriteOffers
  });


  return (
    <div className={divClass}>
      <Header />
      <main className={mainClass}>
        <div className="page__favorites-container container">
          <section className={sectionClass}>

            {IsEmptyFavoriteOffers ? <FavoriteOffersEmpty /> : <FavoriteOffers offers={offers} />}

          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};


export default FavoriteScreen;
