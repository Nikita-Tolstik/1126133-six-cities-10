import classNames from 'classnames';
import React, { Fragment, MouseEvent, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AppRoute, LogoutText, Timer } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { logoutAction } from '../../store/api-actions';
import { getFavoriteList, getFavoriteLoadStatus } from '../../store/favorite/selectors';
import { getLogoutErrorStatus, getLogoutProcessStatus, getUserEmail } from '../../store/user-process/selectors';
import { clearLogoutError } from '../../store/user-process/user-process';

const HeaderUser: React.FC = () => {
  const timerRef = useRef<NodeJS.Timeout | undefined>(undefined);

  const dispatch = useAppDispatch();
  const favoriteList = useAppSelector(getFavoriteList);
  const userEmail = useAppSelector(getUserEmail);

  const isFavoriteLoading = useAppSelector(getFavoriteLoadStatus);
  const isLogoutProcessing = useAppSelector(getLogoutProcessStatus);
  const isLogoutError = useAppSelector(getLogoutErrorStatus);

  const favoriteCount = isFavoriteLoading ? '' : favoriteList.length;
  const signoutText = isLogoutProcessing ? LogoutText.Exiting : LogoutText.SignOut;

  const signoutClass = classNames('header__signout', {
    'header__signout__error horizontal-shake': isLogoutError
  });

  const linkClass = classNames('header__nav-link', {
    'header__nav-link__disabled': isLogoutError || isLogoutProcessing
  });

  if (isLogoutError && !timerRef.current) {
    timerRef.current = setTimeout(() => {
      dispatch(clearLogoutError());
      timerRef.current = undefined;
    }, Timer.Logout);
  }

  useEffect(
    () =>
      () => {
        if (timerRef.current) {
          toast.dismiss();
          dispatch(clearLogoutError());
          clearTimeout(timerRef.current);
        }
      }, [dispatch]);


  return (
    <Fragment>
      <li className="header__nav-item user">
        <Link
          to={AppRoute.Favorite}
          className="header__nav-link header__nav-link--profile"
        >
          <div className="header__avatar-wrapper user__avatar-wrapper" />

          <span className="header__user-name user__name">{userEmail}</span>

          <span className="header__favorite-count">{favoriteCount}</span>
        </Link>
      </li>

      <li className="header__nav-item">
        <a
          onClick={(evt: MouseEvent<HTMLAnchorElement>) => {
            evt.preventDefault();
            toast.dismiss();

            if (!isLogoutError) {
              dispatch(logoutAction());
            }
          }}
          className={linkClass} href="/"
        >
          <span className={signoutClass}>{signoutText}</span>
        </a>
      </li>
    </Fragment>
  );
};

export default HeaderUser;
