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
import { Link } from "react-router-dom";
import StatusRenderer from "../../components/sales-quotation/StatusRenderer";
import ControllerBtnRenderer from "../../components/approval/business/ControllerBtnRenderer";
import ViewRenderer from "../../components/approval/business/ViewRenderer";
import ViewApprovalRenderer from "../../components/sales-quotation/ViewApprovalRenderer";
import ListFilter from "../../components/sales-quotation/ListFilter";
import toast from "react-hot-toast";
import moment from "moment";

import { DatePicker, Space } from "antd";
import { Select, Checkbox, Badge } from "antd";
import formatNumberWithCommas from "../../utils/number/formatNumberWithCommas";

const { RangePicker } = DatePicker;
const oldTitle = document.title;
const newTitle = "Sales Quotation List - Aeon Delight Vietnam";

function SalesQuotationList() {
    // AG-Grid Attributes
    const paginationPageSizeSelector = useMemo(() => {
        return [10, 50, 100, 200];
    }, []);

    // Table Data
    const [rowData, setRowData] = useState([
        {
            id: 1,
            path: "/sales-quotation",
            quotationNo: "1452012-001",
            approvalNo: "1903005-001",
            quotationDate: "21/05/2020",
            approvalId: "1",
            approvalType: "other",
            subject:
                "Tăng cường 11 nhân sự bảo vệ từ 17:00 - 22:00 ngày 15,16/12/2023",
            customerName: "CÔNG TY TNHH BECAMEX TOKYU",
            siteName: "BECAMEX TOKYU",
            createdBy: "Nguyen Van An",
            sumAmount: 1250000,
            status: 1,
        },
        {
            id: 2,
            path: "/sales-quotation",
            quotationNo: "1452013-001",
            approvalNo: "1903005-001",
            quotationDate: "21/05/2020",
            approvalId: "1",
            approvalType: "budget",
            subject:
                "Supply whole sales trade services to IRISO - December 2021",
            customerName: "CÔNG TY TNHH ĐIỆN TỬ IRISO VN",
            siteName: "IRISO",
            createdBy: "Nguyen Van An",
            sumAmount: 245000,
            status: 2,
        },
        {
            id: 3,
            path: "/sales-quotation",
            quotationNo: "1452014-001",
            approvalNo: "1903005-001",
            quotationDate: "21/05/2020",
            approvalId: "1",
            approvalType: "spot",
            subject:
                "Cung cấp dịch vụ vệ sinh miệng gió và máy lạnh FCU tại RENAISSANCE-AMCA",
            customerName: "CÔNG TY TNHH RENAISSANCE VIỆT NAM",
            siteName: "AMCA - RENAISSANCE",
            createdBy: "Nguyen Van An",
            sumAmount: 135000,
            status: 3,
        },
        {
            id: 4,
            path: "/sales-quotation",
            quotationNo: "1452015-001",
            approvalNo: "1903005-001",
            quotationDate: "21/05/2020",
            approvalId: "1",
            approvalType: "fms",
            subject: "Cung cấp dịch vụ vệ sinh tenant Yamaha",
            customerName: "CÔNG TY TNHH ÂM NHẠC YAMAHA VIỆT NAM",
            siteName: "AMTC - YAMAHA",
            createdBy: "Nguyen Van An",
            sumAmount: 125000,
            status: 2,
        },
        {
            id: 5,
            path: "/sales-quotation",
            quotationNo: "1452021-001",
            approvalNo: "1903005-001",
            quotationDate: "21/05/2020",
            approvalId: "1",
            approvalType: "yearly",
            subject:
                "Maintenance service for CO2  + powder bottles (Molly Fantasy)",
            customerName: "CÔNG TY TNHH AEON FANTASY VIỆT NAM",
            siteName: "AMTC - AEON FANTASY",
            createdBy: "Nguyen Van An",
            sumAmount: 278000,
            status: 1,
        },
        {
            id: 6,
            path: "/sales-quotation",
            quotationNo: "1452062-001",
            approvalNo: "1903005-001",
            quotationDate: "21/05/2020",
            approvalId: "1",
            approvalType: "sg&a",
            subject: "Cung cấp dịch vụ sửa chữa xe đẩy baby dành cho trẻ em",
            customerName: "CÔNG TY TNHH AEONMALL HIMLAM",
            siteName: "AEONMALL HIM LAM",
            createdBy: "Nguyen Van An",
            sumAmount: 357000,
            status: 2,
        },
        {
            id: 7,
            path: "/sales-quotation",
            quotationNo: "1452035-001",
            approvalNo: "1903005-001",
            quotationDate: "21/05/2020",
            approvalId: "1",
            approvalType: "spot",
            subject: "Provide technical services for Ajinomoto Vietnam company",
            customerName: "CÔNG TY AJINOMOTO VIỆT NAM",
            siteName: "",
            createdBy: "Nguyen Van An",
            sumAmount: 962500,
            status: 1,
        },
        {
            id: 8,
            path: "/sales-quotation",
            quotationNo: "1452029-001",
            approvalNo: "1903005-001",
            quotationDate: "21/05/2020",
            approvalId: "1",
            approvalType: "other",
            subject: "Cung cấp dịch vụ vệ sinh DAILY",
            customerName: "CÔNG TY AJINOMOTO VIỆT NAM",
            siteName: "",
            createdBy: "Nguyen Van An",
            sumAmount: 317000,
            status: 3,
        },
        {
            id: 9,
            path: "/sales-quotation",
            quotationNo: "1452034-001",
            approvalNo: "1903005-001",
            quotationDate: "21/05/2020",
            approvalId: "1",
            approvalType: "other",
            subject: "Cung cấp dịch vụ vệ sinh hằng ngày tại AEON MALL",
            customerName: "CÔNG TY TNHH AEONMALL HIMLAM",
            siteName: "AEONMALL HIM LAM",
            createdBy: "Nguyen Van An",
            sumAmount: 525000,
            status: 3,
        },
        {
            id: 10,
            path: "/sales-quotation",
            quotationNo: "1452029-001",
            approvalNo: "1903005-001",
            quotationDate: "21/05/2020",
            approvalId: "1",
            approvalType: "budget",
            subject: "Nhân sự bảo vệ từ 06:00 - 12:00 ngày 12/10/2023",
            customerName: "CÔNG TY TNHH AEONMALL HIMLAM",
            siteName: "AEONMALL HIM LAM",
            createdBy: "Nguyen Van An",
            sumAmount: 825000,
            status: 3,
        },
        {
            id: 11,
            path: "/sales-quotation",
            quotationNo: "1452085-001",
            approvalNo: "1903005-012",
            quotationDate: "21/05/2020",
            approvalId: "1",
            approvalType: "yearly",
            subject: "Cung cấp dịch vụ vệ sinh hằng ngày tại AEON MALL",
            customerName: "CÔNG TY TNHH AEONMALL HIMLAM",
            siteName: "AEONMALL HIM LAM",
            createdBy: "Nguyen Van An",
            sumAmount: 425000,
            status: 1,
        },
        {
            id: 12,
            path: "/sales-quotation",
            quotationNo: "1452035-001",
            approvalNo: "1903005-008",
            quotationDate: "21/05/2020",
            approvalId: "1",
            approvalType: "other",
            subject: "Cung cấp dịch vụ vệ sinh hằng ngày tại AEON MALL",
            customerName: "CÔNG TY TNHH AEONMALL HIMLAM",
            siteName: "AEONMALL HIM LAM",
            createdBy: "Nguyen Van An",
            sumAmount: 337000,
            status: 2,
        },
        {
            id: 13,
            path: "/sales-quotation",
            quotationNo: "1452099-001",
            approvalNo: "1903005-005",
            quotationDate: "21/05/2020",
            approvalId: "1",
            approvalType: "other",
            subject: "Cung cấp dịch vụ vệ sinh hằng ngày tại AEON MALL",
            customerName: "CÔNG TY TNHH AEONMALL HIMLAM",
            siteName: "AEONMALL HIM LAM",
            createdBy: "Nguyen Van An",
            sumAmount: 100000,
            status: 1,
        },
        {
            id: 14,
            path: "/sales-quotation",
            quotationNo: "1452158-001",
            approvalNo: "1903005-004",
            quotationDate: "21/05/2020",
            approvalId: "1",
            approvalType: "fms",
            subject: "Cung cấp dịch vụ vệ sinh hằng ngày tại AEON MALL",
            customerName: "CÔNG TY TNHH AEONMALL HIMLAM",
            siteName: "AEONMALL HIM LAM",
            createdBy: "Nguyen Van An",
            sumAmount: 1250000,
            status: 1,
        },
        {
            id: 15,
            path: "/sales-quotation",
            quotationNo: "1452357-001",
            approvalNo: "1903005-003",
            quotationDate: "21/05/2020",
            approvalId: "1",
            approvalType: "fms",
            subject: "Cung cấp dịch vụ vệ sinh hằng ngày tại AEON MALL",
            customerName: "CÔNG TY TNHH AEONMALL HIMLAM",
            siteName: "AEONMALL HIM LAM",
            createdBy: "Nguyen Van An",
            sumAmount: 456000,
            status: 3,
        },
        {
            id: 16,
            path: "/sales-quotation",
            quotationNo: "1452269-001",
            approvalNo: "1903005-002",
            quotationDate: "21/05/2020",
            approvalId: "1",
            approvalType: "fms",
            subject: "Cung cấp dịch vụ vệ sinh hằng ngày tại AEON MALL",
            customerName: "CÔNG TY TNHH AEONMALL HIMLAM",
            siteName: "AEONMALL HIM LAM",
            createdBy: "Nguyen Van An",
            sumAmount: 756000,
            status: 4,
        },
    ]);

    // Column Definitions: Defines & controls grid columns.
    const [colDefs, setColDefs] = useState([
        {
            field: "quotationNo",
            maxWidth: 150,
            filter: "agTextColumnFilter",
            cellRenderer: ViewRenderer,
        },
        {
            field: "subject",
            minWidth: 360,
            filter: "agTextColumnFilter",
        },

        {
            field: "approvalNo",
            maxWidth: 150,
            filterParams: {
                applyMiniFilterWhileTyping: true,
            },
            filter: "agTextColumnFilter",
            cellRenderer: ViewApprovalRenderer,
        },

        {
            field: "quotationDate",
            filter: "agTextColumnFilter",
        },
        {
            headerName: "Quotation Type",
            field: "approvalType",
            filter: "agTextColumnFilter",
            cellRenderer: ({ value }) => (
                <>{value.charAt(0).toUpperCase() + value.slice(1)}</>
            ),
        },
        {
            headerName: "Customer",
            field: "customerName",
            filter: "agTextColumnFilter",
        },
        {
            headerName: "Site",
            field: "siteName",
            filter: "agTextColumnFilter",
        },
        {
            headerName: "PIC",
            field: "createdBy",
            filter: "agTextColumnFilter",
        },
        {
            field: "status",
            minWidth: 200,
            cellRenderer: StatusRenderer,
        },
        {
            field: "sumAmount",
            minWidth: 200,
            cellRenderer: ({ value }) => <>{formatNumberWithCommas(value)}</>,
        },
        {
            field: "action",
            pinned: "right",
            maxWidth: 120,
            cellRenderer: (data) => ((<ControllerBtnRenderer data={data} readOnly={false} />)) ,
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
                        Sales Quotation
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
                        <Link to={"/sales-quotation/create"}>
                            <div className="flex items-center gap-x-2 text-[15px] bg-[#3a6f41] hover:bg-[#216721] text-white px-4 py-[7px] rounded-full font-medium  active:scale-[.94] active:duration-75 transition-all ">
                                <LuPlus className="flex items-center w-4 h-4 text-white" />
                                Create New
                            </div>
                        </Link>
                    </div>
                </div>

                {/* Search & Filter Section */}
                <ListFilter />

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

export default SalesQuotationList;
