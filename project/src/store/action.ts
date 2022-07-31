import { createAction } from '@reduxjs/toolkit';
import { City } from '../const';
import { Offers } from '../types/offers';

export const changeCity = createAction<City>('main/changeCity');

export const loadOffers = createAction<Offers>('data/loadOffers');
