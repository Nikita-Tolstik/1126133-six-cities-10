import React from 'react';
import { useAppDispatch } from '../../hooks';
import { loginAction } from '../../store/api-actions';
import { useForm, SubmitHandler } from 'react-hook-form';
import { ButtonName, Pattern } from '../../const';
import classNames from 'classnames';
import ErrorMessage from '../../components/error-message/error-message';
import Header from '../../components/header/header';

type FormData = {
  email: string,
  password: string
}


const AuthScreen: React.FC = () => {

  const {
    register,
    handleSubmit,
    formState: {
      errors,
      isValid,
      isSubmitting
    }
  } = useForm<FormData>({
    mode: 'all'
  });

  const errorEmail = classNames('login__input form__input', {
    'input__login__error': errors?.email
  });

  const errorPassword = classNames('login__input form__input', {
    'input__login__error': errors?.password
  });

  const isDisabledBtn = !isValid || isSubmitting;
  const buttonName = isSubmitting ? ButtonName.Sending : ButtonName.SignIn;

  const dispatch = useAppDispatch();

  const onSubmit: SubmitHandler<FormData> = async (formData) => {
    await dispatch(loginAction({
      login: formData.email,
      password: formData.password
    }));

  };

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
                  className={errorEmail}
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
                  className={errorPassword}
                  type="password"
                  placeholder="Password"
                  title="Password must contain Letters and Numbers. Min 2 chatacters. No Spaces."
                  disabled={isSubmitting}
                />
                {errors?.password && <ErrorMessage isLoginMessage errorMessage={errors.password?.message} />}
              </div>

              <button
                disabled={isDisabledBtn}
                className="login__submit form__submit button"
                type="submit"
              >
                {buttonName}
              </button>
            </form>

          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <a className="locations__item-link" href="/">
                <span>Amsterdam</span>
              </a>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};


export default AuthScreen;
