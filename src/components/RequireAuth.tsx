import { useLocation, Navigate, Outlet } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

export default function RequireAuth() {
  const auth = useAuth();
  const location = useLocation();

  return (
    auth?.username !== null && auth?.username !== '' ? <Outlet /> : <Navigate to='/auth/login' state={{ from: location }} replace />
  )
}
