import { NameSpace } from '../../const';
import { Offer, Offers } from '../../types/offers';
import { State } from '../../types/state';
import { createSelector } from '@reduxjs/toolkit';
import { getActiveCity } from '../app-process/selectors';
import { getActiveCityOffers } from '../../utils/utils';
import { Reviews } from '../../types/reviews';

export const getOffersList = (state: State): Offers => state[NameSpace.Data].offersList;

export const getOffersListLoadStatus = (state: State): boolean => state[NameSpace.Data].isOffersListLoading;

export const getOffer = (state: State): Offer | null => state[NameSpace.Data].offer;

export const getNearOffers = (state: State): Offers => state[NameSpace.Data].nearOffers;

export const getReviews = (state: State): Reviews => state[NameSpace.Data].reviews;

export const getOfferDataLoadStatus = (state: State): boolean => state[NameSpace.Data].isOfferDataLoading;

export const filterActiveCityOffers = createSelector(
  [getActiveCity, getOffersList],
  (activeCity, offersList) => getActiveCityOffers(activeCity, offersList)
);

export const getIsEmptyOffers = createSelector(
  [getOffersList],
  (offersList) => !offersList.length
);
