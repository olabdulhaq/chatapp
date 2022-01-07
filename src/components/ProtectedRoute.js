import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/Authcontext';

const ProtectedRoute = ({ children }) => {
  let { currentUser } = useAuth;
  if (!currentUser) {
    <Navigate to="/login" />;
  }
  return children;
};

export default ProtectedRoute;
