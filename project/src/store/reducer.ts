
import { createReducer } from '@reduxjs/toolkit';
import { City } from '../const';
import { InitialState } from '../types/state';
import { changeCity, loadOffers } from './action';

const initialState: InitialState = {
  activeCity: City.Paris,
  offers: []
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.activeCity = action.payload;
    })
    .addCase(loadOffers, (state, action) => {
      state.offers = action.payload;
    });
});
