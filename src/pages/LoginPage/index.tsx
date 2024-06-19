import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import { RootState, useAppDispatch } from '../../redux/store';
import { clearLoginError, loginUser } from '../../redux/user.slice';
import './LoginPage.css';
import { PasswordInput } from '../../components/PasswordInput';

type FormFields = {
  email: string;
  password: string;
};

export const LoginPage: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    reset,
  } = useForm<FormFields>();
  const { jwt, loginErrorState } = useSelector(
    (state: RootState) => state.user
  );
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (jwt) {
      navigate('/');
    }
  }, [jwt, navigate]);

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      dispatch(clearLoginError());
      await new Promise((resolve) => setTimeout(resolve, 1000));
      dispatch(loginUser({ email: data.email, password: data.password }));
      reset();
    } catch (error) {
      setError('root', { message: 'Произошла ошибка при регистрации' });
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-page__wrapper">
        {loginErrorState && (
          <div className="auth-page__error">{"Некорректная почта или пароль"}</div>
        )}
        <form onSubmit={handleSubmit(onSubmit)} className="auth-page__form">
          <h2 className="auth-page__title">Регистрация</h2>
          <div className="auth-page__inputs">
            <div className="input-block">
              <label className="label" htmlFor="email">
                Электронная почта
              </label>
              <input
                className={`input ${errors.email ? 'input__error' : ''}`}
                {...register('email', {
                  required: 'Поле Email обязательно к заполнению',
                  pattern: {
                    value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                    message: 'Некорректная электронная почта',
                  },
                })}
                type="email"
                id="email"
                placeholder="example@mail.ru"
              />
              {errors.email && (
                <p className="input__error-text">{errors.email.message}</p>
              )}
            </div>
            <div className="input-block">
              <PasswordInput
                forId="password"
                label="Пароль"
                errorClassName={errors.password}
                {...register('password', {
                  required: 'Поле Пароль обязательно к заполнению',
                  minLength: {
                    value: 6,
                    message: 'Пароль должен состоят из шести символов',
                  },
                })}
              />
              {errors.password && (
                <p className="input__error-text">{errors.password.message}</p>
              )}
            </div>

            
          </div>
          <button
            disabled={isSubmitting}
            type="submit"
            className="auth-page__button"
          >
            {isSubmitting ? 'Загрузка...' : 'Войти'}
          </button>
          {errors.root && (
            <p className="input__error-text">{errors.root.message}</p>
          )}
        </form>
        <div className="sign-in__ask">
          <p>Нет аккаунта?</p>
          <Link to="/accounts/register" className="sign-in__link">
            Зарегистрироваться
          </Link>
        </div>
      </div>
    </div>
  );
};
