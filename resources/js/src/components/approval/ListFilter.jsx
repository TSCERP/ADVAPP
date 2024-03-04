import React, {
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
} from "react";
import { Link } from "react-router-dom";
import {
    LuPenSquare,
    LuPlus,
    LuRefreshCcw,
    LuFilter,
    LuExternalLink,
    LuCircle,
    LuCheck,
    LuX,
    LuChevronDown,
    LuChevronUp,
    LuRotateCcw,
} from "react-icons/lu";
import { FiChevronDown } from "react-icons/fi";
import { IoFilter } from "react-icons/io5";
import { GrPowerReset } from "react-icons/gr";
// import "react-data-grid/lib/styles.css";
// import DataGrid from "react-data-grid";
// import { AgGridReact } from "ag-grid-react";
// import "ag-grid-enterprise";
// import "ag-grid-community/styles/ag-grid.css"; // Core CSS
// import "ag-grid-community/styles/ag-theme-quartz.css"; // Theme
// import StatusRenderer from "../../../../components/approval/business/StatusRenderer";
// import ControllerBtnRenderer from "../../../../components/approval/business/ControllerBtnRenderer";
// import ViewRenderer from "../../../../components/approval/business/ViewRenderer";
import toast from "react-hot-toast";

import { DatePicker, Space, Select, Checkbox, Badge, Input } from "antd";

const { RangePicker } = DatePicker;
const { Search } = Input;

