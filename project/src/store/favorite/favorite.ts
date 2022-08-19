import { createSlice } from '@reduxjs/toolkit';
import { fetchFavoriteListAction, logoutAction } from '../api-actions';
import { NameSpace } from '../../const';
import { Favorite } from '../../types/state';

const initialState: Favorite = {
  favoriteList: [],
  isDataLoading: true
};

export const favorite = createSlice({
  name: NameSpace.Favorite,
  initialState,
  reducers: {
    resetFavoriteList: (state) => {
      state.favoriteList = [];
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchFavoriteListAction.pending, (state) => {
        state.isDataLoading = true;
      })
      .addCase(fetchFavoriteListAction.fulfilled, (state, action) => {
        state.isDataLoading = false;
        state.favoriteList = action.payload;
      })
      .addCase(fetchFavoriteListAction.rejected, (state) => {
        state.isDataLoading = false;
      });

    builder
      .addCase(logoutAction.fulfilled, (state) => {
        state.favoriteList = [];
      });
  }
});

export const { resetFavoriteList } = favorite.actions;
