import { Navigate, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

export function RequireAuth({ children }) {
  const token = sessionStorage.getItem('token');

  const location = useLocation();

  if (!token) {
    // Nếu chưa có thông tin token thì chuyển về màn hình login
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

RequireAuth.propTypes = {
  children: PropTypes.node,
};
