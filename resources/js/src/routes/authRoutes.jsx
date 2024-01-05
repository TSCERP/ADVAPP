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

function AuthRoutes() {
    // const { user, isAuthenticated } = useAppContext();
    // const Wrapper = ({ children }) => {
    //     const location = useLocation();
    //     useLayoutEffect(() => {
    //         document.documentElement.scrollTo(0, 0);
    //     }, [location.pathname]);
    //     return children;
    // };

    const location = useLocation();

    useLayoutEffect(() => {
        document.documentElement.scrollTo(0, 0);
    }, [location.pathname]);

    // <ProtectedRoute></ProtectedRoute>

    return (
        <Routes>
            {/* General */}
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Home />} />

            <Route path="*" element={<NotFound />} />
        </Routes>
    );
}

export default AuthRoutes;
