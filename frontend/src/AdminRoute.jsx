import React from 'react';
import { Route, Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './auth'; // Custom hook or context for authentication

const AdminRoute = ({ adminOnly = false }) => {
    const { user } = useAuth(); // Assume user contains role information

    if (adminOnly) {
        // Check if the user is an admin
        return user.role === 'admin' ? <Outlet /> : <Navigate to="/unauthorized" />;
    }

    // Check if the user is authenticated
    return user ? <Outlet /> : <Navigate to="/login" />;
};



export default AdminRoute;
