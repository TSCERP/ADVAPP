import React, { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import HeadMenu from "./layouts/HeadMenu.jsx";
import SideMenu from "./layouts/SideMenu.jsx";
import { BrowserRouter as Router } from "react-router-dom";
import "../src/assets/styles/index.css";
import { Layout } from "antd";
import AppRoutes from "../src/routes/index.jsx";
import AuthRoutes from "./routes/authRoutes.jsx";
import useAppContext from "./store/AppContext.jsx";


const { Sider, Content, Header } = Layout;

function App() {
    const [collapsed, setCollapsed] = useState(false);
    const { isAuthenticated, setIsAuthenticated } = useAppContext();

    return (
        <Router>
            {!isAuthenticated ? (
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
