import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from '../const';
import { appData } from './app-data/app-data';
import { appProcess } from './app-process/app-process';
import { favoriteData } from './favorite-data/favorite-data';
import { userProcess } from './user-process/user-process';


export const rootReducer = combineReducers({
  [NameSpace.App]: appProcess.reducer,
  [NameSpace.Data]: appData.reducer,
  [NameSpace.Favorite]: favoriteData.reducer,
  [NameSpace.User]: userProcess.reducer,
});
