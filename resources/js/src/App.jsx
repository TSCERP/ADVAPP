import React, { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import HeadMenu from "./layouts/HeadMenu.jsx";
import SideMenu from "./layouts/sidemenu.jsx";
import { BrowserRouter as Router } from "react-router-dom";
import Login from "./pages/(auth)/login.jsx";
import {
    Link,
    Routes,
    Route,
    useLocation,
    useNavigate,
} from "react-router-dom";
import {
    LuCheckCircle,
    LuTruck,
    LuUsers2,
    LuContact2,
    LuSettings,
    LuOrbit,
    LuKeyRound,
    LuUserCircle2,
    LuArchive,
    LuList,
    LuFileSignature,
    LuPlusCircle,
    LuBriefcase,
    LuGanttChartSquare,
    LuClipboardList,
    LuChevronRight,
    LuChevronLeft,
} from "react-icons/lu";
import PeContract from "../src/utils/icons/PeContract.jsx";
import PeApproval from "../src/utils/icons/PeApproval.jsx";
import PeDocument from "../src/utils/icons/PeDocument.jsx";
import PeSQ from "../src/utils/icons/PeSQ.jsx";
import PePO from "../src/utils/icons/PePO.jsx";
import PeVH from "../src/utils/icons/PeVH.jsx";
import PeCH from "../src/utils/icons/PeCH.jsx";
import PePR from "../src/utils/icons/PePR.jsx";
import { Menu } from "antd";
import IconLogo from "../src/assets/images/icon-logo.svg";
import XLLogo from "../src/assets/images/XLlogo.svg";
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
