import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { UserCard } from '../../components/UserCard';
import { PREFIX } from '../../helpers/API';
import { RootState, useAppDispatch } from '../../redux/store';
import { logout } from '../../redux/user.slice';
import { addToFavorite, clearFavorites } from '../../redux/favorites.slice';
import { User } from '../../interfaces/user.interface';

import './HomePage.css';

export const HomePage: React.FC = () => {
  const [users, setUsers] = React.useState<User[]>([]);
  const favoriteUsers = useSelector((state: RootState) => state.favorites.favoriteUsers);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      const { data } = await axios.get(`${PREFIX}/users`);
      setUsers(data.data);
    };
    fetchUsers();
  }, []);

  const onClickLogout = () => {
    dispatch(logout());
    dispatch(clearFavorites());
    navigate('/register');
  }

  return (
    <div className="layout__home">
      <header className="home__header">
        <div className="home__header-wrapper">
          <div className="home__header-text">
            <h1 className="home__title">Наша команда</h1>
            <p className="home__description">
              Это опытные специалисты, хорошо разбирающиеся во всех задачах,
              которые ложатся на их плечи, и умеющие находить выход из любых,
              даже самых сложных ситуаций.
            </p>
          </div>
          <div onClick={onClickLogout} className="header__link">
            <button className="home__logout">Выход</button>
            <button className="home__logout-mobile">
              <img src="/svg/exit.svg" alt="Exit icon" />
            </button>
          </div>
        </div>
      </header>
      <main className="home__main">
        <div className="home__content">
          {users.map((user: User) => (
            <UserCard
              key={user.id}
              id={user.id}
              last_name={user.last_name}
              first_name={user.first_name}
              avatar={user.avatar}
              isFavorite={favoriteUsers.some(obj => obj.userId === user.id)}
              onAddToFavorite={() => dispatch(addToFavorite({ userId: user.id}))}
            />
          ))}
        </div>
        <button className="show__content">
          <span>Показать еще</span>
          <img src="/svg/arrow-down.svg" alt="Arrow icon" />
        </button>
      </main>
    </div>
  );
};
