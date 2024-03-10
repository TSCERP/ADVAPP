import React, {
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
} from "react";
import { Link } from "react-router-dom";

// Import DataGrid
import { AgGridReact } from "ag-grid-react";
import "ag-grid-enterprise"; // Theme

import StatusRenderer from "../../../components/approval/business/StatusRenderer";
import ControllerBtnRenderer from "../../../components/approval/business/ControllerBtnRenderer";
import ViewRenderer from "../../../components/approval/business/ViewRenderer";
import ListFilter from "../../../components/approval/ListFilter";

import toast from "react-hot-toast";
import moment from "moment";

import { DatePicker, Space, Select, Checkbox, Badge } from "antd";
// Import Icon
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

// Get instance variables
const { RangePicker } = DatePicker;
const oldTitle = document.title;
const newTitle = "Approval SG&A List - Aeon Delight Vietnam";

function ApprovalSGAList() {
    // AG-Grid Attributes
    const paginationPageSizeSelector = useMemo(() => {
        return [10, 50, 100, 200];
    }, []);

    // Table Data
    const [rowData, setRowData] = useState([
        {
            id: 1,
            path: "/approval/sg&a",
            approvalNo: "1903005-001",
            approvalDate: "21/05/2020",
            subject: "Cung cấp dịch vụ vệ sinh hằng ngày tại AEON MALL",
            createdBy: "Tran Hanh Nguyen",
            updatedBy: "Nguyen Thanh Son",
            status: 1,
        },
        {
            id: 2,
            path: "/approval/sg&a",
            approvalNo: "1903005-001",
            approvalDate: "21/05/2020",
            subject: "Cung cấp dịch vụ vệ sinh hằng ngày tại AEON MALL",
            createdBy: "Tran Hanh Nguyen",
            updatedBy: "Nguyen Thanh Son",
            status: 2,
        },
        {
            id: 3,
            path: "/approval/sg&a",
            approvalNo: "1903005-001",
            approvalDate: "21/05/2020",
            subject: "Cung cấp dịch vụ vệ sinh hằng ngày tại AEON MALL",
            createdBy: "Tran Hanh Nguyen",
            updatedBy: "Nguyen Thanh Son",
            status: 8,
        },
        {
            id: 4,
            path: "/approval/sg&a",
            approvalNo: "1903005-001",
            approvalDate: "21/05/2020",
            subject: "Cung cấp dịch vụ vệ sinh hằng ngày tại AEON MALL",
            createdBy: "Tran Hanh Nguyen",
            updatedBy: "Nguyen Thanh Son",
            status: 4,
        },
        {
            id: 5,
            path: "/approval/sg&a",
            approvalNo: "1903005-001",
            approvalDate: "21/05/2020",
            subject: "Cung cấp dịch vụ vệ sinh hằng ngày tại AEON MALL",
            createdBy: "Tran Hanh Nguyen",
            updatedBy: "Nguyen Thanh Son",
            status: 6,
        },
        {
            id: 6,
            path: "/approval/sg&a",
            approvalNo: "1903005-001",
            approvalDate: "21/05/2020",
            subject: "Cung cấp dịch vụ vệ sinh hằng ngày tại AEON MALL",
            createdBy: "Tran Hanh Nguyen",
            updatedBy: "Nguyen Thanh Son",
            status: 7,
        },
        {
            id: 7,
            path: "/approval/sg&a",
            approvalNo: "1903005-001",
            approvalDate: "21/05/2020",
            subject: "Cung cấp dịch vụ vệ sinh hằng ngày tại AEON MALL",
            createdBy: "Tran Hanh Nguyen",
            updatedBy: "Nguyen Thanh Son",
            status: 5,
        },
        {
            id: 8,
            path: "/approval/sg&a",
            approvalNo: "1903005-001",
            approvalDate: "21/05/2020",
            subject: "Cung cấp dịch vụ vệ sinh hằng ngày tại AEON MALL",
            createdBy: "Tran Hanh Nguyen",
            updatedBy: "Nguyen Thanh Son",
            status: "Waiting For Permitter",
        },
        {
            id: 9,
            path: "/approval/sg&a",
            approvalNo: "1903005-001",
            approvalDate: "21/05/2020",
            subject: "Cung cấp dịch vụ vệ sinh hằng ngày tại AEON MALL",
            createdBy: "Tran Hanh Nguyen",
            updatedBy: "Nguyen Thanh Son",
            status: 3,
        },
        {
            id: 10,
            path: "/approval/sg&a",
            approvalNo: "1903005-001",
            approvalDate: "21/05/2020",
            subject: "Cung cấp dịch vụ vệ sinh hằng ngày tại AEON MALL",
            createdBy: "Tran Hanh Nguyen",
            updatedBy: "Nguyen Thanh Son",
            status: 3,
        },
        {
            id: 11,
            path: "/approval/sg&a",
            approvalNo: "1903005-012",
            approvalDate: "21/05/2020",
            subject: "Cung cấp dịch vụ vệ sinh hằng ngày tại AEON MALL",
            createdBy: "Tran Hanh Nguyen",
            updatedBy: "Nguyen Thanh Son",
            status: 1,
        },
        {
            id: 12,
            path: "/approval/sg&a",
            approvalNo: "1903005-008",
            approvalDate: "21/05/2020",
            subject: "Cung cấp dịch vụ vệ sinh hằng ngày tại AEON MALL",
            createdBy: "Tran Hanh Nguyen",
            updatedBy: "Nguyen Thanh Son",
            status: 2,
        },
        {
            id: 13,
            path: "/approval/sg&a",
            approvalNo: "1903005-005",
            approvalDate: "21/05/2020",
            subject: "Cung cấp dịch vụ vệ sinh hằng ngày tại AEON MALL",
            createdBy: "Tran Hanh Nguyen",
            updatedBy: "Nguyen Thanh Son",
            status: 1,
        },
        {
            id: 14,
            path: "/approval/sg&a",
            approvalNo: "1903005-004",
            approvalDate: "21/05/2020",
            subject: "Cung cấp dịch vụ vệ sinh hằng ngày tại AEON MALL",
            createdBy: "Tran Hanh Nguyen",
            updatedBy: "Nguyen Thanh Son",
            status: 1,
        },
        {
            id: 15,
            path: "/approval/sg&a",
            approvalNo: "1903005-003",
            approvalDate: "21/05/2020",
            subject: "Cung cấp dịch vụ vệ sinh hằng ngày tại AEON MALL",
            createdBy: "Tran Hanh Nguyen",
            updatedBy: "Nguyen Thanh Son",
            status: 3,
        },
        {
            id: 16,
            path: "/approval/sg&a",
            approvalNo: "1903005-002",
            approvalDate: "21/05/2020",
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
            filter: "agTextColumnFilter",
            cellRenderer: ViewRenderer,
        },
        {
            field: "approvalDate",
            maxWidth: 150,
            filterParams: {
                applyMiniFilterWhileTyping: true,
            },
            filter: "agTextColumnFilter",
        },
        {
            field: "subject",
            minWidth: 360,
            filter: "agTextColumnFilter",
        },
        {
            field: "createdBy",
            filter: "agTextColumnFilter",
        },
        {
            field: "updatedBy",
            filter: "agTextColumnFilter",
        },
        {
            field: "status",
            minWidth: 200,
            cellRenderer: StatusRenderer,
        },
        {
            field: "action",
            pinned: "right",
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

    /**
     *  All states defined here
     */
    const [filters, setFilters] = useState([]);
    const [searchKeyWord, setSearchKeyWord] = useState("");

    /**
     *  All refs defined here
     */
    const scrollRef = useRef(null);
    const gridRef = useRef(null);
    const selectRef = useRef();

    /**
     * All functions defined here
     */
    // Export Excel
    const onBtExport = useCallback(() => {
        gridRef.current.api.exportDataAsExcel();
        toast.success("Export successfully.");
    }, []);

    // Reload
    const onReload = () => {
        toast("This module is under development.");
    };

    /**
     *  All effects here
     */
    // Change document title
    useEffect(() => {
        document.title = newTitle;
        return () => {
            document.title = oldTitle;
        };
    }, []);

    return (
        <div className="min-h-[calc(100vh-60px)] bg-gradient-to-b transition-max-height duration-300 ease-in-out from-[#f5f4f4] to-[#fbfbfb] ">
            <div className="p-3.5 pb-4 px-5 space-y-4">
                {/* Header */}
                <div className="flex items-center justify-between w-full">
                    <div className="text-transparent bg-clip-text bg-gradient-to-r from-[#0D0D0D] to-[#3a6e42] text-[1.65rem] font-bold">
                        Approval SG&A
                        <span className="ml-2 !text-[0.75rem] font-bold">
                            (Selling, General & Administrative Expense)
                        </span>
                    </div>
                    <div className="flex gap-x-2">
                        <div
                            className="flex items-center gap-x-2 text-[15px] bg-[#fff] border-2 border-gray-300 text-gray-800 px-4 py-1.5 rounded-full font-medium  active:scale-[.94] active:duration-75 transition-all hover:bg-gray-100 cursor-pointer"
                            onClick={onBtExport}
                        >
                            <LuExternalLink className="flex items-center w-4 h-4 " />
                            Export
                        </div>
                        <div
                            className="flex items-center gap-x-2 text-[15px] bg-[#fff] border-2 border-gray-300 text-gray-800 px-4 py-1.5 rounded-full font-medium  active:scale-[.94] active:duration-75 transition-all hover:bg-gray-100 cursor-pointer"
                            onClick={onReload}
                        >
                            <LuRefreshCcw className="flex items-center w-4 h-4 " />
                            Reload
                        </div>
                        <Link to={"/approval/sg&a/create"}>
                            <div className="flex items-center gap-x-2 text-[15px] bg-[#3a6f41] hover:bg-[#216721] text-white px-4 py-[7px] rounded-full font-medium  active:scale-[.94] active:duration-75 transition-all ">
                                <LuPlus className="flex items-center w-4 h-4 text-white" />
                                Create New
                            </div>
                        </Link>
                    </div>
                </div>

                {/* Search & Filter Section */}
                <ListFilter type="sg&a" />

                {/* Data Table */}
                <div className="my-2  rounded-lg h-[calc(100vh-250px)]">
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
                            style={{ width: "100%", height: "100%" }}
                            pagination={true}
                            paginationPageSizeSelector={
                                paginationPageSizeSelector
                            }
                        />
                    </div>
                </div>
            </div>
            <div ref={scrollRef}></div>
        </div>
    );
}

export default ApprovalSGAList;
