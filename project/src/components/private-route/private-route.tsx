import React from 'react';
import { Navigate } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';
import { useAppSelector } from '../../hooks';


type PrivateRouteProps = {
  children: JSX.Element
};


const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {

  const { authorizationStatus } = useAppSelector((state) => state);

  if (authorizationStatus === AuthorizationStatus.Unknown) {
    return null;
  }

  return (
    authorizationStatus === AuthorizationStatus.Auth
      ? children
      : <Navigate to={AppRoute.Login} />
  );
};


export default PrivateRoute;
