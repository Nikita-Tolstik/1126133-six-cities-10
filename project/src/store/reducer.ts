
import { createReducer } from '@reduxjs/toolkit';
import { AuthorizationStatus, City } from '../const';
import { Offers } from '../types/offers';
import { changeCity, loadOffers, setAuthorizationStatus, setDataLoadedStatus } from './action';

export type InitialState = {
  activeCity: City;
  offers: Offers;
  authorizationStatus: AuthorizationStatus;
  isDataLoaded: boolean;
}

const initialState: InitialState = {
  activeCity: City.Paris,
  offers: [],
  authorizationStatus: AuthorizationStatus.Unknown,
  isDataLoaded: true,
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.activeCity = action.payload;
    })
    .addCase(loadOffers, (state, action) => {
      state.offers = action.payload;
    })
    .addCase(setDataLoadedStatus, (state, action) => {
      state.isDataLoaded = action.payload;
    })
    .addCase(setAuthorizationStatus, (state, action) => {
      state.authorizationStatus = action.payload;
    });
});
