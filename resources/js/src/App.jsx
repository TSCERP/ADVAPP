import React, { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import HeadMenu from "./layouts/headmenu.jsx";
import SideMenu from "./layouts/SideMenu.jsx";
import { BrowserRouter as Router, Navigate } from "react-router-dom";
import "ag-grid-community/styles/ag-grid.css"; // Core CSS
import "ag-grid-community/styles/ag-theme-quartz.css";
import { Layout } from "antd";
import AppRoutes from "./routes/AppRoutes.jsx";
import AuthRoutes from "./routes/authRoutes.jsx";
import { useSelector } from "react-redux";
import ProtectedRoute from "./routes/ProtectedRoutes.jsx";
import Cookies from "js-cookie";

const { Sider, Content, Header } = Layout;

function App() {
    const { isAuthenticated, accessToken } = useSelector((state) => state.auth);

    const [collapsed, setCollapsed] = useState(false);

    return (
        <Router>
            {!isAuthenticated && !accessToken ? (
                <AuthRoutes />
            ) : (
                <Layout
                    style={{
                        minHeight: "100vh",
                        overflowY: "hidden",
                    }}
                >
                    <Sider
                        width={270}
                        collapsedWidth={80}
                        style={{
                            background: "#0D0D0D",
                            fontSize: "15px",
                        }}
                        collapsed={collapsed}
                        collapsible
                        trigger={null}
                    >
                        <SideMenu
                            collapsed={collapsed}
                            handleCollapse={() => setCollapsed(!collapsed)}
                        />
                    </Sider>
                    <Content
                        style={{
                            maxHeight: "100vh",
                            minHeight: "100vh",
                            overflowY: "auto",
                            fontSize: "15px",
                        }}
                    >
                        <HeadMenu />
                        <AppRoutes />
                    </Content>
                </Layout>
            )}
            <Toaster
                position="top-center"
                reverseOrder={false}
                gutter={8}
                containerClassName=""
                containerStyle={{
                    zIndex: 1000000,
                }}
                toastOptions={{
                    className: "",
                    duration: 3000,
                    style: {
                        background: "#363636",
                        color: "#fff",
                    },

                    success: {
                        duration: 3000,
                        theme: {
                            primary: "green",
                            secondary: "black",
                        },
                    },
                }}
            />
        </Router>
    );
}

export default App;
