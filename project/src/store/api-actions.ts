import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { APIRoute, AppRoute } from '../const';
import { dropToken, saveToken } from '../services/token';
import { OfferId, ReviewData } from '../types/app-data';
import { AuthData } from '../types/auth-data';
import { Offer, Offers } from '../types/offers';
import { Reviews } from '../types/reviews';
import { AppDispatch, State } from '../types/state';
import { UserData } from '../types/user-data';
import { redirectToRoute } from './action';


export const fetchOffersListAction = createAsyncThunk<Offers, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/fetchOffersList',
  async (_arg, { dispatch, extra: api }) => {
    const { data } = await api.get<Offers>(APIRoute.Offer);
    return data;
  },
);


export const fetchOfferAction = createAsyncThunk<Offer, OfferId, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/fetchOffer',
  async (id, { dispatch, extra: api }) => {
    const { data } = await api.get<Offer>(`${APIRoute.Offer}/${id}`);
    return data;
  },
);


export const fetchNearOffersAction = createAsyncThunk<Offers, OfferId, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/fetchNearOffers',
  async (id, { dispatch, extra: api }) => {
    const { data } = await api.get<Offers>(`${APIRoute.Offer}/${id}/${APIRoute.Nearby}`);
    return data;
  },
);


export const fetchRewiesAction = createAsyncThunk<Reviews, OfferId, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/fetchRewies',
  async (id, { dispatch, extra: api }) => {
    const { data } = await api.get<Reviews>(`${APIRoute.Comment}/${id}`);
    return data;
  },
);


export const postUserReviewAction = createAsyncThunk<{ data: Reviews, id: number }, ReviewData, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/postUserReview',
  async ({ id, rating, comment }, { dispatch, extra: api }) => {
    const { data } = await api.post<Reviews>(`${APIRoute.Comment}/${id}`, { rating, comment });
    return ({ data, id });
  }
);


export const checkAuthAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'user/checkAuth',
  async (_arg, { dispatch, extra: api }) => {
    await api.get(APIRoute.Login);
  },
);


export const loginAction = createAsyncThunk<void, AuthData, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'user/login',
  async ({ login: email, password }, { dispatch, extra: api }) => {
    const { data: { token } } = await api.post<UserData>(APIRoute.Login, { email, password });
    saveToken(token);
    dispatch(redirectToRoute(AppRoute.Main));
  },
);


export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'user/logout',
  async (_arg, { dispatch, extra: api }) => {
    await api.delete(APIRoute.Logout);
    dropToken();
  },
);
