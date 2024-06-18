import React, { Suspense } from 'react';
import { Await, Link, useLoaderData, useNavigate } from 'react-router-dom';

import { User } from '../../interfaces/user.interface';
import { useAppDispatch } from '../../redux/store';
import { logout } from '../../redux/user.slice';
import { clearFavorites } from '../../redux/favorites.slice';

import './UserPage.css';

export const UserPage: React.FC = () => {
  const data = useLoaderData() as { data: User };
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onClickLogout = () => {
    dispatch(logout());
    dispatch(clearFavorites())
    navigate('/register');
  }
  return (
    <Suspense
      fallback={
        <div className="user-page__loader">
          <div className="loader__wrapper">
            <h2 className="loader__headling">Загрузка пользователя...</h2>
          </div>
        </div>
      }
    >
      <Await resolve={data.data}>
        {({ data }: { data: User }) => (
          <div className="user-page__layout">
            <header className="user-page__header">
              <div className="user-page__header-wrapper">
                <div className="user-page__header-buttons">
                  <Link to={'/'} className="header__link">
                    <button className="home__back">Назад</button>
                    <button className="home__back-mobile">
                      <img src="/svg/arrow-back.svg" alt="Arrow icon" />
                    </button>
                  </Link>
                  <div onClick={onClickLogout} className="header__link">
                    <button className="home__logout">Выход</button>
                    <button className="home__logout-mobile">
                      <img src="/svg/exit.svg" alt="Exit icon" />
                    </button>
                  </div>
                </div>
                <div className="user-page__header-data">
                  <div className="user-page__name-wrapper">
                    <h2 className="user-page__name">
                      {data.first_name} {data.last_name}
                    </h2>
                    <p className="user-page__description">Партнер</p>
                  </div>
                  <div className="user-page__image-wrapper">
                    <img src={data.avatar} alt="User image" />
                  </div>
                </div>
              </div>
            </header>
            <div className="user-page__main">
              <div className="user-page__content">
                <div className="user-page__contacts-wrapper">
                  <div className="user-page__contact">
                    <img src="/svg/phone.svg" alt="Phone icon" />
                    <a
                      className="user-page__contact-link"
                      href="tel:+7 (954) 333-44-55"
                    >
                      +7 (954) 333-44-55
                    </a>
                  </div>
                  <div className="user-page__contact">
                    <img src="/svg/email.svg" alt="Email icon" />
                    <a
                      className="user-page__contact-link"
                      href={`mailto:${data.email}`}
                    >
                      {data.email}
                    </a>
                  </div>
                </div>
                <div className="user-page__text">
                  <p>
                    Клиенты видят в нем эксперта по вопросам разработки
                    комплексных решений финансовых продуктов, включая такие
                    аспекты, как организационная структура, процессы, аналитика
                    и ИТ-компоненты. Он помогает клиентам лучше понимать
                    структуру рисков их бизнеса, улучшать процессы за счет
                    применения новейших технологий и увеличивать продажи,
                    используя самые современные аналитические инструменты.
                  </p>
                  <p>
                    В работе с клиентами недостаточно просто решить конкретную
                    проблему или помочь справиться с трудностями. Не менее важно
                    уделять внимание обмену знаниями: "Один из самых позитивных
                    моментов — это осознание того, что ты помог клиенту перейти
                    на совершенно новый уровень компетентности, уверенность в
                    том, что после окончания проекта у клиента есть все
                    необходимое, чтобы дальше развиваться самостоятельно".
                  </p>
                  <p>
                    Помимо разнообразных проектов для клиентов финансового
                    сектора, Сорин ведет активную предпринимательскую
                    деятельность. Он является совладельцем сети клиник
                    эстетической медицины в Швейцарии, предлагающей
                    инновационный подход к красоте, а также инвестором других
                    бизнес-проектов.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </Await>
    </Suspense>
  );
};
