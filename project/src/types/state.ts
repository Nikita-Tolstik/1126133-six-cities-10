import { AuthorizationStatus, City } from '../const';
import { store } from '../store';
import { Offer, Offers } from './offers';

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
  isOfferLoading: boolean,
  nearOffers: Offers,
}

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
