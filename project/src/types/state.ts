import { AuthorizationStatus } from '../const';
import { store } from '../store';
import { Offers } from './offers';

export type UserProcess = {
  authorizationStatus: AuthorizationStatus
};

export type AppData = {
  offers: Offers,
  isDataLoaded: boolean
}

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
