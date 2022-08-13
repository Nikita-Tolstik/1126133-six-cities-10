import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { AppData } from '../../types/state';
import { fetchOffersListAction } from '../api-actions';

const initialState: AppData = {
  offers: [],
  isDataLoaded: false,
};
export const appData = createSlice({
  name: NameSpace.Data,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchOffersListAction.pending, (state) => {
        state.isDataLoaded = true;
      })
      .addCase(fetchOffersListAction.fulfilled, (state, action) => {
        state.offers = action.payload;
        state.isDataLoaded = false;
      })
      .addCase(fetchOffersListAction.rejected, (state) => {
        state.isDataLoaded = false;
      });
  }
});
