import { lazy } from 'react';

// project imports
import MainLayout from '../layout/MainLayout';
import Loadable from '../ui-component/Loadable';
import { RequireAuth } from '../utils/requireAuth';

// user routing
const Profile = Loadable(lazy(() => import('../views/user/Profile')));
const EditProfile = Loadable(lazy(() => import('../views/user/EditProfile')));
const ChangePassword = Loadable(lazy(() => import('../views/user/ChangePassword')));

// ==============================|| USER ROUTING ||============================== //

const UserRoutes = {
  path: '/',
  element: (
    <RequireAuth>
      <MainLayout page="user" />
    </RequireAuth>
  ),
  children: [
    {
      path: '/u/profile/:userId',
      element: <Profile />,
    },
    {
      path: '/u/profile/:userId',
      element: <EditProfile />,
    },
    {
      path: '/u/profile/change-password',
      element: <ChangePassword />,
    },
  ],
};

export default UserRoutes;
