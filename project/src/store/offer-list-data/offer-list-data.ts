import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { OfferListData } from '../../types/state';
import { getInitialOffersList, getNewOffersList } from '../../utils/utils';
import { fetchOffersListAction, logoutAction, postUserFavoriteAction } from '../api-actions';

const initialState: OfferListData = {
  offersList: [],
  isOffersListLoading: true,
};

export const offerListData = createSlice({
  name: NameSpace.OfferList,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchOffersListAction.pending, (state) => {
        state.isOffersListLoading = true;
      })
      .addCase(fetchOffersListAction.fulfilled, (state, action) => {
        state.offersList = action.payload;
        state.isOffersListLoading = false;
      })
      .addCase(fetchOffersListAction.rejected, (state) => {
        state.isOffersListLoading = false;
      });

    builder
      .addCase(postUserFavoriteAction.fulfilled, (state, action) => {
        const newOffersList = getNewOffersList(state.offersList, action.payload);
        state.offersList = newOffersList;
      });

    builder
      .addCase(logoutAction.pending, (state) => {
        state.isOffersListLoading = true;
      })
      .addCase(logoutAction.fulfilled, (state) => {
        state.isOffersListLoading = false;
        state.offersList = getInitialOffersList(state.offersList);
      })
      .addCase(logoutAction.rejected, (state) => {
        state.isOffersListLoading = false;
      });
  }
});
