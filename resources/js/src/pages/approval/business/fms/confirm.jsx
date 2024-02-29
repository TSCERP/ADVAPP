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

import StatusRenderer from "../../../../components/approval/business/StatusRenderer";
import ControllerBtnRenderer from "../../../../components/approval/business/ControllerBtnRenderer";
import ViewRenderer from "../../../../components/approval/business/ViewRenderer";

import toast from "react-hot-toast";
import moment from "moment";

import { DatePicker, Space, Select, Checkbox, Badge, Input } from "antd";

// Import Icon
import {
    LuTrash2,
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
import { IoFilter, IoCopyOutline } from "react-icons/io5";
import { GrPowerReset } from "react-icons/gr";
import { IoIosListBox } from "react-icons/io";
import { GiConfirmed } from "react-icons/gi";

// Get instance variables
const { RangePicker } = DatePicker;
const { TextArea } = Input;
const oldTitle = document.title;
const newTitle = "Approval FMS List - Aeon Delight Vietnam";

const rowData = [
    {
        id: 1,
        path: "/approval/business/fms/confirm",
        choNo: "CHO-2306-013-09",
        subItem: "Nhân viên giám sát / Supervisor",
        unit: "giờ",
        quantity: 10,
        unitPrice: 700000,
        beforeVATAmount: 7000000,
        vat: 10,
        vatAmount: 700000,
        afterVATAmount: 7700000,
    },
    {
        id: 2,
        path: "/approval/business/fms/confirm",
        choNo: "CHO-2401-003-01",
        subItem: "Dịch vụ kiểm soát côn trùng-GMS/ Pest control GMS",
        unit: "gói",
        quantity: 25,
        unitPrice: 350000,
        beforeVATAmount: 8750000,
        vat: 10,
        vatAmount: 875000,
        afterVATAmount: 8875000,
    },
];

const ApprovalBusinessFMSConfirm = () => {
    // AG-Grid Attributes
    const paginationPageSizeSelector = useMemo(() => {
        return [10, 50, 100, 200];
    }, []);

    const [choData, setCHOData] = useState([]);
    const [vhoData, setVHOData] = useState([]);

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
    const [expanded, setExpanded] = useState(false);
    const [newTradingChecked, setNewTradingChecked] = useState(false);

    const [enableClearFilter, setEnableClearFilter] = useState(true);

    const [selectedDateRange, setSelectedDateRange] = useState([]);
    const [selectedFromDate, setSelectedFromDate] = useState("");
    const [selectedToDate, setSelectedToDate] = useState("");
    const [selectedApprovalNo, setSelectedApprovalNo] = useState("");
    const [selectedStatus, setSelectedStatus] = useState("");
    const [selectedDivision, setSelectedDivision] = useState("");
    const [selectedDepartment, setSelectedDepartment] = useState("");
    const [selectedSection, setSelectedSection] = useState("");
    const [filters, setFilters] = useState([]);

    /**
     *  All refs defined here
     */
    const scrollRef = useRef(null);
    const gridRef = useRef(null);
    const selectRef = useRef();

    /**
     * All functions defined here
     */
    const toggleExpand = () => {
        setExpanded(!expanded);
    };

    // Filter Selection
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

    // Export Excel
    const onBtnExport = useCallback(() => {
        gridRef.current.api.exportDataAsExcel();
        toast.success("Export successfully.");
    }, []);

    // New Trading Checked
    const handleNewTradingCheck = () => {
        setNewTradingChecked(!newTradingChecked);
    };

    // Filter Button
    const handleFilter = () => {
        scrollRef?.current?.scrollIntoView({ behavior: "smooth" });
    };

    // Clear Filter
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

    // Reload
    const onReload = () => {
        toast("This module is under development.");
    };

    // Load data
    const loadData = () => {
        setCHOData(rowData);
        setVHOData(rowData);
    };

    // Confirm data
    const confirmApproval = () => {
        toast("Developing...");
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
                        Approval FMS Confirm
                    </div>
                    <div className="flex gap-x-2">
                        <div
                            className="flex items-center gap-x-2 text-[15px] bg-[#fff] border-2 border-gray-300 text-gray-800 px-4 py-1.5 rounded-full font-medium  active:scale-[.94] active:duration-75 transition-all hover:bg-gray-100 cursor-pointer"
                            onClick={onBtnExport}
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
                        <div
                            className="flex items-center cursor-pointer gap-x-2 text-[15px] bg-[#3a6f41] hover:bg-[#216721] text-white px-4 py-[7px] rounded-full font-medium  active:scale-[.94] active:duration-75 transition-all"
                            onClick={() => confirmApproval()}
                        >
                            <GiConfirmed className="flex items-center w-4 h-4" />
                            Confirm
                        </div>
                    </div>
                </div>

                {/* Search & Filter Section */}
                <div className="flex flex-col items-center p-3.5 px-4 rounded-xl bg-white border border-[#DDDDDD] shadow-[0_8px_40px_rgb(0,0,0,0.10)] space-y-2 w-full h-full ">
                    <div className="flex flex-wrap justify-center gap-4 w-full">
                        <div className="w-full">
                            <label className="text-[18px] font-semibold mb-1">
                                Select an FMS approval first
                            </label>
                        </div>
                        <div className="flex flex-col justify-between gap-4 h-full w-full">
                            {/* <div className="grid grid-cols-3 w-full gap-x-3"> */}
                            <div className="flex justify-between gap-4">
                                <div className="flex flex-col w-3/5">
                                    <label className="text-[14px] font-semibold mb-1">
                                        Date Range:
                                    </label>
                                    <Space direction="vertical" size={10}>
                                        <RangePicker
                                            style={{
                                                width: "100%",
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
                                                    setSelectedDateRange(
                                                        dateString
                                                    );
                                                    setSelectedFromDate(
                                                        dateString[0]
                                                    );
                                                    setSelectedToDate(
                                                        dateString[1]
                                                    );
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
                                        Approval No{" "}
                                        <span className="text-[#ff0000]">
                                            *
                                        </span>{" "}
                                        :
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
                                            (option?.label ?? "").includes(
                                                input
                                            )
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
                                            addToFilters(
                                                "selectedApprovalNo",
                                                value
                                            );
                                        }}
                                        onClear={() =>
                                            removeFromFilters(
                                                "selectedApprovalNo"
                                            )
                                        }
                                    />
                                </div>
                                <div className="flex flex-col w-full">
                                    <label className="text-[14px] font-semibold mb-1">
                                        FMS Approval Type{" "}
                                        <span className="text-[#ff0000]">
                                            *
                                        </span>{" "}
                                        :
                                    </label>
                                    <Select
                                        showSearch
                                        allowClear
                                        style={{
                                            width: "100%",
                                            height: "100%",
                                            fontSize: "15px",
                                        }}
                                        placeholder="Search FMS Approval Type"
                                        filterOption={(input, option) =>
                                            (option?.label ?? "").includes(
                                                input
                                            )
                                        }
                                        defaultValue={{
                                            value: "1",
                                            label: "1903005-001",
                                        }}
                                        options={[
                                            {
                                                value: "1",
                                                label: "GMS/SC/Total",
                                            },
                                        ]}
                                        // onSelect={(value) => {
                                        //     setSelectedApprovalNo(value);
                                        //     addToFilters(
                                        //         "selectedApprovalNo",
                                        //         value
                                        //     );
                                        // }}
                                        // onClear={() =>
                                        //     removeFromFilters(
                                        //         "selectedApprovalNo"
                                        //     )
                                        // }
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-3 w-full gap-x-4">
                                <div className="flex flex-col w-full">
                                    <label className="text-[14px] font-semibold mb-1">
                                        Division:
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
                                            (option?.label ?? "").includes(
                                                input
                                            )
                                        }
                                        onSelect={(value) => {
                                            setSelectedDivision(value);
                                            addToFilters(
                                                "selectedDivision",
                                                value
                                            );
                                        }}
                                        onClear={() =>
                                            removeFromFilters(
                                                "selectedDivision"
                                            )
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
                                        Department :
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
                                            (option?.label ?? "").includes(
                                                input
                                            )
                                        }
                                        onSelect={(value) => {
                                            setSelectedDepartment(value);
                                            addToFilters(
                                                "selectedDepartment",
                                                value
                                            );
                                        }}
                                        onClear={() =>
                                            removeFromFilters(
                                                "selectedDepartment"
                                            )
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
                                        Section :
                                    </label>
                                    <Select
                                        showSearch
                                        allowClear
                                        style={{
                                            width: "100%",
                                            height: "100%",
                                            fontSize: "15px",
                                        }}
                                        placeholder="Search FMS Approval Type"
                                        filterOption={(input, option) =>
                                            (option?.label ?? "").includes(
                                                input
                                            )
                                        }
                                        defaultValue={{
                                            value: "1",
                                            label: "1903005-001",
                                        }}
                                        onSelect={(value) => {
                                            setSelectedSection(value);
                                            addToFilters(
                                                "selectedSection",
                                                value
                                            );
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
                        </div>
                        <div className="ml-auto">
                            <div
                                className="flex items-center cursor-pointer gap-x-2 text-[15px] bg-[#3a6f41] hover:bg-[#216721] text-white px-4 py-[7px] rounded-full font-medium  active:scale-[.94] active:duration-75 transition-all"
                                onClick={() => loadData()}
                            >
                                Load Approval
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                {(choData && choData.length > 0) ||
                (vhoData && vhoData.length > 0) ? (
                    <div className="flex flex-col my-2 p-4 border border-gray-200 shadow-[0_8px_30px_rgb(0,0,0,0.13)] bg-white rounded-xl">
                        <div className="shadow-sm rounded-lg border-2 bg-[#fbfdff] border-gray-300">
                            <div className="rounded-t-lg flex items-center space-x-3 bg-gray-100 border-b-2 border-gray-300 p-2.5 px-4 text-[17px] text-[#37763F] font-bold uppercase ">
                                <div className=" bg-gray-700 text-white px-[9px] rounded-[50px]">
                                    CHO
                                </div>
                                <div>Customer Handover</div>
                            </div>
                            <div className="px-4 py-4 ">
                                {/* Sales Item List */}
                                <div className="rounded-t-lg border-2 border-[#b1d9ba]">
                                    <div className="overflow-x-auto">
                                        <table className=" w-full bg-white border-collapse">
                                            <thead>
                                                <tr className="bg-[#e6efe7]">
                                                    <th className="min-w-[210px] max-h-[60px] bg-[#d4f2d9] border-2 border-t-0 border-l-0 border-[#99d2a4] text-center py-2">
                                                        CHO No.
                                                    </th>
                                                    <th className="min-w-[200px] max-h-[50px] bg-[#d4f2d9] border-2 border-t-0 border-[#99d2a4] text-left px-8 py-2">
                                                        Sub Item
                                                    </th>
                                                    <th className="min-w-[100px] max-h-[240px] bg-[#d4f2d9] border-2 border-t-0 border-[#99d2a4] text-left px-8 py-2">
                                                        Unit
                                                    </th>
                                                    <th className="min-w-[110px] max-h-[200px] bg-[#d4f2d9] border-2 border-t-0 border-[#99d2a4] text-left px-8 py-2">
                                                        Quantity
                                                    </th>
                                                    <th className="min-w-[200px] max-h-[260px] bg-[#d4f2d9] border-2 border-t-0 border-[#99d2a4] text-left px-8 py-2">
                                                        Unit Price
                                                    </th>
                                                    <th className="min-w-[200px] max-h-[200px] bg-[#d4f2d9] border-2 border-t-0 border-[#99d2a4] text-left px-8 py-2">
                                                        Before VAT Amount
                                                    </th>
                                                    <th className="min-w-[80px] max-h-[100px] bg-[#d4f2d9] border-2 border-t-0 border-[#99d2a4] text-left px-8 py-2">
                                                        %VAT
                                                    </th>
                                                    <th className="min-w-[100px] max-h-[80px] bg-[#d4f2d9] border-2 border-t-0 border-[#99d2a4] text-left px-8 py-2">
                                                        VAT Amount
                                                    </th>
                                                    <th className="min-w-[150px] max-h-[150px] bg-[#d4f2d9] border-2 border-t-0 border-r-0 border-[#99d2a4] text-left px-8 py-2">
                                                        After VAT Amount
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {choData &&
                                                    choData.length > 0 &&
                                                    choData.map((row) => (
                                                        <tr key={row.id}>
                                                            <td className=" bg-[#F5FDF8] border-l-0 border border-[#6a9e72] px-10 py-2">
                                                                <Link>
                                                                    {row.choNo}
                                                                </Link>
                                                            </td>
                                                            <td className="bg-[#F5FDF8] border border-[#6a9e72] px-8 py-2">
                                                                {row.subItem}
                                                            </td>
                                                            <td className="bg-[#F5FDF8] border border-[#6a9e72] px-8 py-2">
                                                                {row.unit}
                                                            </td>
                                                            <td className="bg-[#F5FDF8] border border-[#6a9e72] px-8 py-2">
                                                                {row.quantity}
                                                            </td>
                                                            <td className="bg-[#F5FDF8] text-right border border-[#6a9e72] px-8 py-2">
                                                                {row.unitPrice}
                                                            </td>
                                                            <td className="bg-[#F5FDF8] text-right border border-[#6a9e72] px-8 py-2">
                                                                {
                                                                    row.beforeVATAmount
                                                                }
                                                            </td>
                                                            <td className="bg-[#F5FDF8] text-center border border-[#6a9e72] px-8 py-2">
                                                                {`${row.vat}%`}
                                                            </td>
                                                            <td className="bg-[#F5FDF8] text-right border border-[#6a9e72] px-8 py-2">
                                                                {row.vatAmount}
                                                            </td>
                                                            <td className="bg-[#F5FDF8] text-right border border-r-0 border-[#6a9e72] px-8 py-2">
                                                                {
                                                                    row.afterVATAmount
                                                                }
                                                            </td>
                                                        </tr>
                                                    ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="my-6 border-dashed border-b-2 border-gray-300"></div>
                        {/* <div className="my-2 rounded-lg h-[calc(100vh-250px)]"> */}

                        <div className="shadow-sm rounded-lg border-2 bg-[#fbfdff] border-gray-300">
                            <div className="rounded-t-lg flex items-center space-x-3 bg-gray-100 border-b-2 border-gray-300 p-2.5 px-4 text-[17px] text-[#37763F] font-bold uppercase ">
                                <div className=" bg-gray-700 text-white px-[9px] rounded-[50px]">
                                    VHO
                                </div>
                                <div>Vendor Handover</div>
                            </div>
                            <div className="px-4 py-4 ">
                                {/* Sales Item List */}
                                <div className="rounded-t-lg border-2 border-[#b1d9ba]">
                                    <div className="overflow-x-auto">
                                        <table className=" w-full bg-white border-collapse">
                                            <thead>
                                                <tr className="bg-[#e6efe7]">
                                                    <th className="min-w-[210px] max-h-[60px] bg-[#d4f2d9] border-2 border-t-0 border-l-0 border-[#99d2a4] text-center py-2">
                                                        VHO No.
                                                    </th>
                                                    <th className="min-w-[200px] max-h-[50px] bg-[#d4f2d9] border-2 border-t-0 border-[#99d2a4] text-left px-8 py-2">
                                                        Sub Item
                                                    </th>
                                                    <th className="min-w-[100px] max-h-[240px] bg-[#d4f2d9] border-2 border-t-0 border-[#99d2a4] text-left px-8 py-2">
                                                        Unit
                                                    </th>
                                                    <th className="min-w-[110px] max-h-[200px] bg-[#d4f2d9] border-2 border-t-0 border-[#99d2a4] text-left px-8 py-2">
                                                        Quantity
                                                    </th>
                                                    <th className="min-w-[200px] max-h-[260px] bg-[#d4f2d9] border-2 border-t-0 border-[#99d2a4] text-left px-8 py-2">
                                                        Unit Price
                                                    </th>
                                                    <th className="min-w-[200px] max-h-[200px] bg-[#d4f2d9] border-2 border-t-0 border-[#99d2a4] text-left px-8 py-2">
                                                        Before VAT Amount
                                                    </th>
                                                    <th className="min-w-[80px] max-h-[100px] bg-[#d4f2d9] border-2 border-t-0 border-[#99d2a4] text-left px-8 py-2">
                                                        %VAT
                                                    </th>
                                                    <th className="min-w-[100px] max-h-[80px] bg-[#d4f2d9] border-2 border-t-0 border-[#99d2a4] text-left px-8 py-2">
                                                        VAT Amount
                                                    </th>
                                                    <th className="min-w-[150px] max-h-[150px] bg-[#d4f2d9] border-2 border-t-0 border-[#99d2a4] text-left px-8 py-2">
                                                        After VAT Amount
                                                    </th>
                                                    <th className="min-w-[210px] max-h-[60px] bg-[#d4f2d9] border-2 border-t-0 border-r-0 border-[#99d2a4] text-center py-2">
                                                        VHO No.
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {choData &&
                                                    choData.length > 0 &&
                                                    choData.map((row) => (
                                                        <tr key={row.id}>
                                                            <td className=" bg-[#F5FDF8] border border-l-0 border-[#6a9e72] px-10 py-2">
                                                                <Link>
                                                                    {row.choNo}
                                                                </Link>
                                                            </td>
                                                            <td className="bg-[#F5FDF8] border border-[#6a9e72] px-8 py-2">
                                                                {row.subItem}
                                                            </td>
                                                            <td className="bg-[#F5FDF8] border border-[#6a9e72] px-8 py-2">
                                                                {row.unit}
                                                            </td>
                                                            <td className="bg-[#F5FDF8] border border-[#6a9e72] px-8 py-2">
                                                                {row.quantity}
                                                            </td>
                                                            <td className="bg-[#F5FDF8] text-right border border-[#6a9e72] px-8 py-2">
                                                                {row.unitPrice}
                                                            </td>
                                                            <td className="bg-[#F5FDF8] text-right border border-[#6a9e72] px-8 py-2">
                                                                {
                                                                    row.beforeVATAmount
                                                                }
                                                            </td>
                                                            <td className="bg-[#F5FDF8] text-center border border-[#6a9e72] px-8 py-2">
                                                                {`${row.vat}%`}
                                                            </td>
                                                            <td className="bg-[#F5FDF8] text-right border border-[#6a9e72] px-8 py-2">
                                                                {row.vatAmount}
                                                            </td>
                                                            <td className="bg-[#F5FDF8] text-right border border-[#6a9e72] px-8 py-2">
                                                                {
                                                                    row.afterVATAmount
                                                                }
                                                            </td>
                                                            <td className=" bg-[#F5FDF8] border-l-0 border border-r-0 border-[#6a9e72] px-8 py-2">
                                                                <Link>
                                                                    {row.choNo}
                                                                </Link>
                                                            </td>
                                                        </tr>
                                                    ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="my-6 border-dashed border-b-2 border-gray-300"></div>

                        <div className="shadow-sm rounded-lg border-2 bg-[#fbfdff] border-gray-300">
                            <div className="rounded-t-lg flex items-center space-x-3 bg-gray-100 border-b-2 border-gray-300 p-2.5 px-4 text-[17px] text-[#37763F] font-bold uppercase ">
                                <div className=" bg-gray-700 text-white px-[9px] rounded-[50px]">
                                    GP
                                </div>
                                <div>Gross Profit</div>
                            </div>
                            <div className="px-4 py-4 ">
                                {/* Sales Item List */}
                                <div className="rounded-t-lg border-2 border-[#b1d9ba]">
                                    <div className="overflow-x-auto">
                                        <table className=" w-full bg-white border-collapse">
                                            <thead>
                                                <tr className="bg-[#e6efe7]">
                                                    <th className="min-w-[210px] max-h-[60px] bg-[#d4f2d9] border-2 border-t-0 border-l-0 border-[#99d2a4] text-center py-2">
                                                        Sub Item
                                                    </th>
                                                    <th className="min-w-[150px] max-h-[150px] bg-[#d4f2d9] border-2 border-t-0 border-[#99d2a4] text-left px-8 py-2">
                                                        %GP
                                                    </th>
                                                    <th className="min-w-[210px] max-h-[60px] bg-[#d4f2d9] border-2 border-t-0 border-r-0 border-[#99d2a4] text-center py-2">
                                                        GP
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {choData &&
                                                    choData.length > 0 &&
                                                    choData.map((row) => (
                                                        <tr key={row.id}>
                                                            <td className="bg-[#F5FDF8] border border-l-0 border-[#6a9e72] px-8 py-2">
                                                                {row.subItem}
                                                            </td>
                                                            <td className="bg-[#F5FDF8] text-right border border-[#6a9e72] px-8 py-2">
                                                                77%
                                                            </td>
                                                            <td className=" bg-[#F5FDF8] border-l-0 border border-r-0 border-[#6a9e72] px-8 py-2">
                                                                2,200,000
                                                            </td>
                                                        </tr>
                                                    ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="ml-auto mt-4">
                            <div
                                className="flex items-center cursor-pointer gap-x-2 text-[15px] bg-[#3a6f41] hover:bg-[#216721] text-white px-4 py-[7px] rounded-full font-medium  active:scale-[.94] active:duration-75 transition-all"
                                onClick={() => confirmApproval()}
                            >
                                <GiConfirmed className="flex items-center w-4 h-4" />
                                Confirm
                            </div>
                        </div>
                    </div>
                ) : null}
            </div>
            <div ref={scrollRef}></div>
        </div>
    );
};

export default ApprovalBusinessFMSConfirm;
