import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './store';
import { checkAuthAction, fetchOffersListAction } from './store/api-actions';
import { ToastContainer } from 'react-toastify';
import { AppRoute, Timer } from './const';
import 'react-toastify/dist/ReactToastify.css';
import App from './components/app/app';

const isFavoritePath = window.location.pathname === AppRoute.Favorite;

store.dispatch(checkAuthAction(isFavoritePath));
store.dispatch(fetchOffersListAction());

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ToastContainer
        newestOnTop
        pauseOnFocusLoss={false}
        autoClose={Timer.ToastClose}
      />
      <App />
    </Provider>
  </React.StrictMode>,
);
