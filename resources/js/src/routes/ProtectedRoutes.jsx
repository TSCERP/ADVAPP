import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import Forbidden from "../pages/errors/forbidden";

const ProtectedRoute = ({ permissionsRequired = [], children }) => {
    const { userData, isAuthenticated } = useSelector((state) => state.auth);

    const hasPermission = () => {
        if (userData && userData.permissions) {
            console.log(userData.permissions);
            return permissionsRequired.every((permission) =>
                userData.permissions.includes(permission)
            );
        }
        return false;
    };

    console.log("isAUth: ", isAuthenticated)

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
