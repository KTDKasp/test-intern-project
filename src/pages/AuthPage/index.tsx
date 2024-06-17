import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { RootState, useAppDispatch } from '../../redux/store';
import { clearRegisterError, registerUser } from '../../redux/user.slice';
import './AuthPage.css';

type FormFields = {
  email: string;
  name: string;
  password: string;
  passwordConfirm: string;
};

export const AuthPage: React.FC = () => {
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
      console.log(data);
      dispatch(clearRegisterError());
      dispatch(registerUser({ email: data.email, password: data.password }));
      reset();
    } catch (error) {
      setError('root', { message: 'Произошла ошибка при регистрации' });
    }
  };
  // #TODO: Add validation
  return (
    <div className="auth-page">
      <div className="auth-page__wrapper">
        {registerErrorState && (
          <div className="auth-page__error">{registerErrorState}</div>
        )}
        <form onSubmit={handleSubmit(onSubmit)} className="auth-page__form">
          <h2 className="auth-page__title">Регистрация</h2>
          <div className="auth-page__inputs">
            <div className="input-block">
              <label className="label" htmlFor="name">Имя</label>
              <input className={`${errors.name ? 'input input__error' : 'input'}`}
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
              <label className="label" htmlFor="email">Электронная почта</label>
              <input className={`${errors.email ? 'input input__error' : 'input'}`}
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
              <label className="label" htmlFor="password">Пароль</label>
              <input className={`${errors.password ? 'input input__error' : 'input'}`}
                {...register('password', {
                  required: 'Поле Пароль обязательно к заполнению',
                  minLength: {
                    value: 6,
                    message: 'Пароль должен состоят из шести символов',
                  },
                })}
                type="password"
                id="password"
                placeholder="******"
              />
              {errors.password && (
                <p className="input__error-text">{errors.password.message}</p>
              )}
            </div>
            <div className="input-block">
              <label className="label" htmlFor="password-confirm">Имя</label>
              <div className="input-wrapper">
              <input className={`${errors.passwordConfirm ? 'input input__error' : 'input'}`}
                {...register('passwordConfirm', {
                  required: 'Введите ваш пароль еще раз',
                  validate: (value) =>
                    value === getValues('password') ||
                    'Пароли должны совпадать',
                })}
                type="password"
                id="password-confirm"
                placeholder="******"
              />
              {errors.passwordConfirm && (
                <p className="input__error-text">
                  {errors.passwordConfirm.message}
                </p>
              )}
              </div>
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
      </div>
    </div>
  );
};
