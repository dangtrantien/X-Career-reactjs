import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import { RequireAuth } from 'utils/requireAuth';

// board routing
const DashboardDefault = Loadable(lazy(() => import('views/dashboard')));

// ==============================|| BOARD ROUTING ||============================== //

const BoardRoutes = {
  path: '/',
  element: (
    <RequireAuth>
      <MainLayout />
    </RequireAuth>
  ),
  children: [
    {
      path: 'board',
      element: <DashboardDefault />,
    },
  ],
};

export default BoardRoutes;
