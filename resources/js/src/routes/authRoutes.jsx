import React, { useLayoutEffect } from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";
import { useLocation } from "react-router-dom";


// General
import Home from "../pages/home";
import Login from "../pages/(auth)/login";
import NotFound from "../pages/errors/notfound";

import ProtectedRoute from "./ProtectedRoutes";

function AuthRoutes() {
    const location = useLocation();

    useLayoutEffect(() => {
        document.documentElement.scrollTo(0, 0);
    }, [location.pathname]);

    // <ProtectedRoute></ProtectedRoute>

    return (
        <Routes>
            {/* General */}
            <Route path="/login" element={<Login />} />

            <Route path="/" 
                element={
                    <ProtectedRoute>
                        <Home />
                    </ProtectedRoute>
                } 
            />

            <Route path="*" 
                element={
                    <ProtectedRoute>
                        <NotFound />
                    </ProtectedRoute>
                } 
            />

        </Routes>
    );
}

export default AuthRoutes;
