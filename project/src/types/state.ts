import { AuthorizationStatus, City } from '../const';
import { store } from '../store';
import { Offer, Offers } from './offers';
import { Reviews } from './reviews';

export type UserProcess = {
  authorizationStatus: AuthorizationStatus
};

export type AppProcess = {
  activeCity: City
}

export type AppData = {
  offersList: Offers,
  isOffersListLoading: boolean,
  offer: Offer | null,
  nearOffers: Offers,
  reviews: Reviews,
  isOfferDataLoading: boolean,
}

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
