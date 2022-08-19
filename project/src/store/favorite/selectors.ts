import { NameSpace } from '../../const';
import { Offers } from '../../types/offers';
import { State } from '../../types/state';

export const getFavoriteList = (state: State): Offers => state[NameSpace.Favorite].favoriteList;
