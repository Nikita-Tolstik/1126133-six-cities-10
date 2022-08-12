import React, { useCallback, useState } from 'react';
import { Offers } from '../../types/offers';
import { City, MapClass, PageCardClass } from '../../const';
import Map from '../map/map';
import OffersList from '../offers-list/offers-list';
import SortOptions from '../sort-options/sort-options';


type MainOffersProps = {
  offersCount: number;
  activeCityOffers: Offers;
  cardClass: PageCardClass;
  activeCity: City
}


const MainOffers: React.FC<MainOffersProps> = (props) => {
  const { offersCount, activeCityOffers, cardClass, activeCity } = props;

  const [activeCardId, setActiveCardId] = useState<number | null>(null);

  const onActiveCard = useCallback((value: number | null) => {
    setActiveCardId(value);
  }, []);

  return (
    <div className="cities__places-container container">
      <section className="cities__places places">
        <h2 className="visually-hidden">Places</h2>

        <b className="places__found">
          {offersCount} places to stay in Amsterdam
        </b>

        <SortOptions />

        <div className="cities__places-list places__list tabs__content">
          <OffersList
            offers={activeCityOffers}
            cardClass={cardClass}
            onActiveCard={onActiveCard}
          />
        </div>
      </section>

      <div className="cities__right-section">
        <Map
          activeCity={activeCity}
          activeCityOffers={activeCityOffers}
          activeCardId={activeCardId}
          mapClass={MapClass.Main}
        />
      </div>
    </div>
  );
};

export default MainOffers;
