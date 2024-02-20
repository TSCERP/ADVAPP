import React, { useState } from "react";
import "../assets/styles/index.css";
import { Link, useNavigate, NavLink } from "react-router-dom";
import { UserOutlined } from "@ant-design/icons";
import Avatar from "react-avatar";
import { Dropdown, Space } from "antd";
import { LuPenSquare, LuPlus, LuChevronDown } from "react-icons/lu";
import { BiSolidPlusCircle } from "react-icons/bi";
import useAppContext from "../store/AppContext";
import userApi from "../api/userApi";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
import PeSQ from "../utils/icons/PeSQ";
import PePO from "../utils/icons/PePO";
import PeVH from "../utils/icons/PeVH";
import PeCH from "../utils/icons/PeCH";
import PePR from "../utils/icons/PePR";
import { 
    PiNotepadDuotone, PiNotepadBold, PiClipboardTextDuotone, PiClipboardTextFill,
    PiNoteBold, PiNoteDuotone, PiClipboardTextBold 
} from "react-icons/pi";
import { ExclamationCircleFilled } from "@ant-design/icons";
import { Button, Modal, Popover } from "antd";
const { confirm } = Modal;

function HeadMenu() {
    const navigate = useNavigate();
    const { user, setUser, isAuthenticated, setIsAuthenticated } =
        useAppContext();
    const [open, setOpen] = useState(false);
    const [popoverOpen, setPopoverOpen] = useState(false);

    const handleSignOut = async (e) => {
        e.preventDefault();
        try {
            const response = await userApi.logout();
            console.log("Kết quả trả về từ API:", response);

            Cookies.remove("isAuthenticated");
            localStorage.removeItem("userInfo");
            toast.success("Signed out successfully!");
            setUser(null);
            setIsAuthenticated(false);
            setOpen(false);
            navigate("/login");
        } catch (error) {
            console.log("Lỗi đăng xuất:", error);
            toast.error("Couldn't sign out. Let's try again.");
        }
    };

    const showModal = () => {
        setOpen(true);
    };

    const handleCancel = () => {
        setOpen(false);
    };

    const hide = () => {
        setPopoverOpen(false);
    };

    const handleOpenChange = (newOpen) => {
        setPopoverOpen(newOpen);
    };

    const items = [
        {
            label: (
                <a className="font-medium text-[15px]" href="/profile">
                    Profile
                </a>
            ),
            key: "0",
        },
        {
            label: (
                <a className="font-medium text-[15px]" href="/settings">
                    Setting
                </a>
            ),
            key: "1",
        },
        {
            type: "divider",
        },
        {
            label: (
                <a className="font-medium text-[15px]" onClick={showModal}>
                    Sign Out
                </a>
            ),
            key: "2",
        },
    ];

    const create = (
        <div className="grid grid-cols-3 gap-3 p-2">
            <div className="w-[200px]">
                <p className="uppercase text-sm font-semibold text-[#228b22]">
                    Approvals
                </p>
                {/* <div className="border-b-2 border-[#d5e7d5] mt-2"></div> */}
                <ul className="mt-2 !text-[15px]">
                    <li className=" gap-x-3 w-full ">
                        <Link
                            to="/approval/business/spot/create"
                            onClick={hide}
                            className="group w-full flex items-center py-1.5 px-3 gap-x-3 rounded-lg hover:text-[#228b22] hover:bg-[#EFF6EF]"
                        > 
                            <PiNoteBold className="w-6 h-6 text-gray-700 group-hover:text-[#228b22] "/>
                            <div className=" font-medium w-full">Spot</div>
                        </Link>
                    </li>
                    <li className=" gap-x-3 w-full ">
                        <Link
                            to="/approval/business/fms/create"
                            onClick={hide}
                            className="group w-full flex items-center py-1.5 px-3 gap-x-3 rounded-lg hover:text-[#228b22] hover:bg-[#EFF6EF]"
                        > 
                            <PiNoteBold className="w-6 h-6 text-gray-700 group-hover:text-[#228b22] "/>
                            <div className="font-medium w-full">FMS</div>
                        </Link>
                    </li>
                    <li className=" gap-x-3 w-full ">
                        <Link
                            to="/approval/business/yearly/create"
                            onClick={hide}
                            className="group w-full flex items-center py-1.5 px-3 gap-x-3 rounded-lg hover:text-[#228b22] hover:bg-[#EFF6EF]"
                        > 
                            <PiNoteBold className="w-6 h-6 text-gray-700 group-hover:text-[#228b22] "/>
                            <div className="font-medium w-full">Yearly</div>
                        </Link>
                    </li>
                    <li className=" gap-x-3 w-full ">
                        <Link
                            to="/approval/budget/create"
                            onClick={hide}
                            className="group w-full flex items-center py-1.5 px-3 gap-x-3 rounded-lg hover:text-[#228b22] hover:bg-[#EFF6EF]"
                        > 
                            <PiNoteBold className="w-6 h-6 text-gray-700 group-hover:text-[#228b22] "/>
                            <div className="font-medium w-full">Budget</div>
                        </Link>
                    </li>
                    <li className=" gap-x-3 w-full ">
                        <Link
                            to="/approval/sg&a/create"
                            onClick={hide}
                            className="group w-full flex items-center py-1.5 px-3 gap-x-3 rounded-lg hover:text-[#228b22] hover:bg-[#EFF6EF]"
                        > 
                            <PiNoteBold className="w-6 h-6 text-gray-700 group-hover:text-[#228b22] "/>
                            <div className="font-medium w-full">SG&A</div>
                        </Link>
                    </li>
                    <li className=" gap-x-3 w-full ">
                        <Link
                            to="/approval/other/create"
                            onClick={hide}
                            className="group w-full flex items-center py-1.5 px-3 gap-x-3 rounded-lg hover:text-[#228b22] hover:bg-[#EFF6EF]"
                        >   
                            <PiNoteBold className="w-6 h-6 text-gray-700 group-hover:text-[#228b22] "/>
                            <div className="font-medium w-full ">Other</div>
                        </Link>
                    </li>
                </ul>
            </div>
            <div className="">
                <p className="uppercase text-sm font-semibold text-[#228b22]">
                    Contracts
                </p>
                <ul className=" !text-[15px] mt-2">
                    <li className=" gap-x-3 w-full ">
                        <Link
                            to="/contract-management/contracts/create"
                            onClick={hide}
                            className="group w-full flex items-center py-1.5 px-3 gap-x-3 rounded-lg hover:text-[#228b22] hover:bg-[#EFF6EF]"
                        > 
                            <PiClipboardTextBold className="w-6 h-6 text-gray-700 group-hover:text-[#228b22] "/>
                            <div className="font-medium w-full">Contract</div>
                        </Link>
                    </li>
                    <li className=" gap-x-3 w-full ">
                        <Link
                            to="/contract-management/contract-appendix/create"
                            onClick={hide}
                            className="group w-full flex items-center py-1.5 px-3 gap-x-3 rounded-lg hover:text-[#228b22] hover:bg-[#EFF6EF]"
                        > 
                            <PiClipboardTextBold className="w-6 h-6 text-gray-700 group-hover:text-[#228b22] "/>
                            <div className="font-medium w-full">Contract Appendix</div>
                        </Link>
                    </li>
                    <li className=" gap-x-3 w-full ">
                        <Link
                            to="/contract-management/revised-appendix/create"
                            onClick={hide}
                            className="group w-full flex items-center py-1.5 px-3 gap-x-3 rounded-lg hover:text-[#228b22] hover:bg-[#EFF6EF]"
                        > 
                            <PiClipboardTextBold className="w-6 h-6 text-gray-700 group-hover:text-[#228b22] "/>
                            <div className="font-medium w-full">Revised Appendix</div>
                        </Link>
                    </li>
                    <li className=" gap-x-3 w-full ">
                        <Link
                            to="/contract-management/liquidation/create"
                            onClick={hide}
                            className="group w-full flex items-center py-1.5 px-3 gap-x-3 rounded-lg hover:text-[#228b22] hover:bg-[#EFF6EF]"
                        > 
                            <PiClipboardTextBold className="w-6 h-6 text-gray-700 group-hover:text-[#228b22] "/>
                            <div className="font-medium w-full">Liquidation</div>
                        </Link>
                    </li>
                </ul>
            </div>
            <div className="w-[200px] ">
                <p className="uppercase text-sm font-semibold text-[#228b22]">
                    Others
                </p>
                <ul className="!text-[15px] mt-2">
                    <li className=" gap-x-3 w-full ">
                        <Link
                            to="/sales-quotation/create"
                            onClick={hide}
                            className="group w-full flex items-center py-[0.45rem] px-3 gap-x-3 rounded-lg hover:text-[#228b22] hover:bg-[#EFF6EF]"
                        > 
                            <PeSQ className="w-6 h-6 text-gray-400 group-hover:text-[#228b22] "/>
                            <div className="font-medium w-full">Sales Quotation</div>
                        </Link>
                    </li>
                    <li className=" gap-x-3 w-full ">
                        <Link
                            to="/customer-handover/create"
                            onClick={hide}
                            className="group w-full flex items-center py-[0.45rem] px-3 gap-x-3 rounded-lg hover:text-[#228b22] hover:bg-[#EFF6EF]"
                        > 
                            <PeCH className="w-6 h-6 text-gray-500 group-hover:text-[#228b22] "/>
                            <div className="font-medium w-full">Customer Handover</div>
                        </Link>
                    </li>
                    <li className=" gap-x-3 w-full ">
                        <Link
                            to="/purchase-order/create"
                            onClick={hide}
                            className="group w-full flex items-center py-[0.45rem] px-3 gap-x-3 rounded-lg hover:text-[#228b22] hover:bg-[#EFF6EF]"
                        > 
                            <PePO className="w-6 h-6 text-gray-500 group-hover:text-[#228b22] "/>
                            <div className="font-medium w-full">Purchase Order</div>
                        </Link>
                    </li>
                    <li className=" gap-x-3 w-full ">
                        <Link
                            to="/vendor-handover/create"
                            onClick={hide}
                            className="group w-full flex items-center py-[0.45rem] px-3 gap-x-3 rounded-lg hover:text-[#228b22] hover:bg-[#EFF6EF]"
                        > 
                            <PeVH className="w-6 h-6 text-gray-500 group-hover:text-[#228b22] "/>
                            <div className="font-medium w-full">Vendor Handover</div>
                        </Link>
                    </li>
                    <li className=" gap-x-3 w-full ">
                        <Link
                            to="/payment-request/create"
                            onClick={hide}
                            className="group w-full flex items-center py-[0.45rem] px-3 gap-x-3 rounded-lg hover:text-[#228b22] hover:bg-[#EFF6EF]"
                        > 
                            <PePR className="w-6 h-6 text-gray-500 group-hover:text-[#228b22] "/>
                            <div className="font-medium w-full">Payment Request</div>
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    );

    return (
        <div className="flex-no-wrap sticky flex justify-between items-center w-full max-h-[55px] min-h-[55px] px-6 border-b border-gray-200 shadow-[0_5px_20px_rgb(0,0,0,0.0.2)] top-0 z-40 bg-white">
            {/* Left Controller */}
            <Popover
                placement="bottomLeft"
                content={create}
                open={popoverOpen}
                onOpenChange={handleOpenChange}
                title=""
                trigger="click"
            >
                <button className="flex items-center text-[15px] ml-4 p-1.5 bg-gray-50 hover:bg-gray-200 border-2 border-gray-200 text-gray-800 rounded-full  px-3 font-medium gap-x-2">
                    <LuPlus className="flex items-center w-4 h-4 text-gray-500" />
                    <div className="font-semibold ">New Document</div>
                </button>
            </Popover>

            <Modal
                open={open}
                style={{
                    fontFamily: "Hanken Grotesk Variable, sans-serif",
                }}
                width={350}
                title="You're about to leave this page"
                titleFontSize={20}
                centered
                maskClosable={false}
                onCancel={handleCancel}
                footer={[
                    <button
                        className="p-2 px-4 font-medium text-[15px] bg-gray-100 hover:bg-gray-200 rounded-lg active:scale-[.87] active:duration-75 transition-all "
                        onClick={handleCancel}
                    >
                        Cancel
                    </button>,
                    <button
                        className="p-2 px-8 ml-4 font-medium text-[15px] bg-[#228b22] text-white rounded-lg active:scale-[.87] active:duration-75 transition-all hover:bg-[#216721]"
                        onClick={handleSignOut}
                    >
                        OK
                    </button>,
                ]}
            >
                <p className="text-base mb-8">Are you sure you want to sign out?</p>
            </Modal>

            {/* User Info*/}
            <Dropdown
                menu={{ items }}
                trigger={["click"]}
                arrow
                paddingBlock={5}
            >
                <button
                    className="p-1  bg-gray-100 rounded-full flex items-center space-x-2 text-[15px]"
                    onClick={(e) => e.preventDefault()}
                >
                    <Space>
                        {user &&
                        (user.avatar === null || user.avatar === "") ? (
                            <Avatar
                                name={user ? user.firstName : ""}
                                size="28"
                                round={true}
                                textSizeRatio={2}
                            />
                        ) : (
                            <Avatar
                                src={user ? user.avatar : ""}
                                size="28"
                                round={true}
                                textSizeRatio={2}
                            />
                        )}
                        <div className="flex  items-center mx-1 font-medium text-[15px]">
                            <p>
                                {(user?.firstName
                                    ? user?.firstName + " "
                                    : "") +
                                    (user?.LastName ? user?.LastName : "")}
                            </p>
                            <LuChevronDown className="flex ml-1 w-4 h-4 text-gray-500" />
                        </div>
                    </Space>
                </button>
            </Dropdown>
        </div>
    );
}

export default HeadMenu;
