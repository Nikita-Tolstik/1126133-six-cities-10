import { NameSpace } from '../../const';
import { Offer, Offers } from '../../types/offers';
import { State } from '../../types/state';
import { createSelector } from '@reduxjs/toolkit';
import { getActiveCity } from '../app-process/selectors';
import { getActiveCityOffers } from '../../utils/utils';

export const getOffersList = (state: State): Offers => state[NameSpace.Data].offersList;

export const getOffersListLoadStatus = (state: State): boolean => state[NameSpace.Data].isOffersListLoading;

export const getOffer = (state: State): Offer | null => state[NameSpace.Data].offer;

export const getOfferLoadStatus = (state: State): boolean => state[NameSpace.Data].isOfferLoading;

export const filterActiveCityOffers = createSelector(
  [getActiveCity, getOffersList],
  (activeCity, offersList) => getActiveCityOffers(activeCity, offersList)
);

export const getIsEmptyOffers = createSelector(
  [getOffersList],
  (offersList) => !offersList.length
);
