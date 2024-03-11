import React, { useState, useEffect, useRef } from "react";
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
    Popconfirm,
    InputNumber,
} from "antd";
import {
    UploadOutlined,
    ExclamationCircleFilled,
    CloseOutlined,
} from "@ant-design/icons";

import { MdOutlineLink, MdDriveFolderUpload } from "react-icons/md";
import { IoReload, IoCopyOutline } from "react-icons/io5";
import { IoIosListBox } from "react-icons/io";
import { LuTrash2, LuPlus, LuSave, LuLink2, LuPenSquare } from "react-icons/lu";
import { FaArrowUp, FaCheck, FaInfo, FaRedoAlt, FaLink } from "react-icons/fa";
import { TbSquareRoundedLetterC, TbSquareRoundedLetterS } from "react-icons/tb";
import { FaCircleDollarToSlot } from "react-icons/fa6";

import CostModal from "../../../components/approval/CostModal";
import DecimalNumberInput from "../../../components/approval/DecimalNumberInput";

import formatBytes from "../../../utils/number/formatBytes";
import formatNumberWithCommas from "../../../utils/number/formatNumberWithCommas";

// Get instance variables
const { TextArea } = Input;
const oldTitle = document.title;
const newTitle = "Create Approval SG&A - Aeon Delight Vietnam";

