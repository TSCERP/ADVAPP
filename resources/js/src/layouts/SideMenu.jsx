import React, { useEffect, useMemo, useState } from "react";

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
import Icon from '@ant-design/icons';
import PeContract from "../utils/icons/PeContract";
import PeApproval from "../utils/icons/PeApproval";
import PeDocument from "../utils/icons/PeDocument";
import PeSQ from "../utils/icons/PeSQ";
import PePO from "../utils/icons/PePO";
import PeVH from "../utils/icons/PeVH";
import PeCH from "../utils/icons/PeCH";
import PePR from "../utils/icons/PePR";
import {
    AppstoreOutlined,
    MailOutlined,
    SettingOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import IconLogo from "../assets/images/icon-logo.svg";
import XLLogo from "../assets/images/XLlogo.svg";
import "../assets/styles/index.css";
import { useLocation, useNavigate } from "react-router-dom";

const SideMenu = React.memo((props) => {
    const { collapsed, handleCollapse } = props;
    const navigate = useNavigate();

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
            <div className="">
                <div className="flex justify-start  mx-6 min-h-[60px] max-h-[60px] items-center space-x-2 border-b-2 border-b-[#232529] ">
                    <img src={IconLogo} className="w-8 h-8" />
                    <img src={XLLogo} className="h-7" />
                </div>

                <button
                    type="text"
                    className="toggle absolute top-3 -right-4 p-1.5 rounded-full  text-white bg-[#575757] z-50 active:scale-[.87] active:duration-75 transition-all"
                    onClick={handleCollapse}
                >
                    {collapsed ? (
                        <LuChevronRight className="w-5 h-5" />
                    ) : (
                        <LuChevronLeft className="w-5 h-5" />
                    )}
                </button>

                <div className="max-h-[92vh] overflow-y-auto no-scrollbar overflow-x-hidden">
                    <Menu
                        mode="inline"
                        items={[
                            {
                                label: (
                                    <>
                                        {!collapsed ? <div className="text-xs mt-2 font-semibold text-[#868686] uppercase">Transactions</div> : <div className="h-[8px]"></div>}
                                    </>
                                ),
                                key: "transaction",
                                children: [
                                    {
                                        label: "Approval",
                                        key: "approval",
                                        icon: <Icon component={PeApproval} />,
                                        children: [
                                            {
                                                label: "Business",
                                                key: "business",
                                                icon: <LuBriefcase />,
                                                children: [
                                                    {
                                                        label: "Spot",
                                                        key: "/approval/business/spot",
                                                        icon: (
                                                            <LuGanttChartSquare />
                                                        ),
                                                    },
                                                    {
                                                        label: "FMS",
                                                        key: "/approval/business/fms",
                                                        icon: (
                                                            <LuGanttChartSquare />
                                                        ),
                                                    },
                                                    {
                                                        label: "Yearly",
                                                        key: "/approval/business/yearly",
                                                        icon: (
                                                            <LuGanttChartSquare />
                                                        ),
                                                    },
                                                ],
                                            },
                                            {
                                                label: "Budget",
                                                key: "/approval/budget",
                                                icon: <LuBriefcase />,
                                            },
                                            {
                                                label: "SG&A",
                                                key: "/approval/sg&a",
                                                icon: <LuBriefcase />,
                                            },
                                            {
                                                label: "Other",
                                                key: "/approval/other",
                                                icon: <LuBriefcase />,
                                            },
                                        ],
                                    },
                                    {
                                        label: "Contract Management",
                                        key: "contractManagement",
                                        icon: <PeContract />,
                                        children: [
                                            {
                                                label: "Contract",
                                                key: "/contract-management/contracts/",
                                                icon: <LuClipboardList />,
                                            },
                                            {
                                                label: "Contract Appendix",
                                                key: "/contract-management/contract-appendix",
                                                icon: <LuClipboardList />,
                                            },
                                            {
                                                label: "Revised Appendix",
                                                key: "/contract-management/revised-appendix/",
                                                icon: <LuClipboardList />,
                                            },
                                            {
                                                label: "Liquidation",
                                                key: "/contract-management/liquidation",
                                                icon: <LuClipboardList />,
                                            },
                                        ],
                                    },
                                    {
                                        label: "Sales Quotation",
                                        key: "/sales-quotation",
                                        icon: <PeSQ />,
                                    },
                                    {
                                        label: "Customer Handover",
                                        key: "/customer-handover",
                                        icon: <PeCH />,
                                    },
                                    {
                                        label: "Purchase Order",
                                        key: "/purchase-order",
                                        icon: <PePO />,
                                    },
                                    {
                                        label: "Vendor Handover",
                                        key: "/vendor-handover",
                                        icon: <PeVH />,
                                    },
                                    {
                                        label: "Payment Request",
                                        key: "/payment-request",
                                        icon: <PePR />,
                                    },
                                ],
                                type: "group",
                            },
                            {
                                label: (
                                    <>
                                        {!collapsed ? <div className="text-xs mt-2 font-semibold text-[#868686] uppercase">Master Data</div> : <div className="h-[8px] border-b-2 border-[#232529] mx-3"></div>}
                                    </>                                    
                                ),
                                key: "masterData",
                                children: [
                                    {
                                        label: "Employees",
                                        key: "/employees",
                                        icon: <LuContact2 />,
                                    },
                                    {
                                        label: "Vendors",
                                        key: "/vendors",
                                        icon: <LuTruck />,
                                    },
                                    {
                                        label: "Customers",
                                        key: "/customers",
                                        icon: <LuUsers2 />,
                                    },
                                    {
                                        label: "Items",
                                        key: "/items",
                                        icon: <LuArchive />,
                                    },
                                ],
                                type: "group",
                            },
                            {
                                label: (
                                    <>
                                    {!collapsed ? <div className="text-xs mt-2 font-semibold text-[#868686] uppercase">Administration</div> : <div className="h-[8px] border-b-2 border-[#232529] mx-3"></div>}
                                    </>                                      
                                ),
                                key: "administration",
                                children: [
                                    {
                                        label: "Users",
                                        key: "/users",
                                        icon: <LuUserCircle2 />,
                                    },
                                    {
                                        label: "Roles",
                                        key: "/roles",
                                        icon: <LuKeyRound />,
                                    },
                                    {
                                        label: "Integration",
                                        key: "/integration",
                                        icon: <LuOrbit />,
                                    },
                                    {
                                        label: "Settings",
                                        key: "/settings",
                                        icon: <LuSettings />,
                                    },
                                ],
                                type: "group",
                            },
                        ]}
                        className="pb-2"
                        selectedKeys={[current]}
                        onClick={({ key }) => {
                            navigate(key);
                            setCurrent(key);
                        }}
                    />
                </div>
            </div>
        );

});

export default SideMenu;
