import { useRoutes } from 'react-router-dom';

// routes
import AuthenticationRoutes from './AuthenticationRoutes';
import BoardRoutes from './BoardRoutes';
import DashboardRoutes from './DashboardRoutes';
import UserRoutes from './UserRoutes';
import WorkSpaceRoutes from './WorkSpaceRoutes';

// ==============================|| ROUTING RENDER ||============================== //

export default function ThemeRoutes() {
  return useRoutes([AuthenticationRoutes, BoardRoutes, DashboardRoutes, UserRoutes, WorkSpaceRoutes]);
}
