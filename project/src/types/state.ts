import { City } from '../const';
import { store } from '../store';
import { Offers } from './offers';

export type InitialState = {
  activeCity: City;
  offers: Offers;
}

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
