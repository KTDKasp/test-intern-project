import React, { useEffect } from 'react';
import axios from 'axios';

import './HomePage.css';
import { Link } from 'react-router-dom';
import { UserCard } from '../../components/UserCard';
import { PREFIX } from '../../helpers/API';

export interface User {
  id: number;
  first_name: string;
  last_name: string;
  avatar: string;
  email: string;
}

export interface FavoriteUsers {
  userId: number;
}

export const HomePage: React.FC = () => {
  const [users, setUsers] = React.useState<User[]>([]);
  const [favoriteUsers, setFavoriteUsers] = React.useState<FavoriteUsers[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const { data } = await axios.get(`${PREFIX}/users`);
      setUsers(data.data);
    };
    fetchUsers();
  }, []);

  const addToFavorite = React.useCallback((id: number) => {
    const isUserFavorite = favoriteUsers.find(obj => obj.userId === id);
    if (isUserFavorite) {
      setFavoriteUsers(favoriteUsers.filter(obj => obj.userId !== id));
    } else {
      setFavoriteUsers([...favoriteUsers, { userId: id }]);
    }
  }, [favoriteUsers]);

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
          <Link to={'/register'} className="header__link">
            <button className="home__logout">Выход</button>
            <button className="home__logout-mobile">
              <img src="/svg/exit.svg" alt="Exit icon" />
            </button>
          </Link>
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
              onAddToFavorite={addToFavorite}
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