const ListFilter = (props) => {
    const {} = props;

    // All state
    const [searchInput, setSearchInput] = useState("");
    const [expanded, setExpanded] = useState(false);
    const [enableClearFilter, setEnableClearFilter] = useState(true);

    const [newTradingChecked, setNewTradingChecked] = useState(false);
    const [selectedDateRange, setSelectedDateRange] = useState([]);
    const [selectedFromDate, setSelectedFromDate] = useState("");
    const [selectedToDate, setSelectedToDate] = useState("");
    const [selectedApprovalNo, setSelectedApprovalNo] = useState("");
    const [selectedStatus, setSelectedStatus] = useState("");
    const [selectedDivision, setSelectedDivision] = useState("");
    const [selectedDepartment, setSelectedDepartment] = useState("");
    const [selectedSection, setSelectedSection] = useState("");
    const [filters, setFilters] = useState([]);

    // Functions
    const toggleExpand = () => {
        setExpanded(!expanded);
    };

    const handleNewTradingCheck = () => {
        setNewTradingChecked(!newTradingChecked);
    };

    const addToFilters = (key, value) => {
        const existingFilterIndex = filters.findIndex(
            (filter) => filter[key] !== undefined
        );

        if (existingFilterIndex !== -1) {
            const updatedFilters = [...filters];
            updatedFilters[existingFilterIndex] = { [key]: value };
            setFilters(updatedFilters);
        } else {
            setFilters((prevFilters) => [...prevFilters, { [key]: value }]);
        }
    };

    const removeFromFilters = (key) => {
        setFilters((prevFilters) =>
            prevFilters.filter((filter) => !(key in filter))
        );
    };

    const handleClearFilters = () => {
        setFilters([]);
        setNewTradingChecked(false);
        setSelectedDateRange(null);
        setSelectedApprovalNo(null);
        setSelectedFromDate(null);
        setSelectedToDate(null);
        setSelectedStatus(null);
        setSelectedDivision(null);
        setSelectedDepartment(null);
        setSelectedSection(null);
    };

    return (
        <div className="flex flex-col items-center p-3.5 px-4 rounded-xl bg-white border border-[#DDDDDD] shadow-[0_8px_40px_rgb(0,0,0,0.10)] space-y-4 w-full h-full ">
            {/* Basic Filter */}
            <div className="flex w-full gap-x-4">
                {/* Search */}
                <div className="w-1/4">
                    <label className="text-[15px] font-semibold mb-1">
                        What are you looking for?
                    </label>
                    {/* <div className="relative mt-1">
                        <div className="absolute inset-y-0 start-0 flex items-center ps-4 pointer-events-none">
                            <svg
                                className="w-4 h-4 text-gray-500 "
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 20 20"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                                />
                            </svg>
                        </div>
                        <input
                            type="search"
                            id="default-search"
                            className="block w-full p-1.5 ps-12 text-[15px] text-gray-900 border border-gray-300 rounded-lg bg-gray-50 "
                            placeholder="Search Approvals"
                        />
                    </div> */}
                    <Search className="mt-1" placeholder="input search loading default" />
                </div>

                {/* Filter */}
                <div className="flex justify-between gap-x-1 items-end h-full w-3/4">
                    <div className="w-[80%] flex gap-x-3">
                        <div className="flex flex-col w-fit">
                            <label className="text-[14px] font-semibold mb-1">
                                Date Range:
                            </label>
                            <Space direction="vertical" size={10}>
                                <RangePicker
                                    style={{
                                        width: 240,
                                        fontFamily: "Inter, sans-serif",
                                        paddingTop: "7px",
                                        paddingBottom: "7px",
                                    }}
                                    showNow={true}
                                    onChange={(date, dateString) => {
                                        // setSelectedDateRange(
                                        //     dateString
                                        // );
                                        // setSelectedFromDate(
                                        //     dateString[0]
                                        // );
                                        // setSelectedToDate(
                                        //     dateString[1]
                                        // );
                                        // addToFilters(
                                        //     "selectedDateRange",
                                        //     dateString
                                        // );
                                        if (
                                            dateString[0] !== "" &&
                                            dateString[1] !== ""
                                        ) {
                                            setSelectedDateRange(dateString);
                                            setSelectedFromDate(dateString[0]);
                                            setSelectedToDate(dateString[1]);
                                            addToFilters(
                                                "selectedDateRange",
                                                dateString
                                            );
                                        } else {
                                            removeFromFilters(
                                                "selectedDateRange"
                                            );
                                        }
                                    }}
                                />
                            </Space>
                        </div>
                        <div className="flex flex-col w-full">
                            <label className="text-[14px] font-semibold mb-1">
                                Approval.No:
                            </label>
                            <Select
                                showSearch
                                allowClear
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    fontSize: "15px",
                                }}
                                placeholder="Search Approval No"
                                filterOption={(input, option) =>
                                    (option?.label ?? "").includes(input)
                                }
                                options={[
                                    {
                                        value: "1",
                                        label: "1903005-001",
                                    },
                                    {
                                        value: "2",
                                        label: "1903005-002",
                                    },
                                    {
                                        value: "3",
                                        label: "1903005-003",
                                    },
                                    {
                                        value: "4",
                                        label: "1903005-004",
                                    },
                                    {
                                        value: "5",
                                        label: "1903005-005",
                                    },
                                    {
                                        value: "6",
                                        label: "1903005-006",
                                    },
                                ]}
                                onSelect={(value) => {
                                    setSelectedApprovalNo(value);
                                    addToFilters("selectedApprovalNo", value);
                                }}
                                onClear={() =>
                                    removeFromFilters("selectedApprovalNo")
                                }
                            />
                        </div>
                        <div className="flex flex-col w-full">
                            <label className="text-[14px] font-semibold mb-1">
                                Approval Status:
                            </label>
                            <Select
                                showSearch
                                allowClear
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    fontSize: "15px",
                                }}
                                placeholder="Select Status"
                                optionFilterProp="children"
                                filterOption={(input, option) =>
                                    (option?.label ?? "").includes(input)
                                }
                                onSelect={(value) => {
                                    setSelectedStatus(value);
                                    console.log(
                                        "Selected Approval Status: ",
                                        filters
                                    );
                                    addToFilters("selectedStatus", value);
                                }}
                                onClear={() =>
                                    removeFromFilters("selectedStatus")
                                }
                                options={[
                                    {
                                        value: "1",
                                        label: "Draft",
                                    },
                                    {
                                        value: "2",
                                        label: "New",
                                    },
                                    {
                                        value: "3",
                                        label: "Waiting For Negotiator",
                                    },
                                    {
                                        value: "4",
                                        label: "Waiting For Permitter",
                                    },
                                    {
                                        value: "5",
                                        label: "Waiting For Approver",
                                    },
                                    {
                                        value: "6",
                                        label: "Closed",
                                    },
                                    {
                                        value: "7",
                                        label: "Revised",
                                    },
                                ]}
                            />
                        </div>
                    </div>

                    {/* Controller */}
                    <div className="w-full max-w-[20%] pl-2 flex justify-end gap-x-3 font-medium h-full">
                        <Badge
                            size="default"
                            count={filters.length}
                            className="relative"
                        >
                            <div
                                className={`flex justify-center items-center w-fit p-2 px-2.5 rounded-lg  text-gray-600 cursor-pointer active:scale-[.94] active:duration-75 transition-all ${
                                    filters.length > 0
                                        ? "border-2 border-[#A1C4A6] bg-gray-100"
                                        : "border-2 border-gray-300 bg-gray-100"
                                }`}
                                onClick={handleClearFilters}
                            >
                                {filters.length > 0 ? (
                                    <LuRotateCcw className="w-5 h-5" />
                                ) : (
                                    <IoFilter className="w-5 h-5" />
                                )}
                                {/* <div className="text-[15px]">Filter</div> */}
                            </div>
                        </Badge>
                        <button
                            className="flex justify-center items-center space-x-2 w-full max-w-lg: p-[9px] px-3 rounded-lg bg-[#3a6f41] hover:bg-[#216721] text-white cursor-pointer active:scale-[.94] active:duration-75 transition-all"
                            onClick={toggleExpand}
                        >
                            {expanded ? (
                                <>
                                    {/* <div>Filter</div> */}
                                    <LuChevronUp className="w-5 h-5" />
                                </>
                            ) : (
                                <>
                                    {/* <div>Filter</div> */}
                                    <LuChevronDown className="w-5 h-5" />
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Advanced Filter */}
            {expanded && (
                <div
                    className={` w-full h-full gap-x-4  ${
                        expanded ? "expanded" : "collapsed"
                    }`}
                >
                    {/* New Trading */}
                    <div className="w-1/5">
                        <label className="text-[14px] font-semibold mb-1">
                            New Trading:
                        </label>
                        <div
                            className={`flex  items-center font-medium justify-center cursor-pointer  p-1 h-[36px] rounded-full  mt-1 active:scale-[.94] active:duration-75 transition-all select-none ${
                                newTradingChecked
                                    ? "bg-[#ECF7ED] border-2 border-[#4F9352] text-[#49844C]"
                                    : "bg-gray-50 border-2 border-gray-300 text-gray-400"
                            }`}
                            onClick={handleNewTradingCheck}
                        >
                            {newTradingChecked ? (
                                <div className="flex gap-x-2 items-center">
                                    <span className="">Only New Trading</span>
                                    <LuCheck className="w-5 h-5" />
                                </div>
                            ) : (
                                <span className="">Only New Trading</span>
                            )}
                        </div>
                    </div>

                    {/* Filter */}
                    <div className="flex justify-between items-end h-full w-full">
                        <div className="grid grid-cols-3 w-full gap-x-3">
                            <div className="flex flex-col w-full">
                                <label className="text-[14px] font-semibold mb-1">
                                    Division:
                                </label>
                                <Select
                                    showSearch
                                    allowClear
                                    style={{
                                        width: "100%",
                                        height: "37px",
                                        fontSize: "15px",
                                    }}
                                    placeholder="Search Division"
                                    optionFilterProp="children"
                                    filterOption={(input, option) =>
                                        (option?.label ?? "").includes(input)
                                    }
                                    onSelect={(value) => {
                                        setSelectedDivision(value);
                                        addToFilters("selectedDivision", value);
                                    }}
                                    onClear={() =>
                                        removeFromFilters("selectedDivision")
                                    }
                                    options={[
                                        {
                                            value: "1",
                                            label: "Japan",
                                        },
                                        {
                                            value: "2",
                                            label: "United Kingdom",
                                        },
                                        {
                                            value: "3",
                                            label: "Vietnam",
                                        },
                                        {
                                            value: "4",
                                            label: "Hong Kong",
                                        },
                                        {
                                            value: "5",
                                            label: "Singapore",
                                        },
                                        {
                                            value: "6",
                                            label: "Malaysia",
                                        },
                                    ]}
                                />
                            </div>
                            <div className="flex flex-col w-full">
                                <label className="text-[14px] font-semibold mb-1">
                                    Department:
                                </label>
                                <Select
                                    showSearch
                                    allowClear
                                    style={{
                                        width: "100%",
                                        height: "37px",
                                        fontSize: "15px",
                                    }}
                                    placeholder="Search Department"
                                    optionFilterProp="children"
                                    filterOption={(input, option) =>
                                        (option?.label ?? "").includes(input)
                                    }
                                    onSelect={(value) => {
                                        setSelectedDepartment(value);
                                        addToFilters(
                                            "selectedDepartment",
                                            value
                                        );
                                    }}
                                    onClear={() =>
                                        removeFromFilters("selectedDepartment")
                                    }
                                    options={[
                                        {
                                            value: "1",
                                            label: "Binh Tan",
                                        },
                                        {
                                            value: "2",
                                            label: "Canary",
                                        },
                                        {
                                            value: "3",
                                            label: "Headquater",
                                        },
                                    ]}
                                />
                            </div>
                            <div className="flex flex-col w-full">
                                <label className="text-[14px] font-semibold mb-1">
                                    Section:
                                </label>
                                <Select
                                    showSearch
                                    allowClear
                                    style={{
                                        width: "100%",
                                        height: "37px",
                                        fontSize: "15px",
                                    }}
                                    placeholder="Search Section"
                                    optionFilterProp="children"
                                    filterOption={(input, option) =>
                                        (option?.label ?? "").includes(input)
                                    }
                                    onSelect={(value) => {
                                        setSelectedSection(value);
                                        addToFilters("selectedSection", value);
                                    }}
                                    onClear={() =>
                                        removeFromFilters("selectedSection")
                                    }
                                    options={[
                                        {
                                            value: "1",
                                            label: "Tan Phu",
                                        },
                                        {
                                            value: "2",
                                            label: "Binh Chanh",
                                        },
                                        {
                                            value: "3",
                                            label: "Binh Thanh",
                                        },
                                        {
                                            value: "4",
                                            label: "Tan Binh",
                                        },
                                        {
                                            value: "5",
                                            label: "Go Vap",
                                        },
                                    ]}
                                />
                            </div>
                        </div>

                        {/* Controller */}
                        {/* <div className="w-full max-w-[18%] pl-2 flex justify-end gap-x-2 font-medium h-full">
                    </div> */}
                    </div>
                </div>
            )}

            {/* Clear all filter */}
            {/* {filters.length > 0 && (
            <div className="flex w-full justify-between items-center font-semibold  ">
                <div>
                    <p>Filters: {JSON.stringify(filters)}</p>
                </div>

                <div className="flex items-center gap-x-2 rounded-full cursor-pointer px-4 text-gray-700 p-2 bg-gray-100 active:scale-[.94] active:duration-75 transition-all " onClick={handleClearFilters}>
                    <LuX className="w-4 h-4" />
                    <span>Clear all filter </span>
                </div>
            </div>
        )}     */}
        </div>
    );
};

export default ListFilter;
