import React from 'react';
import { Navigate } from 'react-router-dom';

export default function ProtectedAdminRoute({ children }) {
    const token = localStorage.getItem('auth_token');
    const userData = localStorage.getItem('user');

    if (!token) {
        return <Navigate to="/login/admin" replace />;
    }

    try {
        const user = JSON.parse(userData);
        if (user.role !== 'admin') {
            return <Navigate to="/" replace />;
        }
    } catch (err) {
        return <Navigate to="/login/admin" replace />;
    }

    return children;
}
