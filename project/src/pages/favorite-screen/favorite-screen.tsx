import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getFavoriteList, getFavoriteLoadStatus } from '../../store/favorite-data/selectors';
import { fetchFavoriteListAction } from '../../store/api-actions';
import classNames from 'classnames';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import FavoriteList from '../../components/favorite-list/favorite-list';
import FavoriteListEmpty from '../../components/favorite-list-empty/favorite-list-empty';
import LoadingScreen from '../loading-screen/loading-screen';


const FavoriteScreen: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const promise = dispatch(fetchFavoriteListAction());

    return () => {
      promise.abort();
    };
  }, [dispatch]);

  const isDataLoading = useAppSelector(getFavoriteLoadStatus);
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

  if (isDataLoading) {
    return <LoadingScreen />;
  }


  return (
    <div className={divClass}>
      <Header />
      <main className={mainClass}>
        <div className="page__favorites-container container">
          <section className={sectionClass}>

            {IsEmptyFavoriteOffers ? <FavoriteListEmpty /> : <FavoriteList />}

          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default FavoriteScreen;
