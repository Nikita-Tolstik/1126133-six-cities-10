import React from 'react';
import { Offers } from '../../types/offers';
import { PageCardClass } from '../../const';
import FavoriteOffersList from '../../components/favorite-offers-list/favorite-offers-list';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';

type FavoriteScreenProps = {
  offers: Offers
}

const FavoriteScreen: React.FC<FavoriteScreenProps> = ({ offers }) => (
  <div className="page">
    <Header />
    <main className="page__main page__main--favorites">
      <div className="page__favorites-container container">
        <section className="favorites">
          <h1 className="favorites__title">Saved listing</h1>
          <ul className="favorites__list">
            <FavoriteOffersList
              offers={offers}
              cardClass={PageCardClass.Favorite}
            />
          </ul>
        </section>
      </div>
    </main>
    <Footer />
  </div>
);


export default FavoriteScreen;
