import { NameSpace } from '../../const';
import { Offers } from '../../types/offers';
import { State } from '../../types/state';
import { createSelector } from '@reduxjs/toolkit';
import { getActiveCity } from '../app-process/selectors';
import { getActiveCityOffers } from '../../utils/utils';

export const getOffersList = (state: State): Offers => state[NameSpace.OfferList].offersList;

export const getOffersListLoadStatus = (state: State): boolean => state[NameSpace.OfferList].isOffersListLoading;

export const filterActiveCityOffers = createSelector(
  [getActiveCity, getOffersList],
  (activeCity, offersList) => getActiveCityOffers(activeCity, offersList)
);

export const getIsEmptyOffers = createSelector(
  [getOffersList],
  (offersList) => !offersList.length
);
