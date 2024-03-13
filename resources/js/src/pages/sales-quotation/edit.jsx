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
    Slider,
} from "antd";
import {
    UploadOutlined,
    ExclamationCircleFilled,
    CloseOutlined,
} from "@ant-design/icons";
import { MdOutlineLink, MdDriveFolderUpload } from "react-icons/md";
import { IoReload, IoCopyOutline, IoCloudUpload } from "react-icons/io5";
import { IoIosListBox } from "react-icons/io";
import { LuTrash2, LuPlus, LuSave, LuLink2, LuPenSquare } from "react-icons/lu";
import { FaArrowUp, FaCheck, FaInfo, FaRedoAlt, FaLink } from "react-icons/fa";
import { TbSquareRoundedLetterC, TbSquareRoundedLetterS } from "react-icons/tb";
import { FaCircleDollarToSlot } from "react-icons/fa6";

import DecimalNumberInput from "../../components/approval/DecimalNumberInput";
import UploaderModal from "../../components/sales-quotation/UploaderModal";

import formatBytes from "../../utils/number/formatBytes";
import formatNumberWithCommas from "../../utils/number/formatNumberWithCommas";

const { TextArea } = Input;
const { confirm } = Modal;
const oldTitle = document.title;
const newTitle = "Edit Sales Quotation - Aeon Delight Vietnam";

