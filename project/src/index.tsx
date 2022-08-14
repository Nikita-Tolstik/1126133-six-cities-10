import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './components/app/app';
import { favoriteOffers } from './mocks/offers';
import { store } from './store';
import { checkAuthAction, fetchOffersListAction } from './store/api-actions';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

store.dispatch(checkAuthAction());
store.dispatch(fetchOffersListAction());

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ToastContainer />
      <App
        favoriteOffers={favoriteOffers}
      />
    </Provider>
  </React.StrictMode>,
);
