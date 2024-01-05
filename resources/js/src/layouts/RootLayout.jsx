import React, { useEffect, useState } from "react";
import HeadMenu from "./headmenu.jsx";
import SideMenu from "./sidemenu.jsx";
import { Link, useLocation, useNavigate } from "react-router-dom";
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
import AppRoutes from "../routes/index.jsx";

const { Sider, Content } = Layout;

function getItem(label, key, icon, children, type) {
    return {
        label,
        key,
        icon,
        children,
        type,
    };
}

const items = [
    getItem(
        <div className="text-xs mt-2 font-semibold text-[#868686] uppercase">Transactions</div>,
        "transaction",
        null,
        [
            getItem("Approval", "approval", <PeApproval />, [
                getItem("Business", "business", <LuBriefcase />, [
                    getItem("Spot", "spot", <LuGanttChartSquare />,[
                        getItem("List", "/approval/business/spot", <LuList />),
                        getItem("Create", "/approval/business/spot/create", <LuPlusCircle />),
                        
                    ]),
                    getItem("FMS", "fms", <LuGanttChartSquare />,[
                        getItem("List", "/approval/business/fms", <LuList />),
                        getItem("Create", "/approval/business/fms/create", <LuPlusCircle />),
                        getItem("FMS Confirm", "/approval/business/fms/confirm", <LuCheckCircle />),
                    ]),
                    getItem("Yearly", "yearly", <LuGanttChartSquare />,[
                        getItem("List", "/approval/business/yearly", <LuList />),
                        getItem("Create", "/approval/business/yearly/create", <LuPlusCircle /> ),
                        
                    ]),
                ]),
                getItem("Budget", "budget", <LuBriefcase />, [
                    getItem("List", "/approval/budget", <LuList />),
                    getItem("Create", "/approval/budget/create", <LuPlusCircle />),
                ]),
                getItem("SG&A Cost", "sg&a", <LuBriefcase />, [
                    getItem("List", "approval/sg&a", <LuList />),
                    getItem("Create", "/approval/sg&a/create", <LuPlusCircle />),
                ]),
                getItem("Other", "other", <LuBriefcase />, [
                    getItem("List", "approval/other", <LuList />),
                    getItem("Create", "/approval/other/create", <LuPlusCircle />),
                ]),
            ]),
            getItem("Contract Management", "contractManagement", <PeContract />, [
                getItem("Contracts", "contracts", <LuClipboardList />, [
                    getItem("List", "/contract-management/contracts/", <LuList />),
                    getItem("Create", "/contract-management/contracts/create", <LuPlusCircle />),
                ]),
                getItem("Contract Appendix", "contractAppendix", <LuClipboardList />, [
                    getItem("List", "/contract-management/contract-appendix", <LuList />),
                    getItem("Create", "/contract-management/contract-appendix/create", <LuPlusCircle />),
                ]),
                getItem("Revised Appendix", "revisedAppendix", <LuClipboardList />, [
                    getItem("List", "/contract-management/revised-appendix/list", <LuList />),
                    getItem("Create", "/contract-management/revised-appendix/create", <LuPlusCircle />),
                ]),
                getItem("Liquidation", "liquidation", <LuClipboardList />, [
                    getItem("List", "/contract-management/liquidation", <LuList />),
                    getItem("Create", "/contract-management/liquidation/create", <LuPlusCircle />),
                ]),
            ]),
            getItem("Sales Quotation", "salesQuotation", <PeSQ />, [
                getItem("List", "/sales-quotation", <LuList />),
                getItem("Create", "/sales-quotation/create", <LuPlusCircle />),
            ]),
            getItem("Customer Handover", "customerHandover", <PeCH />, [
                getItem("List", "/customer-handover", <LuList />),
                getItem("Create", "/customer-handover/create", <LuPlusCircle />),
            ]),
            getItem("Purchase Order", "purchaseOrder", <PePO />, [
                getItem("List", "/purchase-order", <LuList />),
                getItem("Create", "/purchase-order/create", <LuPlusCircle />),
            ]),
            getItem("Vendor Handover", "vendorHandover", <PeVH />, [
                getItem("List", "/vendor-handover", <LuList />),
                getItem("Create", "/vendor-handover/create", <LuPlusCircle />),
            ]),
            getItem("Payment Request", "sub4", <PePR />, [
                getItem("List", "/payment-request", <LuList />),
                getItem("Create", "/payment-request/create", <LuPlusCircle />),
            ]),
        ],
        "group"
    ),
    getItem(
        <div className="text-xs mt-2 font-semibold text-[#868686] uppercase">Master Data</div>,
        "masterData",
        null,
        [
            getItem("Employees", "/employees", <LuContact2 />),
            getItem("Vendors", "/vendors", <LuTruck />),
            getItem("Customers", "/customers", <LuUsers2 />),
            getItem("Items", "/items", <LuArchive />),
        ],
        "group"
    ),
    getItem(
        <div className="text-xs mt-2 font-semibold text-[#868686] uppercase">Administration</div>,
        "administration",
        null,
        [
            getItem("Users", "/users", <LuUserCircle2 />),
            getItem("Roles", "/roles", <LuKeyRound />),
            getItem("Integration", "/integration", <LuOrbit />),
            getItem("Settings", "/settings", <LuSettings />),
        ],
        "group"
    ),      
];

function RootLayout({ children }) {
    const navigate = useNavigate();
    const [collapsed, setCollapsed] = useState(false);

    let location = useLocation();
    const [current, setCurrent] = useState(
        location.pathname === "/" || location.pathname === ""
            ? "/dashboard"
            : location.pathname,
    );
    //or simply use const [current, setCurrent] = useState(location.pathname)        

    useEffect(() => {
        if (location) {
            if( current !== location.pathname ) {
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
                        {/* <SideMenu
                            collapsed={collapsed}
                            handleCollapse={() => setCollapsed(!collapsed)}
                        /> */}
                        <div className="flex justify-start  mx-6 min-h-[60px] max-h-[60px] items-center space-x-2 border-b-2 border-b-[#232529] ">
                            <img src={IconLogo} className="w-8 h-8" />
                            <img src={XLLogo} className="h-7" />
                        </div>

                        <button
                            type="text"
                            className="toggle absolute top-2 -right-6 p-1 rounded-r-xl py-3 text-white bg-[#575757] z-50 active:scale-[.87] active:duration-75 transition-all"
                            onClick={() => setCollapsed(!collapsed)}
                        >
                            {collapsed ? (
                                <LuChevronRight className="w-5 h-5" />
                            ) : (
                                <LuChevronLeft className="w-5 h-5" />
                            )}
                        </button>

                        <div className="max-h-[92vh] pb-2 overflow-y-auto no-scrollbar overflow-x-hidden">
                            <Menu
                                mode="inline"
                                items={items}
                                className="pb-1" 
                                onClick={({ key }) => {
                                    navigate(key);
                                    setCurrent(key);
                                }}
                                selectedKeys={[current]}
                            />
                        </div>
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

export default RootLayout;
