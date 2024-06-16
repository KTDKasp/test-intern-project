import React from 'react';

import './AuthPage.css';
import { Input } from '../../components/Input';
import { PasswordInput } from '../../components/PasswordInput';
import { useNavigate } from 'react-router-dom';

export const AuthPage: React.FC = () => {
  const navigate = useNavigate();

  const onSubmitAuth = (event: React.FormEvent) => {
    event.preventDefault();
    navigate('/');
  }

  return (
    <div className="auth-page">
      <div className="auth-page__wrapper">
        <form className="auth-page__form" onSubmit={onSubmitAuth}>
          <h2 className="auth-page__title">Регистрация</h2>
          <div className="auth-page__inputs">
            <Input
              type="text"
              forId="name"
              labelText="Имя"
              placeholder="Иван"
            />
            <Input
              type="email"
              forId="email"
              labelText="Электронная почта"
              placeholder="example@mail.ru"
            />
            <PasswordInput
              type="password"
              forId="password-confirm"
              labelText="Подтвердите пароль"
              placeholder="******"
            />
            <PasswordInput
              type="password"
              forId="password"
              labelText="Пароль"
              placeholder="******"
            />
          </div>
          <button type="submit" className="auth-page__button">Зарегистрироваться</button>
        </form>
      </div>
    </div>
  );
};
