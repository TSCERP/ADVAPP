import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import useAppContext from "../store/AppContext";
import Forbidden from "../pages/errors/forbidden";

const ProtectedRoute = ({ permissionsRequired = [], children }) => {

    const { user, isAuthenticated } = useAppContext();

    const hasPermission = () => {
        if (user && user.permissions) {
            // console.log("hasPermission", permissionsRequired.every((permission) =>user.permissions.includes(permission)));
            return permissionsRequired.every((permission) =>
              user.permissions.includes(permission)
            );
        }
        return false;
    };

    return isAuthenticated ? (
        hasPermission() ? (
            children
        ) : (
            <Forbidden />
        )
    ) : (
        <Navigate to="/login" replace />
    );
};

export default ProtectedRoute;
