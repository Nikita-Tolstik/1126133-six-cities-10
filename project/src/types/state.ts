import { City } from '../const';
import { store } from '../store';
import { Offers } from './offers';

// Правильно ли описал тип таким образом ?
export type InitialState = {
  activeCity: City;
  offers: Offers;
}

// Если я уже описал тип InitialState, то уже нет смысла использовать ReturnType ?
export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
