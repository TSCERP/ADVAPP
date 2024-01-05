import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserOutlined } from "@ant-design/icons";
import Avatar from "react-avatar";
import { Dropdown, Space } from "antd";
import { LuPenSquare, LuPlus, LuChevronDown } from "react-icons/lu";
import useAppContext from "../store/AppContext";

function HeadMenu() {
    const navigate = useNavigate();
    const { isAuthenticated, setIsAuthenticated } = useAppContext();

    const handleSignOut = async (e) => {
        e.preventDefault();

        setIsAuthenticated(false);
        console.log("Xác thực:", isAuthenticated);
        navigate("/login");
    };

    const items = [
        {
            label: (
                <a className="text-[14px]" href="/profile">
                    Profile
                </a>
            ),
            key: "0",
        },
        {
            label: (
                <a className="text-[14px]" href="/settings">
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
                <div className="text-[14px]" onClick={handleSignOut}>
                    Sign Out
                </div>
            ),
            key: "3",
        },
    ];

    return (
        <div className="flex-no-wrap sticky flex justify-between items-center w-full max-h-[60px] min-h-[60px] px-6 border-b-2 border-gray-200  top-0 z-40 bg-white">
            {/* Left Controller */}
            <button className="flex items-center text-[14px] ml-2 p-1.5 bg-gray-50 hover:bg-gray-200 border-2 border-gray-200 text-gray-800 rounded-full  px-3 font-medium gap-x-2">
                <LuPlus className="flex items-center w-4 h-4 text-gray-500" />
                <div className="font-semibold ">Create</div>
                {/* <LuPenSquare className="w-5 h-5"/> */}
            </button>

            {/* User Info*/}
            <Dropdown
                menu={{items}}
                trigger={["click"]}
                arrow
                paddingBlock={5}
            >
                <button
                    className="p-1  bg-gray-100 rounded-full flex items-center space-x-2 text-[14px]"
                    onClick={(e) => e.preventDefault()}
                >
                    <Space>
                        <Avatar
                            name="P"
                            size="28"
                            round={true}
                            textSizeRatio={2}
                        />
                        <div className="flex  items-center mx-1 font-medium text-[14px]">
                            <p>Phuoc Nguyen Quang</p>
                            <LuChevronDown className="flex ml-1 w-4 h-4 text-gray-500" />
                        </div>
                    </Space>
                </button>
            </Dropdown>
        </div>
    );
}

export default HeadMenu;
