import { lazy } from 'react';

// project imports
import MainLayout from '../layout/MainLayout';
import Loadable from '../ui-component/Loadable';
import { RequireAuth } from '../utils/requireAuth';

// board routing
const Board = Loadable(lazy(() => import('../views/board/Detail')));

// ==============================|| BOARD ROUTING ||============================== //

const BoardRoutes = {
  path: '/',
  element: (
    <RequireAuth>
      <MainLayout page="board" />
    </RequireAuth>
  ),
  children: [
    {
      path: 'b',
      children: [
        {
          path: ':boardId',
          element: <Board />,
        },
      ],
    },
  ],
};

export default BoardRoutes;
