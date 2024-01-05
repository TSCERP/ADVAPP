// import React from "react";
// import AppRoutes from "../routes";
// import RootLayout from "./RootLayout";
// import HeadMenu from "./headmenu.jsx";

// function BaseLayout({ children }) {
//     return (
//         <RootLayout>
//             <div className="">
//               <div>This is base layout:</div>
//               {children}
//             </div>
//         </RootLayout>
//     );
// }
//

// export default BaseLayout;

import React, { useEffect, useState } from "react";
import HeadMenu from "./HeadMenu.jsx";
import SideMenu from "./SideMenu.jsx";
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
import PeContract from "../utils/icons/PeContract.jsx";
import PeApproval from "../utils/icons/PeApproval.jsx";
import PeDocument from "../utils/icons/PeDocument.jsx";
import PeSQ from "../utils/icons/PeSQ.jsx";
import PePO from "../utils/icons/PePO.jsx";
import PeVH from "../utils/icons/PeVH.jsx";
import PeCH from "../utils/icons/PeCH.jsx";
import PePR from "../utils/icons/PePR.jsx";
import { Menu } from "antd";
import IconLogo from "../assets/images/icon-logo.svg";
import XLLogo from "../assets/images/XLlogo.svg";
import "../assets/styles/index.css";
import { Layout } from "antd";

const { Sider, Content } = Layout;
function BaseLayout({ children }) {
    // const navigate = useNavigate();
    const [collapsed, setCollapsed] = useState(false);

    let location = useLocation();
    const [current, setCurrent] = useState(
        location.pathname === "/" || location.pathname === ""
            ? "/dashboard"
            : location.pathname
    );

    useEffect(() => {
        if (location) {
            if (current !== location.pathname) {
                setCurrent(location.pathname);
            }
        }
    }, [location, current]);

    return (
        <Layout
            style={{
                minHeight: "100vh",
            }}
        >
            <div className="flex w-full">
                <Layout>
                    <Sider
                        width={270}
                        collapsedWidth={0}
                        style={{
                            background: "#0D0D0D",
                            height: "100vh",
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
                </Layout>

                {/* <HeadMenu /> */}
                <div className="w-full">
                    <HeadMenu />
                    {children}
                </div>
            </div>
        </Layout>
    );
}

export default BaseLayout;
