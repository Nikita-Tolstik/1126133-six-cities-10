import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AppRoute } from '../../const';
import { Offers } from '../../types/offers';
import { Reviews } from '../../types/reviews';
import { useAppSelector } from '../../hooks';
import MainScreen from '../../pages/main-screen/main-screen';
import PropertyScreen from '../../pages/property-screen/property-screen';
import FavoriteScreen from '../../pages/favorite-screen/favorite-screen';
import AuthScreen from '../../pages/auth-screen/auth-screen';
import NotFoundScreen from '../../pages/not-found-screen/not-found-screen';
import PrivateRoute from '../../components/private-route/private-route';
import LoadingScreen from '../../pages/loading-screen/loading-screen';
import HistoryRouter from '../history-route/history-route';
import browserHistory from '../../browser-history';
import { getDataLoadedStatus } from '../../store/app-data/selectors';


type AppScreenProps = {
  favoriteOffers: Offers;
  nearPlacesOffers: Offers;
  reviews: Reviews;
}


const App: React.FC<AppScreenProps> = (props) => {
  const { favoriteOffers, nearPlacesOffers, reviews } = props;

  const isDataLoaded = useAppSelector(getDataLoadedStatus);

  if (isDataLoaded) {
    return <LoadingScreen />;
  }

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
            <PropertyScreen
              nearPlacesOffers={nearPlacesOffers}
              reviews={reviews}
            />
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
