import React from 'react';
import axios, { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { UserCard } from '../../components/UserCard';
import { PREFIX } from '../../helpers/API';
import { RootState, useAppDispatch } from '../../redux/store';
import { logout } from '../../redux/user.slice';
import { addToFavorite, clearFavorites } from '../../redux/favorites.slice';
import { User } from '../../interfaces/user.interface';

import './HomePage.css';
import { MetaData } from '../../interfaces/metaData.interface';

export interface MokkyResponseData {
  meta: MetaData;
  items: User[];
}

export const HomePage: React.FC = () => {
  const jwt = useSelector((state: RootState) => state.user.jwt);
  const [users, setUsers] = React.useState<User[]>([]);
  const favoriteUsers = useSelector(
    (state: RootState) => state.favorites.favoriteUsers
  );
  const [page, setPage] = React.useState<number>(1);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const per_page = 4;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const totalPagesRef = React.useRef(0);

  React.useEffect(() => {
    setIsLoading(true);
    const fetchUsersData = async () => {
      try {
        const { data } = await axios.get<MokkyResponseData>(
          `${PREFIX}/items?page=${page}&limit=${per_page}`,
          {
            headers: {
              Authorization: `Bearer ${jwt}`,
            },
          }
        );
        totalPagesRef.current = data.meta.total_pages;
        setUsers(data.items);
      } catch (error) {
        if (error instanceof AxiosError) {
          console.error(error);
        }
      } finally {
        setIsLoading(false);
      }
    };
    fetchUsersData();
  }, [page, jwt]);

  const onClickLogout = () => {
    dispatch(logout());
    dispatch(clearFavorites());
    navigate('/accounts/auth');
  };

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
        {isLoading ? (
          <div className="loading__page">Идет загрузка...</div>
        ) : (
          <div className="home__content">
            {users.map((user: User) => (
              <UserCard
                key={user.id}
                id={user.id}
                last_name={user.last_name}
                first_name={user.first_name}
                avatar={user.avatar}
                isFavorite={favoriteUsers.some((obj) => obj.userId === user.id)}
                onAddToFavorite={() =>
                  dispatch(addToFavorite({ userId: user.id }))
                }
              />
            ))}
          </div>
        )}
        <ul className="pagination">
          {[...Array(totalPagesRef.current)].map((_, i) => (
            <li
              className={`pagination__item ${page === i + 1 ? 'active' : ''}`}
              onClick={() => setPage(i + 1)}
              key={i}
            >
              <span>{i + 1}</span>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
};
