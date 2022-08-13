import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { AppData } from '../../types/state';
import { fetchNearOffers, fetchOfferAction, fetchOffersListAction } from '../api-actions';

const initialState: AppData = {
  offersList: [],
  isOffersListLoading: true,
  offer: null,
  isOfferLoading: true,
  nearOffers: [],
};

export const appData = createSlice({
  name: NameSpace.Data,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchOffersListAction.fulfilled, (state, action) => {
        state.offersList = action.payload;
        state.isOffersListLoading = false;
      })
      .addCase(fetchOffersListAction.rejected, (state) => {
        state.isOffersListLoading = false;
      });

    builder
      .addCase(fetchOfferAction.pending, (state) => {
        state.isOfferLoading = true;
        state.offer = null;
      })
      .addCase(fetchOfferAction.fulfilled, (state, action) => {
        state.offer = action.payload;
        state.isOfferLoading = false;
      })
      .addCase(fetchOfferAction.rejected, (state) => {
        state.isOfferLoading = false;
      });

    builder
      .addCase(fetchNearOffers.pending, (state) => {
        state.nearOffers = [];
      })
      .addCase(fetchNearOffers.fulfilled, (state, action) => {
        state.nearOffers = action.payload;
      });
  }
});
