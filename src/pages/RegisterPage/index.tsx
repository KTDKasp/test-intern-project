import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import { RootState, useAppDispatch } from '../../redux/store';
import { clearRegisterError, registerUser } from '../../redux/user.slice';
import { PasswordInput } from '../../components/PasswordInput';
import './RegisterPage.css';

type FormFields = {
  email: string;
  name: string;
  password: string;
  passwordConfirm: string;
};

export const RegisterPage: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    getValues,
    reset,
  } = useForm<FormFields>();
  const { jwt, registerErrorState } = useSelector(
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
      dispatch(clearRegisterError());
      await new Promise((resolve) => setTimeout(resolve, 1000));
      dispatch(registerUser({ email: data.email, password: data.password }));
      reset();
    } catch (error) {
      setError('root', { message: 'Произошла ошибка при регистрации' });
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-page__wrapper">
        {registerErrorState && (
          <div className="auth-page__error">{"Данная почта уже зарегистрирована"}</div>
        )}
        <form onSubmit={handleSubmit(onSubmit)} className="auth-page__form">
          <h2 className="auth-page__title">Регистрация</h2>
          <div className="auth-page__inputs">
            <div className="input-block">
              <label className="label" htmlFor="name">
                Имя
              </label>
              <input
                className={`input ${errors.name ? 'input__error' : ''}`}
                {...register('name', {
                  required: 'Поле Имя обязательно к заполнению',
                })}
                type="text"
                id="name"
                placeholder="Иван"
              />
              {errors.name && (
                <p className="input__error-text">{errors.name.message}</p>
              )}
            </div>
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

            <div className="input-block">
              <PasswordInput
                forId="password-confirm"
                label="Подтвердите пароль"
                errorClassName={errors.passwordConfirm}
                {...register('passwordConfirm', {
                  required: 'Введите ваш пароль еще раз',
                  validate: (value) =>
                    value === getValues('password') ||
                    'Пароли должны совпадать',
                })}
              />
              {errors.passwordConfirm && (
                <p className="input__error-text">
                  {errors.passwordConfirm.message}
                </p>
              )}
            </div>
          </div>
          <button
            disabled={isSubmitting}
            type="submit"
            className="auth-page__button"
          >
            {isSubmitting ? 'Загрузка...' : 'Зарегистрироваться'}
          </button>
          {errors.root && (
            <p className="input__error-text">{errors.root.message}</p>
          )}
        </form>
        <div className="sign-in__ask">
          <p>Уже зарегистрированы?</p>
          <Link to="/accounts/auth" className="sign-in__link">
            Войти
          </Link>
        </div>
      </div>
    </div>
  );
};
