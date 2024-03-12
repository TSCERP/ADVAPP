import React, {
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
} from "react";
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
import { AgGridReact } from "ag-grid-react";
import "ag-grid-enterprise";
// import "ag-grid-community/styles/ag-grid.css"; // Core CSS
// import "ag-grid-community/styles/ag-theme-quartz.css"; // Theme
import { Link } from "react-router-dom";
import StatusRenderer from "../../components/approval/business/StatusRenderer";
import DemoControllerBtnRenderer from "../../components/demo/DemoControllerBtnRenderer";
import ViewRenderer from "../../components/approval/business/ViewRenderer";
import DemoListFilterApproval from "../../components/demo/DemoListFilterApproval";
import toast from "react-hot-toast";
import moment from "moment";

import { DatePicker, Space } from "antd";
import { Select, Checkbox, Badge } from "antd";
import formatNumberWithCommas from "../../utils/number/formatNumberWithCommas";

const { RangePicker } = DatePicker;
const oldTitle = document.title;
const newTitle = "Approval Request List - Demo";

function DemoApproval() {
    // AG-Grid Attributes
    const paginationPageSizeSelector = useMemo(() => {
        return [10, 50, 100, 200];
    }, []);

    // Table Data
    const [rowData, setRowData] = useState([
        {
            id: 1,
            path: "/approval",
            approvalNo: "1903005-001",
            approvalDate: "21/05/2020",
            businessReason: "Daily hygiene services",
            createdBy: "Nguyen Thanh Nguyen",
            employeeCode: "000035",
            amount: 1200000,
            currency: "VND",
        },
        {
            id: 2,
            path: "/approval",
            approvalNo: "1903005-002",
            approvalDate: "22/05/2020",
            businessReason: "Office supplies",
            createdBy: "Tran Van A",
            employeeCode: "000036",
            amount: 80000,
            currency: "USD",
        },
        {
            id: 3,
            path: "/approval",
            approvalNo: "1903005-003",
            approvalDate: "23/05/2020",
            businessReason: "Business travel expenses",
            createdBy: "Le Thi C",
            employeeCode: "000037",
            amount: 500000,
            currency: "VND",
        },
        {
            id: 4,
            path: "/approval",
            approvalNo: "1903005-004",
            approvalDate: "24/05/2020",
            businessReason: "Meeting expenses",
            createdBy: "Pham Van D",
            employeeCode: "000038",
            amount: 700000,
            currency: "USD",
        },
        {
            id: 5,
            path: "/approval",
            approvalNo: "1903005-005",
            approvalDate: "25/05/2020",
            businessReason: "Equipment purchase",
            createdBy: "Tran Thi E",
            employeeCode: "000039",
            amount: 1500000,
            currency: "VND",
        },
        {
            id: 6,
            path: "/approval",
            approvalNo: "1903005-006",
            approvalDate: "26/05/2020",
            businessReason: "Training expenses",
            createdBy: "Le Van F",
            employeeCode: "000040",
            amount: 90000,
            currency: "USD",
        },
        {
            id: 7,
            path: "/approval",
            approvalNo: "1903005-007",
            approvalDate: "27/05/2020",
            businessReason: "Marketing campaign",
            createdBy: "Nguyen Van G",
            employeeCode: "000041",
            amount: 600000,
            currency: "VND",
        },
        {
            id: 8,
            path: "/approval",
            approvalNo: "1903005-008",
            approvalDate: "28/05/2020",
            businessReason: "Software license renewal",
            createdBy: "Tran Van H",
            employeeCode: "000042",
            amount: 120000,
            currency: "USD",
        },
        {
            id: 9,
            path: "/approval",
            approvalNo: "1903005-009",
            approvalDate: "29/05/2020",
            businessReason: "Team building event",
            createdBy: "Le Thi I",
            employeeCode: "000043",
            amount: 800000,
            currency: "VND",
        },
        {
            id: 10,
            path: "/approval",
            approvalNo: "1903005-010",
            approvalDate: "30/05/2020",
            businessReason: "Office furniture purchase",
            createdBy: "Pham Van J",
            employeeCode: "000044",
            amount: 2000000,
            currency: "USD",
        },
        {
            id: 11,
            path: "/approval",
            approvalNo: "1903005-011",
            approvalDate: "31/05/2020",
            businessReason: "Travel reimbursement",
            createdBy: "Tran Van K",
            employeeCode: "000045",
            amount: 450000,
            currency: "VND",
        },
        {
            id: 12,
            path: "/approval",
            approvalNo: "1903005-012",
            approvalDate: "01/06/2020",
            businessReason: "Consulting services",
            createdBy: "Nguyen Van L",
            employeeCode: "000046",
            amount: 180000,
            currency: "USD",
        },
        {
            id: 13,
            path: "/approval",
            approvalNo: "1903005-013",
            approvalDate: "02/06/2020",
            businessReason: "Product launch event",
            createdBy: "Tran Van M",
            employeeCode: "000047",
            amount: 1000000,
            currency: "VND",
        },
        {
            id: 14,
            path: "/approval",
            approvalNo: "1903005-014",
            approvalDate: "03/06/2020",
            businessReason: "Website redesign",
            createdBy: "Le Thi N",
            employeeCode: "000048",
            amount: 60000,
            currency: "USD",
        },
        {
            id: 15,
            path: "/approval",
            approvalNo: "1903005-015",
            approvalDate: "04/06/2020",
            businessReason: "Employee training program",
            createdBy: "Pham Van O",
            employeeCode: "000049",
            amount: 700000,
            currency: "VND",
        },
        {
            id: 16,
            path: "/approval",
            approvalNo: "1903005-016",
            approvalDate: "05/06/2020",
            businessReason: "IT infrastructure upgrade",
            createdBy: "Tran Van P",
            employeeCode: "000050",
            amount: 350000,
            currency: "USD",
        },
    ]);

    // Column Definitions: Defines & controls grid columns.
    const [colDefs, setColDefs] = useState([
        {
            field: "id",
            minWidth: 110,
            sort: "asc",
            filter: "agTextColumnFilter",
            headerCheckboxSelection: true,
            checkboxSelection: true,
        },
        {
            headerName: "Request No.",
            field: "approvalNo",
            minWidth: 150,
            filter: "agTextColumnFilter",
            cellRenderer: ViewRenderer,
        },
        {
            headerName: "Employee Name",
            field: "createdBy",
            minWidth: 200,
            filter: "agTextColumnFilter",
        },
        {
            headerName: "Employee Code",
            field: "employeeCode",
            minWidth: 200,
            filter: "agTextColumnFilter",
        },
        {
            headerName: "Request Date",
            field: "approvalDate",
            maxWidth: 150,
            filterParams: {
                applyMiniFilterWhileTyping: true,
            },
            filter: "agTextColumnFilter",
        },
        {
            field: "businessReason",
            minWidth: 300,
            filter: "agTextColumnFilter",
        },
        {
            field: "amount",
            minWidth: 150,
            filter: "agTextColumnFilter",
            cellRenderer: ({ data }) => (
                <span>{`${formatNumberWithCommas(data.amount)}`}</span>
            ),
        },
        {
            field: "currency",
            minWidth: 140,
            filter: "agTextColumnFilter",
        },
        {
            field: "action",
            pinned: "right",
            maxWidth: 180,
            cellRenderer: DemoControllerBtnRenderer,
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
    const [filters, setFilters] = useState([]);
    const [searchKeyWord, setSearchKeyWord] = useState("");

    const scrollRef = useRef(null);
    const gridRef = useRef(null);

    // Export Excel
    const onBtExport = useCallback(() => {
        gridRef.current.api.exportDataAsExcel();
        toast.success("Export successfully.");
    }, []);

    // Filter Button
    const handleFilter = () => {
        scrollRef?.current?.scrollIntoView({ behavior: "smooth" });
    };

    const selectRef = useRef();

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

    // #f4f7f4
    // from-[#f2f2f2] to-[#fbfbfb]

    return (
        <div className="min-h-[calc(100vh-60px)] bg-gradient-to-b transition-max-height duration-300 ease-in-out from-[#f5f4f4] to-[#fbfbfb] ">
            <div className="p-3.5 pb-4 px-5 space-y-4">
                {/* Header */}
                <div className="flex items-center justify-between w-full">
                    <div className="text-transparent bg-clip-text bg-gradient-to-r from-[#0D0D0D] to-[#3a6e42] text-[1.65rem] font-bold">
                        Approval Request
                    </div>
                    <div className="flex gap-x-2">
                        <div className="flex items-center gap-x-2">
                            <span className="mr-1">(2 selected)</span>
                            <div className="flex items-center gap-x-2 text-[15px] bg-green-500 border-2 border-gray-300 text-white px-4 py-1.5 rounded-full font-medium  active:scale-[.94] active:duration-75 transition-all hover:bg-green-300 cursor-pointer">
                                <LuExternalLink className="flex items-center w-4 h-4 " />
                                Acccept
                            </div>
                            <div className="flex items-center gap-x-2 text-[15px] bg-red-500 border-2 border-gray-300 text-white px-4 py-1.5 rounded-full font-medium  active:scale-[.94] active:duration-75 transition-all hover:bg-red-300 cursor-pointer">
                                <LuExternalLink className="flex items-center w-4 h-4 " />
                                Reject
                            </div>
                        </div>
                        <hr className="bg-black rotate-90 w-5 h-[120%] mx-2 my-auto"></hr>
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
                        <Link to={"/approval/business/spot/create"}>
                            <div className="flex items-center gap-x-2 text-[15px] bg-[#3a6f41] hover:bg-[#216721] text-white px-4 py-[7px] rounded-full font-medium  active:scale-[.94] active:duration-75 transition-all ">
                                <LuPlus className="flex items-center w-4 h-4 text-white" />
                                Create New
                            </div>
                        </Link>
                    </div>
                </div>

                {/* Search & Filter Section */}
                <DemoListFilterApproval type="spot" />

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
                            rowSelection={"multiple"}
                            suppressRowClickSelection={true}
                        />
                    </div>
                </div>
            </div>
            <div ref={scrollRef}></div>
        </div>
    );
}

export default DemoApproval;
