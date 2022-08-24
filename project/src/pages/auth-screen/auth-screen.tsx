import React, { useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { loginAction } from '../../store/api-actions';
import { useForm, SubmitHandler } from 'react-hook-form';
import { ButtonName, Pattern, Timer } from '../../const';
import { getLoginErrorStatus } from '../../store/user-process/selectors';
import { clearLoginError } from '../../store/user-process/user-process';
import { toast } from 'react-toastify';
import classNames from 'classnames';
import ErrorMessage from '../../components/error-message/error-message';
import Header from '../../components/header/header';
import ToGoCityButton from '../../components/to-go-city-button/to-go-city-button';

type FormData = {
  email: string,
  password: string
}


const AuthScreen: React.FC = () => {
  const timerRef = useRef<NodeJS.Timeout | undefined>(undefined);
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: {
      errors,
      isSubmitting,
    }
  } = useForm<FormData>();

  const isLoginError = useAppSelector(getLoginErrorStatus);
  const isDisabledBtn = !!errors?.email || !!errors?.password || isSubmitting || isLoginError;
  const buttonName = isSubmitting ? ButtonName.Sending : ButtonName.SignIn;

  const emailInputClass = classNames('login__input form__input', {
    'input__login__error': errors?.email
  });

  const passwordInputClass = classNames('login__input form__input', {
    'input__login__error': errors?.password
  });

  const buttonClass = classNames('login__submit form__submit button', {
    'login__submit__error horizontal-shake': isLoginError
  });

  const onSubmit: SubmitHandler<FormData> = async (formData) => {
    toast.dismiss();

    await dispatch(loginAction({
      login: formData.email,
      password: formData.password
    }));
  };

  if (isLoginError && !timerRef.current) {
    timerRef.current = setTimeout(() => {
      dispatch(clearLoginError());
      timerRef.current = undefined;
    }, Timer.Login);
  }

  useEffect(
    () =>
      () => {
        if (timerRef.current) {
          toast.dismiss();
          dispatch(clearLoginError());
          clearTimeout(timerRef.current);
        }
      }, [dispatch]);


  return (
    <div className="page page--gray page--login">
      <Header isHideUserSection />

      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="login__form form"
              action="#"
              method="post"
              noValidate
            >
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">E-mail</label>
                <input
                  {...register('email', {
                    required: 'Must be E-mail (e.g. name@example.com)',
                    pattern: {
                      value: Pattern.Email,
                      message: 'Enter valid E-mail (e.g. name@example.com)'
                    }
                  })}
                  className={emailInputClass}
                  type="email"
                  placeholder="Email"
                  title="Must be E-mail (e.g. name@example.com)"
                  disabled={isSubmitting}
                />
                {errors?.email && <ErrorMessage isLoginMessage errorMessage={errors.email?.message} />}
              </div>

              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">Password</label>
                <input
                  {...register('password', {
                    required: 'Must be entered Password',
                    pattern: {
                      value: Pattern.Password,
                      message: 'Password must contain Letters and Numbers. Min 2 chatacters. No Spaces.'
                    }
                  })}
                  className={passwordInputClass}
                  type="password"
                  placeholder="Password"
                  title="Password must contain Letters and Numbers. Min 2 chatacters. No Spaces."
                  disabled={isSubmitting}
                />
                {errors?.password && <ErrorMessage isLoginMessage errorMessage={errors.password?.message} />}
              </div>

              <button
                disabled={isDisabledBtn}
                className={buttonClass}
                type="submit"
              >
                {buttonName}
              </button>
            </form>
          </section>

          <ToGoCityButton />
        </div>
      </main>
    </div>
  );
};

export default AuthScreen;
