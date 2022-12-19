import { useRoutes } from 'react-router-dom';

// routes
import MainRoutes from './MainRoutes';
import AuthenticationRoutes from './AuthenticationRoutes';
import BoardRoutes from './BoardRoutes';
import ErrorRoutes from './ErrorRoutes';
import UserRoutes from './UserRoutes';
import WorkSpaceRoutes from './WorkSpaceRoutes';

// ==============================|| ROUTING RENDER ||============================== //

export default function ThemeRoutes() {
  return useRoutes([MainRoutes, AuthenticationRoutes, UserRoutes, WorkSpaceRoutes, BoardRoutes, ErrorRoutes]);
}
