import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, defer, RouterProvider } from 'react-router-dom';
import './index.css';
import { HomePage } from './pages/HomePage';
import { UserPage } from './pages/UserPage';
import axios from 'axios';
import { PREFIX } from './helpers/API';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { RequireAuth } from './helpers/RequireAuth';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RequireAuth />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: '/item/:id',
        element: <UserPage />,
        errorElement: (
          <h2 style={{ padding: '40px 60px' }}>Ошибка загрузки продукта...</h2>
        ),
        loader: async ({ params }) => {
          return defer({
            data: axios
              .get(`${PREFIX}/items/${params.id}`, {
                headers: {
                  Authorization: `Bearer ${store.getState().user.jwt}`
                }
              })
              .then((data) => data)
              .catch((error) => error),
          });
        },
      },
    ],
  },
  {
    path: '/accounts',
    children: [
      {
        path: 'auth',
        element: <LoginPage />
      },
      {
        path: 'register',
        element: <RegisterPage />
      }
    ],
  },
  {
    path: '*',
    element: <h1>Страница не найдена</h1>,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
