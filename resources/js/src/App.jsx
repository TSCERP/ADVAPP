import React, { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import HeadMenu from "./layouts/headmenu.jsx";
import SideMenu from "./layouts/SideMenu.jsx";
import { BrowserRouter as Router, Navigate } from "react-router-dom";
import "../src/assets/styles/index.css";
import { Layout } from "antd";
import AppRoutes from "./routes/AppRoutes.jsx";
import AuthRoutes from "./routes/authRoutes.jsx";
import useAppContext from "./store/AppContext.jsx";
import ProtectedRoute from "./routes/ProtectedRoutes.jsx";
import Cookies from "js-cookie";

const { Sider, Content, Header } = Layout;

function App() {
    const [collapsed, setCollapsed] = useState(false);
    const { isAuthenticated } = useAppContext();
    const localStorageUser = localStorage.getItem("userInfo");
    const accessToken = localStorageUser ? JSON.parse(localStorageUser)?.access_token : null;

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
                            overflowY: "auto",
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
                    duration: 5000,
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
