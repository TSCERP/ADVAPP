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
import DemoStatusRenderer from "../../components/demo/DemoStatusRenderer";
import DemoControllerBtnRendererPR from "../../components/demo/DemoControllerBtnRendererPR";
import ViewRenderer from "../../components/approval/business/ViewRenderer";
import DemoListFilterPaymentRequest from "../../components/demo/DemoListFilterPaymentRequest"
import toast from "react-hot-toast";
import moment from "moment";

import { DatePicker, Space } from "antd";
import { Select, Checkbox, Badge } from "antd";
import formatNumberWithCommas from "../../utils/number/formatNumberWithCommas";

const { RangePicker } = DatePicker;
const oldTitle = document.title;
const newTitle = "Payment Request List - Demo";

function DemoPaymentRequest() {
    // AG-Grid Attributes
    const paginationPageSizeSelector = useMemo(() => {
        return [10, 50, 100, 200];
    }, []);

    // Table Data
    const [rowData, setRowData] = useState(
        [
            {
                id: 1,
                path: "/payment-request",
                paymentNo: "2401001-001",
                paymentDate: "21/01/2024",
                businessReason: "Material supply for manufacturing",
                amount: 1200000,
                currency: "VND",
                division: "Production",
                expenseType: "Raw Materials",
                status: 1,
                claim: "Done",
                description: "Payment for raw materials delivered on time.",
            },
            {
                id: 2,
                path: "/payment-request",
                paymentNo: "2401001-002",
                paymentDate: "22/01/2024",
                businessReason: "Equipment maintenance",
                amount: 80000,
                currency: "USD",
                division: "Maintenance",
                expenseType: "Equipment Maintenance",
                status: 2,
                claim: "Not yet",
                description: "Pending approval for equipment maintenance costs.",
            },
            {
                id: 3,
                path: "/payment-request",
                paymentNo: "2401001-003",
                paymentDate: "23/01/2024",
                businessReason: "Business trip expenses",
                amount: 500000,
                currency: "VND",
                division: "Sales",
                expenseType: "Business Travel",
                status: 2,
                claim: "Done",
                description: "Reimbursement for business trip expenses.",
            },
            {
                id: 4,
                path: "/payment-request",
                paymentNo: "2401001-004",
                paymentDate: "24/01/2024",
                businessReason: "Office supplies",
                amount: 70000,
                currency: "USD",
                division: "Administration",
                expenseType: "Office Supplies",
                status: 1,
                claim: "Done",
                description: "Purchase of office supplies for the team.",
            },
            {
                id: 5,
                path: "/payment-request",
                paymentNo: "2401001-005",
                paymentDate: "25/01/2024",
                businessReason: "Marketing campaign",
                amount: 1500000,
                currency: "VND",
                division: "Marketing",
                expenseType: "Marketing Campaign",
                status: 2,
                claim: "Not yet",
                description: "Proposed budget for upcoming marketing campaign.",
            },
            {
                id: 6,
                path: "/payment-request",
                paymentNo: "2401001-006",
                paymentDate: "26/01/2024",
                businessReason: "Training expenses",
                amount: 90000,
                currency: "USD",
                division: "Human Resources",
                expenseType: "Employee Training",
                status: 1,
                claim: "Done",
                description: "Payment for recent employee training program.",
            },
            {
                id: 7,
                path: "/payment-request",
                paymentNo: "2401001-007",
                paymentDate: "27/01/2024",
                businessReason: "IT infrastructure upgrade",
                amount: 600000,
                currency: "VND",
                division: "IT",
                expenseType: "IT Upgrade",
                status: 1,
                claim: "Done",
                description: "Funds allocated for IT infrastructure upgrade.",
            },
            {
                id: 8,
                path: "/payment-request",
                paymentNo: "2401001-008",
                paymentDate: "28/01/2024",
                businessReason: "Consulting services",
                amount: 120000,
                currency: "USD",
                division: "Consulting",
                expenseType: "Consulting Services",
                status: 1,
                claim: "Not yet",
                description: "Payment for recent consulting services.",
            },
            {
                id: 9,
                path: "/payment-request",
                paymentNo: "2401001-009",
                paymentDate: "29/01/2024",
                businessReason: "Team building event",
                amount: 800000,
                currency: "VND",
                division: "Team Building",
                expenseType: "Team Building",
                status: 2,
                claim: "Done",
                description: "Funds for upcoming team building event.",
            },
            {
                id: 10,
                path: "/payment-request",
                paymentNo: "2401001-010",
                paymentDate: "30/01/2024",
                businessReason: "Office furniture purchase",
                amount: 2000000,
                currency: "USD",
                division: "Administration",
                expenseType: "Furniture Purchase",
                status: 2,
                claim: "Done",
                description: "Payment for new office furniture.",
            },
            {
                id: 11,
                path: "/payment-request",
                paymentNo: "2401001-011",
                paymentDate: "31/01/2024",
                businessReason: "Travel reimbursement",
                amount: 450000,
                currency: "VND",
                division: "Sales",
                expenseType: "Travel Reimbursement",
                status: 2,
                claim: "Not yet",
                description: "Pending reimbursement for travel expenses.",
            },
            {
                id: 12,
                path: "/payment-request",
                paymentNo: "2401001-012",
                paymentDate: "01/02/2024",
                businessReason: "Product launch event",
                amount: 180000,
                currency: "USD",
                division: "Marketing",
                expenseType: "Product Launch",
                status: 2,
                claim: "Done",
                description: "Funds for upcoming product launch event.",
            },
            {
                id: 13,
                path: "/payment-request",
                paymentNo: "2401001-013",
                paymentDate: "02/02/2024",
                businessReason: "Website redesign",
                amount: 1000000,
                currency: "VND",
                division: "IT",
                expenseType: "Website Redesign",
                status: 1,
                claim: "Done",
                description: "Payment for website redesign project.",
            },
            {
                id: 14,
                path: "/payment-request",
                paymentNo: "2401001-014",
                paymentDate: "03/02/2024",
                businessReason: "Employee training program",
                amount: 60000,
                currency: "USD",
                division: "Human Resources",
                expenseType: "Employee Training",
                status: 2,
                claim: "Not yet",
                description: "Budget request for upcoming employee training program.",
            },
            {
                id: 15,
                path: "/payment-request",
                paymentNo: "2401001-015",
                paymentDate: "04/02/2024",
                businessReason: "IT support services",
                amount: 700000,
                currency: "VND",
                division: "IT",
                expenseType: "IT Support",
                status: 1,
                claim: "Done",
                description: "Payment for recent IT support services.",
            },
            {
                id: 16,
                path: "/payment-request",
                paymentNo: "2401001-016",
                paymentDate: "05/02/2024",
                businessReason: "Training room rental",
                amount: 350000,
                currency: "USD",
                division: "Training",
                expenseType: "Room Rental",
                status: 1,
                claim: "Done",
                description: "Payment for training room rental.",
            },
        ]);

    // Column Definitions: Defines & controls grid columns.
    const [colDefs, setColDefs] = useState([
        {
            field: "id",
            minWidth: 110,
            sort: "asc",
            filter: "agTextColumnFilter",
        },
        {
            headerName: "Request No.",
            field: "paymentNo",
            minWidth: 150,
            filter: "agTextColumnFilter",
            cellRenderer: ViewRenderer,
        },
        {
            headerName: "Request Date",
            field: "paymentDate",
            maxWidth: 150,
            filterParams: {
                applyMiniFilterWhileTyping: true,
            },
            filter: "agTextColumnFilter",
        },
        {
            field: "businessReason",
            minWidth: 200,
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
            headerName: "Division",
            field: "division",
            minWidth: 150,
            filter: "agTextColumnFilter",
        },
        {
            headerName: "Expense Type",
            field: "expenseType",
            minWidth: 150,
            filter: "agTextColumnFilter",
        },
        {
            headerName: "Description",
            field: "description",
            minWidth: 180,
            filter: "agTextColumnFilter",
        },
        {
            field: "status",
            minWidth: 150,
            cellRenderer: DemoStatusRenderer,
        },
        {
            field: "action",
            pinned: "right",
            maxWidth: 120,
            cellRenderer: DemoControllerBtnRendererPR,
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
                        Payment Request
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
                        <Link to={"/approval/business/spot/create"}>
                            <div className="flex items-center gap-x-2 text-[15px] bg-[#3a6f41] hover:bg-[#216721] text-white px-4 py-[7px] rounded-full font-medium  active:scale-[.94] active:duration-75 transition-all ">
                                <LuPlus className="flex items-center w-4 h-4 text-white" />
                                Create New
                            </div>
                        </Link>
                    </div>
                </div>

                {/* Search & Filter Section */}
                <DemoListFilterPaymentRequest type="spot" />

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
                            // rowSelection={"multiple"}
                            // suppressRowClickSelection={true}
                        />
                    </div>
                </div>
            </div>
            <div ref={scrollRef}></div>
        </div>
    );
}

export default DemoPaymentRequest;
