import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Navigate } from 'react-router-dom';
// import { useAuth } from '../hooks/useAuth'; // Your authentication hook

const ProtectedRoute = ({ children }) => {
  const { isLoggedIn, accessToken } = useSelector((state) => state.auth);

  // Check if the user is authenticated
  if (!isLoggedIn || !accessToken) {
    return <Navigate to="/sign-in" />;
  }

  // If the user is authenticated, allow them to access the route
  return children;
};

export default ProtectedRoute;
