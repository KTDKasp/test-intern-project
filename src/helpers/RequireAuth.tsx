import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../redux/store'
import { Navigate, Outlet } from 'react-router-dom';

export const RequireAuth: React.FC = () => {
  const jwt = useSelector((state: RootState) => state.user.jwt);
  if (!jwt) {
    return <Navigate to='/register' replace />
  }
  return (<Outlet />);
}
