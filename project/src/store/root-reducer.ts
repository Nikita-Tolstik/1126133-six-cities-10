import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from '../const';
import { appData } from './app-data/app-data';
import { appProcess } from './app-process/app-process';
import { favorite } from './favorite/favorite';
import { userProcess } from './user-process/user-process';


export const rootReducer = combineReducers({
  [NameSpace.App]: appProcess.reducer,
  [NameSpace.Data]: appData.reducer,
  [NameSpace.Favorite]: favorite.reducer,
  [NameSpace.User]: userProcess.reducer,
});
