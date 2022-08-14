import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { AppData } from '../../types/state';
import { fetchNearOffersAction, fetchOfferAction, fetchOffersListAction, fetchRewiesAction } from '../api-actions';

const initialState: AppData = {
  offersList: [],
  isOffersListLoading: true,
  offer: null,
  nearOffers: [],
  reviews: [],
  isOfferDataLoading: true,
};

export const appData = createSlice({
  name: NameSpace.Data,
  initialState,
  reducers: {
    setOfferDataLoadStatus: (state, action) => {
      state.isOfferDataLoading = action.payload;
    }
  },
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
        state.isOfferDataLoading = true;
        state.offer = null;
      })
      .addCase(fetchOfferAction.fulfilled, (state, action) => {
        state.offer = action.payload;
      });

    builder
      .addCase(fetchNearOffersAction.pending, (state) => {
        state.nearOffers = [];
      })
      .addCase(fetchNearOffersAction.fulfilled, (state, action) => {
        state.nearOffers = action.payload;
      });

    builder
      .addCase(fetchRewiesAction.pending, (state) => {
        state.reviews = [];
      })
      .addCase(fetchRewiesAction.fulfilled, (state, action) => {
        state.reviews = action.payload;
      });
  }
});

export const { setOfferDataLoadStatus } = appData.actions;
