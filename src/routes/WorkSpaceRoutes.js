import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import { RequireAuth } from 'utils/requireAuth';

// workspace routing
const WorkSpace = Loadable(lazy(() => import('views/workspace/Detail')));

// ==============================|| WORK SPACE ROUTING ||============================== //

const WorkSpaceRoutes = {
  path: '/',
  element: (
    <RequireAuth>
      <MainLayout page="workspace" />
    </RequireAuth>
  ),
  children: [
    {
      path: 'w',
      children: [
        {
          path: 'detail/:workSpaceId',
          element: <WorkSpace />,
        },
      ],
    },
  ],
};

export default WorkSpaceRoutes;
