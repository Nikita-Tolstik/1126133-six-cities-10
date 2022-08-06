import { NameSpace } from '../../const';
import { Offers } from '../../types/offers';
import { State } from '../../types/state';
import { createSelector } from '@reduxjs/toolkit';
import { getActiveCity } from '../app-process/selectors';
import { getActiveCityOffers } from '../../utils/utils';

export const getOffers = (state: State): Offers => state[NameSpace.Data].offers;
export const getDataLoadedStatus = (state: State): boolean => state[NameSpace.Data].isDataLoaded;

export const filterActiveCityOffers = createSelector(
  [getActiveCity, getOffers],
  (activeCity, offers) => getActiveCityOffers(activeCity, offers)
);