function SalesQuotationEdit() {
    const currentTime = moment().format("DD/MM/YYYY");

    // States
    const [selectedApprovalNo, setSelectedApprovalNo] = useState(1);

    const [workProgress, setWorkProgress] = useState(0);
    const [salesStartDate, setSalesStartDate] = useState("");
    const [salesEndDate, setSalesEndDate] = useState("");

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

    const [customerConfirmAttachments, setCustomerConfirmAttachments] =
        useState([
            {
                id: nanoid(6),
                files: [
                    // {
                    //     id: nanoid(8),
                    //     file: "",
                    //     name: "",
                    //     extension: "docx",
                    //     size: "10233",
                    // },
                ],
                comment: "Test",
            },
        ]);

    const [customerRejectAttachments, setCustomerRejectAttachments] = useState([
        {
            id: nanoid(6),
            files: [
                // {
                //     id: nanoid(8),
                //     file: "",
                //     name: "",
                //     extension: "docx",
                //     size: "10233",
                // },
            ],
            reason: "Lý do từ chối",
        },
    ]);

    const [isAttachmentModalOpen, setIsAttachmentModalOpen] = useState(false);
    const [currentConfirmAttachmentId, setCurrentConfirmAttachmentId] =
        useState(null);
    const [currentRejectAttachmentId, setCurrentRejectAttachmentId] =
        useState(null);
    const [currentFiles, setCurrentFiles] = useState([]);
    const [currentReason, setCurrentReason] = useState("");

    const [currentType, setCurrentType] = useState(null);
    const [currentMode, setCurrentMode] = useState(null);

    const [newTradingAttachment, setNewTradingAttachment] = useState([]);
    const [afterImplementationAttachment, setAfterImplementationAttachment] =
        useState([]);
    const [otherAttachment, setOtherAttachment] = useState([]);

    // Refs
    const confirmTableRef = useRef(null);
    const rejectTableRef = useRef(null);
    const reasonRef = useRef(null);

    // Controller
    const onWorkProgressChange = (newValue) => {
        setWorkProgress(newValue);
    };

    const handleSave = () => {
        toast("This module is under development.");
    };

    const handleAttachmentFileChange = (files) => {
        setCurrentFiles([...files]);
    };

    const addNewConfirmAttachmentRow = () => {
        const lastConfirmAttachment =
            customerConfirmAttachments[customerConfirmAttachments.length - 1];
        if (lastConfirmAttachment.files.length > 0) {
            setCustomerConfirmAttachments((prev) => [
                ...prev,
                {
                    id: nanoid(6),
                    files: [],
                    comment: "",
                },
            ]);
        } else {
            toast.error("Please complete previous attachment upload.");
        }
    };

    const addNewRejectAttachmentRow = () => {
        const lastRejectAttachment =
            customerRejectAttachments[customerRejectAttachments.length - 1];
        if (
            lastRejectAttachment.files.length > 0 &&
            lastRejectAttachment.reason
        ) {
            setCustomerRejectAttachments((prev) => [
                ...prev,
                {
                    id: nanoid(6),
                    files: [],
                    reason: "",
                },
            ]);
        } else {
            toast.error("Please complete previous attachment upload.");
        }
    };

    const handleSaveAttachment = (reason) => {
        const newAttachments = currentFiles.map((item) => {
            return {
                id: nanoid(8),
                file: item,
                name: item.name,
                extension: item.name.slice(
                    ((item.name.lastIndexOf(".") - 1) >>> 0) + 2
                ),
                size: item.size,
            };
        });

        if (currentConfirmAttachmentId) {
            setCustomerConfirmAttachments((prevAttachments) => {
                return prevAttachments.map((attachment) => {
                    if (attachment.id === currentConfirmAttachmentId) {
                        return {
                            ...attachment,
                            files: newAttachments,
                        };
                    }
                    return attachment;
                });
            });
        }

        if (currentRejectAttachmentId) {
            setCustomerRejectAttachments((prevAttachments) => {
                return prevAttachments.map((attachment) => {
                    if (attachment.id === currentRejectAttachmentId) {
                        return {
                            ...attachment,
                            files: newAttachments,
                            reason: reason,
                        };
                    }
                    return attachment;
                });
            });
        }

        setIsAttachmentModalOpen(false);
        setCurrentConfirmAttachmentId(null);
        setCurrentRejectAttachmentId(null);
        setCurrentFiles([]);
    };

    const cancelAttachmentModal = () => {
        setIsAttachmentModalOpen(false);
        setCurrentConfirmAttachmentId(null);
        setCurrentRejectAttachmentId(null);
    };

    /**
     *  All effected here
     */
    useEffect(() => {
        // Call dữ liệu các số approval

        document.title = newTitle;
        return () => {
            document.title = oldTitle;
        };
    }, []);

    useEffect(() => {
        // Call dữ liệu thông tin approval dựa theo số approval
        // Thêm loader
        if (selectedApprovalNo) {
        }
    }, [selectedApprovalNo]);

    useEffect(() => {
        if (salesItems.length > 0) {
            let result = { total: 0, vat: 0, grandTotal: 0 };
            salesItems.forEach((item, _) => {
                const { cBeforeVAT, cVATAmount, cAfterVAT } = item;
                if (cBeforeVAT) result.total += cBeforeVAT;
                if (cVATAmount) result.vat += cVATAmount;
                if (cAfterVAT) result.grandTotal += cAfterVAT;
            });
            setSalesSummary(result);
        }
    }, [salesItems]);

    return (
        <>
            <div className="page m-7 my-7 border border-gray-200 shadow-[0_8px_30px_rgb(0,0,0,0.13)] bg-white rounded-xl">
                <div className="p-6">
                    {/* Header */}
                    <div className="flex justify-between">
                        <div className="text-[27px] font-bold">
                            Edit Sales Quotation
                        </div>
                        <div className="flex gap-3 items-center">
                            <Select
                                labelInValue
                                defaultValue={{
                                    value: "0",
                                    label: "New",
                                }}
                                status="warning"
                                style={{
                                    width: 120,
                                }}
                                className="w-full text-[15px] !font-normal !text-gray-900 !cursor-default"
                                disabled={true}
                                // onChange={handleChange}
                                options={[
                                    {
                                        value: "0",
                                        label: "New",
                                    },
                                    {
                                        value: "1",
                                        label: "Confirmed",
                                    },
                                    {
                                        value: "2",
                                        label: "Rejected",
                                    },
                                ]}
                            />
                            <button
                                className="flex items-center space-x-2 p-2 rounded-lg bg-[#3a6f41] px-4 text-white font-medium active:scale-[.87] active:duration-75 transition-all"
                                onClick={handleSave}
                            >
                                <LuSave className="w-5 h-5" />
                                <div className="text-[15px]">Save</div>
                            </button>
                        </div>
                    </div>

                    {/* Automatic Generated Information */}
                    <div className="grid grid-cols-5 mt-4 gap-4">
                        <div className="col-span-1">
                            <label className="block text-[15px] font-semibold text-gray-900">
                                Quotation Type
                            </label>
                            <div className="font-bold text-[#3A6F41] text-lg inter-font">
                                {selectedApprovalNo ? "Spot" : "(select an approval no. first)"}
                            </div>
                        </div>
                        <div className="col-span-1">
                            <label className="block text-[15px]  font-semibold text-gray-900">
                                Quotation Date
                            </label>
                            <div className="font-bold text-[#3A6F41] text-lg inter-font">
                                {currentTime}
                            </div>
                        </div>
                        <div className="col-span-1">
                            <label className="block text-[15px] font-semibold text-gray-900">
                                Quotation No
                            </label>
                            <div className="font-bold text-[#3A6F41] text-lg inter-font">
                                2024-0000
                            </div>
                        </div>
                    </div>

                    {/* First Loading General Information */}
                    {selectedApprovalNo == null && (
                        <div className="my-6">
                            {/* Header */}
                            <div className="uppercase my-1 text-[17px] font-bold">
                                General Information
                            </div>
                            <div className="h-[2px] rounded-full bg-[#3a6f41] w-full"></div>

                            <div className="mt-4 grid grid-cols-3 gap-4">
                                <div className="col-span-1">
                                    <label className="block mb-2 text-[15px] font-semibold text-gray-900">
                                        Approval No.
                                    </label>
                                    <Select
                                        showSearch
                                        allowClear
                                        className="w-full text-[15px]"
                                        placeholder="Select Approval No."
                                        filterOption={(input, option) =>
                                            (option?.label ?? "").includes(
                                                input
                                            )
                                        }
                                        options={[
                                            {
                                                value: "1",
                                                label: "Approval No 1",
                                            },
                                            {
                                                value: "2",
                                                label: "Approval No 2",
                                            },
                                            {
                                                value: "3",
                                                label: "Approval No 3",
                                            },
                                        ]}
                                        onChange={(value) => {
                                            console.log(value);
                                            setSelectedApprovalNo(value);
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {selectedApprovalNo && (
                        <>
                            {/* General Information */}
                            <div className="my-6">
                                {/* Header */}
                                <div className="uppercase my-1 text-[17px] font-bold">
                                    General Information
                                </div>
                                <div className="h-[2px] rounded-full bg-[#3a6f41] w-full"></div>

                                <div className="mt-4 grid grid-cols-3 gap-4">
                                    <div className="col-span-1">
                                        <label className="block mb-2 text-[15px] font-semibold text-gray-900">
                                            Approval No.
                                        </label>
                                        <Select
                                            showSearch
                                            allowClear
                                            className="w-full text-[15px]"
                                            placeholder="Select Approval No."
                                            filterOption={(input, option) =>
                                                (option?.label ?? "").includes(
                                                    input
                                                )
                                            }
                                            options={[
                                                {
                                                    value: "1",
                                                    label: "Approval No 1",
                                                },
                                                {
                                                    value: "2",
                                                    label: "Approval No 2",
                                                },
                                                {
                                                    value: "3",
                                                    label: "Approval No 3",
                                                },
                                            ]}
                                        />
                                    </div>
                                    <div className="col-span-1">
                                        <label className="block mb-2 text-[15px] font-semibold text-gray-900">
                                            Work Progress
                                        </label>
                                        <div className="grid grid-cols-5 gap-2">
                                            <Slider
                                                min={0}
                                                max={100}
                                                onChange={onWorkProgressChange}
                                                value={
                                                    typeof workProgress ===
                                                    "number"
                                                        ? workProgress
                                                        : 0
                                                }
                                                className="col-span-4"
                                            />
                                            <InputNumber
                                                min={0}
                                                max={100}
                                                style={{ margin: "" }}
                                                value={workProgress}
                                                step={1}
                                                precision={0}
                                                onChange={onWorkProgressChange}
                                                className="col-span-1"
                                            />
                                        </div>
                                    </div>
                                    <div className="col-span-1">
                                        <label className="block mb-2 text-[15px] font-semibold text-gray-900">
                                            Contract Status
                                        </label>
                                        <Select
                                            showSearch
                                            allowClear
                                            style={{
                                                width: "100%",
                                                fontSize: "15px",
                                            }}
                                            placeholder="Select Contract Status"
                                            filterOption={(input, option) =>
                                                (option?.label ?? "").includes(
                                                    input
                                                )
                                            }
                                            options={[
                                                {
                                                    value: "1",
                                                    label: "Status 1",
                                                },
                                                {
                                                    value: "2",
                                                    label: "Status 2",
                                                },
                                                {
                                                    value: "3",
                                                    label: "Status 3",
                                                },
                                            ]}
                                        />
                                    </div>
                                </div>

                                <div className="mt-4 grid grid-cols-3 gap-4">
                                    <div className="col-span-1">
                                        <label className="block mb-2 text-[15px] font-semibold text-gray-900">
                                            Start Date
                                        </label>
                                        <DatePicker
                                            className="w-full"
                                            onChange={(date, dateString) => {
                                                setSalesStartDate(dateString);
                                            }}
                                        />
                                    </div>
                                    <div className="col-span-1">
                                        <label className="block mb-2 text-[15px] font-semibold text-gray-900">
                                            End Date
                                        </label>
                                        <DatePicker
                                            className="w-full"
                                            onChange={(date, dateString) => {
                                                setSalesEndDate(dateString);
                                            }}
                                        />
                                    </div>
                                    <div className="col-span-1">
                                        <label className="block mb-2 text-[15px] font-semibold text-gray-900">
                                            Due Date
                                        </label>
                                        <DatePicker
                                            className="w-full"
                                            onChange={(date, dateString) => {
                                                setSalesEndDate(dateString);
                                            }}
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

                                <div className="mt-4 grid grid-cols-2 gap-4">
                                    <div className="col-span-1">
                                        <label className="block mb-2 text-[15px] font-semibold text-gray-900">
                                            Section
                                        </label>
                                        <Input
                                            type="text"
                                            placeholder="Enter Section"
                                            className="font-semibold"
                                        />
                                    </div>
                                    <div className="col-span-1">
                                        <label className="block mb-2 text-[15px] font-semibold text-gray-900">
                                            Team
                                        </label>
                                        <Input
                                            type="text"
                                            placeholder="Enter Team"
                                            className="font-semibold"
                                        />
                                    </div>
                                </div>

                                <div className="mt-4">
                                    <div className="col-span-1">
                                        <label className="block mb-2 text-[15px] font-semibold text-gray-900">
                                            Project Name
                                        </label>
                                        <Input
                                            type="text"
                                            placeholder="Enter Project Name"
                                            className="font-semibold"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Customer Information */}
                            <div className="my-6">
                                {/* Header */}
                                <div className="uppercase my-1 text-[17px] font-bold">
                                    Customer Information
                                </div>
                                <div className="h-[2px] rounded-full bg-[#3a6f41] w-full"></div>

                                <div className="mt-4 grid grid-cols-3 gap-4">
                                    <div className="col-span-1">
                                        <label className="block mb-2 text-[15px] font-semibold text-gray-900">
                                            Customer
                                        </label>
                                        <span className="ant-border w-full flex">
                                            Tên Customer
                                        </span>
                                    </div>
                                    <div className="col-span-1">
                                        <label className="block mb-2 text-[15px] font-semibold text-gray-900">
                                            Tax ID
                                        </label>
                                        <span className="ant-border w-full flex">
                                            Tax ID
                                        </span>
                                    </div>
                                    <div className="col-span-1">
                                        <label className="block mb-2 text-[15px] font-semibold text-gray-900">
                                            Site Name
                                        </label>
                                        <span className="ant-border w-full flex">
                                            Site Name
                                        </span>
                                    </div>
                                </div>

                                <div className="mt-4 grid grid-cols-4 gap-4">
                                    <div className="col-span-2">
                                        <label className="block mb-2 text-[15px] font-semibold text-gray-900">
                                            Billing Address
                                        </label>
                                        <TextArea
                                            disabled={true}
                                            rows={3}
                                            placeholder="Enter Subject Content"
                                        />
                                    </div>
                                    <div className="col-span-2">
                                        <label className="block mb-2 text-[15px] font-semibold text-gray-900">
                                            Shipping/Service Address
                                        </label>
                                        <TextArea
                                            rows={3}
                                            placeholder="Enter Subject Content"
                                        />
                                    </div>
                                </div>

                                <div className="mt-4 grid grid-cols-3 gap-4">
                                    <div className="col-span-1">
                                        <label className="block mb-2 text-[15px] font-semibold text-gray-900">
                                            PIC
                                        </label>
                                        <Input
                                            type="text"
                                            placeholder="Enter PIC"
                                            className="font-semibold"
                                        />
                                    </div>
                                    <div className="col-span-1">
                                        <label className="block mb-2 text-[15px] font-semibold text-gray-900">
                                            Mobile
                                        </label>
                                        <Input
                                            type="text"
                                            placeholder="Enter Mobile"
                                            className="font-semibold"
                                        />
                                    </div>
                                    <div className="col-span-1">
                                        <label className="block mb-2 text-[15px] font-semibold text-gray-900">
                                            Email
                                        </label>
                                        <Input
                                            type="text"
                                            placeholder="Enter Email"
                                            className="font-semibold"
                                        />
                                    </div>
                                </div>

                                <div className="mt-4 grid grid-cols-4 gap-4">
                                    <div className="col-span-2">
                                        <label className="block mb-2 text-[15px] font-semibold text-gray-900">
                                            Subject
                                        </label>
                                        <TextArea
                                            disabled={true}
                                            rows={3}
                                            placeholder="Enter Subject Content"
                                        />
                                    </div>
                                    <div className="col-span-2">
                                        <label className="block mb-2 text-[15px] font-semibold text-gray-900">
                                            Note
                                        </label>
                                        <TextArea
                                            rows={3}
                                            placeholder="Enter Subject Content"
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
                                            key: "detailsOfIncome",
                                            label: "Detail of Income",
                                            children: [
                                                <div key="detailsOfIncome">
                                                    {/* Detail of Sales */}
                                                    <div className="shadow-sm rounded-lg border-2 bg-[#fbfdff] border-gray-300">
                                                        <div className="rounded-t-lg flex items-center space-x-3 bg-gray-100 border-b-2 border-gray-300 p-2.5 px-4 text-[17px] text-[#37763F] font-bold uppercase ">
                                                            <div className=" bg-gray-700 text-white px-[9px] rounded-[50px]">
                                                                S
                                                            </div>
                                                            <div>
                                                                Detail of Sales
                                                            </div>
                                                        </div>
                                                        <div className="px-4 py-4 ">
                                                            {/* Sales Item List */}
                                                            <div className=" mt-6 rounded-t-lg border-2 border-[#b1d9ba] ">
                                                                <div className="  bg-[#D4F2D9]  rounded-t-lg flex items-center justify-between px-3 py-1.5">
                                                                    <div className="flex space-x-3 items-center text-[18px] font-bold py-2 ">
                                                                        <IoIosListBox className="w-6 h-6 text-[#3A6F41]" />
                                                                        <div>
                                                                            Sales
                                                                            Item
                                                                            List
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="overflow-x-auto">
                                                                    <table className="w-full bg-white border-collapse">
                                                                        <thead>
                                                                            <tr className="bg-[#e6efe7]">
                                                                                <th className="min-w-[50px] max-h-[50px] bg-[#d4f2d9] border-2 border-[#99d2a4] border-l-0 text-left px-8 py-2">
                                                                                    No.
                                                                                </th>
                                                                                <th className="min-w-[240px] max-h-[240px] bg-[#d4f2d9] border-2 border-[#99d2a4] text-left px-8 py-2">
                                                                                    Goods/Service
                                                                                </th>
                                                                                <th className="min-w-[200px] max-h-[200px] bg-[#d4f2d9] border-2 border-[#99d2a4] text-left px-8 py-2">
                                                                                    Description
                                                                                </th>
                                                                                <th className="min-w-[260px] max-h-[260px] bg-[#d4f2d9] border-2 border-[#99d2a4] text-left px-8 py-2">
                                                                                    Unit
                                                                                </th>
                                                                                <th className="min-w-[200px] max-h-[200px] bg-[#d4f2d9] border-2 border-[#99d2a4] text-left px-8 py-2">
                                                                                    Quantity
                                                                                </th>
                                                                                <th className="min-w-[80px] max-h-[80px] bg-[#d4f2d9] border-2 border-[#99d2a4] text-center px-8 py-2">
                                                                                    Unit
                                                                                    Price
                                                                                </th>
                                                                                <th className="min-w-[150px] max-h-[150px] bg-[#d4f2d9] border-2 border-[#99d2a4] text-center px-8 py-2">
                                                                                    Before
                                                                                    VAT
                                                                                </th>
                                                                                <th className="min-w-[120px] max-h-[120px] bg-[#d4f2d9] border-2 border-[#99d2a4] text-center px-8 py-2">
                                                                                    VAT
                                                                                    (%)
                                                                                </th>

                                                                                <th className="min-w-[180px] max-h-[180px] bg-[#d4f2d9] border-2 border-[#99d2a4] text-center px-8 py-2">
                                                                                    VAT
                                                                                    Amount
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
                                                                                        _
                                                                                    ) => (
                                                                                        <tr
                                                                                            key={
                                                                                                item.id
                                                                                            }
                                                                                        >
                                                                                            <td className="bg-[#F5FDF8] border border-[#6a9e72] border-l-0 px-8 py-2">
                                                                                                {item.id ||
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
                                                                                            <td className="text-center bg-[#F5FDF8] border border-[#6a9e72] px-8 py-2">
                                                                                                {formatNumberWithCommas(
                                                                                                    item.vatAmount
                                                                                                ) ||
                                                                                                    ""}
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
                                                            <div className="flex flex-col items-end pr-2 space-y-3 mt-6">
                                                                <div className="w-1/4">
                                                                    <div className="flex items-center space-x-2">
                                                                        <label className="w-2/4 block mb-2 text-[15px] font-semibold text-gray-900  ">
                                                                            Total
                                                                        </label>
                                                                        <span className="font-semibold bg-gray-50 border border-gray-300 text-gray-900 text-[15px] text-right rounded-lg block w-full p-1.5 ">
                                                                            {formatNumberWithCommas(
                                                                                salesSummary.total
                                                                            ) ||
                                                                                0}
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
                                                                            ) ||
                                                                                0}
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                                <div className="w-1/4">
                                                                    <div className="flex items-center space-x-2">
                                                                        <label className="w-2/4 block mb-2 text-[15px] font-semibold text-gray-900  ">
                                                                            Grand
                                                                            Total
                                                                        </label>
                                                                        <span className="font-semibold bg-gray-50 border border-gray-300 text-gray-900 text-[15px] text-right rounded-lg  block w-full p-1.5 ">
                                                                            {formatNumberWithCommas(
                                                                                salesSummary.grandTotal
                                                                            ) ||
                                                                                0}
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
                                                                            Sales
                                                                            Item
                                                                            List
                                                                            (If
                                                                            any)
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="overflow-x-auto">
                                                                    <table className=" w-full bg-white border-collapse">
                                                                        <thead className="bg-[#e6efe7]">
                                                                            <tr>
                                                                                <th className="min-w-[50px] max-h-[50px] bg-[#d4f2d9] border-2 border-[#99d2a4] border-l-0 text-left px-8 py-2">
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
                                                                                        _
                                                                                    ) => (
                                                                                        <tr
                                                                                            key={
                                                                                                item.id
                                                                                            }
                                                                                        >
                                                                                            <td className="bg-[#F5FDF8] border border-[#6a9e72] border-l-0 px-8 py-2">
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
                                                </div>,
                                            ],
                                        },
                                        {
                                            key: "attachment",
                                            label: "Attachment",
                                            children: [
                                                <div key="attachment">
                                                    {/* Customer Confirmation Attachment */}
                                                    <div className="mt-6 shadow-sm rounded-lg border-2 bg-[#fbfdff] border-gray-300">
                                                        <div className="rounded-t-lg flex items-center space-x-3 bg-gray-100 border-b-2 border-gray-300 p-2.5 px-4 text-[17px] text-[#37763F] font-bold uppercase ">
                                                            <div className=" bg-gray-700 text-white p-1.5 px-1.5 rounded-[50px]">
                                                                <FaLink className="w-4 h-4" />
                                                            </div>
                                                            <div>
                                                                Customer
                                                                Confirmation
                                                            </div>
                                                        </div>
                                                        <div className="px-4 py-2 ">
                                                            {/* Form */}
                                                            <div className="mt-2 border-2 border-gray-300 ">
                                                                <div className="overflow-x-auto">
                                                                    <table
                                                                        ref={
                                                                            confirmTableRef
                                                                        }
                                                                        className=" w-full bg-white border-collapse text-[15px]"
                                                                    >
                                                                        <thead className="text-[17px] rounded-t-lg">
                                                                            <tr className="border-b-2 border-gray-300">
                                                                                <th className="w-1/3 bg-[#D4F2D9] text-[#3A6F41] text-center text-[17px] px-8 py-2 border-r-2 border-gray-300">
                                                                                    Comment
                                                                                </th>
                                                                                <th className="w-1/3 bg-[#D4F2D9] text-[#3A6F41] text-center border-r-2 border-gray-300 py-2">
                                                                                    File
                                                                                </th>
                                                                                <th className="w-1/3 bg-[#D4F2D9] text-[#3A6F41] text-center text-[17px] px-8 py-2">
                                                                                    Upload
                                                                                </th>
                                                                            </tr>
                                                                        </thead>
                                                                        <tbody>
                                                                            {customerConfirmAttachments.length >
                                                                                0 &&
                                                                                customerConfirmAttachments.map(
                                                                                    (
                                                                                        item,
                                                                                        idx
                                                                                    ) => (
                                                                                        <tr
                                                                                            key={
                                                                                                item.id
                                                                                            }
                                                                                            className="border-b-2 border-gray-300"
                                                                                            data-id={
                                                                                                item.id
                                                                                            }
                                                                                        >
                                                                                            <td className=" px-6 py-2 border-r-2 border-gray-300">
                                                                                                <TextArea
                                                                                                    rows={
                                                                                                        1
                                                                                                    }
                                                                                                    className={`!text-black h-full }`}
                                                                                                    value={
                                                                                                        item.comment ||
                                                                                                        ""
                                                                                                    }
                                                                                                    onChange={(
                                                                                                        e
                                                                                                    ) =>
                                                                                                        setCustomerConfirmAttachments(
                                                                                                            (
                                                                                                                prev
                                                                                                            ) => {
                                                                                                                prev.map(
                                                                                                                    (
                                                                                                                        attachment
                                                                                                                    ) => {
                                                                                                                        if (
                                                                                                                            attachment.id ==
                                                                                                                            item.id
                                                                                                                        ) {
                                                                                                                            return {
                                                                                                                                ...attachment,
                                                                                                                                comment:
                                                                                                                                    e
                                                                                                                                        .target
                                                                                                                                        .value,
                                                                                                                            };
                                                                                                                        } else
                                                                                                                            return attachment;
                                                                                                                    }
                                                                                                                );
                                                                                                            }
                                                                                                        )
                                                                                                    }
                                                                                                />
                                                                                            </td>
                                                                                            <td className="font-semibold text-left px-8 py-2 border-r-2 border-gray-300">
                                                                                                <div className="flex flex-col">
                                                                                                    {item
                                                                                                        .files
                                                                                                        .length >
                                                                                                        0 &&
                                                                                                        item.files.map(
                                                                                                            (
                                                                                                                file,
                                                                                                                ind
                                                                                                            ) => (
                                                                                                                <a>
                                                                                                                    {
                                                                                                                        "- "
                                                                                                                    }
                                                                                                                    {
                                                                                                                        file.name
                                                                                                                    }
                                                                                                                    {
                                                                                                                        "."
                                                                                                                    }
                                                                                                                    {
                                                                                                                        file.extension
                                                                                                                    }
                                                                                                                    {
                                                                                                                        " - "
                                                                                                                    }
                                                                                                                    {formatBytes(
                                                                                                                        file.size
                                                                                                                    )}
                                                                                                                </a>
                                                                                                            )
                                                                                                        )}
                                                                                                </div>
                                                                                            </td>
                                                                                            <td className="w-[200px] px-6 py-2 text-center">
                                                                                                <label
                                                                                                    className="flex items-center mx-auto w-fit rounded border-2 py-1 px-2 gap-2 hover:text-blue-500 hover:ease-in-out hover:duration-75 cursor-pointer"
                                                                                                    onClick={() => {
                                                                                                        setIsAttachmentModalOpen(
                                                                                                            true
                                                                                                        );
                                                                                                        setCurrentConfirmAttachmentId(
                                                                                                            item.id
                                                                                                        );
                                                                                                        setCurrentRejectAttachmentId(
                                                                                                            null
                                                                                                        );
                                                                                                    }}
                                                                                                >
                                                                                                    <span>
                                                                                                        Upload
                                                                                                        File
                                                                                                    </span>
                                                                                                    <MdDriveFolderUpload className="w-6 h-6 -mt-1" />
                                                                                                </label>
                                                                                            </td>
                                                                                        </tr>
                                                                                    )
                                                                                )}
                                                                        </tbody>
                                                                    </table>
                                                                </div>
                                                            </div>
                                                            <div
                                                                className="flex items-center mb-6 border-2 border-gray-300 border-t-0 space-x-2 justify-center  bg-gray-50 hover:bg-[#e5feea] hover:text-[#3A6F41] hover:border-[#A3D1AD] text-gray-500 cursor-pointer py-2 text-[16px] font-semibold"
                                                                onClick={
                                                                    addNewConfirmAttachmentRow
                                                                }
                                                            >
                                                                <LuPlus />
                                                                <div>
                                                                    Add new
                                                                    attachment
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* Customer Rejection Attachment */}
                                                    <div className="mt-6 shadow-sm rounded-lg border-2 bg-[#fbfdff] border-gray-300">
                                                        <div className="rounded-t-lg flex items-center space-x-3 bg-gray-100 border-b-2 border-gray-300 p-2.5 px-4 text-[17px] text-[#37763F] font-bold uppercase ">
                                                            <div className=" bg-gray-700 text-white p-1.5 px-1.5 rounded-[50px]">
                                                                <FaLink className="w-4 h-4" />
                                                            </div>
                                                            <div>
                                                                Customer
                                                                Rejection
                                                            </div>
                                                        </div>
                                                        <div className="px-4 py-2 ">
                                                            {/* Form */}
                                                            <div className="mt-2 border-2 border-gray-300 ">
                                                                <div className="overflow-x-auto">
                                                                    <table
                                                                        ref={
                                                                            rejectTableRef
                                                                        }
                                                                        className=" w-full bg-white border-collapse text-[15px]"
                                                                    >
                                                                        <thead className="text-[17px] rounded-t-lg">
                                                                            <tr className="border-b-2 border-gray-300">
                                                                                <th className=" w-1/3 bg-[#D4F2D9] text-[#3A6F41] text-center text-[17px] px-8 py-2 border-r-2 border-gray-300">
                                                                                    Reason{" "}
                                                                                    <span className="text-red-600">
                                                                                        *
                                                                                    </span>
                                                                                </th>
                                                                                <th className="w-1/3 bg-[#D4F2D9] text-[#3A6F41] text-center border-r-2 border-gray-300 py-2">
                                                                                    File
                                                                                </th>
                                                                                <th className="w-1/3 bg-[#D4F2D9] text-[#3A6F41] text-center text-[17px] px-8 py-2">
                                                                                    Upload
                                                                                </th>
                                                                            </tr>
                                                                        </thead>
                                                                        <tbody>
                                                                            {customerRejectAttachments.length >
                                                                                0 &&
                                                                                customerRejectAttachments.map(
                                                                                    (
                                                                                        item,
                                                                                        idx
                                                                                    ) => (
                                                                                        <tr
                                                                                            key={
                                                                                                item.id
                                                                                            }
                                                                                            className="border-b-2 border-gray-300"
                                                                                            data-id={
                                                                                                item.id
                                                                                            }
                                                                                        >
                                                                                            <td className=" px-6 py-2 border-r-2 border-gray-300">
                                                                                                <TextArea
                                                                                                    rows={
                                                                                                        1
                                                                                                    }
                                                                                                    className={`!text-black h-full }`}
                                                                                                    value={
                                                                                                        item.reason ||
                                                                                                        ""
                                                                                                    }
                                                                                                    disabled={
                                                                                                        true
                                                                                                    }
                                                                                                />
                                                                                            </td>
                                                                                            <td className="font-semibold text-left  px-8 py-2 border-r-2 border-gray-300">
                                                                                                <div className="flex flex-col">
                                                                                                    {item
                                                                                                        .files
                                                                                                        .length >
                                                                                                        0 &&
                                                                                                        item.files.map(
                                                                                                            (
                                                                                                                file,
                                                                                                                ind
                                                                                                            ) => (
                                                                                                                <a>
                                                                                                                    {
                                                                                                                        "- "
                                                                                                                    }
                                                                                                                    {
                                                                                                                        file.name
                                                                                                                    }
                                                                                                                    {
                                                                                                                        "."
                                                                                                                    }
                                                                                                                    {
                                                                                                                        file.extension
                                                                                                                    }
                                                                                                                    {
                                                                                                                        " - "
                                                                                                                    }
                                                                                                                    {formatBytes(
                                                                                                                        file.size
                                                                                                                    )}
                                                                                                                </a>
                                                                                                            )
                                                                                                        )}
                                                                                                </div>
                                                                                            </td>
                                                                                            <td className="w-[200px] px-6 py-2 text-center">
                                                                                                <label
                                                                                                    className="flex items-center mx-auto w-fit rounded border-2 py-1 px-2 gap-2 hover:text-blue-500 hover:ease-in-out hover:duration-75 cursor-pointer"
                                                                                                    onClick={() => {
                                                                                                        setIsAttachmentModalOpen(
                                                                                                            true
                                                                                                        );
                                                                                                        setCurrentConfirmAttachmentId(
                                                                                                            null
                                                                                                        );
                                                                                                        setCurrentRejectAttachmentId(
                                                                                                            item.id
                                                                                                        );
                                                                                                    }}
                                                                                                >
                                                                                                    <span>
                                                                                                        Upload
                                                                                                        File
                                                                                                    </span>
                                                                                                    <MdDriveFolderUpload className="w-6 h-6 -mt-1" />
                                                                                                </label>
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
                                                                onClick={
                                                                    addNewRejectAttachmentRow
                                                                }
                                                            >
                                                                <LuPlus />
                                                                <div>
                                                                    Add new
                                                                    attachment
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
                                <UploaderModal
                                    isAttachmentModalOpen={
                                        isAttachmentModalOpen
                                    }
                                    currentConfirmAttachmentId={
                                        currentConfirmAttachmentId
                                    }
                                    currentRejectAttachmentId={
                                        currentRejectAttachmentId
                                    }
                                    cancelModal={cancelAttachmentModal}
                                    handleSaveAttachment={handleSaveAttachment}
                                    changeCurrentFiles={
                                        handleAttachmentFileChange
                                    }
                                    files={
                                        currentConfirmAttachmentId
                                            ? customerConfirmAttachments.find(
                                                  (att) =>
                                                      att.id ==
                                                      currentConfirmAttachmentId
                                              )?.files
                                            : customerRejectAttachments.find(
                                                  (att) =>
                                                      att.id ==
                                                      currentRejectAttachmentId
                                              )?.files
                                    }
                                    reason={
                                        currentRejectAttachmentId
                                            ? customerRejectAttachments.find(
                                                  (att) =>
                                                      att.id ==
                                                      currentRejectAttachmentId
                                              )?.reason
                                            : ""
                                    }
                                />
                            </div>
                        </>
                    )}
                </div>
            </div>
            {/* Scroller */}
        </>
    );
}

export default SalesQuotationEdit;
