import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AppRoute } from '../../const';
import MainScreen from '../../pages/main-screen/main-screen';
import PropertyScreen from '../../pages/property-screen/property-screen';
import FavoriteScreen from '../../pages/favorite-screen/favorite-screen';
import AuthScreen from '../../pages/auth-screen/auth-screen';
import NotFoundScreen from '../../pages/not-found-screen/not-found-screen';
import PrivateRoute from '../../components/private-route/private-route';
import PrivateRouteLogin from '../private-route-login/private-route-login';
import HistoryRouter from '../history-route/history-route';
import browserHistory from '../../browser-history';


const App: React.FC = (props) => (
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
            <FavoriteScreen />
          </PrivateRoute>
        }
      />
      <Route
        path={AppRoute.Login}
        element={
          <PrivateRouteLogin>
            <AuthScreen />
          </PrivateRouteLogin>
        }
      />
      <Route
        path={AppRoute.NotFound}
        element={<NotFoundScreen />}
      />
    </Routes>
  </HistoryRouter>
);

export default App;
