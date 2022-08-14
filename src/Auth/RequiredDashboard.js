import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthUser } from '../App';
import Spinner from '../Components/Shared/Spinner/Spinner';
import { useAuthContext } from '../lib/AuthProvider';

const RequiredDashboard = ({ children }) => {
   const user = useAuthUser();
   const { role, authLoading } = useAuthContext();

   const location = useLocation();

   if (authLoading) return <Spinner />;
   if (!user) return <Navigate to={'/login'} state={{ from: location }} replace></Navigate>;

   if (role) {
      if (role === "owner" || role === "admin" || role === "seller") {
         return children;
      } else {
         return <Navigate to={'/'} state={{ from: location }} replace></Navigate>;
      }
   }
};

export default RequiredDashboard;