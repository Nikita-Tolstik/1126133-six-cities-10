import React from 'react';
import classNames from 'classnames';
import { useAppSelector } from '../../hooks';
import { getFavoriteList } from '../../store/favorite/selectors';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import FavoriteOffers from '../../components/favorite-list/favorite-list';
import FavoriteOffersEmpty from '../../components/favorite-offers-empty/favorite-offers-empty';


const FavoriteScreen: React.FC = () => {
  const favoriteList = useAppSelector(getFavoriteList);
  const IsEmptyFavoriteOffers = !favoriteList.length;

  const divClass = classNames('page', {
    'page--favorites-empty': IsEmptyFavoriteOffers
  });

  const mainClass = classNames('page__main page__main--favorites', {
    'page__main--favorites-empty': IsEmptyFavoriteOffers
  });

  const sectionClass = classNames('favorites favorites__section', {
    'favorites--empty': IsEmptyFavoriteOffers
  });


  return (
    <div className={divClass}>
      <Header />
      <main className={mainClass}>
        <div className="page__favorites-container container">
          <section className={sectionClass}>

            {IsEmptyFavoriteOffers ? <FavoriteOffersEmpty /> : <FavoriteOffers />}

          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};


export default FavoriteScreen;
