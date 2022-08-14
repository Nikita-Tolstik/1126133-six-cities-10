import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { AppData } from '../../types/state';
import { fetchNearOffersAction, fetchOfferAction, fetchOffersListAction, fetchRewiesAction, postUserReviewAction } from '../api-actions';

const initialState: AppData = {
  offersList: [],
  isOffersListLoading: true,
  offer: null,
  nearOffers: [],
  reviews: [],
  isOfferDataLoading: true,
  isReviewSending: false,
  isReviewSendSuccess: false,
};

export const appData = createSlice({
  name: NameSpace.Data,
  initialState,
  reducers: {
    setOfferDataLoadStatus: (state, action) => {
      state.isOfferDataLoading = action.payload;
    },
    resetReviewSendSuccessStatus: (state) => {
      state.isReviewSendSuccess = false;
    },
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
        state.isReviewSending = false;
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

    builder
      .addCase(postUserReviewAction.pending, (state) => {
        state.isReviewSending = true;
      })
      .addCase(postUserReviewAction.fulfilled, (state, action) => {
        if (state.offer !== null && state.offer.id === action.payload.id) {
          state.reviews = action.payload.data;
          state.isReviewSending = false;
          state.isReviewSendSuccess = true;
        }
      })
      .addCase(postUserReviewAction.rejected, (state) => {
        state.isReviewSending = false;
      });
  }
});

export const { setOfferDataLoadStatus, resetReviewSendSuccessStatus } = appData.actions;
