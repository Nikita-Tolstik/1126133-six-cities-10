import { createSlice } from '@reduxjs/toolkit';
import { fetchFavoriteListAction, logoutAction, postUserFavoriteAction } from '../api-actions';
import { NameSpace } from '../../const';
import { Favorite } from '../../types/state';

const initialState: Favorite = {
  favoriteList: [],
  isDataLoading: true
};

export const favoriteData = createSlice({
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
        state.favoriteList = [];
      })
      .addCase(fetchFavoriteListAction.fulfilled, (state, action) => {
        state.isDataLoading = false;
        state.favoriteList = action.payload;
      })
      .addCase(fetchFavoriteListAction.rejected, (state) => {
        state.isDataLoading = false;
      });

    builder
      .addCase(postUserFavoriteAction.fulfilled, (state, action) => {
        const favoriteOffer = state.favoriteList.find((favorite) => favorite.id === action.payload.id);

        if (favoriteOffer) {
          const newFavoriteList = state.favoriteList.filter((favorite) => favorite.id !== action.payload.id);

          state.favoriteList = newFavoriteList;
        } else {
          state.favoriteList.push(action.payload);
        }
      });

    builder
      .addCase(logoutAction.fulfilled, (state) => {
        state.favoriteList = [];
      });
  }
});

export const { resetFavoriteList } = favoriteData.actions;
