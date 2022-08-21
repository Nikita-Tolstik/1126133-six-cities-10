import React, { MouseEvent, useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import { ComponentClass, ButtonSize, AuthorizationStatus, AppRoute, FavoriteAction, FavoriteActionInfo, RequestStatus, Timer, TOAST_TYPE } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getAuthorizationStatus } from '../../store/user-process/selectors';
import { redirectToRoute } from '../../store/action';
import { postUserFavoriteAction } from '../../store/api-actions';
import { toast } from 'react-toastify';

type FavoriteButtonProps = {
  offerId: number;
  favoriteStatus: boolean;
  buttonClass: ComponentClass,
}


const FavoriteButton: React.FC<FavoriteButtonProps> = ({ offerId, favoriteStatus, buttonClass }) => {
  const [isFavorite, setIsFavorite] = useState<boolean>(favoriteStatus);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const dispatch = useAppDispatch();

  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const isNoAuthorized = authorizationStatus === AuthorizationStatus.NoAuth;

  const actionType = isFavorite ? FavoriteAction.Delete : FavoriteAction.Add;
  const actionTypeInfo = isFavorite ? FavoriteActionInfo.Removed : FavoriteActionInfo.Add;
  const buttonSize = buttonClass === ComponentClass.OfferCard ? ButtonSize.Small : ButtonSize.Big;

  const btnClass = classNames(`${buttonClass}__bookmark-button button`, {
    [`${buttonClass}__bookmark-button--active`]: isFavorite
  });

  const toastId = useRef<number | string | null>(null);
  const timerId = useRef<NodeJS.Timeout | undefined>(undefined);

  const handleClick = async (evt: MouseEvent<HTMLButtonElement>) => {

    if (isNoAuthorized) {
      dispatch(redirectToRoute(AppRoute.Login));
      return;
    }

    toast.dismiss();
    setIsLoading(true);

    toastId.current = toast.loading(FavoriteActionInfo.Loading);

    const responseData = await dispatch(postUserFavoriteAction({
      id: offerId,
      status: actionType
    }));

    if (responseData.meta.requestStatus === RequestStatus.Fulfilled) {
      setIsFavorite((prevState) => !prevState);
      toast.update(toastId.current, {
        render: actionTypeInfo,
        type: TOAST_TYPE,
        isLoading: false,
        autoClose: Timer.ToastClose
      });
    } else {
      toast.dismiss(toastId.current);
    }

    timerId.current = setTimeout(() => {
      setIsLoading(false);
      timerId.current = undefined;
    }, Timer.Favorite);
  };

  useEffect(
    () =>
      () => {
        if (toastId.current && toast.isActive(toastId.current)) {
          toast.dismiss(toastId.current);
        }
        if (timerId.current) {
          clearTimeout(timerId.current);
        }
      }, []);


  return (
    <button
      onClick={handleClick}
      className={btnClass}
      type="button"
      disabled={isLoading}
    >
      <svg
        className={`${buttonClass}__bookmark-icon`}
        width={buttonSize.width}
        height={buttonSize.height}
      >
        <use xlinkHref="#icon-bookmark"></use>
      </svg>
      <span className="visually-hidden">To bookmarks</span>
    </button>
  );
};

export default FavoriteButton;

