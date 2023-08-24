import { lazy } from 'react';
import { Navigate } from 'react-router-dom';

// project imports
import Loadable from '../ui-component/Loadable';

// Page 404
const ErrorPage = Loadable(lazy(() => import('../views/ErrorPage')));

// ==============================|| PAGE 404 ||============================== //

const ErrorRoutes = {
  path: '/',
  element: <ErrorPage />,
  children: [
    {
      path: '404',
      element: <ErrorPage />,
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ],
};

export default ErrorRoutes;
