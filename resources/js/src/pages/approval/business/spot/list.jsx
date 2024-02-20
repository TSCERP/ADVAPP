import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { 
    LuPenSquare, 
    LuPlus, 
    LuRefreshCcw, 
    LuFilter, 
    LuExternalLink, 
    LuCircle,
    LuCheck,
    LuX, 
} from "react-icons/lu";
// import "react-data-grid/lib/styles.css";

// import DataGrid from "react-data-grid";
import { AgGridReact } from "ag-grid-react";
import 'ag-grid-enterprise';
import "ag-grid-community/styles/ag-grid.css"; // Core CSS
import "ag-grid-community/styles/ag-theme-quartz.css"; // Theme
import { Link } from "react-router-dom";
import StatusRenderer from "./StatusRenderer";
import ControllerBtnRenderer from "./ControllerBtnRenderer";
import ViewRenderer from "./ViewRenderer";
import toast from "react-hot-toast";

import "../../../../assets/styles/index.css";

import { DatePicker, Space } from "antd";
import { Select, Checkbox, Badge } from "antd";
const { RangePicker } = DatePicker;

function ApprovalBusinessSpotList() {

    // AG-Grid Attributes
    const paginationPageSizeSelector = useMemo(() => {
        return [10, 50, 100, 200];
    }, []);

    // Table Data 
    const [rowData, setRowData] = useState([
        {
            approvalNo: "1903005-001" ,
            approvalDate: "21/05/2020" ,
            subject: "Cung cấp dịch vụ vệ sinh hằng ngày tại AEON MALL",
            createdBy: "Tran Hanh Nguyen",
            updatedBy: "Nguyen Thanh Son",
            status: 1,
        },
        {
            approvalNo: "1903005-001" ,
            approvalDate: "21/05/2020" ,
            subject: "Cung cấp dịch vụ vệ sinh hằng ngày tại AEON MALL",
            createdBy: "Tran Hanh Nguyen",
            updatedBy: "Nguyen Thanh Son",
            status: 2,
        },
        {
            approvalNo: "1903005-001" ,
            approvalDate: "21/05/2020" ,
            subject: "Cung cấp dịch vụ vệ sinh hằng ngày tại AEON MALL",
            createdBy: "Tran Hanh Nguyen",
            updatedBy: "Nguyen Thanh Son",
            status: 8,
        },
        {
            approvalNo: "1903005-001" ,
            approvalDate: "21/05/2020" ,
            subject: "Cung cấp dịch vụ vệ sinh hằng ngày tại AEON MALL",
            createdBy: "Tran Hanh Nguyen",
            updatedBy: "Nguyen Thanh Son",
            status: 4,
        },
        {
            approvalNo: "1903005-001" ,
            approvalDate: "21/05/2020" ,
            subject: "Cung cấp dịch vụ vệ sinh hằng ngày tại AEON MALL",
            createdBy: "Tran Hanh Nguyen",
            updatedBy: "Nguyen Thanh Son",
            status: 6,
        },
        {
            approvalNo: "1903005-001" ,
            approvalDate: "21/05/2020" ,
            subject: "Cung cấp dịch vụ vệ sinh hằng ngày tại AEON MALL",
            createdBy: "Tran Hanh Nguyen",
            updatedBy: "Nguyen Thanh Son",
            status: 7,
        },
        {
            approvalNo: "1903005-001" ,
            approvalDate: "21/05/2020" ,
            subject: "Cung cấp dịch vụ vệ sinh hằng ngày tại AEON MALL",
            createdBy: "Tran Hanh Nguyen",
            updatedBy: "Nguyen Thanh Son",
            status: 5,
        },
        {
            approvalNo: "1903005-001" ,
            approvalDate: "21/05/2020" ,
            subject: "Cung cấp dịch vụ vệ sinh hằng ngày tại AEON MALL",
            createdBy: "Tran Hanh Nguyen",
            updatedBy: "Nguyen Thanh Son",
            status: "Waiting For Permitter",
        },
        {
            approvalNo: "1903005-001" ,
            approvalDate: "21/05/2020" ,
            subject: "Cung cấp dịch vụ vệ sinh hằng ngày tại AEON MALL",
            createdBy: "Tran Hanh Nguyen",
            updatedBy: "Nguyen Thanh Son",
            status: 3,
        },
        {
            approvalNo: "1903005-001" ,
            approvalDate: "21/05/2020" ,
            subject: "Cung cấp dịch vụ vệ sinh hằng ngày tại AEON MALL",
            createdBy: "Tran Hanh Nguyen",
            updatedBy: "Nguyen Thanh Son",
            status: 3,
        },
        {
            approvalNo: "1903005-012" ,
            approvalDate: "21/05/2020" ,
            subject: "Cung cấp dịch vụ vệ sinh hằng ngày tại AEON MALL",
            createdBy: "Tran Hanh Nguyen",
            updatedBy: "Nguyen Thanh Son",
            status: 1,
        },
        {
            approvalNo: "1903005-008" ,
            approvalDate: "21/05/2020" ,
            subject: "Cung cấp dịch vụ vệ sinh hằng ngày tại AEON MALL",
            createdBy: "Tran Hanh Nguyen",
            updatedBy: "Nguyen Thanh Son",
            status: 2,
        },
        {
            approvalNo: "1903005-005" ,
            approvalDate: "21/05/2020" ,
            subject: "Cung cấp dịch vụ vệ sinh hằng ngày tại AEON MALL",
            createdBy: "Tran Hanh Nguyen",
            updatedBy: "Nguyen Thanh Son",
            status: 1,
        },
        {
            approvalNo: "1903005-004" ,
            approvalDate: "21/05/2020" ,
            subject: "Cung cấp dịch vụ vệ sinh hằng ngày tại AEON MALL",
            createdBy: "Tran Hanh Nguyen",
            updatedBy: "Nguyen Thanh Son",
            status: 1,
        },
        {
            approvalNo: "1903005-003" ,
            approvalDate: "21/05/2020" ,
            subject: "Cung cấp dịch vụ vệ sinh hằng ngày tại AEON MALL",
            createdBy: "Tran Hanh Nguyen",
            updatedBy: "Nguyen Thanh Son",
            status: 3,
        },
        {
            approvalNo: "1903005-002" ,
            approvalDate: "21/05/2020" ,
            subject: "Cung cấp dịch vụ vệ sinh hằng ngày tại AEON MALL",
            createdBy: "Tran Hanh Nguyen",
            updatedBy: "Nguyen Thanh Son",
            status: 4,
        },
    ]);

    // Column Definitions: Defines & controls grid columns.
    const [colDefs, setColDefs] = useState([
        { 
            field: "approvalNo",
            maxWidth: 150,
            filter: 'agNumberColumnFilter',
            cellRenderer: ViewRenderer,
        },
        { 
            field: "approvalDate",
            width: 150,
            filterParams: {
                applyMiniFilterWhileTyping: true,
            },
            filter: 'agDateColumnFilter',
        },
        { 
            field: "subject",
            minWidth: 360,
            filter: 'agTextColumnFilter',
        },
        { 
            field: "createdBy",
            filter: 'agTextColumnFilter',
        },
        { 
            field: "updatedBy",
            filter: 'agTextColumnFilter',
        },
        { 
            field: "status",
            minWidth: 200,
            cellRenderer: StatusRenderer,
        },
        { 
            field: "action",
            pinned: 'right',
            maxWidth: 120,
            cellRenderer: ControllerBtnRenderer,
        },
    ]);

    const defaultColDef = useMemo(() => {
        return {
          flex: 1,
          minWidth: 190,
          floatingFilter: true,
        };
      }, []);

    // All States
    const [expanded, setExpanded] = useState(false);

    const [newTradingChecked, setNewTradingChecked] = useState(false);

    const [enableClearFilter, setEnableClearFilter] = useState(true);

    const [selectedFromDate, setSelectedFromDate] = useState("");
    const [selectedToDate, setSelectedToDate] = useState("");
    const [selectedApprovalNo, setSelectedApprovalNo] = useState("");
    const [selectedStatus, setSelectedStatus] = useState("");
    const [selectedDivision, setSelectedDivision] = useState("");
    const [selectedDepartment, setSelectedDepartment] = useState("");
    const [selectedSection, setSelectedSection] = useState("");
    const [filters, setFilters] = useState([]);

    const scrollRef = useRef(null);
    const gridRef = useRef(null);

    const toggleExpand = () => {
        setExpanded(!expanded);
    };

    console.log("New Trading Checked: ", newTradingChecked);

    

    // Selection
    const addToFilters = (key, value) => {
        const existingFilterIndex = filters.findIndex(filter => filter[key] !== undefined);
    
        if (existingFilterIndex !== -1) {
          const updatedFilters = [...filters];
          updatedFilters[existingFilterIndex] = { [key]: value };
          setFilters(updatedFilters);
        } else {
          setFilters(prevFilters => [...prevFilters, { [key]: value }]);
        }
      };

    // Export Excel
    const onBtExport = useCallback(() => {
        gridRef.current.api.exportDataAsExcel();
        toast.success("Export successfully.");
      }, []);

    const handleNewTradingCheck = () => {
        setNewTradingChecked(!newTradingChecked);
    };

    // Filter
    const handleFilter = () => {
        scrollRef?.current?.scrollIntoView({ behavior: 'smooth' });
    };

    // Clear Filter
    const handleClearFilters = () => {
        setFilters([]);
        setNewTradingChecked(false);
        setSelectedApprovalNo(null);
        setSelectedFromDate("");
        setSelectedToDate("");
        setSelectedStatus("");
        setSelectedDivision("");
        setSelectedDepartment("");
        setSelectedSection("");

    }

    // Reload
    const onReload = () => {
        toast("This (Reload) module is under develpoping.");
    }

    // #f4f7f4
    // from-[#f2f2f2] to-[#fbfbfb]

    return (
        <div className="min-h-[calc(100vh-60px)] bg-gradient-to-b transition-max-height duration-300 ease-in-out from-[#f5f4f4] to-[#fbfbfb] ">
            <div className="p-4 pb-6 px-5 space-y-4">
                {/* Header */}
                <div className="flex items-center justify-between w-full">
                    <div className="text-transparent bg-clip-text bg-gradient-to-r from-[#0D0D0D] to-[#3a6e42] text-[1.7rem] font-bold">
                        Approval Spot
                    </div>
                    <div className="flex gap-x-3">
                        <div className="flex items-center gap-x-2 text-[15px] bg-[#fff] border-2 border-gray-300 text-gray-800 px-4 py-2 rounded-full font-medium  active:scale-[.94] active:duration-75 transition-all hover:bg-gray-100 cursor-pointer" onClick={onBtExport}>
                            <LuExternalLink className="flex items-center w-4 h-4 " />
                            Export
                        </div>
                        <div className="flex items-center gap-x-2 text-[15px] bg-[#fff] border-2 border-gray-300 text-gray-800 px-4 py-2 rounded-full font-medium  active:scale-[.94] active:duration-75 transition-all hover:bg-gray-100 cursor-pointer" onClick={onReload}>
                            <LuRefreshCcw className="flex items-center w-4 h-4 " />
                            Reload
                        </div>
                        <Link to={"/approval/business/spot/create"}>
                            <div className="flex items-center gap-x-2 text-[15px] bg-[#3a6f41] hover:bg-[#216721] text-white px-4 py-2 rounded-full font-medium  active:scale-[.94] active:duration-75 transition-all ">
                                <LuPlus className="flex items-center w-4 h-4 text-white" />
                                Create Approval
                            </div>
                        </Link>
                    </div>
                </div>

                {/* Search & Filter Section */}
                <div className="flex flex-col items-center p-4 px-4 rounded-xl bg-white border border-[#DDDDDD] shadow-[0_8px_40px_rgb(0,0,0,0.06)] space-y-4 w-full h-full ">
                    {/* Basic Filter */}
                    <div className="flex w-full gap-x-4">
                        {/* Search */}
                        <div className="w-1/4">
                            <label className="text-[15px] font-semibold mb-1">
                                What are you looking for?
                            </label>
                            <div className="relative mt-1">
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
                                    className="block w-full p-1.5 ps-12 text-[15px] text-gray-900 border border-gray-300 rounded-lg bg-gray-50  "
                                    placeholder="Search Approvals"
                                    required
                                />
                            </div>
                        </div>

                        {/* Filter */}
                        <div className="flex justify-between gap-x-1 items-end h-full w-3/4">
                            <div className="w-[80%] flex gap-x-3">
                                <div className="flex flex-col w-fit">
                                    <label className="text-[15px] font-semibold mb-1">
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
                                        />
                                    </Space>
                                </div>
                                <div className="flex flex-col w-full">
                                    <label className="text-[15px] font-semibold mb-1">
                                        Approval.No:
                                    </label>
                                    <Select
                                        showSearch
                                        style={{
                                            width: "100%",
                                            height: "100%",
                                            fontSize: "15px",
                                        }}
                                        placeholder="Search Approval No"
                                        filterOption={(input, option) =>
                                            (option?.label ?? "").includes(
                                                input
                                            )
                                        }
                                        options={[
                                            {
                                                value: "1",
                                                label: "Not Identified",
                                            },
                                            {
                                                value: "2",
                                                label: "Closed",
                                            },
                                            {
                                                value: "3",
                                                label: "Communicated",
                                            },
                                            {
                                                value: "4",
                                                label: "Identified",
                                            },
                                            {
                                                value: "5",
                                                label: "Resolved",
                                            },
                                            {
                                                value: "6",
                                                label: "Cancelled",
                                            },
                                        ]}
                                        onSelect={(value) => {
                                            setSelectedApprovalNo(value);
                                            addToFilters("selectedApprovalNo", value);
                                        }}
                                        onClear={handleClearFilters}
                                    />
                                </div>
                                <div className="flex flex-col w-full">
                                    <label className="text-[15px] font-semibold mb-1">
                                        Approval Status:
                                    </label>
                                    <Select
                                        showSearch
                                        style={{
                                            width: "100%",
                                            height: "100%",
                                            fontSize: "15px",
                                        }}
                                        placeholder="Select Status"
                                        optionFilterProp="children"
                                        filterOption={(input, option) =>
                                            (option?.label ?? "").includes(
                                                input
                                            )
                                        }
                                        onSelect={(value) => {
                                            setSelectedStatus(value);
                                            console.log("Selected Approval Status: ", filters);
                                            addToFilters("selectedStatus", value);
                                        }}
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
                                <Badge size="default" count={filters.length} className="relative">
                                    <div
                                        className={`flex justify-center items-center w-fit p-2 px-2.5 rounded-lg  text-gray-600 cursor-pointer active:scale-[.94] active:duration-75 transition-all ${expanded? "border-2 border-[#A1C4A6] bg-gray-100" : "border-2 border-gray-300 bg-gray-100"}`}
                                        onClick={toggleExpand}
                                    >
                                        <LuFilter className="w-5 h-5" />
                                    </div>
                                </Badge>
                                <button className="flex justify-center w-2/3 max-w-lg: p-2 px-3 rounded-lg bg-[#3a6f41] hover:bg-[#216721] text-white cursor-pointer active:scale-[.94] active:duration-75 transition-all" onClick={handleFilter}>
                                    Filter
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
                                <label className="text-[15px] font-semibold mb-1">
                                    New Trading:
                                </label>
                                <div className={`flex  items-center font-medium justify-center cursor-pointer  p-1 h-[36px] rounded-full  mt-1 active:scale-[.94] active:duration-75 transition-all select-none ${newTradingChecked? "bg-[#ECF7ED] border-2 border-[#4F9352] text-[#49844C]" : "bg-gray-50 border-2 border-gray-300 text-gray-400"}`} onClick={handleNewTradingCheck}>
                                    {newTradingChecked ? (
                                        <div className="flex gap-x-2 items-center">
                                            <span className="">Only New Trading</span>
                                            <LuCheck className="w-5 h-5"/> 
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
                                        <label className="text-[15px] font-semibold mb-1">
                                            Division:
                                        </label>
                                        <Select
                                            showSearch
                                            style={{
                                                width: "100%",
                                                height: "37px",
                                                fontSize: "15px",
                                            }}
                                            placeholder="Search Division"
                                            optionFilterProp="children"
                                            filterOption={(input, option) =>
                                                (option?.label ?? "").includes(
                                                    input
                                                )
                                            }
                                            onSelect={(value) => {
                                                setSelectedDivision(value);
                                                addToFilters("selectedDivision", value);
                                            }}
                                            options={[
                                                {
                                                    value: "1",
                                                    label: "Not Identified",
                                                },
                                                {
                                                    value: "2",
                                                    label: "Closed",
                                                },
                                                {
                                                    value: "3",
                                                    label: "Communicated",
                                                },
                                                {
                                                    value: "4",
                                                    label: "Identified",
                                                },
                                                {
                                                    value: "5",
                                                    label: "Resolved",
                                                },
                                                {
                                                    value: "6",
                                                    label: "Cancelled",
                                                },
                                            ]}
                                        />
                                    </div>
                                    <div className="flex flex-col w-full">
                                        <label className="text-[15px] font-semibold mb-1">
                                            Department:
                                        </label>
                                        <Select
                                            showSearch
                                            style={{
                                                width: "100%",
                                                height: "37px",
                                                fontSize: "15px",
                                            }}
                                            placeholder="Search Department"
                                            optionFilterProp="children"
                                            filterOption={(input, option) =>
                                                (option?.label ?? "").includes(
                                                    input
                                                )
                                            }
                                            onSelect={(value) => {
                                                setSelectedDepartment(value);
                                                addToFilters("selectedDepartment", value);
                                            }}
                                            options={[
                                                {
                                                    value: "1",
                                                    label: "Not Identified",
                                                },
                                                {
                                                    value: "2",
                                                    label: "Closed",
                                                },
                                                {
                                                    value: "3",
                                                    label: "Communicated",
                                                },
                                                {
                                                    value: "4",
                                                    label: "Identified",
                                                },
                                                {
                                                    value: "5",
                                                    label: "Resolved",
                                                },
                                                {
                                                    value: "6",
                                                    label: "Cancelled",
                                                },
                                            ]}
                                        />
                                    </div>
                                    <div className="flex flex-col w-full">
                                        <label className="text-[15px] font-semibold mb-1">
                                            Section:
                                        </label>
                                        <Select
                                            showSearch
                                            style={{
                                                width: "100%",
                                                height: "37px",
                                                fontSize: "15px",
                                            }}
                                            placeholder="Search Section"
                                            optionFilterProp="children"
                                            filterOption={(input, option) =>
                                                (option?.label ?? "").includes(
                                                    input
                                                )
                                            }
                                            onSelect={(value) => {
                                                setSelectedSection(value);
                                                addToFilters("selectedSection", value);
                                            }}
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
                                {/* <div className="w-full max-w-[18%] pl-2 flex justify-end gap-x-2 font-medium h-full">
                                </div> */}
                            </div>
                        </div>
                    )}
                    
                    {/* Clear all filter */}
                    {filters.length > 0 && (
                        <div className="flex w-full justify-between items-center font-semibold  ">
                            {/* Hiển thị mảng filters để kiểm tra */}
                            <div>
                                <p>Filters: {JSON.stringify(filters)}</p>
                            </div>

                            <div className="flex items-center gap-x-2 rounded-full cursor-pointer px-4 text-gray-700 p-2 bg-gray-100 active:scale-[.94] active:duration-75 transition-all " onClick={handleClearFilters}>
                                <LuX className="w-4 h-4" />
                                <span>Clear all filter </span>
                            </div>
                        </div>
                    )}    
                </div>

                {/* Data Table */}
                <div  className="my-2  rounded-lg h-[calc(100vh-220px)]">
                        <div
                            className="ag-theme-quartz h-full max-h-full"
                            style={{
                                fontFamily: "Inter, sans-serif",
                                height: "100%",
                            }}
                        >
                            <AgGridReact
                                ref={gridRef}
                                rowData={rowData}
                                columnDefs={colDefs}
                                defaultColDef={defaultColDef}
                                style={{ width: '100%', height: '100%' }}
                                pagination={true}
                                paginationPageSizeSelector={paginationPageSizeSelector}
                                
                            />
                        </div>
                </div>
            </div>
            <div ref={scrollRef} ></div>
        </div>
    );
}

export default ApprovalBusinessSpotList;
