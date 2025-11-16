import React from 'react';
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children }) {
    const token = localStorage.getItem('auth_token');
    const userData = localStorage.getItem('user');

    if (!token) {
        return <Navigate to="/login" replace />;
    }

    // Prevent admin users from accessing regular user dashboard
    try {
        const user = JSON.parse(userData);
        if (user.role === 'admin') {
            return <Navigate to="/admin/dashboard" replace />;
        }
    } catch (err) {
        // Continue if JSON parse fails
    }

    return children;
}
