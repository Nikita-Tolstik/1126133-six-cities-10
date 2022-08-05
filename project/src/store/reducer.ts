
import { createReducer } from '@reduxjs/toolkit';
import { City } from '../const';
import { Offers } from '../types/offers';
import { changeCity } from './action';

export type InitialState = {
  activeCity: City;
  offers: Offers;
  isDataLoaded: boolean;
}

const initialState: InitialState = {
  activeCity: City.Paris,
  offers: [],
  isDataLoaded: true,
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.activeCity = action.payload;
    });
});
