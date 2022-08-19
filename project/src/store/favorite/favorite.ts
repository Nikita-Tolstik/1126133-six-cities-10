import { createSlice } from '@reduxjs/toolkit';
import { fetchFavoriteListAction } from '../api-actions';
import { NameSpace } from '../../const';
import { Favorite } from '../../types/state';

const initialState: Favorite = {
  favoriteList: []
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
      .addCase(fetchFavoriteListAction.fulfilled, (state, action) => {
        state.favoriteList = action.payload;
      });
  }
});

export const { resetFavoriteList } = favorite.actions;