const ApprovalSGACreate = () => {
    /**
     *  All constants defined here
     */
    const currentTime = moment().format("DD/MM/YYYY");

    /**
     *  All states defined here
     */
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

    const [currentCostItem, setCurrentCostItem] = useState(null);

    const [isCostModalOpen, setIsCostModalOpen] = useState(false);

    const [currentType, setCurrentType] = useState(null);
    const [currentMode, setCurrentMode] = useState(null);

    const [costStartDate, setCostStartDate] = useState("");
    const [costEndDate, setCostEndDate] = useState("");

    const [negotiators, setNegotiators] = useState([
        {
            id: nanoid(8),
            userId: "1",
        },
    ]);
    const [permitter, setPermitter] = useState(null);
    const [approver, setApprover] = useState(null);

    const [newTradingAttachment, setNewTradingAttachment] = useState([]);
    const [afterImplementationAttachment, setAfterImplementationAttachment] =
        useState([]);
    const [otherAttachment, setOtherAttachment] = useState([]);

    /**
     *  All refs defined here
     */

    /**
     *  All functions defined here
     */
    const handleOpenSalesCostModal = (type, mode, id) => {
        setCurrentType(type);
        setCurrentMode(mode);
        if (type == "cost" || type == "additionalCost") {
            console.log("Hi");
            if (
                (mode == "view" || mode == "edit" || mode == "duplicate") &&
                type == "cost"
            ) {
                console.log(
                    "Edit: ",
                    costItems.find((item) => item.id == id)
                );
                setCurrentCostItem(costItems.find((item) => item.id == id));
            }
            if (
                (mode == "view" || mode == "edit" || mode == "duplicate") &&
                type == "additionalCost"
            ) {
                setCurrentCostItem(
                    additionalCostItems.find((item) => item.id == id)
                );
            }
            setIsCostModalOpen(true);
        }
    };

    const handleCloseSalesCostModal = () => {
        setIsCostModalOpen(false);
        setCurrentCostItem(null);
    };

    const handleSubmitCost = (info) => {
        console.log("Log ra info: ", info);
        if (currentMode == "create") {
            if (currentType == "cost") {
                toast("Processing adding new cost item");
            } else if (currentType == "additionalCost") {
                toast("Processing adding additional cost item");
            }
        } else if (currentMode == "edit") {
            if (currentType == "cost") {
                toast("Processing editing new cost item");
            } else if (currentType == "additionalCost") {
                toast("Processing editing additional cost item");
            }
        }
        setIsCostModalOpen(false);
    };

    const handleDeleteSalesCostItem = (type, id) => {
        toast("Deleting " + type + "...");
    };

    const handleApprovalMatrix = () => {
        toast("This module is under development.");
    };

    const handleSave = () => {
        toast("This module is under development.");
    };

    const handleAttachmentFileChange = (event, type) => {
        const fileInput = event.target;

        // Kiểm tra loại file và kích thước của từng file được chọn
        const allowedFileTypes = [
            "application/msword",
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            "text/plain",
            "application/vnd.ms-excel",
            "application/pdf",
            "image/jpeg",
            "image/png",
            "image/gif",
        ];
        const maxSize = 5 * 1024 * 1024; // 5MB

        for (let i = 0; i < fileInput.files.length; i++) {
            const file = fileInput.files[i];

            // Kiểm tra loại file
            if (!allowedFileTypes.includes(file.type)) {
                toast.error("Accepted doc, docx, txt, excel, pdf, image only");
                fileInput.value = "";
                return;
            }

            // Kiểm tra kích thước file
            if (file.size > maxSize) {
                alert(`File ${file.name} is larger than 5MB.`);
                fileInput.value = "";
                return;
            }
        }

        const files = event.target.files;

        console.log([...Array.from(files)]);

        if (files.length > 0) {
            switch (type) {
                case "newTrading":
                    setNewTradingAttachment([
                        ...newTradingAttachment,
                        ...Array.from(files),
                    ]);
                    break;
                case "implementation":
                    setAfterImplementationAttachment([
                        ...afterImplementationAttachment,
                        ...Array.from(files),
                    ]);
                    break;
                case "other":
                    setOtherAttachment([
                        ...otherAttachment,
                        ...Array.from(files),
                    ]);
                    break;
                default:
                    break;
            }
        }
    };

    const handleRemoveAttachment = (idx, type) => {
        switch (type) {
            case "newTrading":
                setNewTradingAttachment(
                    newTradingAttachment.filter((_, index) => index != idx)
                );
                break;
            case "implementation":
                setAfterImplementationAttachment(
                    afterImplementationAttachment.filter(
                        (_, index) => index != idx
                    )
                );
                break;
            case "other":
                setOtherAttachment(
                    otherAttachment.filter((_, index) => index != idx)
                );
                break;
            default:
                break;
        }
        toast.success("File has been removed.");
    };

    const handleAddNewNegotiator = () => {
        const lastNegotiator = negotiators[negotiators.length - 1];
        if (lastNegotiator.userId) {
            const newNegotiators = [
                ...negotiators,
                {
                    id: nanoid(8),
                    userId: "",
                },
            ];
            setNegotiators(newNegotiators);
        } else {
            toast.error("Please select a user before continuing.");
        }
    };

    const handleRemoveNegotiator = (id) => {
        if (negotiators.length > 1) {
            setNegotiators(negotiators.filter(($) => $.id != id));
        } else {
            toast("Approval must have at least 1 negotiator.");
        }
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

    useEffect(() => {
        if (costItems.length > 0) {
            let result = { total: 0, vat: 0, grandTotal: 0 };
            costItems.forEach((item, _) => {
                const { cBeforeVAT, cVATAmount, cAfterVAT } = item;
                if (cBeforeVAT) result.total += cBeforeVAT;
                if (cVATAmount) result.vat += cVATAmount;
                if (cAfterVAT) result.grandTotal += cAfterVAT;
            });
            setCostSummary(result);
        }
    }, [costItems]);

    return (
        <>
            <div className="page m-7 my-7 border border-gray-200 shadow-[0_8px_30px_rgb(0,0,0,0.13)] bg-white rounded-xl">
                <div className="p-6">
                    {/* Header */}
                    <div className="flex justify-between">
                        <div className="text-[27px] font-bold">
                            Create Approval SG&A
                        </div>
                        <button
                            className="flex items-center space-x-2 p-2 rounded-lg bg-[#3a6f41] px-4 text-white font-medium active:scale-[.87] active:duration-75 transition-all"
                            onClick={handleSave}
                        >
                            <LuSave className="w-5 h-5" />
                            <div className="text-[15px]">Save</div>
                        </button>
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
                        <div className=" h-[2px] rounded-full bg-[#3a6f41] w-full"></div>

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
                                    showSearch
                                    allowClear
                                    className="w-full text-[15px]"
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
                        </div>

                        <div className="mt-4 grid grid-cols-3 gap-4">
                            <div className="col-span-2">
                                <label className="block mb-2 text-[15px] font-semibold text-gray-900">
                                    Subject
                                </label>
                                <TextArea
                                    rows={4}
                                    placeholder="Enter Subject Content"
                                />
                            </div>
                            <div className="col-span-1 flex flex-col">
                                <div className="p-1.5 px-3 bg-gray-50 border border-[#D9D9D9] rounded-md text-[15px] mt-8 font-semibold">
                                    <Checkbox
                                        className="w-full"
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
                        </div>

                        <div className="mt-4 grid grid-cols-2 gap-4">
                            <div className="col-span-1">
                                <label className="block mb-2 text-[15px] font-semibold text-gray-900">
                                    Division - Department
                                </label>
                                <Input
                                    type="text"
                                    placeholder="Enter Division - Department"
                                    className="font-semibold"
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

                        <div className="mt-4">
                            <div className="col-span-1">
                                <label className="block mb-2 text-[15px] font-semibold text-gray-900">
                                    Related Approval
                                </label>
                                <Input
                                    type="text"
                                    placeholder="Enter Related Approval URL Link"
                                    className="font-semibold"
                                />
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
                                    label: "Cost",
                                    children: [
                                        <div>
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
                                                                className="w-full"
                                                                onChange={(
                                                                    date,
                                                                    dateString
                                                                ) => {
                                                                    setCostStartDate(
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
                                                                className="w-full"
                                                                onChange={(
                                                                    date,
                                                                    dateString
                                                                ) => {
                                                                    setCostEndDate(
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
                                                                rows={4}
                                                                placeholder="Enter Good/Service Summary"
                                                            />
                                                        </div>
                                                        <div className="col-span-1">
                                                            <label className="block mb-2 text-[15px] font-semibold text-gray-900">
                                                                Note
                                                            </label>
                                                            <TextArea
                                                                rows={4}
                                                                placeholder="Enter Note"
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
                                                                                _
                                                                            ) => (
                                                                                <tr
                                                                                    key={
                                                                                        item.id
                                                                                    }
                                                                                >
                                                                                    <td className=" bg-[#F5FDF8] border-l-0 border border-[#6a9e72] px-10 py-2">
                                                                                        <div className="flex w-fit m-auto flex-row-reverse">
                                                                                            <Popconfirm
                                                                                                title="Delete item"
                                                                                                description="Are you sure to delete this item? This action cannot be reversed"
                                                                                                okButtonProps={{
                                                                                                    ghost: true,
                                                                                                    danger: true,
                                                                                                }}
                                                                                                onConfirm={() =>
                                                                                                    handleDeleteSalesCostItem(
                                                                                                        "sales",
                                                                                                        item.id
                                                                                                    )
                                                                                                }
                                                                                            >
                                                                                                <button className="text-[#B83232] p-1.5 rounded-full hover:bg-[#feebeb] font-medium active:scale-[.87] active:duration-75 transition-all">
                                                                                                    <LuTrash2 className="w-5 h-5" />
                                                                                                </button>
                                                                                            </Popconfirm>
                                                                                            <button
                                                                                                className="text-[#b43bcc] p-1.5 rounded-full hover:bg-[#ffe4ff] font-medium active:scale-[.87] active:duration-75 transition-all"
                                                                                                onClick={() =>
                                                                                                    handleOpenSalesCostModal(
                                                                                                        "cost",
                                                                                                        "duplicate",
                                                                                                        item.id
                                                                                                    )
                                                                                                }
                                                                                            >
                                                                                                <IoCopyOutline className="w-5 h-5" />
                                                                                            </button>
                                                                                            <button
                                                                                                className="text-[#f3dc31] p-1.5 rounded-full hover:bg-[#ffffe4] font-medium active:scale-[.87] active:duration-75 transition-all"
                                                                                                onClick={() =>
                                                                                                    handleOpenSalesCostModal(
                                                                                                        "cost",
                                                                                                        "edit",
                                                                                                        item.id
                                                                                                    )
                                                                                                }
                                                                                            >
                                                                                                <LuPenSquare className="w-5 h-5" />
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
                                                    <div
                                                        className="flex items-center mb-6 border-2 border-t-0 border-gray-300 space-x-2 justify-center  bg-gray-50 hover:bg-[#e5feea] hover:text-[#3A6F41] hover:border-[#A3D1AD] text-gray-500 cursor-pointer py-2 text-[16px] font-semibold"
                                                        onClick={() =>
                                                            handleOpenSalesCostModal(
                                                                "cost",
                                                                "create"
                                                            )
                                                        }
                                                    >
                                                        <LuPlus />
                                                        <div>Add new item</div>
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
                                                                                _
                                                                            ) => (
                                                                                <tr
                                                                                    key={
                                                                                        item.id
                                                                                    }
                                                                                >
                                                                                    <td className="bg-[#F5FDF8] border-l-0 border border-[#6a9e72] px-10 py-3">
                                                                                        <div className="flex w-fit m-auto flex-row-reverse">
                                                                                            <Popconfirm
                                                                                                title="Delete item"
                                                                                                description="Are you sure to delete this item? This action cannot be reversed"
                                                                                                okButtonProps={{
                                                                                                    ghost: true,
                                                                                                    danger: true,
                                                                                                }}
                                                                                                onConfirm={() =>
                                                                                                    handleDeleteSalesCostItem(
                                                                                                        "additionalCost",
                                                                                                        item.id
                                                                                                    )
                                                                                                }
                                                                                            >
                                                                                                <button className="text-[#B83232] p-1.5 rounded-full hover:bg-[#feebeb] font-medium active:scale-[.87] active:duration-75 transition-all">
                                                                                                    <LuTrash2 className="w-5 h-5" />
                                                                                                </button>
                                                                                            </Popconfirm>
                                                                                            <button
                                                                                                className="text-[#b43bcc] p-1.5 rounded-full hover:bg-[#ffe4ff] font-medium active:scale-[.87] active:duration-75 transition-all"
                                                                                                onClick={() =>
                                                                                                    handleOpenSalesCostModal(
                                                                                                        "additionalCost",
                                                                                                        "duplicate",
                                                                                                        item.id
                                                                                                    )
                                                                                                }
                                                                                            >
                                                                                                <IoCopyOutline className="w-5 h-5" />
                                                                                            </button>
                                                                                            <button
                                                                                                className="text-[#f3dc31] p-1.5 rounded-full hover:bg-[#ffffe4] font-medium active:scale-[.87] active:duration-75 transition-all"
                                                                                                onClick={() =>
                                                                                                    handleOpenSalesCostModal(
                                                                                                        "additionalCost",
                                                                                                        "edit",
                                                                                                        item.id
                                                                                                    )
                                                                                                }
                                                                                            >
                                                                                                <LuPenSquare className="w-5 h-5" />
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
                                                    <div
                                                        className="flex items-center mb-6 border-2 border-t-0 border-gray-300 space-x-2 justify-center  bg-gray-50 hover:bg-[#e5feea] hover:text-[#3A6F41] hover:border-[#A3D1AD] text-gray-500 cursor-pointer py-2 text-[16px] font-semibold"
                                                        onClick={() =>
                                                            handleOpenSalesCostModal(
                                                                "additionalCost",
                                                                "create"
                                                            )
                                                        }
                                                    >
                                                        <LuPlus />
                                                        <div>Add new item</div>
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
                                                                        Permitter
                                                                    </h4>
                                                                    <div className="mt-2 mb-2  border-2 border-gray-300 ">
                                                                        <div className="overflow-x-auto">
                                                                            <table className=" w-full bg-white border-collapse text-[15px]">
                                                                                <thead className="text-[16px] rounded-t-lg">
                                                                                    <tr className="border-b-2 border-gray-300">
                                                                                        <th className="w-1/4 bg-[#D4F2D9] text-[#3A6F41] text-center border-r-2 border-gray-300 py-2">
                                                                                            Permitter
                                                                                            Name
                                                                                        </th>
                                                                                        <th className="w-1/5 bg-[#D4F2D9] text-[#3A6F41] text-center text-[17px] px-8 py-2 border-r-2 border-gray-300">
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
                                                                                                    permitter
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
                                                                                                onChange={(
                                                                                                    value
                                                                                                ) => {
                                                                                                    setPermitter(
                                                                                                        value
                                                                                                    );
                                                                                                }}
                                                                                            />
                                                                                        </td>
                                                                                        <td className="px-3 py-2 border-r-2 border-gray-300">
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
                                                                                            />
                                                                                        </td>
                                                                                        <td className="w-[200px] px-3 py-2">
                                                                                            <TextArea
                                                                                                disabled
                                                                                                rows={
                                                                                                    1
                                                                                                }
                                                                                                className="w-full text-[15px] !font-normal !text-gray-900 !cursor-default"
                                                                                            />
                                                                                        </td>
                                                                                    </tr>
                                                                                </tbody>
                                                                            </table>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="relative w-full">
                                                                <svg
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    viewBox="0 0 24 24"
                                                                    fill="currentColor"
                                                                    className="absolute top-0 z-10 -ml-3.5 h-7 w-7 rounded-full text-[#3A6F41]"
                                                                >
                                                                    <path
                                                                        fillRule="evenodd"
                                                                        d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                                                                        clipRule="evenodd"
                                                                    />
                                                                </svg>
                                                                <div className="ml-6">
                                                                    <div className="flex gap-4 items-center">
                                                                        <h4 className="text-[18px] font-bold text-[#3A6F41]">
                                                                            Negotiators
                                                                        </h4>
                                                                        <div className="flex space-x-2">
                                                                            <button
                                                                                className="flex items-center space-x-2 p-1.5 rounded-lg bg-[#3a6f41] px-4 text-white font-medium active:scale-[.87] active:duration-75 transition-all"
                                                                                // onClick={
                                                                                //     handleOpenAllocateModal
                                                                                // }
                                                                            >
                                                                                <div className="text-[15px] flex items-center gap-1">
                                                                                    <IoReload />
                                                                                    <span>
                                                                                        Load
                                                                                        default
                                                                                    </span>
                                                                                </div>
                                                                            </button>
                                                                        </div>
                                                                    </div>
                                                                    <div className="mt-2 border-2 border-gray-300 ">
                                                                        <div className="overflow-x-auto">
                                                                            <table className=" w-full bg-white border-collapse text-[15px]">
                                                                                <thead className="text-[16px] rounded-t-lg">
                                                                                    <tr className="border-b-2 border-gray-300">
                                                                                        <th className="w-1/10 bg-[#D4F2D9] text-[#3A6F41] text-center border-r-2 border-gray-300 py-2">
                                                                                            Action
                                                                                        </th>
                                                                                        <th className=" w-1/4 bg-[#D4F2D9] text-[#3A6F41] text-center  px-8 py-2 border-r-2 border-gray-300">
                                                                                            Negotator
                                                                                            Name
                                                                                        </th>
                                                                                        <th className="w-1/5 bg-[#D4F2D9] text-[#3A6F41] text-center  px-8 py-2 border-r-2 border-gray-300">
                                                                                            Approval
                                                                                        </th>
                                                                                        <th className="w-1/5 bg-[#D4F2D9] text-[#3A6F41] text-center  border-r-2 border-gray-300 px-8 py-2">
                                                                                            Date
                                                                                        </th>
                                                                                        <th className="w-1/3 bg-[#D4F2D9] text-[#3A6F41] text-center  px-8 py-2">
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
                                                                                                <tr
                                                                                                    key={
                                                                                                        negotiator.id
                                                                                                    }
                                                                                                    className={`border-gray-300 border-b-2 ${
                                                                                                        key !==
                                                                                                            length -
                                                                                                                1 &&
                                                                                                        "border-b-0"
                                                                                                    }`}
                                                                                                >
                                                                                                    <td className="font-semibold text-center  px-3 py-2 border-r-2 border-gray-300">
                                                                                                        <Popconfirm
                                                                                                            title="Delete negotiator"
                                                                                                            description="Are you sure to delete this one? This action cannot be reversed"
                                                                                                            okButtonProps={{
                                                                                                                ghost: true,
                                                                                                                danger: true,
                                                                                                            }}
                                                                                                            onConfirm={() =>
                                                                                                                handleRemoveNegotiator(
                                                                                                                    negotiator.id
                                                                                                                )
                                                                                                            }
                                                                                                        >
                                                                                                            <button className="text-[#B83232] p-1.5 rounded-full hover:bg-[#feebeb] font-medium active:scale-[.87] active:duration-75 transition-all">
                                                                                                                <LuTrash2 className="w-5 h-5" />
                                                                                                            </button>
                                                                                                        </Popconfirm>
                                                                                                    </td>
                                                                                                    <td className="px-3 py-2 border-r-2 border-gray-300">
                                                                                                        <Select
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
                                                                                                            onChange={(
                                                                                                                value
                                                                                                            ) => {
                                                                                                                setNegotiators(
                                                                                                                    negotiators.map(
                                                                                                                        (
                                                                                                                            $
                                                                                                                        ) => {
                                                                                                                            if (
                                                                                                                                $.id ==
                                                                                                                                negotiator.id
                                                                                                                            ) {
                                                                                                                                return {
                                                                                                                                    ...$,
                                                                                                                                    userId: value,
                                                                                                                                };
                                                                                                                            } else
                                                                                                                                return $;
                                                                                                                        }
                                                                                                                    )
                                                                                                                );
                                                                                                            }}
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
                                                                                                            disabled
                                                                                                            placeholder=""
                                                                                                            className="w-full h-[30px]"
                                                                                                        />
                                                                                                    </td>
                                                                                                    <td className="px-3 py-2 ">
                                                                                                        <TextArea
                                                                                                            style={{
                                                                                                                height: "30px",
                                                                                                            }}
                                                                                                            disabled
                                                                                                            className="w-full"
                                                                                                        />
                                                                                                    </td>
                                                                                                </tr>
                                                                                            )
                                                                                        )}
                                                                                </tbody>
                                                                            </table>
                                                                        </div>
                                                                    </div>
                                                                    <div
                                                                        className="flex items-center mb-6 border-2 border-t-0 border-gray-300 space-x-2 justify-center  bg-gray-50 hover:bg-[#e5feea] hover:text-[#3A6F41] hover:border-[#A3D1AD] text-gray-500 cursor-pointer py-2 text-[16px] font-semibold"
                                                                        onClick={() =>
                                                                            handleAddNewNegotiator()
                                                                        }
                                                                    >
                                                                        <LuPlus />
                                                                        <div>
                                                                            Add
                                                                            new
                                                                            negotiator
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
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
                                                                        Final
                                                                        Approver
                                                                    </h4>
                                                                    <div className="mt-2 mb-2  border-2 border-gray-300 ">
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
                                                                                                Auto
                                                                                                approver
                                                                                                name
                                                                                            </span>
                                                                                        </td>
                                                                                        <td className=" px-3 py-2 border-r-2 border-gray-300">
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
                                                                                            />
                                                                                        </td>
                                                                                        <td className="w-[200px] px-3 py-2">
                                                                                            <TextArea
                                                                                                disabled
                                                                                                style={{
                                                                                                    height: "30px",
                                                                                                }}
                                                                                                className="w-full"
                                                                                            />
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
                                                                showSearch
                                                                allowClear
                                                                className="w-full text-[15px]"
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
                                                                showSearch
                                                                allowClear
                                                                className="w-full text-[15px]"
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
                                                                showSearch
                                                                allowClear
                                                                className="w-full text-[15px]"
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
                                                                className="w-full"
                                                                onChange={(
                                                                    date,
                                                                    dateString
                                                                ) => {
                                                                    setCostStartDate(
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
                                                                className="w-full"
                                                                onChange={(
                                                                    date,
                                                                    dateString
                                                                ) => {
                                                                    setCostEndDate(
                                                                        dateString
                                                                    );
                                                                }}
                                                            />
                                                        </div>
                                                    </div>

                                                    <div className="mt-4 grid grid-cols-2 gap-4">
                                                        <div className="col-span-1">
                                                            <label className="block mb-2 text-[15px] font-semibold text-gray-900">
                                                                Location
                                                            </label>
                                                            <TextArea
                                                                rows={4}
                                                                placeholder="Enter Location"
                                                            />
                                                        </div>
                                                        <div className="col-span-1">
                                                            <label className="block mb-2 text-[15px] font-semibold text-gray-900">
                                                                Content
                                                            </label>
                                                            <TextArea
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
                                                                                rows={
                                                                                    1
                                                                                }
                                                                                className="!text-black h-full !cursor-default"
                                                                                // value={description}
                                                                                // disabled={mode == "view"}
                                                                                // onChange={(e) =>
                                                                                //     setDescription(e.target.value)
                                                                                // }
                                                                            />
                                                                        </td>
                                                                        <td className="w-[200px] px-6 py-2">
                                                                            {newTradingAttachment.length >
                                                                                0 && (
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
                                                                                                    <CloseOutlined
                                                                                                        className="ml-2 text-red-700 hover:text-red-400 ease-in cursor-pointer"
                                                                                                        onClick={() =>
                                                                                                            handleRemoveAttachment(
                                                                                                                index,
                                                                                                                "newTrading"
                                                                                                            )
                                                                                                        }
                                                                                                    />
                                                                                                </li>
                                                                                            )
                                                                                        )}
                                                                                    </ol>
                                                                                </div>
                                                                            )}
                                                                            <input
                                                                                id="new-trading-attachment"
                                                                                type="file"
                                                                                className="hidden"
                                                                                accept=".doc, .docx, .txt, .xls, .xlsx, .pdf, .jpg, .jpeg, .png, .gif"
                                                                                onChange={(
                                                                                    e
                                                                                ) =>
                                                                                    handleAttachmentFileChange(
                                                                                        e,
                                                                                        "newTrading"
                                                                                    )
                                                                                }
                                                                                multiple
                                                                            ></input>
                                                                            <label
                                                                                htmlFor="new-trading-attachment"
                                                                                className="flex items-center w-fit rounded border-2 py-1 px-2 gap-2 hover:text-blue-500 hover:ease-in-out hover:duration-75 cursor-pointer"
                                                                            >
                                                                                <span>
                                                                                    Upload
                                                                                    File
                                                                                </span>
                                                                                <MdDriveFolderUpload className="w-6 h-6 -mt-1" />
                                                                            </label>
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
                                                                                rows={
                                                                                    1
                                                                                }
                                                                                className="!text-black !cursor-default"
                                                                                // value={description}
                                                                                // disabled={mode == "view"}
                                                                                // onChange={(e) =>
                                                                                //     setDescription(e.target.value)
                                                                                // }
                                                                            />
                                                                        </td>
                                                                        <td className=" px-6 py-2">
                                                                            {afterImplementationAttachment.length >
                                                                                0 && (
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
                                                                                                    <CloseOutlined
                                                                                                        className="ml-2 text-red-700 hover:text-red-400 ease-in cursor-pointer"
                                                                                                        onClick={() =>
                                                                                                            handleRemoveAttachment(
                                                                                                                index,
                                                                                                                "implementation"
                                                                                                            )
                                                                                                        }
                                                                                                    />
                                                                                                </li>
                                                                                            )
                                                                                        )}
                                                                                    </ol>
                                                                                </div>
                                                                            )}
                                                                            <input
                                                                                id="after-implementation-attachment"
                                                                                type="file"
                                                                                className="hidden"
                                                                                accept=".doc, .docx, .txt, .xls, .xlsx, .pdf, .jpg, .jpeg, .png, .gif"
                                                                                onChange={(
                                                                                    e
                                                                                ) =>
                                                                                    handleAttachmentFileChange(
                                                                                        e,
                                                                                        "implementation"
                                                                                    )
                                                                                }
                                                                                multiple
                                                                            ></input>
                                                                            <label
                                                                                htmlFor="after-implementation-attachment"
                                                                                className="flex items-center w-fit rounded border-2 py-1 px-2 gap-2 hover:text-blue-500 hover:ease-in-out hover:duration-75 cursor-pointer"
                                                                            >
                                                                                <span>
                                                                                    Upload
                                                                                    File
                                                                                </span>
                                                                                <MdDriveFolderUpload className="w-6 h-6 -mt-1" />
                                                                            </label>
                                                                        </td>
                                                                    </tr>
                                                                    <tr className="">
                                                                        <td className="font-semibold text-left  px-8  py-2 border-r-2 border-gray-300">
                                                                            Other
                                                                        </td>
                                                                        <td className=" px-6 py-2 border-r-2 border-gray-300">
                                                                            <TextArea
                                                                                rows={
                                                                                    1
                                                                                }
                                                                                className="!text-black !cursor-default"
                                                                                // value={description}
                                                                                // disabled={mode == "view"}
                                                                                // onChange={(e) =>
                                                                                //     setDescription(e.target.value)
                                                                                // }
                                                                            />
                                                                        </td>
                                                                        <td className=" px-6 py-2">
                                                                            {otherAttachment.length >
                                                                                0 && (
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
                                                                                                    <CloseOutlined
                                                                                                        className="ml-2 text-red-700 hover:text-red-400 ease-in cursor-pointer"
                                                                                                        onClick={() =>
                                                                                                            handleRemoveAttachment(
                                                                                                                index,
                                                                                                                "other"
                                                                                                            )
                                                                                                        }
                                                                                                    />
                                                                                                </li>
                                                                                            )
                                                                                        )}
                                                                                    </ol>
                                                                                </div>
                                                                            )}
                                                                            <input
                                                                                id="other-attachment"
                                                                                type="file"
                                                                                className="hidden"
                                                                                accept=".doc, .docx, .txt, .xls, .xlsx, .pdf, .jpg, .jpeg, .png, .gif"
                                                                                onChange={(
                                                                                    e
                                                                                ) =>
                                                                                    handleAttachmentFileChange(
                                                                                        e,
                                                                                        "other"
                                                                                    )
                                                                                }
                                                                                multiple
                                                                            ></input>
                                                                            <label
                                                                                htmlFor="other-attachment"
                                                                                className="flex items-center w-fit rounded border-2 py-1 px-2 gap-2 hover:text-blue-500 hover:ease-in-out hover:duration-75 cursor-pointer"
                                                                            >
                                                                                <span>
                                                                                    Upload
                                                                                    File
                                                                                </span>
                                                                                <MdDriveFolderUpload className="w-6 h-6 -mt-1" />
                                                                            </label>
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
                                                                        <th className=" w-1/4 bg-[#D4F2D9] text-[#3A6F41] text-center text-[17px] px-8 py-2 border-r-2 border-gray-300">
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
                            ]}
                        />

                        {/* Modals */}
                        <CostModal
                            mode={currentMode}
                            type={currentType}
                            info={currentCostItem}
                            isModalOpen={isCostModalOpen}
                            handleCloseModal={() => handleCloseSalesCostModal()}
                            handleSave={(info) => handleSubmitCost(info)}
                        />

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

export default ApprovalSGACreate;
