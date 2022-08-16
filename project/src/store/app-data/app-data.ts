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
  errorMessage: null,
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
    clearErrorMessage: (state) => {
      state.errorMessage = null;
    },
    clearOfferPageData: (state) => {
      state.offer = null;
      state.isOfferDataLoading = true;
      state.nearOffers = [];
      state.reviews = [];
      state.errorMessage = null;
      state.isReviewSending = false;
      state.isReviewSendSuccess = false;
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
      })
      .addCase(fetchOfferAction.fulfilled, (state, action) => {
        state.offer = action.payload;
      });

    builder
      .addCase(fetchNearOffersAction.fulfilled, (state, action) => {
        state.nearOffers = action.payload;
      });

    builder
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
      .addCase(postUserReviewAction.rejected, (state, action) => {
        state.isReviewSending = false;
        if (action.error.message) {
          state.errorMessage = action.error.message;
        }
      });
  }
});

export const {
  setOfferDataLoadStatus,
  resetReviewSendSuccessStatus,
  clearErrorMessage,
  clearOfferPageData
} = appData.actions;
