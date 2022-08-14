import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AppRoute } from '../../const';
import { Offers } from '../../types/offers';
import MainScreen from '../../pages/main-screen/main-screen';
import PropertyScreen from '../../pages/property-screen/property-screen';
import FavoriteScreen from '../../pages/favorite-screen/favorite-screen';
import AuthScreen from '../../pages/auth-screen/auth-screen';
import NotFoundScreen from '../../pages/not-found-screen/not-found-screen';
import PrivateRoute from '../../components/private-route/private-route';
import HistoryRouter from '../history-route/history-route';
import browserHistory from '../../browser-history';

type AppScreenProps = {
  favoriteOffers: Offers;
}


const App: React.FC<AppScreenProps> = (props) => {
  const { favoriteOffers } = props;

  return (
    <HistoryRouter history={browserHistory}>
      <Routes>
        <Route
          path={AppRoute.Main}
          element={<MainScreen />}
        />
        <Route
          path={`${AppRoute.Property}/:id`}
          element={
            <PropertyScreen />
          }
        />
        <Route
          path={AppRoute.Favorite}
          element={
            <PrivateRoute>
              <FavoriteScreen offers={favoriteOffers} />
            </PrivateRoute>
          }
        />
        <Route
          path={AppRoute.Login}
          element={<AuthScreen />}
        />
        <Route
          path={AppRoute.NotFound}
          element={<NotFoundScreen />}
        />
      </Routes>
    </HistoryRouter>
  );
};

export default App;
