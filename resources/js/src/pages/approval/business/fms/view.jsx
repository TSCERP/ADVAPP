import React, { useState, useEffect } from "react";
import moment from "moment";
import toast from "react-hot-toast";
import { nanoid } from "nanoid";

import {
    Input,
    Modal,
    Select,
    message,
    Upload,
    Button,
    Checkbox,
    Tabs,
    DatePicker,
    Space,
    Divider,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";

import {
    IoChatbubbleEllipsesOutline,
    IoWarningOutline,
    IoEyeOutline,
    IoPrintOutline,
} from "react-icons/io5";
import {
    MdDeleteOutline,
    MdOutlineLink,
    MdOutlineCancel,
} from "react-icons/md";
import { IoIosListBox } from "react-icons/io";
import { LuTrash2, LuPlus, LuSend, LuLink2, LuBook } from "react-icons/lu";
import { FaArrowUp, FaCheck, FaInfo, FaRedoAlt, FaLink } from "react-icons/fa";
import { GrAttachment } from "react-icons/gr";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { TbSquareRoundedLetterC, TbSquareRoundedLetterS } from "react-icons/tb";
import { FaCircleDollarToSlot, FaRegCopy } from "react-icons/fa6";
import { BiEdit } from "react-icons/bi";

import SalesModal from "../../../../components/approval/SalesModal";
import CostModal from "../../../../components/approval/CostModal";
import ApprovalComment from "../../../../components/approval/ApprovalComment";
import DecimalNumberInput from "../../../../components/approval/DecimalNumberInput";
import Check from "../../../../utils/icons/Check";
import FiscalRecap from "../../../../utils/icons/FiscalRecap";

import formatBytes from "../../../../utils/number/formatBytes";
import formatNumberWithCommas from "../../../../utils/number/formatNumberWithCommas";

// Get instance variables
const { TextArea } = Input;
const oldTitle = document.title;
const newTitle = "View Approval FMS - Aeon Delight Vietnam";

const ApprovalBusinessFMSView = () => {
    /**
     *  All constants defined here
     */
    const currentTime = moment().format("DD/MM/YYYY");

    /**
     *  All states defined here
     */
    const [salesItems, setSalesItems] = useState([
        {
            id: nanoid(8),
            customerId: "1",
            customerName: "Công ty ABC",
            customerTax: "1122334455",
            customerSiteId: "1",
            customerSiteName: "Site 1",
            paymentTerm: "1",
            paymentTermAndCondition: "Test",
            currency: "VND",
            exchangeRate: 1,
            subItem: "1",
            itemName: "Test Item Name",
            itemGroup: "Group 1",
            description: "Test description",
            unitId: "1",
            unit: "piece",
            quantity: 2,
            vat: 0,
            unitPrice: 1500000,
            vatAmount: 0,
            beforeVAT: 3000000,
            afterVAT: 3000000,
            cUnitPrice: 1500000,
            cVATAmount: 0,
            cBeforeVAT: 3000000,
            cAfterVAT: 3000000,
            allocation: null,
        },
    ]);
    const [salesSummary, setSalesSummary] = useState({
        total: 0,
        vat: 0,
        grandTotal: 0,
    });
    const [additionalSalesItems, setAdditionalSalesItems] = useState([
        {
            id: nanoid(8),
            customerId: "2",
            customerName: "Công ty DEF",
            customerTax: "5544332211",
            customerSiteId: "2",
            customerSiteName: "Site 2",
            paymentTerm: "2",
            paymentTermAndCondition: "Test 2",
            currency: "VND",
            exchangeRate: 1,
            subItem: "2",
            itemName: "Test 2 Item Name",
            itemGroup: "Group 2",
            description: "Test description 2",
            unitId: "2",
            unit: "piece",
            vat: 0,
            unitPrice: 100000,
            vatAmount: 0,
            beforeVAT: 500000,
            afterVAT: 500000,
            cUnitPrice: 500000,
            cVATAmount: 0,
            cBeforeVAT: 500000,
            cAfterVAT: 500000,
        },
    ]);
    const [costItems, setCostItems] = useState([
        {
            id: nanoid(8),
            vendorId: "1",
            vendorName: "Công ty ABC",
            vendorTax: "1122334455",
            customerSiteId: "1",
            customerSiteName: "Site 1",
            paymentTerm: "1",
            paymentTermAndCondition: "Test",
            currency: "VND",
            exchangeRate: 1,
            subItem: "1",
            itemName: "Test Item Name",
            itemGroup: "Group 1",
            description: "Test description",
            unitId: "1",
            unit: "time",
            quantity: 2,
            vat: 0,
            unitPrice: 1500000,
            vatAmount: 0,
            beforeVAT: 3000000,
            afterVAT: 3000000,
            cUnitPrice: 1500000,
            cVATAmount: 0,
            cBeforeVAT: 3000000,
            cAfterVAT: 3000000,
            allocation: null,
        },
    ]);
    const [costSummary, setCostSummary] = useState({
        total: 0,
        vat: 0,
        grandTotal: 0,
    });
    const [additionalCostItems, setAdditionalCostItems] = useState([
        {
            id: nanoid(8),
            vendorId: "2",
            vendorName: "Công ty DEF",
            vendorTax: "5544332211",
            customerSiteId: "2",
            customerSiteName: "Site 2",
            paymentTerm: "2",
            paymentTermAndCondition: "Test 2",
            currency: "VND",
            exchangeRate: 1,
            subItem: "2",
            itemName: "Test 2 Item Name",
            itemGroup: "Group 2",
            description: "Test description 2",
            unitId: "2",
            unit: "piece",
            vat: 0,
            unitPrice: 100000,
            vatAmount: 0,
            beforeVAT: 500000,
            afterVAT: 500000,
            cUnitPrice: 500000,
            cVATAmount: 0,
            cBeforeVAT: 500000,
            cAfterVAT: 500000,
        },
    ]);

    const [currentSalesItem, setCurrentSalesItem] = useState(null);
    const [currentCostItem, setCurrentCostItem] = useState(null);

    const [isAllocateModalOpen, setIsAllocateModalOpen] = useState(false);
    const [isSalesModalOpen, setIsSalesModalOpen] = useState(false);
    const [isCostModalOpen, setIsCostModalOpen] = useState(false);

    const [currentType, setCurrentType] = useState(null);
    const [currentMode, setCurrentMode] = useState(null);

    const [salesStartDate, setSalesStartDate] = useState("");
    const [salesEndDate, setSalesEndDate] = useState("");
    const [costStartDate, setCostStartDate] = useState("");
    const [costEndDate, setCostEndDate] = useState("");

    const [negotiators, setNegotiators] = useState([
        {
            userId: "1",
            approval: "",
            date: "",
            reason: "Test 1",
        },
        {
            userId: "2",
            approval: "1",
            date: "01/02/2024",
            reason: "",
        },
    ]);

    const [permitter, setPermitter] = useState({
        userId: "1",
        approval: "1",
        date: "01/02/2024",
        reason: "Test 1",
    });

    const [finalApprover, setFinalApprover] = useState({
        userId: "3",
        userName: "Test 1",
        approval: "1",
        date: "",
        reason: "Test 1",
    });

    const [newTradingAttachment, setNewTradingAttachment] = useState([]);
    const [afterImplementationAttachment, setAfterImplementationAttachment] =
        useState([]);
    const [otherAttachment, setOtherAttachment] = useState([]);

    const [isPermitterCommentExpanding, setIsPermitterCommentExpanding] =
        useState(false);
    const [isApproverCommentExpanding, setIsApproverCommentExpanding] =
        useState(false);
    const [isApproverInfoModalOpen, setIsApproverInfoModalOpen] =
        useState(false);

    const [permitterComment, setPermitterComment] = useState("");
    const [approverComment, setApproverComment] = useState("");
    const [negotiatorActions, setNegotiatorActions] = useState([
        {
            id: negotiators[0].userId,
            comment: false,
            commentText: "",
            info: false,
        },
        {
            id: negotiators[1].userId,
            comment: false,
            commentText: "",
            info: false,
        },
    ]);

    /**
     *  All refs defined here
     */

    /**
     *  All functions defined here
     */
    const handleOpenSalesCostModal = (type, mode, id) => {
        setCurrentType(type);
        setCurrentMode(mode);
        if (type == "sales" || type == "additionalSales") {
            setIsSalesModalOpen(true);
            if (type == "additionalSales") {
                // Chỗ này lấy current id để hiện modal
            }
        } else if (type == "cost" || type == "additionalCost") {
            setIsCostModalOpen(true);
            if (type == "additionalCost") {
                // Chỗ này lấy current id để hiện modal
            }
        }
    };

    const handleCloseSalesCostModal = () => {
        setIsSalesModalOpen(false);
        setIsCostModalOpen(false);
    };

    const handleCloseAllocateModal = () => {
        setIsAllocateModalOpen(false);
    };

    const handleApprovalMatrix = () => {
        toast("This module is under development.");
    };

    const handlePrint = () => {
        toast("This module is under development.");
    };

    const handleDelete = () => {
        toast("This module is under development.");
    };

    const handleCancel = () => {
        toast("This module is under development.");
    };

    const handleRevise = () => {
        toast("This module is under development.");
    };

    const handleCopy = () => {
        toast("This module is under development.");
    };

    const handleEdit = () => {
        toast("This module is under development.");
    };

    const handleSubmit = () => {
        toast("This module is under development.");
    };

    /**
     *  All effected here
     */
    useEffect(() => {
        document.title = newTitle;
        return () => {
            document.title = oldTitle;
        };
    }, []);

    return (
        <>
            <div className="page m-7 my-7 border border-gray-200 shadow-[0_8px_30px_rgb(0,0,0,0.13)] bg-white rounded-xl">
                <div className="p-6">
                    {/* Status Bar */}
                    <div className="bg-blue-50 text-blue-500 rounded-md p-1 px-4 w-fit font-semibold text-md mb-3">
                        New
                    </div>

                    {/* Header */}
                    <div className="flex justify-between">
                        <div className="flex gap-3">
                            <span className="text-[27px] font-bold">
                                Approval FMS
                            </span>
                            <button
                                className="flex items-center space-x-2 p-2 rounded-lg bg-[#3a6f41] px-4 text-white font-medium active:scale-[.87] active:duration-75 transition-all"
                                onClick={handleSubmit}
                            >
                                <LuSend className="w-5 h-5" />
                                <div className="text-[15px]">Submit</div>
                            </button>
                        </div>
                        <div className="flex gap-3 flex-row-reverse">
                            <button
                                className="flex items-center space-x-2 p-2 rounded-lg bg-[#3a6f41] px-4 text-white font-medium active:scale-[.87] active:duration-75 transition-all"
                                onClick={handlePrint}
                            >
                                <IoPrintOutline className="w-5 h-5" />
                                <div className="text-[15px]">Print</div>
                            </button>
                            <button
                                className="flex items-center space-x-2 p-2 rounded-lg bg-[#3a6f41] px-4 text-white font-medium active:scale-[.87] active:duration-75 transition-all"
                                onClick={handleDelete}
                            >
                                <MdDeleteOutline className="w-5 h-5" />
                                <div className="text-[15px]">Delete</div>
                            </button>
                            <button
                                className="flex items-center space-x-2 p-2 rounded-lg bg-[#3a6f41] px-4 text-white font-medium active:scale-[.87] active:duration-75 transition-all"
                                onClick={handleCancel}
                            >
                                <MdOutlineCancel className="w-5 h-5" />
                                <div className="text-[15px]">Cancel</div>
                            </button>
                            <button
                                className="flex items-center space-x-2 p-2 rounded-lg bg-[#3a6f41] px-4 text-white font-medium active:scale-[.87] active:duration-75 transition-all"
                                onClick={handleRevise}
                            >
                                <LuBook className="w-5 h-5" />
                                <div className="text-[15px]">Revise</div>
                            </button>
                            <button
                                className="flex items-center space-x-2 p-2 rounded-lg bg-[#3a6f41] px-4 text-white font-medium active:scale-[.87] active:duration-75 transition-all"
                                onClick={handleCopy}
                            >
                                <FaRegCopy className="w-5 h-5" />
                                <div className="text-[15px]">Copy</div>
                            </button>
                            <button
                                className="flex items-center space-x-2 p-2 rounded-lg bg-[#3a6f41] px-4 text-white font-medium active:scale-[.87] active:duration-75 transition-all"
                                onClick={handleEdit}
                            >
                                <BiEdit className="w-5 h-5" />
                                <div className="text-[15px]">Edit</div>
                            </button>
                        </div>
                    </div>

                    {/* Automatic Generated Information */}
                    <div className="grid grid-cols-5 mt-4 gap-4">
                        <div className="col-span-1">
                            <label className="block text-[15px]  font-semibold text-gray-900">
                                Approval Date
                            </label>
                            <div className="font-bold text-[#3A6F41] text-lg inter-font">
                                {currentTime}
                            </div>
                        </div>
                        <div className="col-span-1">
                            <label className="block text-[15px] font-semibold text-gray-900">
                                Approval No
                            </label>
                            <div className="font-bold text-[#3A6F41] text-lg inter-font">
                                2024-0000
                            </div>
                        </div>
                    </div>

                    {/* General Infomation */}
                    <div className="my-6">
                        {/* Header */}
                        <div className="uppercase my-1 text-[17px] font-bold">
                            General Information
                        </div>
                        <div className="h-[2px] rounded-full bg-[#3a6f41] w-full"></div>

                        {/* Approval Matrix  */}
                        <div className="flex justify-end my-3 mb-2">
                            <button
                                className="flex space-x-2 p-1 px-4 font-medium text-[15px] text-blue-600  bg-blue-50 rounded-3xl active:scale-[.92] active:duration-75 transition-all"
                                onClick={handleApprovalMatrix}
                            >
                                <LuLink2 className="w-5 h-5" />
                                <div>Approval Matrix</div>
                            </button>
                        </div>

                        <div className="mt-4 grid grid-cols-3 gap-4">
                            <div className="col-span-1">
                                <label className="block mb-2 text-[15px] font-semibold text-gray-900">
                                    Approval Category
                                </label>
                                <Select
                                    disabled={true}
                                    className="w-full text-[15px] !font-normal !text-gray-900 !cursor-default"
                                    placeholder="Select Approval Category"
                                    filterOption={(input, option) =>
                                        (option?.label ?? "").includes(input)
                                    }
                                    options={[
                                        {
                                            value: "1",
                                            label: "Category 1",
                                        },
                                        {
                                            value: "2",
                                            label: "Category 2",
                                        },
                                        {
                                            value: "3",
                                            label: "Category 3",
                                        },
                                    ]}
                                    value={"1"}
                                />
                            </div>
                            <div className="col-span-1">
                                <label className="block mb-2 text-[15px] font-semibold text-gray-900">
                                    Approval Category (VI)
                                </label>
                                <Input
                                    type="text"
                                    placeholder="Default Approval Category (VI)"
                                    className="font-semibold"
                                    disabled={true}
                                />
                            </div>
                            <div className="col-span-1">
                                <label className="block mb-2 text-[15px] font-semibold text-gray-900">
                                    Win Rate
                                </label>
                                <Select
                                    className="w-full text-[15px] !font-normal !text-gray-900 !cursor-default"
                                    disabled={true}
                                    placeholder="Select Win Rate"
                                    filterOption={(input, option) =>
                                        (option?.label ?? "").includes(input)
                                    }
                                    options={[
                                        {
                                            value: "1",
                                            label: "50%",
                                        },
                                        {
                                            value: "2",
                                            label: "80%",
                                        },
                                        {
                                            value: "3",
                                            label: "100%",
                                        },
                                    ]}
                                    value={"1"}
                                />
                            </div>
                        </div>

                        <div className="mt-4 grid grid-cols-3 gap-4">
                            <div className="col-span-1 flex flex-col">
                                <div className=" rounded-md text-[15px] font-semibold">
                                    <label className="block mb-2 text-[15px] font-semibold text-gray-900">
                                        FMS Approval Type
                                    </label>
                                    <Select
                                        className="w-full text-[15px] !font-normal !text-gray-900 !cursor-default"
                                        disabled={true}
                                        placeholder="Select FMS Approval Type"
                                        filterOption={(input, option) =>
                                            (option?.label ?? "").includes(
                                                input
                                            )
                                        }
                                        options={[
                                            {
                                                value: "1",
                                                label: "GMS",
                                            },
                                            {
                                                value: "2",
                                                label: "SC",
                                            },
                                            {
                                                value: "3",
                                                label: "Total",
                                            },
                                        ]}
                                    />
                                </div>
                                <div className="p-1.5 px-3 bg-gray-50 border border-[#D9D9D9] rounded-md text-[15px] mt-6 font-semibold">
                                    <Checkbox
                                        className="w-full text-[15px] !font-normal !text-gray-900 !cursor-default"
                                        disabled={true}
                                        onChange={(e) => {
                                            console.log(
                                                `Is this approval new trading? = ${e.target.checked}`
                                            );
                                        }}
                                    >
                                        New Trading Approval
                                    </Checkbox>
                                </div>
                            </div>
                            <div className="col-span-2">
                                <label className="block mb-2 text-[15px] font-semibold text-gray-900">
                                    Subject
                                </label>
                                <TextArea
                                    rows={4}
                                    className="w-full text-[15px] !font-normal !text-gray-900 !cursor-default"
                                    disabled={true}
                                    placeholder="Enter Subject Content"
                                    value={"Test 1"}
                                />
                            </div>
                        </div>

                        <div className="mt-4 grid grid-cols-2 gap-4">
                            <div className="col-span-1">
                                <label className="block mb-2 text-[15px] font-semibold text-gray-900">
                                    Division - Department
                                </label>
                                <Input
                                    type="text"
                                    disabled={true}
                                    placeholder="Enter Division - Department"
                                    className="w-full text-[15px] !font-normal !text-gray-900 !cursor-default"
                                    value={"Test 2"}
                                />
                            </div>
                            <div className="col-span-1">
                                <label className="block mb-2 text-[15px] font-semibold text-gray-900">
                                    PIC
                                </label>
                                <span className="ant-border w-full flex">
                                    Tên PIC nè
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Tabs */}
                    <div className="mt-8">
                        <Tabs
                            defaultActiveKey="1"
                            type="card"
                            className="font-medium text-[15px] "
                            items={[
                                {
                                    key: "1",
                                    label: "Sales & Cost",
                                    children: [
                                        <div>
                                            {/* Detail of Sales */}
                                            <div className="shadow-sm rounded-lg border-2 bg-[#fbfdff] border-gray-300">
                                                <div className="rounded-t-lg flex items-center space-x-3 bg-gray-100 border-b-2 border-gray-300 p-2.5 px-4 text-[17px] text-[#37763F] font-bold uppercase ">
                                                    <div className=" bg-gray-700 text-white px-[9px] rounded-[50px]">
                                                        S
                                                    </div>
                                                    <div>Detail of Sales</div>
                                                </div>
                                                <div className="px-4 py-4 ">
                                                    {/* Form */}
                                                    <div className="grid grid-cols-4 gap-4">
                                                        <div className="col-span-1">
                                                            <label className="block mb-2 text-[15px] font-semibold text-gray-900">
                                                                Start Date
                                                            </label>
                                                            <DatePicker
                                                                className="w-full text-[15px] !font-normal !text-gray-900 !cursor-default"
                                                                disabled={true}
                                                                onChange={(
                                                                    date,
                                                                    dateString
                                                                ) => {
                                                                    setSalesStartDate(
                                                                        dateString
                                                                    );
                                                                }}
                                                            />
                                                        </div>
                                                        <div className="col-span-1">
                                                            <label className="block mb-2 text-[15px] font-semibold text-gray-900">
                                                                End Date
                                                            </label>
                                                            <DatePicker
                                                                className="w-full text-[15px] !font-normal !text-gray-900 !cursor-default"
                                                                disabled={true}
                                                                onChange={(
                                                                    date,
                                                                    dateString
                                                                ) => {
                                                                    setSalesEndDate(
                                                                        dateString
                                                                    );
                                                                }}
                                                            />
                                                        </div>
                                                    </div>

                                                    <div className="mt-4 grid grid-cols-2 gap-4">
                                                        <div className="col-span-1">
                                                            <label className="block mb-2 text-[15px] font-semibold text-gray-900">
                                                                Good/Service
                                                                Summary
                                                            </label>
                                                            <TextArea
                                                                className="w-full text-[15px] !font-normal !text-gray-900 !cursor-default"
                                                                disabled={true}
                                                                rows={4}
                                                                placeholder="Enter Good/Service Summary"
                                                                value={"Test"}
                                                            />
                                                        </div>
                                                        <div className="col-span-1">
                                                            <label className="block mb-2 text-[15px] font-semibold text-gray-900">
                                                                Note
                                                            </label>
                                                            <TextArea
                                                                className="w-full text-[15px] !font-normal !text-gray-900 !cursor-default"
                                                                disabled={true}
                                                                rows={4}
                                                                placeholder="Enter Note"
                                                                value={"Test"}
                                                            />
                                                        </div>
                                                    </div>

                                                    {/* Sales Item List */}
                                                    <div className=" mt-6 rounded-t-lg border-2 border-[#b1d9ba] ">
                                                        <div className="  bg-[#D4F2D9]  rounded-t-lg flex items-center justify-between px-3 py-1.5">
                                                            <div className="flex space-x-3 items-center text-[18px] font-bold py-2 ">
                                                                <IoIosListBox className="w-6 h-6 text-[#3A6F41]" />
                                                                <div>
                                                                    Sales Item
                                                                    List
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="overflow-x-auto">
                                                            <table className=" w-full bg-white border-collapse">
                                                                <thead>
                                                                    <tr className="bg-[#e6efe7]">
                                                                        <th className=" min-w-[60px] max-h-[60px] bg-[#d4f2d9] border-2 border-l-0 border-[#99d2a4]  text-center py-2">
                                                                            Action
                                                                        </th>
                                                                        <th className="min-w-[50px] max-h-[50px] bg-[#d4f2d9] border-2 border-[#99d2a4] text-left px-8 py-2">
                                                                            No.
                                                                        </th>
                                                                        <th className="min-w-[240px] max-h-[240px] bg-[#d4f2d9] border-2 border-[#99d2a4] text-left px-8 py-2">
                                                                            Customer
                                                                            Name
                                                                        </th>
                                                                        <th className="min-w-[200px] max-h-[200px] bg-[#d4f2d9] border-2 border-[#99d2a4] text-left px-8 py-2">
                                                                            Site
                                                                        </th>
                                                                        <th className="min-w-[260px] max-h-[260px] bg-[#d4f2d9] border-2 border-[#99d2a4] text-left px-8 py-2">
                                                                            Sub
                                                                            Item
                                                                        </th>
                                                                        <th className="min-w-[200px] max-h-[200px] bg-[#d4f2d9] border-2 border-[#99d2a4] text-left px-8 py-2">
                                                                            Description
                                                                        </th>
                                                                        <th className="min-w-[100px] max-h-[100px] bg-[#d4f2d9] border-2 border-[#99d2a4] text-left px-8 py-2">
                                                                            Unit
                                                                        </th>
                                                                        <th className="min-w-[80px] max-h-[80px] bg-[#d4f2d9] border-2 border-[#99d2a4] text-center px-8 py-2">
                                                                            Quantity
                                                                        </th>
                                                                        <th className="min-w-[150px] max-h-[150px] bg-[#d4f2d9] border-2 border-[#99d2a4] text-center px-8 py-2">
                                                                            Unit
                                                                            Price
                                                                        </th>
                                                                        <th className="min-w-[150px] max-h-[150px] bg-[#d4f2d9] border-2 border-[#99d2a4] text-center px-8 py-2">
                                                                            %
                                                                            Allocation
                                                                        </th>
                                                                        <th className="min-w-[180px] max-h-[180px] bg-[#d4f2d9] border-2 border-[#99d2a4] text-center px-8 py-2">
                                                                            Before
                                                                            VAT
                                                                        </th>
                                                                        <th className="min-w-[120px] max-h-[120px] bg-[#d4f2d9] border-2 border-[#99d2a4] text-center px-8 py-2">
                                                                            VAT
                                                                            (%)
                                                                        </th>
                                                                        <th className="text-center border-r-0 min-w-[180px] max-h-[180px] bg-[#d4f2d9] border-2 border-[#99d2a4] px-8 py-2">
                                                                            After
                                                                            VAT
                                                                        </th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    {salesItems.length >
                                                                        0 &&
                                                                        salesItems.map(
                                                                            (
                                                                                item,
                                                                                idx
                                                                            ) => (
                                                                                <tr
                                                                                    key={
                                                                                        item.id
                                                                                    }
                                                                                >
                                                                                    <td className=" bg-[#F5FDF8] border-l-0 border border-[#6a9e72] px-10 py-2">
                                                                                        <div className="flex w-fit m-auto">
                                                                                            <button
                                                                                                className="text-[#6a9e72] p-1.5 rounded-full hover:bg-[#e1ffe4] font-medium active:scale-[.87] active:duration-75 transition-all"
                                                                                                onClick={() => {
                                                                                                    handleOpenSalesCostModal(
                                                                                                        "sales",
                                                                                                        "view",
                                                                                                        item.id
                                                                                                    );
                                                                                                }}
                                                                                            >
                                                                                                <IoEyeOutline className="w-5 h-5" />
                                                                                            </button>
                                                                                        </div>
                                                                                    </td>
                                                                                    <td className="bg-[#F5FDF8] border border-[#6a9e72] px-8 py-2">
                                                                                        {item.id ||
                                                                                            ""}
                                                                                    </td>
                                                                                    <td className="w-[200px] bg-[#F5FDF8] border border-[#6a9e72] px-8 py-2">
                                                                                        {item.customerName ||
                                                                                            ""}
                                                                                    </td>
                                                                                    <td className="bg-[#F5FDF8] border border-[#6a9e72] px-8 py-2">
                                                                                        {item.customerSiteName ||
                                                                                            ""}
                                                                                    </td>
                                                                                    <td className="bg-[#F5FDF8] border border-[#6a9e72] px-8 py-2">
                                                                                        {item.itemName ||
                                                                                            ""}
                                                                                    </td>
                                                                                    <td className="bg-[#F5FDF8] border border-[#6a9e72] px-8 py-2">
                                                                                        {item.description ||
                                                                                            ""}
                                                                                    </td>
                                                                                    <td className="text-center bg-[#F5FDF8] border border-[#6a9e72] px-8 py-2">
                                                                                        {item.unit ||
                                                                                            ""}
                                                                                    </td>
                                                                                    <td className="text-center bg-[#F5FDF8] border border-[#6a9e72] px-8 py-2">
                                                                                        {formatNumberWithCommas(
                                                                                            item.quantity
                                                                                        ) ||
                                                                                            ""}
                                                                                    </td>
                                                                                    <td className="text-right bg-[#F5FDF8] border border-[#6a9e72] px-8 py-2">
                                                                                        {formatNumberWithCommas(
                                                                                            item.unitPrice
                                                                                        ) ||
                                                                                            0}
                                                                                    </td>
                                                                                    <td className="text-center bg-[#F5FDF8] border border-[#6a9e72] px-8 py-2">
                                                                                        {formatNumberWithCommas(
                                                                                            item.allocation
                                                                                        ) ||
                                                                                            ""}
                                                                                    </td>
                                                                                    <td className="text-right bg-[#F5FDF8] border border-[#6a9e72] px-8 py-2">
                                                                                        {formatNumberWithCommas(
                                                                                            item.beforeVAT
                                                                                        ) ||
                                                                                            0}
                                                                                    </td>
                                                                                    <td className="text-center bg-[#F5FDF8] border border-[#6a9e72] px-8 py-2">
                                                                                        {item.vat ||
                                                                                            0}
                                                                                        {
                                                                                            "%"
                                                                                        }
                                                                                    </td>
                                                                                    <td className="text-right border-r-0 bg-[#F5FDF8] border border-[#6a9e72] px-8 py-2">
                                                                                        {formatNumberWithCommas(
                                                                                            item.afterVAT
                                                                                        ) ||
                                                                                            0}
                                                                                    </td>
                                                                                </tr>
                                                                            )
                                                                        )}
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    </div>

                                                    {/* Checkout */}
                                                    <div className="flex flex-col items-end pr-2 space-y-3">
                                                        <div className="w-1/4">
                                                            <div className="flex items-center space-x-2">
                                                                <label className="w-2/4 block mb-2 text-[15px] font-semibold text-gray-900  ">
                                                                    Total
                                                                </label>
                                                                <span className="font-semibold bg-gray-50 border border-gray-300 text-gray-900 text-[15px] text-right rounded-lg block w-full p-1.5 ">
                                                                    {formatNumberWithCommas(
                                                                        salesSummary.total
                                                                    ) || 0}
                                                                </span>
                                                            </div>
                                                        </div>
                                                        <div className="w-1/4">
                                                            <div className="flex items-center space-x-2">
                                                                <label className="w-2/4 block mb-2 text-[15px] font-semibold text-gray-900  ">
                                                                    Tax
                                                                </label>
                                                                <span className="font-semibold bg-gray-50 border border-gray-300 text-gray-900 text-[15px] text-right rounded-lg  block w-full p-1.5 ">
                                                                    {formatNumberWithCommas(
                                                                        salesSummary.vat
                                                                    ) || 0}
                                                                </span>
                                                            </div>
                                                        </div>
                                                        <div className="w-1/4">
                                                            <div className="flex items-center space-x-2">
                                                                <label className="w-2/4 block mb-2 text-[15px] font-semibold text-gray-900  ">
                                                                    Grand Total
                                                                </label>
                                                                <span className="font-semibold bg-gray-50 border border-gray-300 text-gray-900 text-[15px] text-right rounded-lg  block w-full p-1.5 ">
                                                                    {formatNumberWithCommas(
                                                                        salesSummary.grandTotal
                                                                    ) || 0}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* Additional Sales Item List */}
                                                    <div className="mt-12 rounded-t-lg border-2 border-[#A3D1AD] ">
                                                        <div className="  bg-[#d4f2d9]  rounded-t-lg flex items-center justify-start px-3 py-1.5">
                                                            <div className="flex space-x-3 items-center text-[18px] font-bold py-2 ">
                                                                <IoIosListBox className="w-6 h-6 text-[#3A6F41]" />
                                                                <div>
                                                                    Additional
                                                                    Sales Item
                                                                    List (If
                                                                    any)
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="overflow-x-auto">
                                                            <table className=" w-full bg-white border-collapse">
                                                                <thead className="bg-[#e6efe7]">
                                                                    <tr>
                                                                        <th className=" min-w-[60px] max-h-[60px] bg-[#d4f2d9] border-2 border-l-0 border-[#99d2a4]  text-center py-2">
                                                                            Action
                                                                        </th>
                                                                        <th className="min-w-[50px] max-h-[50px] bg-[#d4f2d9] border-2 border-[#99d2a4] text-left px-8 py-2">
                                                                            No.
                                                                        </th>
                                                                        <th className="min-w-[240px] max-h-[240px] bg-[#d4f2d9] border-2 border-[#99d2a4] text-left px-8 py-2">
                                                                            Customer
                                                                            Name
                                                                        </th>
                                                                        <th className="min-w-[200px] max-h-[200px] bg-[#d4f2d9] border-2 border-[#99d2a4] text-left px-8 py-2">
                                                                            Site
                                                                        </th>
                                                                        <th className="min-w-[260px] max-h-[260px] bg-[#d4f2d9] border-2 border-[#99d2a4] text-left px-8 py-2">
                                                                            Sub
                                                                            Item
                                                                        </th>
                                                                        <th className="min-w-[200px] max-h-[200px] bg-[#d4f2d9] border-2 border-[#99d2a4] text-left px-8 py-2">
                                                                            Description
                                                                        </th>
                                                                        <th className="min-w-[100px] max-h-[100px] bg-[#d4f2d9] border-2 border-[#99d2a4] text-center px-8 py-2">
                                                                            Unit
                                                                        </th>
                                                                        <th className="min-w-[150px] max-h-[150px] bg-[#d4f2d9] border-2 border-[#99d2a4] text-center px-8 py-2">
                                                                            Unit
                                                                            Price
                                                                        </th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    {additionalSalesItems.length >
                                                                        0 &&
                                                                        additionalSalesItems.map(
                                                                            (
                                                                                item,
                                                                                idx
                                                                            ) => (
                                                                                <tr
                                                                                    key={
                                                                                        item.id
                                                                                    }
                                                                                >
                                                                                    <td className="bg-[#F5FDF8] border-l-0 border border-[#6a9e72] px-10 py-3">
                                                                                        <div className="flex w-fit m-auto">
                                                                                            <button
                                                                                                className="text-[#6a9e72] p-1.5 rounded-full hover:bg-[#e1ffe4] font-medium active:scale-[.87] active:duration-75 transition-all"
                                                                                                onClick={() => {
                                                                                                    handleOpenSalesCostModal(
                                                                                                        "additionalSales",
                                                                                                        "view",
                                                                                                        item.id
                                                                                                    );
                                                                                                }}
                                                                                            >
                                                                                                <IoEyeOutline className="w-5 h-5" />
                                                                                            </button>
                                                                                        </div>
                                                                                    </td>
                                                                                    <td className="bg-[#F5FDF8] border border-[#6a9e72] px-8 py-2">
                                                                                        {item.id ||
                                                                                            ""}
                                                                                    </td>
                                                                                    <td className="w-[200px] bg-[#F5FDF8] border border-[#6a9e72] px-8 py-2">
                                                                                        {item.customerName ||
                                                                                            ""}
                                                                                    </td>
                                                                                    <td className="bg-[#F5FDF8] border border-[#6a9e72] px-8 py-2">
                                                                                        {item.customerSiteName ||
                                                                                            ""}
                                                                                    </td>
                                                                                    <td className="bg-[#F5FDF8] border border-[#6a9e72] px-8 py-2">
                                                                                        {item.itemName ||
                                                                                            ""}
                                                                                    </td>
                                                                                    <td className="bg-[#F5FDF8] border border-[#6a9e72] px-8 py-2">
                                                                                        {item.description ||
                                                                                            ""}
                                                                                    </td>
                                                                                    <td className="text-center bg-[#F5FDF8] border border-[#6a9e72] px-8 py-2">
                                                                                        {item.unit ||
                                                                                            ""}
                                                                                    </td>
                                                                                    <td className="text-right bg-[#F5FDF8] border border-[#6a9e72] px-8 py-2">
                                                                                        {formatNumberWithCommas(
                                                                                            item.unitPrice
                                                                                        ) ||
                                                                                            ""}
                                                                                    </td>
                                                                                </tr>
                                                                            )
                                                                        )}
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="my-6 border-dashed border-b-2 border-gray-300"></div>

                                            {/* Detail of Cost */}
                                            <div className="shadow-sm mt-4 mb-3 rounded-lg border-2 border-gray-300 bg-[#fbfdff] ">
                                                <div className="flex items-center space-x-3 rounded-t-lg bg-gray-100 border-b-2 border-gray-300 p-2.5 px-4 text-[17px] text-[#37763F] font-bold uppercase ">
                                                    <div className=" bg-gray-700 text-white px-2 rounded-[50px]">
                                                        C
                                                    </div>
                                                    <div>Detail of Cost</div>
                                                </div>
                                                <div className="px-4 py-4 ">
                                                    {/* Form */}
                                                    <div className="grid grid-cols-4 gap-4">
                                                        <div className="col-span-1">
                                                            <label className="block mb-2 text-[15px] font-semibold text-gray-900">
                                                                Start Date
                                                            </label>
                                                            <DatePicker
                                                                className="w-full text-[15px] !font-normal !text-gray-900 !cursor-default"
                                                                disabled={true}
                                                            />
                                                        </div>
                                                        <div className="col-span-1">
                                                            <label className="block mb-2 text-[15px] font-semibold text-gray-900">
                                                                End Date
                                                            </label>
                                                            <DatePicker
                                                                className="w-full text-[15px] !font-normal !text-gray-900 !cursor-default"
                                                                disabled={true}
                                                            />
                                                        </div>
                                                    </div>

                                                    <div className="mt-4 grid grid-cols-2 gap-4">
                                                        <div className="col-span-1">
                                                            <label className="block mb-2 text-[15px] font-semibold text-gray-900">
                                                                Good/Service
                                                                Summary
                                                            </label>
                                                            <TextArea
                                                                className="w-full text-[15px] !font-normal !text-gray-900 !cursor-default"
                                                                rows={4}
                                                                placeholder="Enter Good/Service Summary"
                                                                disabled={true}
                                                                value={"Test 1"}
                                                            />
                                                        </div>
                                                        <div className="col-span-1">
                                                            <label className="block mb-2 text-[15px] font-semibold text-gray-900">
                                                                Note
                                                            </label>
                                                            <TextArea
                                                                className="w-full text-[15px] !font-normal !text-gray-900 !cursor-default"
                                                                disabled={true}
                                                                rows={4}
                                                                placeholder="Enter Note"
                                                                value={"Test"}
                                                            />
                                                        </div>
                                                    </div>

                                                    {/* Purchasing Item List */}
                                                    <div className=" mt-6 rounded-t-lg border-2 border-[#b1d9ba] ">
                                                        <div className="  bg-[#D4F2D9]  rounded-t-lg flex items-center justify-start px-3 py-1.5">
                                                            <div className="flex space-x-3 items-center text-[18px] font-bold py-2 ">
                                                                <IoIosListBox className="w-6 h-6 text-[#3A6F41]" />
                                                                <div>
                                                                    Purchasing
                                                                    Item List
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="overflow-x-auto">
                                                            <table className=" w-full bg-white border-collapse">
                                                                <thead>
                                                                    <tr className="bg-[#e6efe7]">
                                                                        <th className=" min-w-[60px] max-h-[60px] bg-[#d4f2d9] border-2 border-l-0 border-[#99d2a4]  text-center py-2">
                                                                            Action
                                                                        </th>
                                                                        <th className="min-w-[50px] max-h-[50px] bg-[#d4f2d9] border-2 border-[#99d2a4] text-left px-8 py-2">
                                                                            No.
                                                                        </th>
                                                                        <th className="min-w-[240px] max-h-[240px] bg-[#d4f2d9] border-2 border-[#99d2a4] text-left px-8 py-2">
                                                                            Vendor
                                                                            Name
                                                                        </th>
                                                                        <th className="min-w-[200px] max-h-[200px] bg-[#d4f2d9] border-2 border-[#99d2a4] text-left px-8 py-2">
                                                                            Customer
                                                                            Site
                                                                        </th>
                                                                        <th className="min-w-[260px] max-h-[260px] bg-[#d4f2d9] border-2 border-[#99d2a4] text-left px-8 py-2">
                                                                            Sub
                                                                            Item
                                                                        </th>
                                                                        <th className="min-w-[200px] max-h-[200px] bg-[#d4f2d9] border-2 border-[#99d2a4] text-left px-8 py-2">
                                                                            Description
                                                                        </th>
                                                                        <th className="min-w-[100px] max-h-[100px] bg-[#d4f2d9] border-2 border-[#99d2a4] text-center px-8 py-2">
                                                                            Unit
                                                                        </th>
                                                                        <th className="min-w-[80px] max-h-[80px] bg-[#d4f2d9] border-2 border-[#99d2a4] text-center px-8 py-2">
                                                                            Quantity
                                                                        </th>
                                                                        <th className="min-w-[150px] max-h-[150px] bg-[#d4f2d9] border-2 border-[#99d2a4] text-center px-8 py-2">
                                                                            Unit
                                                                            Price
                                                                        </th>
                                                                        <th className="min-w-[150px] max-h-[150px] bg-[#d4f2d9] border-2 border-[#99d2a4] text-center px-8 py-2">
                                                                            %
                                                                            Allocation
                                                                        </th>
                                                                        <th className="min-w-[180px] max-h-[180px] bg-[#d4f2d9] border-2 border-[#99d2a4] text-center px-8 py-2">
                                                                            Before
                                                                            VAT
                                                                        </th>
                                                                        <th className="min-w-[120px] max-h-[120px] bg-[#d4f2d9] border-2 border-[#99d2a4] text-center px-8 py-2">
                                                                            VAT
                                                                            (%)
                                                                        </th>
                                                                        <th className="border-r-0 min-w-[180px] max-h-[180px] bg-[#d4f2d9] border-2 border-[#99d2a4] text-center px-8 py-2">
                                                                            After
                                                                            VAT
                                                                        </th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    {costItems.length >
                                                                        0 &&
                                                                        costItems.map(
                                                                            (
                                                                                item,
                                                                                idx
                                                                            ) => (
                                                                                <tr
                                                                                    key={
                                                                                        item.id
                                                                                    }
                                                                                >
                                                                                    <td className=" bg-[#F5FDF8] border-l-0 border border-[#6a9e72] px-10 py-2">
                                                                                        <div className="flex w-fit m-auto">
                                                                                            <button
                                                                                                className="text-[#6a9e72] p-1.5 rounded-full hover:bg-[#e1ffe4] font-medium active:scale-[.87] active:duration-75 transition-all"
                                                                                                onClick={() => {
                                                                                                    handleOpenSalesCostModal(
                                                                                                        "cost",
                                                                                                        "view",
                                                                                                        item.id
                                                                                                    );
                                                                                                }}
                                                                                            >
                                                                                                <IoEyeOutline className="w-5 h-5" />
                                                                                            </button>
                                                                                        </div>
                                                                                    </td>
                                                                                    <td className="bg-[#F5FDF8] border border-[#6a9e72] px-8 py-2">
                                                                                        {item.id ||
                                                                                            ""}
                                                                                    </td>
                                                                                    <td className="w-[200px] bg-[#F5FDF8] border border-[#6a9e72] px-8 py-2">
                                                                                        {item.vendorName ||
                                                                                            ""}
                                                                                    </td>
                                                                                    <td className="bg-[#F5FDF8] border border-[#6a9e72] px-8 py-2">
                                                                                        {item.customerSiteName ||
                                                                                            ""}
                                                                                    </td>
                                                                                    <td className="bg-[#F5FDF8] border border-[#6a9e72] px-8 py-2">
                                                                                        {item.itemName ||
                                                                                            ""}
                                                                                    </td>
                                                                                    <td className="bg-[#F5FDF8] border border-[#6a9e72] px-8 py-2">
                                                                                        {item.description ||
                                                                                            ""}
                                                                                    </td>
                                                                                    <td className="text-centerbg-[#F5FDF8] border border-[#6a9e72] px-8 py-2">
                                                                                        {item.unit ||
                                                                                            ""}
                                                                                    </td>
                                                                                    <td className="text-center bg-[#F5FDF8] border border-[#6a9e72] px-8 py-2">
                                                                                        {formatNumberWithCommas(
                                                                                            item.quantity
                                                                                        ) ||
                                                                                            ""}
                                                                                    </td>
                                                                                    <td className="text-right bg-[#F5FDF8] border border-[#6a9e72] px-8 py-2">
                                                                                        {formatNumberWithCommas(
                                                                                            item.unitPrice
                                                                                        ) ||
                                                                                            ""}
                                                                                    </td>
                                                                                    <td className="text-center bg-[#F5FDF8] border border-[#6a9e72] px-8 py-2">
                                                                                        {formatNumberWithCommas(
                                                                                            item.allocation
                                                                                        ) ||
                                                                                            ""}
                                                                                    </td>
                                                                                    <td className="text-right bg-[#F5FDF8] border border-[#6a9e72] px-8 py-2">
                                                                                        {formatNumberWithCommas(
                                                                                            item.beforeVAT
                                                                                        ) ||
                                                                                            ""}
                                                                                    </td>
                                                                                    <td className="text-center bg-[#F5FDF8] border border-[#6a9e72] px-8 py-2">
                                                                                        {item.vat ||
                                                                                            ""}
                                                                                        {
                                                                                            "%"
                                                                                        }
                                                                                    </td>
                                                                                    <td className="text-right border-r-0 bg-[#F5FDF8] border border-[#6a9e72] px-8 py-2">
                                                                                        {formatNumberWithCommas(
                                                                                            item.afterVAT
                                                                                        ) ||
                                                                                            ""}
                                                                                    </td>
                                                                                </tr>
                                                                            )
                                                                        )}
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    </div>

                                                    {/* Checkout */}
                                                    <div className="flex flex-col items-end pr-2 space-y-3">
                                                        <div className="w-1/4">
                                                            <div className="flex items-center space-x-2">
                                                                <label className="w-2/4 block mb-2 text-[15px] font-semibold text-gray-900  ">
                                                                    Total
                                                                </label>
                                                                <span className="font-semibold bg-gray-50 border border-gray-300 text-gray-900 text-[15px] text-right rounded-lg  block w-full p-1.5 ">
                                                                    {formatNumberWithCommas(
                                                                        costSummary.total
                                                                    ) || 0}
                                                                </span>
                                                            </div>
                                                        </div>
                                                        <div className="w-1/4">
                                                            <div className="flex items-center space-x-2">
                                                                <label className="w-2/4 block mb-2 text-[15px] font-semibold text-gray-900  ">
                                                                    Tax
                                                                </label>
                                                                <span className="font-sembold bg-gray-50 border border-gray-300 text-gray-900 text-[15px] text-right rounded-lg  block w-full p-1.5 ">
                                                                    {formatNumberWithCommas(
                                                                        costSummary.vat
                                                                    ) || 0}
                                                                </span>
                                                            </div>
                                                        </div>
                                                        <div className="w-1/4">
                                                            <div className="flex items-center space-x-2">
                                                                <label className="w-2/4 block mb-2 text-[15px] font-semibold text-gray-900  ">
                                                                    Grand Total
                                                                </label>
                                                                <span className="font-semibold bg-gray-50 border border-gray-300 text-gray-900 text-[15px] text-right rounded-lg  block w-full p-1.5 ">
                                                                    {formatNumberWithCommas(
                                                                        costSummary.grandTotal
                                                                    ) || 0}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* Additional Purchasing List Item */}
                                                    <div className="mt-12 rounded-t-lg border-2 border-[#A3D1AD] ">
                                                        <div className="  bg-[#d4f2d9]  rounded-t-lg flex items-center justify-start px-3 py-1.5">
                                                            <div className="flex space-x-3 items-center text-[18px] font-bold py-2 ">
                                                                <IoIosListBox className="w-6 h-6 text-[#3A6F41]" />
                                                                <div>
                                                                    Additional
                                                                    Purchasing
                                                                    Item List
                                                                    (If any)
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="overflow-x-auto">
                                                            <table className=" w-full bg-white border-collapse">
                                                                <thead className="bg-[#e6efe7]">
                                                                    <tr>
                                                                        <th className=" min-w-[60px] max-h-[60px] bg-[#d4f2d9] border-2 border-l-0 border-[#99d2a4]  text-center py-2">
                                                                            Action
                                                                        </th>
                                                                        <th className="min-w-[50px] max-h-[50px] bg-[#d4f2d9] border-2 border-[#99d2a4] text-left px-8 py-2">
                                                                            No.
                                                                        </th>
                                                                        <th className="min-w-[240px] max-h-[240px] bg-[#d4f2d9] border-2 border-[#99d2a4] text-left px-8 py-2">
                                                                            Vendor
                                                                            Name
                                                                        </th>
                                                                        <th className="min-w-[200px] max-h-[200px] bg-[#d4f2d9] border-2 border-[#99d2a4] text-left px-8 py-2">
                                                                            Customer
                                                                            Site
                                                                        </th>
                                                                        <th className="min-w-[260px] max-h-[260px] bg-[#d4f2d9] border-2 border-[#99d2a4] text-left px-8 py-2">
                                                                            Sub
                                                                            Item
                                                                        </th>
                                                                        <th className="min-w-[200px] max-h-[200px] bg-[#d4f2d9] border-2 border-[#99d2a4] text-left px-8 py-2">
                                                                            Description
                                                                        </th>
                                                                        <th className="min-w-[100px] max-h-[100px] bg-[#d4f2d9] border-2 border-[#99d2a4] text-center px-8 py-2">
                                                                            Unit
                                                                        </th>
                                                                        <th className="min-w-[150px] max-h-[150px] bg-[#d4f2d9] border-2 border-[#99d2a4] text-center px-8 py-2">
                                                                            Unit
                                                                            Price
                                                                        </th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    {additionalCostItems.length >
                                                                        0 &&
                                                                        additionalCostItems.map(
                                                                            (
                                                                                item,
                                                                                idx
                                                                            ) => (
                                                                                <tr
                                                                                    key={
                                                                                        item.id
                                                                                    }
                                                                                >
                                                                                    <td className=" bg-[#F5FDF8] border-l-0 border border-[#6a9e72] px-10 py-3">
                                                                                        <div className="flex w-fit m-auto">
                                                                                            <button
                                                                                                className="text-[#6a9e72] p-1.5 rounded-full hover:bg-[#e1ffe4] font-medium active:scale-[.87] active:duration-75 transition-all"
                                                                                                onClick={() => {
                                                                                                    handleOpenSalesCostModal(
                                                                                                        "additionalCost",
                                                                                                        "view",
                                                                                                        item.id
                                                                                                    );
                                                                                                }}
                                                                                            >
                                                                                                <IoEyeOutline className="w-5 h-5" />
                                                                                            </button>
                                                                                        </div>
                                                                                    </td>
                                                                                    <td className="bg-[#F5FDF8] border border-[#6a9e72] px-8 py-2">
                                                                                        {item.id ||
                                                                                            ""}
                                                                                    </td>
                                                                                    <td className="w-[200px] bg-[#F5FDF8] border border-[#6a9e72] px-8 py-2">
                                                                                        {item.vendorName ||
                                                                                            ""}
                                                                                    </td>
                                                                                    <td className="bg-[#F5FDF8] border border-[#6a9e72] px-8 py-2">
                                                                                        {item.customerSiteName ||
                                                                                            ""}
                                                                                    </td>
                                                                                    <td className="bg-[#F5FDF8] border border-[#6a9e72] px-8 py-2">
                                                                                        {item.itemName ||
                                                                                            ""}
                                                                                    </td>
                                                                                    <td className="bg-[#F5FDF8] border border-[#6a9e72] px-8 py-2">
                                                                                        {item.description ||
                                                                                            ""}
                                                                                    </td>
                                                                                    <td className="text-center bg-[#F5FDF8] border border-[#6a9e72] px-8 py-2">
                                                                                        {item.unit ||
                                                                                            ""}
                                                                                    </td>
                                                                                    <td className="text-right bg-[#F5FDF8] border border-[#6a9e72] px-8 py-2">
                                                                                        {formatNumberWithCommas(
                                                                                            item.unitPrice
                                                                                        ) ||
                                                                                            ""}
                                                                                    </td>
                                                                                </tr>
                                                                            )
                                                                        )}
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>,
                                    ],
                                },
                                {
                                    key: "2",
                                    label: "Input Proposer",
                                    children: [
                                        <div>
                                            {/* Approvers */}
                                            <div className="shadow-sm rounded-lg border-2 bg-[#fbfdff] border-gray-300">
                                                <div className="rounded-t-lg flex items-center space-x-3 bg-gray-100 border-b-2 border-gray-300 p-2.5 px-4 text-[17px] text-[#37763F] font-bold uppercase ">
                                                    <div className=" bg-gray-700 text-white p-1.5 rounded-[50px]">
                                                        <FaCheck className="w-4 h-4" />
                                                    </div>
                                                    <div>Approvers</div>
                                                </div>
                                                <div className="px-4 py-2 ">
                                                    <div className="py-2 px-3 pr-1">
                                                        <div className="space-y-6 border-l-2 border-dashed">
                                                            <div className="relative w-full">
                                                                <Check className="absolute -top-0.5 z-10 -ml-3.5 h-7 w-7 rounded-full text-[#3A6F41]" />
                                                                <div className="ml-6">
                                                                    <h4 className="text-[17px] font-bold text-[#3A6F41]">
                                                                        Permitter
                                                                    </h4>
                                                                    <div className="mt-2 border-2 border-gray-300 ">
                                                                        <div className="overflow-x-auto">
                                                                            <table className=" w-full bg-white border-collapse text-[15px]">
                                                                                <thead className="text-[16px] rounded-t-lg">
                                                                                    <tr className="border-b-2 border-gray-300">
                                                                                        <th className="w-1/4 bg-[#D4F2D9] text-[#3A6F41] text-center border-r-2 border-gray-300 py-2">
                                                                                            Permitter
                                                                                            Name
                                                                                        </th>
                                                                                        <th className=" w-1/5 bg-[#D4F2D9] text-[#3A6F41] text-center text-[17px] px-8 py-2 border-r-2 border-gray-300">
                                                                                            Approval
                                                                                        </th>
                                                                                        <th className="w-1/5 bg-[#D4F2D9] text-[#3A6F41] text-center text-[17px] px-8 py-2 border-r-2 border-gray-300">
                                                                                            Date
                                                                                        </th>
                                                                                        <th className="w-1/3 bg-[#D4F2D9] text-[#3A6F41] text-center text-[17px] px-8 py-2">
                                                                                            Reason,
                                                                                            opinions
                                                                                            or
                                                                                            conditions
                                                                                            for
                                                                                            approval
                                                                                        </th>
                                                                                    </tr>
                                                                                </thead>
                                                                                <tbody>
                                                                                    <tr className="">
                                                                                        <td className="font-semibold text-left  px-3 py-2 border-r-2 border-gray-300">
                                                                                            <Select
                                                                                                showSearch
                                                                                                className="w-full text-[15px] !font-normal !text-gray-900 !cursor-default"
                                                                                                disabled={
                                                                                                    true
                                                                                                }
                                                                                                placeholder="Select Negotiator"
                                                                                                filterOption={(
                                                                                                    input,
                                                                                                    option
                                                                                                ) =>
                                                                                                    (
                                                                                                        option?.label ??
                                                                                                        ""
                                                                                                    ).includes(
                                                                                                        input
                                                                                                    )
                                                                                                }
                                                                                                value={
                                                                                                    permitter.userId
                                                                                                }
                                                                                                options={[
                                                                                                    {
                                                                                                        value: "1",
                                                                                                        label: "Permitter 1",
                                                                                                    },
                                                                                                    {
                                                                                                        value: "2",
                                                                                                        label: "Permitter 2",
                                                                                                    },
                                                                                                    {
                                                                                                        value: "3",
                                                                                                        label: "Permitter 3",
                                                                                                    },
                                                                                                ]}
                                                                                            />
                                                                                        </td>
                                                                                        <td className=" px-3 py-2 border-r-2 border-gray-300">
                                                                                            <Select
                                                                                                disabled={
                                                                                                    true
                                                                                                }
                                                                                                className="w-full text-[15px] !font-normal !text-gray-900 !cursor-default"
                                                                                                placeholder="Select Approval"
                                                                                                filterOption={(
                                                                                                    input,
                                                                                                    option
                                                                                                ) =>
                                                                                                    (
                                                                                                        option?.label ??
                                                                                                        ""
                                                                                                    ).includes(
                                                                                                        input
                                                                                                    )
                                                                                                }
                                                                                                value={
                                                                                                    permitter.approval
                                                                                                }
                                                                                                options={[
                                                                                                    {
                                                                                                        value: "1",
                                                                                                        label: "Approve",
                                                                                                    },
                                                                                                    {
                                                                                                        value: "2",
                                                                                                        label: "Reject",
                                                                                                    },
                                                                                                    {
                                                                                                        value: "3",
                                                                                                        label: "Approve with condition",
                                                                                                    },
                                                                                                ]}
                                                                                            />
                                                                                        </td>
                                                                                        <td className="w-[200px] px-3 border-r-2 py-2">
                                                                                            <DatePicker
                                                                                                disabled
                                                                                                placeholder=""
                                                                                                className="w-full h-[30px]"
                                                                                                // value={
                                                                                                //     ""
                                                                                                // }
                                                                                            />
                                                                                        </td>
                                                                                        <td className="w-[200px] px-3 py-2">
                                                                                            <div className="flex gap-2 items-center">
                                                                                                <TextArea
                                                                                                    disabled={
                                                                                                        true
                                                                                                    }
                                                                                                    rows={
                                                                                                        1
                                                                                                    }
                                                                                                    className="w-full"
                                                                                                    value={
                                                                                                        permitter.reason
                                                                                                    }
                                                                                                />
                                                                                                <IoChatbubbleEllipsesOutline
                                                                                                    className="w-6 h-6 text-[#3A6F41] hover:cursor-pointer"
                                                                                                    onClick={() =>
                                                                                                        setIsPermitterCommentExpanding(
                                                                                                            !isPermitterCommentExpanding
                                                                                                        )
                                                                                                    }
                                                                                                />
                                                                                            </div>
                                                                                        </td>
                                                                                    </tr>
                                                                                </tbody>
                                                                            </table>
                                                                        </div>
                                                                    </div>
                                                                    <ApprovalComment
                                                                        isExpanded={
                                                                            isPermitterCommentExpanding
                                                                        }
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="static flex w-full">
                                                                <Check />
                                                                <div className="ml-[10px] static flex-1">
                                                                    <h4 className="text-[18px] font-bold text-[#3A6F41]">
                                                                        Negotiators
                                                                    </h4>
                                                                    <div className="mt-2 mb-2  border-2 border-gray-300 ">
                                                                        <div className="overflow-x-auto overflow-y-visible no-scrollbar">
                                                                            <table className="w-full bg-white border-collapse text-[15px]">
                                                                                <thead className="text-[16px] rounded-t-lg">
                                                                                    <tr className="border-b-2 border-gray-300">
                                                                                        <th className="w-1/4 bg-[#D4F2D9] text-[#3A6F41] text-center px-8 py-2 border-r-2 border-gray-300">
                                                                                            Negotator
                                                                                            Name
                                                                                        </th>
                                                                                        <th className="w-1/5 bg-[#D4F2D9] text-[#3A6F41] text-center px-8 py-2 border-r-2 border-gray-300">
                                                                                            Approval
                                                                                        </th>
                                                                                        <th className="w-1/5 bg-[#D4F2D9] text-[#3A6F41] text-center border-r-2 border-gray-300 px-8 py-2">
                                                                                            Date
                                                                                        </th>
                                                                                        <th className="w-1/3 bg-[#D4F2D9] text-[#3A6F41] text-center px-8 py-2">
                                                                                            Reasons,
                                                                                            opinions
                                                                                            or
                                                                                            conditions
                                                                                            for
                                                                                            approval
                                                                                        </th>
                                                                                    </tr>
                                                                                </thead>
                                                                                <tbody>
                                                                                    {negotiators.length >
                                                                                        0 &&
                                                                                        negotiators.map(
                                                                                            (
                                                                                                negotiator,
                                                                                                key
                                                                                            ) => (
                                                                                                <>
                                                                                                    <tr
                                                                                                        key={
                                                                                                            negotiator.userId
                                                                                                        }
                                                                                                        className={`border-gray-300 border-b-2 ${
                                                                                                            key !==
                                                                                                                length -
                                                                                                                    1 &&
                                                                                                            "border-b-0"
                                                                                                        }`}
                                                                                                    >
                                                                                                        <td className="px-3 py-2 border-r-2 border-gray-300">
                                                                                                            <Select
                                                                                                                disabled={
                                                                                                                    true
                                                                                                                }
                                                                                                                showSearch
                                                                                                                className="w-full text-[15px]"
                                                                                                                placeholder="Select Negotiator"
                                                                                                                filterOption={(
                                                                                                                    input,
                                                                                                                    option
                                                                                                                ) =>
                                                                                                                    (
                                                                                                                        option?.label ??
                                                                                                                        ""
                                                                                                                    ).includes(
                                                                                                                        input
                                                                                                                    )
                                                                                                                }
                                                                                                                value={
                                                                                                                    negotiator.userId
                                                                                                                }
                                                                                                                options={[
                                                                                                                    {
                                                                                                                        value: "1",
                                                                                                                        label: "Negotiator 1",
                                                                                                                    },
                                                                                                                    {
                                                                                                                        value: "2",
                                                                                                                        label: "Negotiator 2",
                                                                                                                    },
                                                                                                                    {
                                                                                                                        value: "3",
                                                                                                                        label: "Negotiator 3",
                                                                                                                    },
                                                                                                                ]}
                                                                                                            />
                                                                                                        </td>
                                                                                                        <td className="w-[200px] px-3 border-r-2 py-2">
                                                                                                            <Select
                                                                                                                disabled={
                                                                                                                    true
                                                                                                                }
                                                                                                                className={`w-full text-[15px] 
                                                                                                                "!font-normal !text-gray-900 !cursor-default"
                                                                                                        `}
                                                                                                                placeholder="Select Approval"
                                                                                                                filterOption={(
                                                                                                                    input,
                                                                                                                    option
                                                                                                                ) =>
                                                                                                                    (
                                                                                                                        option?.label ??
                                                                                                                        ""
                                                                                                                    ).includes(
                                                                                                                        input
                                                                                                                    )
                                                                                                                }
                                                                                                                value={
                                                                                                                    negotiator.approval
                                                                                                                }
                                                                                                                options={[
                                                                                                                    {
                                                                                                                        value: "1",
                                                                                                                        label: "Approve",
                                                                                                                    },
                                                                                                                    {
                                                                                                                        value: "2",
                                                                                                                        label: "Reject",
                                                                                                                    },
                                                                                                                    {
                                                                                                                        value: "3",
                                                                                                                        label: "Approve with condition",
                                                                                                                    },
                                                                                                                ]}
                                                                                                            />
                                                                                                        </td>
                                                                                                        <td className="w-[200px] border-r-2 border-gray-300 px-3 py-2">
                                                                                                            <DatePicker
                                                                                                                disabled={
                                                                                                                    true
                                                                                                                }
                                                                                                                placeholder=""
                                                                                                                className="w-full h-[30px] text-[15px] !font-normal !text-gray-900 !cursor-default"
                                                                                                                // value={negotiator.date}
                                                                                                            />
                                                                                                        </td>
                                                                                                        <td className="px-3 py-2 ">
                                                                                                            <div className="flex gap-2 items-center">
                                                                                                                <TextArea
                                                                                                                    disabled={
                                                                                                                        true
                                                                                                                    }
                                                                                                                    rows={
                                                                                                                        1
                                                                                                                    }
                                                                                                                    className="w-full text-[15px] !font-normal !text-gray-900 !cursor-default"
                                                                                                                    value={
                                                                                                                        negotiator.reason
                                                                                                                    }
                                                                                                                />
                                                                                                                <IoChatbubbleEllipsesOutline
                                                                                                                    className="w-6 h-6 text-[#3A6F41] hover:cursor-pointer"
                                                                                                                    onClick={() => {
                                                                                                                        setNegotiatorActions(
                                                                                                                            negotiatorActions.map(
                                                                                                                                (
                                                                                                                                    nego,
                                                                                                                                    index
                                                                                                                                ) => {
                                                                                                                                    if (
                                                                                                                                        index ==
                                                                                                                                        0
                                                                                                                                    ) {
                                                                                                                                        let currentComment =
                                                                                                                                            nego.comment;
                                                                                                                                        return {
                                                                                                                                            ...nego,
                                                                                                                                            comment:
                                                                                                                                                !currentComment,
                                                                                                                                        };
                                                                                                                                    } else
                                                                                                                                        return nego;
                                                                                                                                }
                                                                                                                            )
                                                                                                                        );
                                                                                                                    }}
                                                                                                                />
                                                                                                                <AiOutlineInfoCircle
                                                                                                                    className="w-6 h-6 text-[#3A6F41] hover:cursor-pointer"
                                                                                                                    onClick={() => {
                                                                                                                        setNegotiatorActions(
                                                                                                                            negotiatorActions.map(
                                                                                                                                (
                                                                                                                                    nego,
                                                                                                                                    index
                                                                                                                                ) => {
                                                                                                                                    if (
                                                                                                                                        index ==
                                                                                                                                        0
                                                                                                                                    ) {
                                                                                                                                        let currentInfo =
                                                                                                                                            nego.info;
                                                                                                                                        return {
                                                                                                                                            ...nego,
                                                                                                                                            info: !currentInfo,
                                                                                                                                        };
                                                                                                                                    } else
                                                                                                                                        return nego;
                                                                                                                                }
                                                                                                                            )
                                                                                                                        );
                                                                                                                    }}
                                                                                                                />
                                                                                                            </div>
                                                                                                        </td>
                                                                                                    </tr>
                                                                                                    {negotiatorActions[
                                                                                                        key
                                                                                                    ]
                                                                                                        .comment && (
                                                                                                        <tr className="border-b-2 border-gray-300">
                                                                                                            <td colSpan="5">
                                                                                                                <ApprovalComment
                                                                                                                    borderless={
                                                                                                                        true
                                                                                                                    }
                                                                                                                    isExpanded={
                                                                                                                        negotiatorActions[
                                                                                                                            key
                                                                                                                        ]
                                                                                                                            .comment
                                                                                                                    }
                                                                                                                />
                                                                                                            </td>
                                                                                                        </tr>
                                                                                                    )}
                                                                                                </>
                                                                                            )
                                                                                        )}
                                                                                </tbody>
                                                                            </table>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="static flex w-full">
                                                                <Check />
                                                                <div className="ml-[10px] static flex-1">
                                                                    <h4 className="text-[17px] font-bold text-[#3A6F41]">
                                                                        Final
                                                                        Approver
                                                                    </h4>
                                                                    <div className="mt-2 border-2 border-gray-300 ">
                                                                        <div className="overflow-x-auto">
                                                                            <table className=" w-full bg-white border-collapse text-[15px]">
                                                                                <thead className="text-[17px] rounded-t-lg">
                                                                                    <tr className="border-b-2 border-gray-300">
                                                                                        <th className="w-1/4 bg-[#D4F2D9] text-[#3A6F41] text-center border-r-2 border-gray-300 py-2">
                                                                                            Final
                                                                                            Approver
                                                                                            Name
                                                                                        </th>
                                                                                        <th className="w-1/5 bg-[#D4F2D9] text-[#3A6F41] text-center text-[17px] px-8 py-2 border-r-2 border-gray-300">
                                                                                            Approval
                                                                                        </th>
                                                                                        <th className="w-1/5 bg-[#D4F2D9] text-[#3A6F41] text-center text-[17px] px-8 py-2 border-r-2 border-gray-300">
                                                                                            Date
                                                                                        </th>
                                                                                        <th className="w-1/3 bg-[#D4F2D9] text-[#3A6F41] text-center text-[17px] px-8 py-2">
                                                                                            Reasons,
                                                                                            opinions
                                                                                            or
                                                                                            conditions
                                                                                            for
                                                                                            approval
                                                                                        </th>
                                                                                    </tr>
                                                                                </thead>
                                                                                <tbody>
                                                                                    <tr className="">
                                                                                        <td className="font-semibold text-left  px-3 py-2 border-r-2 border-gray-300">
                                                                                            <span className="ant-border flex w-full">
                                                                                                {
                                                                                                    finalApprover.userName
                                                                                                }
                                                                                            </span>
                                                                                        </td>
                                                                                        <td className=" px-3 py-2 border-r-2 border-gray-300">
                                                                                            <Select
                                                                                                disabled={
                                                                                                    true
                                                                                                }
                                                                                                className="w-full text-[15px] !font-normal !text-gray-900 !cursor-default"
                                                                                                placeholder="Select Approval"
                                                                                                filterOption={(
                                                                                                    input,
                                                                                                    option
                                                                                                ) =>
                                                                                                    (
                                                                                                        option?.label ??
                                                                                                        ""
                                                                                                    ).includes(
                                                                                                        input
                                                                                                    )
                                                                                                }
                                                                                                value={
                                                                                                    finalApprover.approval
                                                                                                }
                                                                                                options={[
                                                                                                    {
                                                                                                        value: "1",
                                                                                                        label: "Approve",
                                                                                                    },
                                                                                                    {
                                                                                                        value: "2",
                                                                                                        label: "Reject",
                                                                                                    },
                                                                                                    {
                                                                                                        value: "3",
                                                                                                        label: "Approve with condition",
                                                                                                    },
                                                                                                ]}
                                                                                            />
                                                                                        </td>
                                                                                        <td className="w-[200px] px-3 border-r-2 py-2">
                                                                                            <DatePicker
                                                                                                disabled
                                                                                                placeholder=""
                                                                                                className="w-full h-[30px] text-[15px] !font-normal !text-gray-900 !cursor-default"
                                                                                                value={
                                                                                                    ""
                                                                                                }
                                                                                            />
                                                                                        </td>
                                                                                        <td className="w-[200px] px-3 py-2">
                                                                                            <div className="flex gap-2 items-center">
                                                                                                <TextArea
                                                                                                    disabled
                                                                                                    // style={{
                                                                                                    //     height: "30px",
                                                                                                    // }}
                                                                                                    rows={
                                                                                                        1
                                                                                                    }
                                                                                                    className="w-full h-[30px] text-[15px] !font-normal !text-gray-900 !cursor-default"
                                                                                                    value={
                                                                                                        finalApprover.reason
                                                                                                    }
                                                                                                />
                                                                                                <IoChatbubbleEllipsesOutline
                                                                                                    className="w-6 h-6 text-[#3A6F41] hover:cursor-pointer"
                                                                                                    onClick={() =>
                                                                                                        setIsApproverCommentExpanding(
                                                                                                            !isApproverCommentExpanding
                                                                                                        )
                                                                                                    }
                                                                                                />
                                                                                                <AiOutlineInfoCircle
                                                                                                    className="w-6 h-6 text-[#3A6F41] hover:cursor-pointer"
                                                                                                    onClick={() => {
                                                                                                        setIsApproverInfoModalOpen(
                                                                                                            true
                                                                                                        );
                                                                                                    }}
                                                                                                />
                                                                                            </div>
                                                                                        </td>
                                                                                    </tr>
                                                                                </tbody>
                                                                            </table>
                                                                        </div>
                                                                    </div>
                                                                    <ApprovalComment
                                                                        isExpanded={
                                                                            isApproverCommentExpanding
                                                                        }
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="mt-6 border-dashed border-b-2 border-gray-300"></div>

                                            {/* Approval Description */}
                                            <div className="mt-6 shadow-sm rounded-lg border-2 bg-[#fbfdff] border-gray-300">
                                                <div className="rounded-t-lg flex items-center space-x-3 bg-gray-100 border-b-2 border-gray-300 p-2.5 px-4 text-[17px] text-[#37763F] font-bold uppercase ">
                                                    <div className=" bg-gray-700 text-white p-1.5 rounded-[50px]">
                                                        <FaInfo className="w-4 h-4" />
                                                    </div>
                                                    <div>
                                                        Approval Description
                                                    </div>
                                                </div>
                                                <div className="px-4 py-4 ">
                                                    {/* Form */}
                                                    <div className="grid grid-cols-4 gap-4">
                                                        <div className="col-span-1">
                                                            <label className="block mb-2 text-[15px] font-semibold text-gray-900">
                                                                Start Date
                                                            </label>
                                                            <DatePicker
                                                                disabled
                                                                className="w-full text-[15px] !font-normal !text-gray-900 !cursor-default"
                                                                value={""}
                                                            />
                                                        </div>
                                                        <div className="col-span-1">
                                                            <label className="block mb-2 text-[15px] font-semibold text-gray-900">
                                                                End Date
                                                            </label>
                                                            <DatePicker
                                                                disabled
                                                                className="w-full text-[15px] !font-normal !text-gray-900 !cursor-default"
                                                                value={""}
                                                            />
                                                        </div>
                                                    </div>

                                                    <div className="mt-4 grid grid-cols-2 gap-4">
                                                        <div className="col-span-1">
                                                            <label className="block mb-2 text-[15px] font-semibold text-gray-900">
                                                                Location
                                                            </label>
                                                            <TextArea
                                                                disabled
                                                                className="w-full text-[15px] !font-normal !text-gray-900 !cursor-default"
                                                                rows={4}
                                                                placeholder="Enter Location"
                                                            />
                                                        </div>
                                                        <div className="col-span-1">
                                                            <label className="block mb-2 text-[15px] font-semibold text-gray-900">
                                                                Content
                                                            </label>
                                                            <TextArea
                                                                disabled
                                                                className="w-full text-[15px] !font-normal !text-gray-900 !cursor-default"
                                                                rows={4}
                                                                placeholder="Enter Content"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="mt-6 border-dashed border-b-2 border-gray-300"></div>

                                            {/* Attachment */}
                                            <div className="mt-6 shadow-sm rounded-lg border-2 bg-[#fbfdff] border-gray-300">
                                                <div className="rounded-t-lg flex items-center space-x-3 bg-gray-100 border-b-2 border-gray-300 p-2.5 px-4 text-[17px] text-[#37763F] font-bold uppercase ">
                                                    <div className=" bg-gray-700 text-white p-1.5 px-1.5 rounded-[50px]">
                                                        <FaLink className="w-4 h-4" />
                                                    </div>
                                                    <div>Attachment</div>
                                                </div>
                                                <div className="px-4 py-2 ">
                                                    {/* Form */}
                                                    <div className="mt-2 mb-2  border-2 border-gray-300 ">
                                                        <div className="overflow-x-auto">
                                                            <table className=" w-full bg-white border-collapse text-[15px]">
                                                                <thead className="text-[17px] rounded-t-lg">
                                                                    <tr className="border-b-2 border-gray-300">
                                                                        <th className="w-1/5 bg-[#D4F2D9] text-[#3A6F41] text-center border-r-2 border-gray-300 py-2">
                                                                            Type
                                                                        </th>
                                                                        <th className=" w-1/3 bg-[#D4F2D9] text-[#3A6F41] text-center text-[17px] px-8 py-2 border-r-2 border-gray-300">
                                                                            Description
                                                                        </th>
                                                                        <th className="w-1/3 bg-[#D4F2D9] text-[#3A6F41] text-center text-[17px] px-8 py-2">
                                                                            Attachment
                                                                        </th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    <tr className="border-b-2 border-gray-300">
                                                                        <td className="font-semibold text-left  px-8 py-2 border-r-2 border-gray-300">
                                                                            New
                                                                            Trading
                                                                        </td>
                                                                        <td className=" px-6 py-2 border-r-2 border-gray-300">
                                                                            <TextArea
                                                                                disabled
                                                                                className="w-full text-[15px] !font-normal !text-gray-900 !cursor-default"
                                                                                placeholder=""
                                                                                rows={
                                                                                    1
                                                                                }
                                                                            />
                                                                        </td>
                                                                        <td className="w-[200px] px-6 py-2">
                                                                            {newTradingAttachment.length >
                                                                            0 ? (
                                                                                <div className="mb-2 font-normal">
                                                                                    <p className="underlined">
                                                                                        Selected
                                                                                        files:
                                                                                    </p>
                                                                                    <ol>
                                                                                        {newTradingAttachment.map(
                                                                                            (
                                                                                                file,
                                                                                                index
                                                                                            ) => (
                                                                                                <li
                                                                                                    key={
                                                                                                        index
                                                                                                    }
                                                                                                    className="ml-2"
                                                                                                >
                                                                                                    <a
                                                                                                        onClick={(
                                                                                                            e
                                                                                                        ) => {
                                                                                                            e.preventDefault();
                                                                                                            const fileURL =
                                                                                                                URL.createObjectURL(
                                                                                                                    file
                                                                                                                );
                                                                                                            window.open(
                                                                                                                fileURL
                                                                                                            );
                                                                                                        }}
                                                                                                    >
                                                                                                        {index +
                                                                                                            1 +
                                                                                                            ". "}
                                                                                                        {
                                                                                                            file.name
                                                                                                        }
                                                                                                        {
                                                                                                            " - "
                                                                                                        }
                                                                                                        {formatBytes(
                                                                                                            file.size
                                                                                                        )}
                                                                                                    </a>
                                                                                                </li>
                                                                                            )
                                                                                        )}
                                                                                    </ol>
                                                                                </div>
                                                                            ) : (
                                                                                "No attachment"
                                                                            )}
                                                                        </td>
                                                                    </tr>
                                                                    <tr className="border-b-2 border-gray-300">
                                                                        <td className="font-semibold text-left  px-8 py-2 border-r-2 border-gray-300">
                                                                            Approval
                                                                            after
                                                                            implementation
                                                                        </td>
                                                                        <td className="px-6 py-2 border-r-2 border-gray-300">
                                                                            <TextArea
                                                                                disabled
                                                                                className="w-full text-[15px] !font-normal !text-gray-900 !cursor-default"
                                                                                placeholder=""
                                                                                rows={
                                                                                    1
                                                                                }
                                                                            />
                                                                        </td>
                                                                        <td className=" px-6 py-2">
                                                                            {afterImplementationAttachment.length >
                                                                            0 ? (
                                                                                <div className="mb-2 font-normal">
                                                                                    <p>
                                                                                        Selected
                                                                                        files:
                                                                                    </p>
                                                                                    <ol>
                                                                                        {afterImplementationAttachment.map(
                                                                                            (
                                                                                                file,
                                                                                                index
                                                                                            ) => (
                                                                                                <li
                                                                                                    key={
                                                                                                        index
                                                                                                    }
                                                                                                    className="ml-2"
                                                                                                >
                                                                                                    {index +
                                                                                                        1 +
                                                                                                        ". "}
                                                                                                    <a
                                                                                                        onClick={(
                                                                                                            e
                                                                                                        ) => {
                                                                                                            e.preventDefault();
                                                                                                            const fileURL =
                                                                                                                URL.createObjectURL(
                                                                                                                    file
                                                                                                                );
                                                                                                            window.open(
                                                                                                                fileURL
                                                                                                            );
                                                                                                        }}
                                                                                                    >
                                                                                                        {
                                                                                                            file.name
                                                                                                        }
                                                                                                        {
                                                                                                            " - "
                                                                                                        }
                                                                                                        {formatBytes(
                                                                                                            file.size
                                                                                                        )}
                                                                                                    </a>
                                                                                                </li>
                                                                                            )
                                                                                        )}
                                                                                    </ol>
                                                                                </div>
                                                                            ) : (
                                                                                "No attachment"
                                                                            )}
                                                                        </td>
                                                                    </tr>
                                                                    <tr className="">
                                                                        <td className="font-semibold text-left  px-8  py-2 border-r-2 border-gray-300">
                                                                            Other
                                                                        </td>
                                                                        <td className=" px-6 py-2 border-r-2 border-gray-300">
                                                                            <TextArea
                                                                                disabled
                                                                                className="w-full text-[15px] !font-normal !text-gray-900 !cursor-default"
                                                                                placeholder=""
                                                                                rows={
                                                                                    1
                                                                                }
                                                                            />
                                                                        </td>
                                                                        <td className=" px-6 py-2">
                                                                            {otherAttachment.length >
                                                                            0 ? (
                                                                                <div className="mb-2 font-normal">
                                                                                    <p>
                                                                                        Selected
                                                                                        files:
                                                                                    </p>
                                                                                    <ol>
                                                                                        {otherAttachment.map(
                                                                                            (
                                                                                                file,
                                                                                                index
                                                                                            ) => (
                                                                                                <li
                                                                                                    key={
                                                                                                        index
                                                                                                    }
                                                                                                    className="ml-2"
                                                                                                >
                                                                                                    {index +
                                                                                                        1 +
                                                                                                        ". "}
                                                                                                    <a
                                                                                                        onClick={(
                                                                                                            e
                                                                                                        ) => {
                                                                                                            e.preventDefault();
                                                                                                            const fileURL =
                                                                                                                URL.createObjectURL(
                                                                                                                    file
                                                                                                                );
                                                                                                            window.open(
                                                                                                                fileURL
                                                                                                            );
                                                                                                        }}
                                                                                                    >
                                                                                                        {
                                                                                                            file.name
                                                                                                        }
                                                                                                        {
                                                                                                            " - "
                                                                                                        }
                                                                                                        {formatBytes(
                                                                                                            file.size
                                                                                                        )}
                                                                                                    </a>
                                                                                                </li>
                                                                                            )
                                                                                        )}
                                                                                    </ol>
                                                                                </div>
                                                                            ) : (
                                                                                "No attachment"
                                                                            )}
                                                                        </td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="mt-6 border-dashed border-b-2 border-gray-300"></div>

                                            {/* History */}
                                            <div className="mt-6 shadow-sm rounded-lg border-2 bg-[#fbfdff] border-gray-300">
                                                <div className="rounded-t-lg flex items-center space-x-3 bg-gray-100 border-b-2 border-gray-300 p-2.5 px-4 text-[17px] text-[#37763F] font-bold uppercase ">
                                                    <div className=" bg-gray-700 text-white p-1.5 rounded-[50px]">
                                                        <FaRedoAlt className="w-4 h-4" />
                                                    </div>
                                                    <div>History</div>
                                                </div>
                                                <div className="px-4 py-2 ">
                                                    {/* Form */}
                                                    <div className="mt-2 mb-2  border-2 border-gray-300 ">
                                                        <div className="overflow-x-auto">
                                                            <table className=" w-full bg-white border-collapse text-[15px]">
                                                                <thead className="text-[17px] rounded-t-lg">
                                                                    <tr className="border-b-2 border-gray-300">
                                                                        <th className="w-1/4 bg-[#D4F2D9] text-[#3A6F41] text-center border-r-2 border-gray-300 py-2">
                                                                            Approval
                                                                            No.
                                                                        </th>
                                                                        <th className="w-1/4 bg-[#D4F2D9] text-[#3A6F41] text-center text-[17px] px-8 py-2 border-r-2 border-gray-300">
                                                                            Action
                                                                            by
                                                                        </th>
                                                                        <th className="w-1/4 bg-[#D4F2D9] text-[#3A6F41] text-center text-[17px] px-8 py-2 border-r-2 border-gray-300">
                                                                            Action
                                                                            Date
                                                                        </th>
                                                                        <th className="w-1/ bg-[#D4F2D9] text-[#3A6F41] text-center text-[17px] px-8 py-2">
                                                                            Status
                                                                        </th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    <tr className="">
                                                                        <td className="font-semibold text-left  px-8 py-2 border-r-2 border-gray-300">
                                                                            Eg.
                                                                        </td>
                                                                        <td className="px-6 py-2 border-r-2 border-gray-300">
                                                                            <span className="ant-border flex w-full">
                                                                                Trường
                                                                                thông
                                                                                tin
                                                                            </span>
                                                                        </td>
                                                                        <td className="px-6 py-2 border-r-2 border-gray-300">
                                                                            <span className="ant-border flex w-full">
                                                                                Trường
                                                                                thông
                                                                                tin
                                                                            </span>
                                                                        </td>
                                                                        <td className=" px-6 py-2">
                                                                            <span className="ant-border flex w-full">
                                                                                Trường
                                                                                thông
                                                                                tin
                                                                            </span>
                                                                        </td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>,
                                    ],
                                },
                                {
                                    key: "3",
                                    label: "Summary",
                                    children: [
                                        <div>
                                            {/* Warning */}
                                            <div className="mt-6 shadow-sm rounded-lg border-2 bg-[#fbfdff] border-gray-300">
                                                <div className="rounded-t-lg flex items-center space-x-3 bg-gray-100 border-b-2 border-gray-300 p-2.5 px-4 text-[17px] text-[#37763F] font-bold uppercase ">
                                                    <div className=" bg-gray-700 text-white p-1.5 px-1.5 rounded-[50px]">
                                                        <IoWarningOutline className="w-4 h-4" />
                                                    </div>
                                                    <div>Warning</div>
                                                </div>
                                                <div className="px-4 py-2 ">
                                                    {/* Form */}
                                                    <div className="mt-2 mb-2  border-2 border-gray-300 ">
                                                        <div className="overflow-x-auto">
                                                            <table className=" w-full bg-white border-collapse text-[15px]">
                                                                <thead className="text-[17px] rounded-t-lg">
                                                                    <tr className="border-b-2 border-gray-300">
                                                                        <th className="w-1/5 bg-[#D4F2D9] text-[#3A6F41] text-center border-r-2 border-gray-300 py-2">
                                                                            Table
                                                                        </th>
                                                                        <th className=" w-1/3 bg-[#D4F2D9] text-[#3A6F41] text-center text-[17px] px-8 py-2 border-r-2 border-gray-300">
                                                                            Content
                                                                        </th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    <tr className="border-b-2 border-gray-300">
                                                                        <td className="font-semibold text-left  px-8 py-2 border-r-2 border-gray-300">
                                                                            Budget
                                                                        </td>
                                                                        <td className=" px-6 py-2 border-r-2 border-gray-300">
                                                                            <span className="ant-border flex w-full">
                                                                                Trường
                                                                                thông
                                                                                tin
                                                                            </span>
                                                                        </td>
                                                                    </tr>
                                                                    <tr className="border-b-2 border-gray-300">
                                                                        <td className="font-semibold text-left  px-8 py-2 border-r-2 border-gray-300">
                                                                            Credit
                                                                            Limit
                                                                        </td>
                                                                        <td className="px-6 py-2 border-r-2 border-gray-300">
                                                                            <span className="ant-border flex w-full">
                                                                                Trường
                                                                                thông
                                                                                tin
                                                                            </span>
                                                                        </td>
                                                                    </tr>
                                                                    <tr className="border-b-2 border-gray-300">
                                                                        <td className="font-semibold text-left  px-8  py-2 border-r-2 border-gray-300">
                                                                            Approval
                                                                            after
                                                                            implementation
                                                                        </td>
                                                                        <td className=" px-6 py-2 border-r-2 border-gray-300">
                                                                            <div className="ant-border flex w-full">
                                                                                <span>
                                                                                    <span className="text-[#ff6b00]">
                                                                                        Have
                                                                                        Evidence
                                                                                    </span>

                                                                                    /{" "}
                                                                                    <span className="text-[#ff0000]">
                                                                                        No
                                                                                        Evidence
                                                                                    </span>
                                                                                </span>
                                                                            </div>
                                                                        </td>
                                                                    </tr>
                                                                    <tr className="">
                                                                        <td className="font-semibold text-left  px-8  py-2 border-r-2 border-gray-300">
                                                                            Low
                                                                            GP
                                                                        </td>
                                                                        <td className=" px-6 py-2 border-r-2 border-gray-300">
                                                                            <div className="ant-border flex w-full">
                                                                                <span>
                                                                                    {" "}
                                                                                    <span className="text-[#ff0000]">
                                                                                        Yes
                                                                                    </span>

                                                                                    /
                                                                                    No
                                                                                </span>
                                                                            </div>
                                                                        </td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="mt-6 border-dashed border-b-2 border-gray-300"></div>

                                            {/* Budget */}
                                            <div className="mt-6 shadow-sm rounded-lg border-2 bg-[#fbfdff] border-gray-300">
                                                <div className="rounded-t-lg flex items-center space-x-3 bg-gray-100 border-b-2 border-gray-300 p-2.5 px-4 text-[17px] text-[#37763F] font-bold uppercase ">
                                                    <div className=" bg-gray-700 text-white p-1.5 rounded-[50px]">
                                                        <FaCircleDollarToSlot className="w-4 h-4" />
                                                    </div>
                                                    <div>Budget</div>
                                                </div>
                                                <div className="px-4 py-4 ">
                                                    {/* Form */}
                                                    <div className="grid grid-cols-3 gap-4">
                                                        <div className="col-span-1">
                                                            <label className="block mb-2 text-[15px] font-semibold text-gray-900">
                                                                Budget (Item)
                                                            </label>
                                                            <Select
                                                                disabled={true}
                                                                className="w-full text-[15px] !font-normal !text-gray-900 !cursor-default"
                                                                placeholder="Select Budget Item"
                                                                filterOption={(
                                                                    input,
                                                                    option
                                                                ) =>
                                                                    (
                                                                        option?.label ??
                                                                        ""
                                                                    ).includes(
                                                                        input
                                                                    )
                                                                }
                                                                options={[
                                                                    {
                                                                        value: "1",
                                                                        label: "Item 1",
                                                                    },
                                                                    {
                                                                        value: "2",
                                                                        label: "Item 2",
                                                                    },
                                                                    {
                                                                        value: "3",
                                                                        label: "Item 3",
                                                                    },
                                                                ]}
                                                                value={""}
                                                            />
                                                        </div>
                                                        <div className="col-span-1">
                                                            <label className="block mb-2 text-[15px] font-semibold text-gray-900">
                                                                Budget (Amount)
                                                            </label>
                                                            <Select
                                                                disabled={true}
                                                                className="w-full text-[15px] !font-normal !text-gray-900 !cursor-default"
                                                                placeholder="Select Budget Amount"
                                                                filterOption={(
                                                                    input,
                                                                    option
                                                                ) =>
                                                                    (
                                                                        option?.label ??
                                                                        ""
                                                                    ).includes(
                                                                        input
                                                                    )
                                                                }
                                                                options={[
                                                                    {
                                                                        value: "1",
                                                                        label: "Amount 1",
                                                                    },
                                                                    {
                                                                        value: "2",
                                                                        label: "Amount 2",
                                                                    },
                                                                    {
                                                                        value: "3",
                                                                        label: "Amount 3",
                                                                    },
                                                                ]}
                                                                value={""}
                                                            />
                                                        </div>
                                                        <div className="col-span-1">
                                                            <label className="block mb-2 text-[15px] font-semibold text-gray-900">
                                                                Account Title
                                                            </label>
                                                            <Select
                                                                className="w-full text-[15px] !font-normal !text-gray-900 !cursor-default"
                                                                disabled={true}
                                                                placeholder="Select Account Title"
                                                                filterOption={(
                                                                    input,
                                                                    option
                                                                ) =>
                                                                    (
                                                                        option?.label ??
                                                                        ""
                                                                    ).includes(
                                                                        input
                                                                    )
                                                                }
                                                                options={[
                                                                    {
                                                                        value: "1",
                                                                        label: "Title 1",
                                                                    },
                                                                    {
                                                                        value: "2",
                                                                        label: "Title 2",
                                                                    },
                                                                    {
                                                                        value: "3",
                                                                        label: "Title 3",
                                                                    },
                                                                ]}
                                                                value={""}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="mt-6 border-dashed border-b-2 border-gray-300"></div>

                                            {/* Fiscal Recap */}
                                            <div className="mt-6 shadow-sm rounded-lg border-2 bg-[#fbfdff] border-gray-300">
                                                <div className="rounded-t-lg flex items-center space-x-3 bg-gray-100 border-b-2 border-gray-300 p-2.5 px-4 text-[17px] text-[#37763F] font-bold uppercase ">
                                                    <div className=" bg-gray-700 text-white p-1.5 px-1.5 rounded-[50px]">
                                                        <FiscalRecap />
                                                    </div>
                                                    <div>Fiscal Recap</div>
                                                </div>
                                                <div className="px-4 py-2 ">
                                                    {/* Form */}
                                                    <div className="mt-2 mb-2  border-2 border-gray-300 ">
                                                        <div className="overflow-x-auto">
                                                            <table className=" w-full bg-white border-collapse text-[15px]">
                                                                <thead className="text-[17px] rounded-t-lg">
                                                                    <tr className="border-b-2 border-gray-300">
                                                                        <th className="w-1/5 bg-[#D4F2D9] text-[#3A6F41] text-center border-r-2 border-gray-300 py-2">
                                                                            New
                                                                            Proposal
                                                                        </th>
                                                                        <th className="w-1/4 bg-[#D4F2D9] text-[#3A6F41] text-center text-[17px] px-8 py-2 border-r-2 border-gray-300">
                                                                            Before
                                                                            (No
                                                                            VAT)
                                                                        </th>
                                                                        <th className="w-1/4 bg-[#D4F2D9] text-[#3A6F41] text-center text-[17px] px-8 py-2 border-r-2 border-gray-300">
                                                                            After
                                                                            (No
                                                                            VAT)
                                                                        </th>
                                                                        <th className="w-1/4 bg-[#D4F2D9] text-[#3A6F41] text-center text-[17px] px-8 py-2">
                                                                            Difference
                                                                        </th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    <tr className="border-b-2 border-gray-300">
                                                                        <td className="font-semibold text-left  px-8 py-2 border-r-2 border-gray-300">
                                                                            Sales
                                                                        </td>
                                                                        <td className="px-6 py-2 border-r-2 border-gray-300 text-center">
                                                                            0
                                                                        </td>
                                                                        <td className="px-6 py-2 border-r-2 border-gray-300 text-center">
                                                                            0
                                                                        </td>
                                                                        <td className="px-6 py-2 text-center">
                                                                            0
                                                                        </td>
                                                                    </tr>
                                                                    <tr className="border-b-2 border-gray-300">
                                                                        <td className="font-semibold text-left  px-8 py-2 border-r-2 border-gray-300">
                                                                            Cost
                                                                        </td>
                                                                        <td className="px-6 py-2 border-r-2 border-gray-300 text-center">
                                                                            0
                                                                        </td>
                                                                        <td className="px-6 py-2 border-r-2 border-gray-300 text-center">
                                                                            0
                                                                        </td>
                                                                        <td className="px-6 py-2 text-center">
                                                                            0
                                                                        </td>
                                                                    </tr>
                                                                    <tr className="border-b-2 border-gray-300">
                                                                        <td className="font-semibold text-left  px-8  py-2 border-r-2 border-gray-300">
                                                                            % GP
                                                                        </td>
                                                                        <td className="px-6 py-2 border-r-2 border-gray-300 text-center">
                                                                            0
                                                                        </td>
                                                                        <td className="px-6 py-2 border-r-2 border-gray-300 text-center">
                                                                            0
                                                                        </td>
                                                                        <td className="px-6 py-2 text-center">
                                                                            0
                                                                        </td>
                                                                    </tr>
                                                                    <tr className="">
                                                                        <td className="font-semibold text-left  px-8  py-2 border-r-2 border-gray-300">
                                                                            GP
                                                                        </td>
                                                                        <td className="px-6 py-2 border-r-2 border-gray-300 text-center">
                                                                            0
                                                                        </td>
                                                                        <td className="px-6 py-2 border-r-2 border-gray-300 text-center">
                                                                            0
                                                                        </td>
                                                                        <td className="px-6 py-2 text-center">
                                                                            0
                                                                        </td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="mt-6 border-dashed border-b-2 border-gray-300"></div>

                                            {/* Summary */}
                                            <div className="mt-6 shadow-sm rounded-lg border-2 bg-[#fbfdff] border-gray-300">
                                                <div className="rounded-t-lg flex items-center space-x-3 bg-gray-100 border-b-2 border-gray-300 p-2.5 px-4 text-[17px] text-[#37763F] font-bold uppercase ">
                                                    <div className=" bg-gray-700 text-white p-1.5 rounded-[50px]">
                                                        <FaCheck className="w-4 h-4" />
                                                    </div>
                                                    <div>Summary</div>
                                                </div>
                                                <div className="px-4 py-2 ">
                                                    <div className="py-2 px-3 pr-1">
                                                        <div className="space-y-6 border-l-2 border-dashed">
                                                            <div className="relative w-full">
                                                                <svg
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    viewBox="0 0 24 24"
                                                                    fill="currentColor"
                                                                    className="absolute -top-0.5 z-10 -ml-3.5 h-7 w-7 rounded-full text-[#3A6F41]"
                                                                >
                                                                    <path
                                                                        fillRule="evenodd"
                                                                        d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                                                                        clipRule="evenodd"
                                                                    />
                                                                </svg>
                                                                <div className="ml-6">
                                                                    <h4 className="text-[17px] font-bold text-[#3A6F41]">
                                                                        By Item
                                                                        Group
                                                                    </h4>
                                                                    <div className="mt-2 border-2 border-gray-300 ">
                                                                        <div className="overflow-x-auto">
                                                                            <table className="w-full bg-white border-collapse text-[15px]">
                                                                                <thead className="text-[16px] rounded-t-lg">
                                                                                    <tr className="border-b-2 border-gray-300">
                                                                                        <th className="w-1/4 bg-[#D4F2D9] text-[#3A6F41] text-center border-r-2 border-gray-300 py-2">
                                                                                            Customer
                                                                                        </th>
                                                                                        <th className=" w-1/5 bg-[#D4F2D9] text-[#3A6F41] text-center text-[17px] px-8 py-2 border-r-2 border-gray-300">
                                                                                            Item
                                                                                            Group
                                                                                        </th>
                                                                                        <th className="w-1/5 bg-[#D4F2D9] text-[#3A6F41] text-center text-[17px] px-8 py-2 border-r-2 border-gray-300">
                                                                                            SO
                                                                                            Amount
                                                                                            (Before
                                                                                            VAT)
                                                                                        </th>
                                                                                        <th className="w-1/3 bg-[#D4F2D9] text-[#3A6F41] text-center text-[17px] px-8 py-2 border-r-2 border-gray-300">
                                                                                            %SO
                                                                                        </th>
                                                                                        <th className="w-1/3 bg-[#D4F2D9] text-[#3A6F41] text-center text-[17px] px-8 py-2">
                                                                                            %GP
                                                                                        </th>
                                                                                    </tr>
                                                                                </thead>
                                                                                <tbody>
                                                                                    <tr className="">
                                                                                        <td className="font-semibold text-left px-3 py-2 border-r-2 border-gray-300">
                                                                                            A
                                                                                        </td>
                                                                                        <td className=" px-3 py-2 border-r-2 border-gray-300">
                                                                                            Item
                                                                                            1
                                                                                        </td>
                                                                                        <td className="w-[200px] px-3 border-r-2 border-gray-300 py-2 text-center">
                                                                                            0
                                                                                        </td>
                                                                                        <td className="w-[200px] px-3 border-r-2 border-gray-300 py-2 text-center">
                                                                                            0%
                                                                                        </td>
                                                                                        <td className="w-[200px] px-3 py-2 text-center">
                                                                                            0%
                                                                                        </td>
                                                                                    </tr>
                                                                                    <tr className="">
                                                                                        <td className="font-semibold text-left  px-3 py-2 border-r-2 border-gray-300">
                                                                                            B
                                                                                        </td>
                                                                                        <td className=" px-3 py-2 border-r-2 border-gray-300">
                                                                                            Item
                                                                                            2
                                                                                        </td>
                                                                                        <td className="w-[200px] px-3 border-r-2 border-gray-300 py-2 text-center">
                                                                                            0
                                                                                        </td>
                                                                                        <td className="w-[200px] px-3 border-r-2 border-gray-300 py-2 text-center">
                                                                                            0%
                                                                                        </td>
                                                                                        <td className="w-[200px] px-3 py-2 text-center">
                                                                                            0%
                                                                                        </td>
                                                                                    </tr>
                                                                                </tbody>
                                                                            </table>
                                                                        </div>
                                                                    </div>
                                                                    <div className="mt-4 border-2 border-gray-300 ">
                                                                        <div className="overflow-x-auto">
                                                                            <table className="w-full bg-white border-collapse text-[15px]">
                                                                                <thead className="text-[16px] rounded-t-lg">
                                                                                    <tr className="border-b-2 border-gray-300">
                                                                                        <th className="w-1/4 bg-[#D4F2D9] text-[#3A6F41] text-center border-r-2 border-gray-300 py-2">
                                                                                            Vendor
                                                                                        </th>
                                                                                        <th className=" w-1/5 bg-[#D4F2D9] text-[#3A6F41] text-center text-[17px] px-8 py-2 border-r-2 border-gray-300">
                                                                                            Item
                                                                                            Group
                                                                                        </th>
                                                                                        <th className="w-1/5 bg-[#D4F2D9] text-[#3A6F41] text-center text-[17px] px-8 py-2 border-r-2 border-gray-300">
                                                                                            PO
                                                                                            Amount
                                                                                            (Before
                                                                                            VAT)
                                                                                        </th>
                                                                                        <th className="w-1/3 bg-[#D4F2D9] text-[#3A6F41] text-center text-[17px] px-8 py-2">
                                                                                            %PO
                                                                                        </th>
                                                                                    </tr>
                                                                                </thead>
                                                                                <tbody>
                                                                                    <tr className="">
                                                                                        <td className="font-semibold text-left  px-3 py-2 border-r-2 border-gray-300">
                                                                                            A
                                                                                        </td>
                                                                                        <td className=" px-3 py-2 border-r-2 border-gray-300">
                                                                                            Item
                                                                                            1
                                                                                        </td>
                                                                                        <td className="w-[200px] px-3 border-r-2 border-gray-300 py-2 text-center">
                                                                                            0
                                                                                        </td>
                                                                                        <td className="w-[200px] px-3 py-2 text-center">
                                                                                            0%
                                                                                        </td>
                                                                                    </tr>
                                                                                    <tr className="">
                                                                                        <td className="font-semibold text-left  px-3 py-2 border-r-2 border-gray-300">
                                                                                            B
                                                                                        </td>
                                                                                        <td className=" px-3 py-2 border-r-2 border-gray-300">
                                                                                            Item
                                                                                            2
                                                                                        </td>
                                                                                        <td className="w-[200px] px-3 border-r-2 border-gray-300 py-2 text-center">
                                                                                            0
                                                                                        </td>
                                                                                        <td className="w-[200px] px-3 py-2 text-center">
                                                                                            0%
                                                                                        </td>
                                                                                    </tr>
                                                                                </tbody>
                                                                            </table>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="static flex w-full">
                                                                <svg
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    viewBox="0 0 24 24"
                                                                    fill="currentColor"
                                                                    className="static top-0 z-10 -ml-3.5 h-7 w-7 rounded-full text-[#3A6F41]"
                                                                >
                                                                    <path
                                                                        fillRule="evenodd"
                                                                        d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                                                                        clipRule="evenodd"
                                                                    />
                                                                </svg>
                                                                <div className="ml-[10px] static flex-1">
                                                                    <h4 className="text-[18px] font-bold text-[#3A6F41]">
                                                                        By
                                                                        Partner
                                                                    </h4>
                                                                    <div className="mt-2 border-2 border-gray-300 ">
                                                                        <div className="overflow-x-auto">
                                                                            <table className="w-full bg-white border-collapse text-[15px]">
                                                                                <thead className="text-[16px] rounded-t-lg">
                                                                                    <tr className="border-b-2 border-gray-300">
                                                                                        <th className="bg-[#D4F2D9] text-[#3A6F41] text-center border-r-2 border-gray-300 py-2">
                                                                                            Customer
                                                                                        </th>
                                                                                        <th className="bg-[#D4F2D9] text-[#3A6F41] text-center text-[17px] px-8 py-2 border-r-2 border-gray-300">
                                                                                            Payment
                                                                                            Term
                                                                                        </th>
                                                                                        <th className="bg-[#D4F2D9] text-[#3A6F41] text-center text-[17px] px-8 py-2 border-r-2 border-gray-300">
                                                                                            Payment
                                                                                            Term
                                                                                            and
                                                                                            Condition
                                                                                        </th>
                                                                                        <th className="bg-[#D4F2D9] text-[#3A6F41] text-center text-[17px] px-8 py-2 border-r-2 border-gray-300">
                                                                                            Credit
                                                                                            balance
                                                                                            (including
                                                                                            this
                                                                                            Approval)
                                                                                        </th>
                                                                                        <th className="bg-[#D4F2D9] text-[#3A6F41] text-center text-[17px] px-8 py-2 border-r-2 border-gray-300">
                                                                                            Amount
                                                                                            (Before
                                                                                            VAT)
                                                                                        </th>
                                                                                        <th className="bg-[#D4F2D9] text-[#3A6F41] text-center text-[17px] px-8 py-2 border-r-2 border-gray-300">
                                                                                            %SO
                                                                                        </th>
                                                                                        <th className="bg-[#D4F2D9] text-[#3A6F41] text-center text-[17px] px-8 py-2">
                                                                                            %GP
                                                                                        </th>
                                                                                    </tr>
                                                                                </thead>
                                                                                <tbody>
                                                                                    <tr className="">
                                                                                        <td className="font-semibold text-left  px-3 py-2 border-r-2 border-gray-300">
                                                                                            A
                                                                                        </td>
                                                                                        <td className="px-3 py-2 border-r-2 border-gray-300">
                                                                                            Item
                                                                                            1
                                                                                        </td>
                                                                                        <td className="px-3 border-r-2 py-2 border-gray-300 text-center">
                                                                                            0
                                                                                        </td>
                                                                                        <td className="px-3 border-r-2 py-2 border-gray-300 text-center">
                                                                                            0
                                                                                        </td>
                                                                                        <td className="px-3 border-r-2 py-2 border-gray-300 text-center">
                                                                                            0
                                                                                        </td>
                                                                                        <td className="px-3 py-2 border-r-2 border-gray-300 text-center">
                                                                                            0%
                                                                                        </td>
                                                                                        <td className="px-3 py-2 text-center">
                                                                                            0%
                                                                                        </td>
                                                                                    </tr>
                                                                                    <tr className="">
                                                                                        <td className="font-semibold text-left px-3 py-2 border-r-2 border-gray-300 ">
                                                                                            B
                                                                                        </td>
                                                                                        <td className="px-3 py-2 border-r-2 border-gray-300">
                                                                                            Item
                                                                                            2
                                                                                        </td>
                                                                                        <td className="px-3 border-r-2 border-gray-300 py-2 text-center">
                                                                                            0
                                                                                        </td>
                                                                                        <td className="px-3 border-r-2 border-gray-300 py-2 text-center">
                                                                                            0
                                                                                        </td>
                                                                                        <td className="px-3 border-r-2 border-gray-300 py-2 text-center">
                                                                                            0
                                                                                        </td>
                                                                                        <td className="px-3 border-r-2 border-gray-300 py-2 text-center">
                                                                                            0%
                                                                                        </td>
                                                                                        <td className="px-3 py-2 text-center">
                                                                                            0%
                                                                                        </td>
                                                                                    </tr>
                                                                                </tbody>
                                                                            </table>
                                                                        </div>
                                                                    </div>
                                                                    <div className="mt-4 border-2 border-gray-300 ">
                                                                        <div className="overflow-x-auto">
                                                                            <table className="w-full bg-white border-collapse text-[15px]">
                                                                                <thead className="text-[16px] rounded-t-lg">
                                                                                    <tr className="border-b-2 border-gray-300">
                                                                                        <th className="bg-[#D4F2D9] text-[#3A6F41] text-center border-r-2 border-gray-300 py-2">
                                                                                            Vendor
                                                                                        </th>
                                                                                        <th className="bg-[#D4F2D9] text-[#3A6F41] text-center text-[17px] px-8 py-2 border-r-2 border-gray-300">
                                                                                            Payment
                                                                                            Term
                                                                                        </th>
                                                                                        <th className="bg-[#D4F2D9] text-[#3A6F41] text-center text-[17px] px-8 py-2 border-r-2 border-gray-300">
                                                                                            Payment
                                                                                            Term
                                                                                            and
                                                                                            Condition
                                                                                        </th>
                                                                                        <th className="bg-[#D4F2D9] text-[#3A6F41] text-center text-[17px] px-8 py-2">
                                                                                            Amount
                                                                                            (Before
                                                                                            VAT)
                                                                                        </th>
                                                                                        <th className="bg-[#D4F2D9] text-[#3A6F41] text-center text-[17px] px-8 py-2">
                                                                                            %PO
                                                                                        </th>
                                                                                    </tr>
                                                                                </thead>
                                                                                <tbody>
                                                                                    <tr className="">
                                                                                        <td className="font-semibold text-left  px-3 py-2 border-r-2 border-gray-300">
                                                                                            A
                                                                                        </td>
                                                                                        <td className="px-3 py-2 border-r-2 border-gray-300">
                                                                                            Item
                                                                                            1
                                                                                        </td>
                                                                                        <td className="px-3 border-r-2 py-2">
                                                                                            0
                                                                                        </td>
                                                                                        <td className="px-3 border-r-2 py-2">
                                                                                            0
                                                                                        </td>
                                                                                        <td className="px-3 py-2">
                                                                                            0%
                                                                                        </td>
                                                                                    </tr>
                                                                                    <tr className="">
                                                                                        <td className="font-semibold text-left  px-3 py-2 border-r-2 border-gray-300">
                                                                                            B
                                                                                        </td>
                                                                                        <td className="px-3 py-2 border-r-2 border-gray-300">
                                                                                            Item
                                                                                            2
                                                                                        </td>
                                                                                        <td className="px-3 border-r-2 py-2">
                                                                                            0
                                                                                        </td>
                                                                                        <td className="px-3 border-r-2 py-2">
                                                                                            0
                                                                                        </td>
                                                                                        <td className="px-3 py-2">
                                                                                            0%
                                                                                        </td>
                                                                                    </tr>
                                                                                </tbody>
                                                                            </table>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>,
                                    ],
                                },
                            ]}
                        />

                        {/* Modals */}
                        <SalesModal
                            mode={currentMode}
                            type={currentType}
                            isModalOpen={isSalesModalOpen}
                            info={currentSalesItem}
                            handleCloseModal={() => handleCloseSalesCostModal()}
                        />
                        <CostModal
                            mode={currentMode}
                            type={currentType}
                            info={currentCostItem}
                            isModalOpen={isCostModalOpen}
                            handleCloseModal={() => handleCloseSalesCostModal()}
                        />

                        {/* Negotiator Approval Info Modal */}
                        <Modal
                            title={"Approval Information"}
                            open={negotiatorActions.some(
                                (action) => action.info === true
                            )}
                            onCancel={() =>
                                setNegotiatorActions(
                                    negotiatorActions.map(($) => ({
                                        ...$,
                                        info: false,
                                    }))
                                )
                            }
                            centered
                            maskClosable={false}
                            width={680}
                            footer={[
                                <div key={1} className="flex items-center justify-end">
                                    <button
                                        className="p-2 px-4 font-medium text-[15px] bg-gray-100 hover:bg-gray-200 rounded-lg active:scale-[.87] active:duration-75 transition-all "
                                        onClick={() =>
                                            setNegotiatorActions(
                                                negotiatorActions.map(($) => ({
                                                    ...$,
                                                    info: false,
                                                }))
                                            )
                                        }
                                    >
                                        Cancel
                                    </button>
                                </div>,
                            ]}
                        >
                            <div className="pt-3">
                                <div className=" rounded-t-lg border-2 border-[#A3D1AD] ">
                                    <div className="  bg-[#d4f2d9]  rounded-t-lg flex items-center justify-start px-3 py-1.5">
                                        <div className="flex space-x-3 items-center text-[18px] font-bold py-1.5 ">
                                            <IoIosListBox className="w-6 h-6 text-[#3A6F41]" />
                                            <div>
                                                Negotiator Approval Information
                                            </div>
                                        </div>
                                    </div>
                                    <div className="overflow-x-auto">
                                        <table className=" w-full bg-white border-collapse">
                                            <thead className="bg-[#e6efe7]">
                                                <tr className="text-[15px]">
                                                    <th className=" min-w-[60px] max-h-[60px] bg-[#d4f2d9] border-2 border-l-0 border-[#99d2a4]  text-center py-2">
                                                        Negotiator Name
                                                    </th>
                                                    <th className="max-h-[50px] bg-[#d4f2d9] border-2 border-[#99d2a4] border-r-0 text-center px-8 py-2">
                                                        Approval
                                                    </th>
                                                    <th className="max-h-[50px] bg-[#d4f2d9] border-2 border-[#99d2a4] border-r-0 text-center px-8 py-2">
                                                        Date
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td className="  border-l-0 border border-[#6a9e72] px-3 py-2">
                                                        <Input
                                                            type="text"
                                                            id="approval_type"
                                                            placeholder="Negotiator 1"
                                                            className="font-semibold"
                                                            disabled={true}
                                                        />
                                                    </td>
                                                    <td className="  border border-r-0 border-[#6a9e72] px-3 py-2">
                                                        <Input
                                                            type="text"
                                                            id="approval_type"
                                                            placeholder="Approved with condition"
                                                            className="font-semibold"
                                                        />
                                                    </td>
                                                    <td className="  border border-r-0 border-[#6a9e72] px-3 py-2">
                                                        <Input
                                                            type="text"
                                                            id="approval_type"
                                                            placeholder="10/12/2023"
                                                            className="font-semibold"
                                                        />
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className="  border-l-0 border border-[#6a9e72] px-3 py-2">
                                                        <Input
                                                            type="text"
                                                            id="approval_type"
                                                            placeholder="Negotiator 1"
                                                            className="font-semibold"
                                                            disabled={true}
                                                        />
                                                    </td>
                                                    <td className="  border border-r-0 border-[#6a9e72] px-3 py-2">
                                                        <Input
                                                            type="text"
                                                            id="approval_type"
                                                            placeholder="Approved"
                                                            className="font-semibold"
                                                        />
                                                    </td>
                                                    <td className="  border border-r-0 border-[#6a9e72] px-3 py-2">
                                                        <Input
                                                            type="text"
                                                            id="approval_type"
                                                            placeholder="10/12/2023"
                                                            className="font-semibold"
                                                        />
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>

                                <div className="mt-6 border-dashed border-b-2 border-gray-300"></div>
                            </div>
                        </Modal>

                        {/* Final Apporver Approval Info Modal */}
                        <Modal
                            title={"Approval Information"}
                            open={isApproverInfoModalOpen}
                            onCancel={() => setIsApproverInfoModalOpen(false)}
                            centered
                            maskClosable={false}
                            width={680}
                            footer={[
                                <div key={1} className="flex items-center justify-end">
                                    <button
                                        className="p-2 px-4 font-medium text-[15px] bg-gray-100 hover:bg-gray-200 rounded-lg active:scale-[.87] active:duration-75 transition-all "
                                        onClick={() =>
                                            setIsApproverInfoModalOpen(false)
                                        }
                                    >
                                        Cancel
                                    </button>
                                </div>,
                            ]}
                        >
                            <div className="pt-3">
                                <div className=" rounded-t-lg border-2 border-[#A3D1AD] ">
                                    <div className="  bg-[#d4f2d9]  rounded-t-lg flex items-center justify-start px-3 py-1.5">
                                        <div className="flex space-x-3 items-center text-[18px] font-bold py-1.5 ">
                                            <IoIosListBox className="w-6 h-6 text-[#3A6F41]" />
                                            <div>
                                                Final Approver Approval
                                                Information
                                            </div>
                                        </div>
                                    </div>
                                    <div className="overflow-x-auto">
                                        <table className=" w-full bg-white border-collapse">
                                            <thead className="bg-[#e6efe7]">
                                                <tr className="text-[15px]">
                                                    <th className=" min-w-[60px] max-h-[60px] bg-[#d4f2d9] border-2 border-l-0 border-[#99d2a4]  text-center py-2">
                                                        Final Approver Name
                                                    </th>
                                                    <th className="max-h-[50px] bg-[#d4f2d9] border-2 border-[#99d2a4] border-r-0 text-center px-8 py-2">
                                                        Approval
                                                    </th>
                                                    <th className="max-h-[50px] bg-[#d4f2d9] border-2 border-[#99d2a4] border-r-0 text-center px-8 py-2">
                                                        Date
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td className="  border-l-0 border border-[#6a9e72] px-3 py-2">
                                                        <Input
                                                            type="text"
                                                            id="approval_type"
                                                            placeholder="Negotiator 1"
                                                            className="font-semibold"
                                                            disabled={true}
                                                        />
                                                    </td>
                                                    <td className="  border border-r-0 border-[#6a9e72] px-3 py-2">
                                                        <Input
                                                            type="text"
                                                            id="approval_type"
                                                            placeholder="Approved with condition"
                                                            className="font-semibold"
                                                        />
                                                    </td>
                                                    <td className="  border border-r-0 border-[#6a9e72] px-3 py-2">
                                                        <Input
                                                            type="text"
                                                            id="approval_type"
                                                            placeholder="10/12/2023"
                                                            className="font-semibold"
                                                        />
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className="  border-l-0 border border-[#6a9e72] px-3 py-2">
                                                        <Input
                                                            type="text"
                                                            id="approval_type"
                                                            placeholder="Negotiator 1"
                                                            className="font-semibold"
                                                            disabled={true}
                                                        />
                                                    </td>
                                                    <td className="  border border-r-0 border-[#6a9e72] px-3 py-2">
                                                        <Input
                                                            type="text"
                                                            id="approval_type"
                                                            placeholder="Approved"
                                                            className="font-semibold"
                                                        />
                                                    </td>
                                                    <td className="  border border-r-0 border-[#6a9e72] px-3 py-2">
                                                        <Input
                                                            type="text"
                                                            id="approval_type"
                                                            placeholder="10/12/2023"
                                                            className="font-semibold"
                                                        />
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>

                                <div className="mt-6 border-dashed border-b-2 border-gray-300"></div>
                            </div>
                        </Modal>

                        {/* Input Tab */}
                        <div>
                            {/* Approvers */}
                            <div></div>

                            {/* Detail of Cost */}
                            <div></div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Scroller */}
            <button
                className="fixed bottom-6 right-10 bg-[#0D0D0D] hover:bg-[#181818] hover:shadow-lg text-white font-bold py-4 px-4 rounded-full shadow-lg"
                onClick={() => {
                    window.focus();
                    window.scrollTo({
                        top: 0,
                        behavior: "smooth",
                    });
                    toast("This feature is coming soon.");
                }}
            >
                <FaArrowUp className="w-5 h-5" />
            </button>
        </>
    );
};

export default ApprovalBusinessFMSView;
