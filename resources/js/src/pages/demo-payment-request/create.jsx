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

import SalesModal from "../../components/approval/SalesModal";
import CostModal from "../../components/approval/CostModal";
import DecimalNumberInput from "../../components/approval/DecimalNumberInput";

import formatBytes from "../../utils/number/formatBytes";
import formatNumberWithCommas from "../../utils/number/formatNumberWithCommas";

const { TextArea } = Input;
const { confirm } = Modal;
const oldTitle = document.title;
const newTitle = "Create Payment Request - Demo";

// const props = {
//     action: "//jsonplaceholder.typicode.com/posts/",
//     listType: "picture",
//     previewFile(file) {
//         console.log("Your upload file:", file);
//         // Your process logic. Here we just mock to the same file
//         return fetch("https://next.json-generator.com/api/json/get/4ytyBoLK8", {
//             method: "POST",
//             body: file,
//         })
//             .then((res) => res.json())
//             .then(({ thumbnail }) => thumbnail);
//     },
// };

const currency = [
    {
        value: "1",
        label: "VND",
    },
    {
        value: "2",
        label: "USD",
    }
];

function CreateDemoPaymentRequest() {
    const currentTime = moment().format("DD/MM/YYYY");

    // States
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
            id: nanoid(8),
            userId: "1",
        },
    ]);
    const [permitter, setPermitter] = useState(null);

    const [newTradingAttachment, setNewTradingAttachment] = useState([]);
    const [afterImplementationAttachment, setAfterImplementationAttachment] =
        useState([]);
    const [otherAttachment, setOtherAttachment] = useState([]);

    // Controller
    const handleOpenSalesCostModal = (type, mode, id) => {
        setCurrentType(type);
        setCurrentMode(mode);
        if (type == "sales" || type == "additionalSales") {
            if (
                (mode == "view" || mode == "edit" || mode == "duplicate") &&
                type == "sales"
            ) {
                setCurrentSalesItem(salesItems.find((item) => item.id == id));
            }
            if (
                (mode == "view" || mode == "edit" || mode == "duplicate") &&
                type == "additionalSales"
            ) {
                setCurrentSalesItem(
                    additionalSalesItems.find((item) => item.id == id)
                );
            }
            setIsSalesModalOpen(true);
        } else if (type == "cost" || type == "additionalCost") {
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
        setIsSalesModalOpen(false);
        setIsCostModalOpen(false);
        setCurrentSalesItem(null);
        setCurrentCostItem(null);
    };

    const handleOpenAllocateModal = (action) => {
        if (salesItems.length > costItems.length) {
            toast.error("Please enter more purchasing item.");
            return;
        }
        if (salesItems.length < costItems.length) {
            toast.error("Please enter more sales item.");
            return;
        }
        // Khúc này phải xử lý dữ liệu cho hiển thị allocate modal
        setIsAllocateModalOpen(true);
    };

    const handleCloseAllocateModal = () => {
        setIsAllocateModalOpen(false);
    };

    const handleSubmitSales = (info) => {
        console.log("Log ra info: ", info);
        if (currentMode == "create") {
            if (currentType == "sales") {
                toast("Processing adding new sales item");
            } else if (currentType == "additionalSales") {
                toast("Processing adding additional sales item");
            }
        } else if (currentMode == "edit") {
            if (currentType == "sales") {
                toast("Processing editing new sales item");
            } else if (currentType == "additionalSales") {
                toast("Processing editing additional sales item");
            }
        }
        setIsSalesModalOpen(false);
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

    const handleAllocateSave = () => {
        toast("This module is under development.");
    };

    const handleAllocateRemove = () => {
        confirm({
            title: "Are you sure remove allocation?",
            icon: <ExclamationCircleFilled />,
            content: "Some descriptions",
            okText: "Yes",
            okType: "danger",
            cancelText: "No",
            onOk() {
                toast("This module is under development.");
            },
            onCancel() {},
        });
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
                            Create Payment Request
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
                                Request Date
                            </label>
                            <div className="font-bold text-[#3A6F41] text-lg inter-font">
                                {currentTime}
                            </div>
                        </div>
                        <div className="col-span-1">
                            <label className="block text-[15px] font-semibold text-gray-900">
                                Payment Request No
                            </label>
                            <div className="font-bold text-[#3A6F41] text-lg inter-font">
                                240301-0001
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

                        <div className="mt-4 grid grid-cols-3 gap-4">
                            <div className="col-span-1">
                                <label className="block mb-2 text-[15px] font-semibold text-gray-900">
                                    Company Code <span className="text-red-500">*</span>
                                </label>
                                <Input
                                    style={{
                                        width: "100%",
                                        fontSize: "15px",
                                    }}
                                    placeholder="Enter Company Code"
                                />
                            </div>
                            <div className="col-span-1">
                                <label className="block mb-2 text-[15px] font-semibold text-gray-900">
                                    Card Name <span className="text-red-500">*</span>
                                </label>
                                <Select
                                    showSearch
                                    allowClear
                                    className="w-full text-[15px]"
                                    placeholder="Enter Card Name"
                                    filterOption={(input, option) =>
                                        (option?.label ?? "").includes(input)
                                    }
                                    options={[
                                        {
                                            value: "1",
                                            label: "Card 1",
                                        },
                                        {
                                            value: "2",
                                            label: "Card 2",
                                        },
                                        {
                                            value: "3",
                                            label: "Card 3",
                                        },
                                    ]}
                                />
                            </div>
                            <div className="col-span-1">
                                <label className="block mb-2 text-[15px] font-semibold text-gray-900">
                                    Card Code
                                </label>
                                <Input
                                    type="text"
                                    placeholder="Default Card Code"
                                    className="font-semibold"
                                    disabled={true}
                                />
                            </div>
                        </div>

                        <div className="mt-4 grid grid-cols-4 gap-4">
                        <div className="col-span-2">
                                <label className="block mb-2 text-[15px] font-semibold text-gray-900">
                                    Business Reason <span className="text-red-500">*</span>
                                </label>
                                <Select
                                    showSearch
                                    allowClear
                                    className="w-full text-[15px]"
                                    placeholder="Enter Card Name"
                                    filterOption={(input, option) =>
                                        (option?.label ?? "").includes(input)
                                    }
                                    options={[
                                        {
                                            value: "1",
                                            label: "Purchases Order Payment",
                                        },
                                        {
                                            value: "2",
                                            label: "Reason 1",
                                        },
                                        {
                                            value: "3",
                                            label: "Reason 3",
                                        },
                                    ]}
                                />
                            </div>
                            <div className="col-span-2">
                                <label className="block mb-2 text-[15px] font-semibold text-gray-900">
                                    Description (Internal/External reason)
                                </label>
                                <TextArea
                                    rows={2}
                                    placeholder="Enter Subject Content"
                                />
                            </div>
                            
                        </div>

                        <div className="mt-4 grid grid-cols-3 gap-4">
                            <div className="col-span-1">
                                <label className="block mb-2 text-[15px] font-semibold text-gray-900">
                                    Division <span className="text-red-500">*</span>
                                </label>
                                <Select
                                    showSearch
                                    allowClear
                                    className="w-full text-[15px]"
                                    placeholder="Select Division"
                                    filterOption={(input, option) =>
                                        (option?.label ?? "").includes(input)
                                    }
                                    options={[
                                        {
                                            value: "1",
                                            label: "Human resource",
                                        },
                                        {
                                            value: "2",
                                            label: "IT",
                                        },
                                        {
                                            value: "3",
                                            label: "Sales",
                                        },
                                    ]}
                                />
                            </div>
                            <div className="col-span-1">
                            <label
                                //
                                className="block mb-2 text-[15px] font-semibold text-gray-900"
                            >
                                Currency <span className="text-red-500">*</span>
                            </label>
                            <Select
                                showSearch
                                allowClear
                                className={`w-full text-[15px]`}
                                placeholder="Select Currency"
                                filterOption={(input, option) =>
                                    (option?.label ?? "").includes(input)
                                }
                                options={currency}
                                // value={selectedCurrency}
                                // onChange={(value) => setSelectedCurrency(value)}
                            />
                        </div>
                            <div className="col-span-1">
                            <label className="block mb-2 text-[15px] font-semibold text-gray-900">
                                Amount <span className="text-red-500">*</span>
                            </label>
                            <InputNumber
                                controls={false}
                                addonAfter="vnđ"
                                placeholder="Enter Amount"
                                className={`exchange-rate w-full text-right text-[15px] `}
                                min={1}
                                formatter={(value) =>
                                    `${value}`.replace(
                                        /\B(?=(\d{3})+(?!\d))/g,
                                        ","
                                    )
                                }
                                parser={(value) => {
                                    const floatValue = parseFloat(
                                        value.replace(/,/g, "")
                                    );
                                    const roundedValue = isNaN(floatValue)
                                        ? 1
                                        : floatValue % 1 === 0
                                        ? floatValue
                                        : floatValue.toFixed(2);
                                    return Math.max(1, roundedValue);
                                }}
                                // defaultValue={exchangeRate}
                                onChange={(value) => setExchangeRate(value)}
                            />
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            {/* Scroller */}
        </>
    );
}

export default CreateDemoPaymentRequest;
