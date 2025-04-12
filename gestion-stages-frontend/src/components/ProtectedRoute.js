import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { authService } from '../services/api';

/**
 * A wrapper around routes that require authentication
 * If the user is not authenticated, they will be redirected to the appropriate login page
 * @param {Object} props - Component props
 * @param {string} props.userType - The type of user that can access this route (administrateur, stagiaire, formateur)
 * @param {React.ReactNode} props.children - The child components to render if authenticated
 */
const ProtectedRoute = ({ userType, children }) => {
  const location = useLocation();
  const isAuthenticated = authService.isAuthenticated();
  const currentUserType = authService.getUserType();

  // If not authenticated, redirect to the appropriate login page
  if (!isAuthenticated) {
    let loginPath = '/';
    
    // Determine which login page to redirect to based on the required user type
    if (userType === 'administrateur') {
      loginPath = '/admin/login';
    } else if (userType === 'stagiaire') {
      loginPath = '/etudiant/login';
    } else if (userType === 'formateur') {
      loginPath = '/formateur/login';
    }
    
    // Redirect to login page with the current location in state
    return <Navigate to={loginPath} state={{ from: location }} replace />;
  }

  // If authenticated but wrong user type, redirect to appropriate dashboard
  if (currentUserType !== userType) {
    let dashboardPath = '/';
    
    // Redirect to the user's dashboard based on their type
    if (currentUserType === 'administrateur') {
      dashboardPath = '/admin/dashboard';
    } else if (currentUserType === 'stagiaire') {
      dashboardPath = '/etudiant/dashboard';
    } else if (currentUserType === 'formateur') {
      dashboardPath = '/formateur/dashboard';
    }
    
    return <Navigate to={dashboardPath} replace />;
  }

  // If authenticated and correct user type, render the children
  return children;
};

export default ProtectedRoute;
