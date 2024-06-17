import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, defer, RouterProvider } from 'react-router-dom';
import './index.css';
import { AuthPage } from './pages/AuthPage';
import { HomePage } from './pages/HomePage';
import { UserPage } from './pages/UserPage';
import axios from 'axios';
import { PREFIX } from './helpers/API';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { RequireAuth } from './helpers/RequireAuth';

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
        path: '/user/:id',
        element: <UserPage />,
        errorElement: (
          <h2 style={{ padding: '40px 60px' }}>Ошибка загрузки продукта...</h2>
        ),
        loader: async ({ params }) => {
          return defer({
            data: axios
              .get(`${PREFIX}/users/${params.id}`)
              .then((data) => data.data)
              .catch((error) => error),
          });
        },
      },
    ],
  },
  {
    path: '/register',
    element: <AuthPage />,
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
