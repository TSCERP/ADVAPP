import React, { useState, useEffect, useRef } from "react";

import { Input, Modal, Select, message, Upload, Button } from "antd";
import { Checkbox, Tabs, DatePicker, Space } from "antd";
import { UploadOutlined } from "@ant-design/icons";

import { IoReload, IoCopyOutline } from "react-icons/io5";
import { IoIosListBox } from "react-icons/io";
import { LuTrash2, LuPlus, LuSave, LuLink2, LuPenSquare } from "react-icons/lu";
import { MdOutlineLink } from "react-icons/md";
import { FaArrowUp, FaCheck, FaInfo, FaRedoAlt, FaLink } from "react-icons/fa";
import { TbSquareRoundedLetterC, TbSquareRoundedLetterS } from "react-icons/tb";
import { FaCircleDollarToSlot } from "react-icons/fa6";

import moment from "moment";
import toast from "react-hot-toast";

// Get instance variables
const { TextArea } = Input;
const oldTitle = document.title;
const newTitle = "Create Approval FMS - Aeon Delight Vietnam";

const ApprovalBusinessFMSCreate = () => {
    /**
     *  All constants defined here
     */
    const currentTime = moment().format("DD/MM/YYYY");

    /**
     *  All states defined here
     */
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isAllocateModalOpen, setIsAllocateModalOpen] = useState(false);

    const [currentAction, setCurrentAction] = useState(null);

    const [salesStartDate, setSalesStartDate] = useState("");
    const [salesEndDate, setSalesEndDate] = useState("");
    const [costStartDate, setCostStartDate] = useState("");
    const [costEndDate, setCostEndDate] = useState("");

    /**
     *  All refs defined here
     */

    /**
     *  All functions defined here
     */
    const handleOpenModal = (action) => {
        setCurrentAction(action);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setCurrentAction(null);
    };

    const handleOpenAllocateModal = (action) => {
        setIsAllocateModalOpen(true);
    };

    const handleCloseAllocateModal = () => {
        setIsAllocateModalOpen(false);
    };

    const handleAddRow = () => {
        if (currentAction === "sales") {
            saveSalesItem();
        } else if (currentAction === "additionalSales") {
            saveAdditionalSaveItem();
        } else if (currentAction === "cost") {
            saveCostItem();
        } else if (currentAction === "additionalCost") {
            saveAdditionalCostItem();
        }

        setIsModalOpen(false);
        setCurrentAction(null);
    };

    const saveSalesItem = () => {
        // Gọi API lưu thông tin bán hàng
        toast("New sales item has been added.");
    };

    const saveAdditionalSaveItem = () => {
        // Gọi API lưu thông tin bán hàng
        toast("New sales item has been added.");
    };

    const saveCostItem = () => {
        // Gọi API lưu thông tin mua hàng
        toast("New cost item has been added.");
    };

    const saveAdditionalCostItem = () => {
        // Gọi API lưu thông tin bán hàng
        toast("New cost item has been added.");
    };

    const handleAllocateSave = () => {
        toast("This module is under development.");
    };

    const handleAllocateRemove = () => {
        toast("This module is under development.");
    };

    const handleApprovalMatrix = () => {
        toast("This module is under development.");
    };

    const handleSave = () => {
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
                    {/* Header */}
                    <div className="flex justify-between">
                        <div className="text-[27px] font-bold">
                            Create Approval FMS
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
                            <label
                                htmlFor="email"
                                className="block text-[15px]  font-semibold text-gray-900"
                            >
                                Approval Date
                            </label>
                            <div className="font-bold text-[#3A6F41] text-lg inter-font">
                                {currentTime}
                            </div>
                        </div>
                        <div className="col-span-1">
                            <label
                                htmlFor="email"
                                className="block text-[15px] font-semibold text-gray-900"
                            >
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

                        {/* <div className="grid grid-cols-3 gap-4">
                        <div className="col-span-1">
                            <label
                                htmlFor="email"
                                className="block mb-2 text-[15px] font-semibold text-gray-900"
                            >
                                Approval Type
                            </label>
                            <Input
                                type="text"
                                id="approval_type"
                                placeholder="Enter Approval Type"
                                className="font-semibold"
                                disabled={true}
                                value={"SPOT"}
                            />
                        </div>
                        <div className="col-span-1">
                            <label
                                htmlFor="email"
                                className="block mb-2 text-[15px] font-semibold text-gray-900"
                            >
                                Approval Date
                            </label>
                            <Input
                                type="text"
                                id="approval_type"
                                placeholder="Enter Approval Type"
                                className="font-semibold"
                                value={currentTime}
                                disabled={true}
                            />
                        </div>
                        <div className="col-span-1">
                            <label
                                htmlFor="email"
                                className="block mb-2 text-[15px] font-semibold text-gray-900"
                            >
                                Approval No
                            </label>
                            <Input
                                type="text"
                                id="approval_type"
                                placeholder="Enter Approval Type"
                                value={"2024-0001"}
                                className="font-semibold"
                                disabled={true}
                            />
                        </div>
                    </div> */}

                        <div className="mt-4 grid grid-cols-3 gap-4">
                            <div className="col-span-1">
                                <label
                                    htmlFor="email"
                                    className="block mb-2 text-[15px] font-semibold text-gray-900"
                                >
                                    Approval Category
                                </label>
                                <Select
                                    showSearch
                                    allowClear
                                    style={{
                                        width: "100%",
                                        fontSize: "15px",
                                    }}
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
                                <label
                                    htmlFor="email"
                                    className="block mb-2 text-[15px] font-semibold text-gray-900"
                                >
                                    Approval Category (VI)
                                </label>
                                <Input
                                    type="text"
                                    id="approval_type"
                                    placeholder="Default Approval Category (VI)"
                                    className="font-semibold"
                                    disabled={true}
                                />
                            </div>
                            <div className="col-span-1">
                                <label
                                    htmlFor="email"
                                    className="block mb-2 text-[15px] font-semibold text-gray-900"
                                >
                                    Win Rate
                                </label>
                                <Select
                                    showSearch
                                    allowClear
                                    style={{
                                        width: "100%",
                                        fontSize: "15px",
                                    }}
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
                                />
                            </div>
                        </div>

                        <div className="mt-4 grid grid-cols-3 gap-4">
                            <div className="col-span-1 flex flex-col">
                                <div className=" rounded-md text-[15px] font-semibold">
                                    <label
                                        htmlFor="email"
                                        className="block mb-2 text-[15px] font-semibold text-gray-900"
                                    >
                                        FMS Approval Type
                                    </label>
                                    <Select
                                        showSearch
                                        allowClear
                                        style={{
                                            width: "100%",
                                            fontSize: "15px",
                                        }}
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
                            <div className="col-span-2">
                                <label
                                    htmlFor="email"
                                    className="block mb-2 text-[15px] font-semibold text-gray-900"
                                >
                                    Subject
                                </label>
                                <TextArea
                                    rows={4}
                                    placeholder="Enter Subject Content"
                                    maxLength={5}
                                />
                            </div>
                        </div>

                        <div className="mt-4 grid grid-cols-2 gap-4">
                            <div className="col-span-1">
                                <label
                                    htmlFor="email"
                                    className="block mb-2 text-[15px] font-semibold text-gray-900"
                                >
                                    Division - Department
                                </label>
                                <Input
                                    type="text"
                                    id="approval_type"
                                    placeholder="Enter Division - Department"
                                    className="font-semibold"
                                />
                            </div>
                            <div className="col-span-1">
                                <label
                                    htmlFor="email"
                                    className="block mb-2 text-[15px] font-semibold text-gray-900"
                                >
                                    PIC
                                </label>
                                <Input
                                    type="text"
                                    id="approval_type"
                                    placeholder="Enter PIC Information"
                                    className="font-semibold"
                                />
                            </div>
                        </div>

                        <div className="mt-4">
                            <div className="col-span-1">
                                <label
                                    htmlFor="email"
                                    className="block mb-2 text-[15px] font-semibold text-gray-900"
                                >
                                    Related Approval
                                </label>
                                <Input
                                    type="text"
                                    id="approval_type"
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
                                                            <label
                                                                htmlFor="email"
                                                                className="block mb-2 text-[15px] font-semibold text-gray-900"
                                                            >
                                                                Start Date
                                                            </label>
                                                            <DatePicker
                                                                className="w-full"
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
                                                            <label
                                                                htmlFor="email"
                                                                className="block mb-2 text-[15px] font-semibold text-gray-900"
                                                            >
                                                                End Date
                                                            </label>
                                                            <DatePicker
                                                                className="w-full"
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
                                                            <label
                                                                htmlFor=""
                                                                className="block mb-2 text-[15px] font-semibold text-gray-900"
                                                            >
                                                                Good/Service
                                                                Summary
                                                            </label>
                                                            <TextArea
                                                                rows={4}
                                                                placeholder="Enter Good/Service Summary"
                                                                maxLength={5}
                                                            />
                                                        </div>
                                                        <div className="col-span-1">
                                                            <label
                                                                htmlFor=""
                                                                className="block mb-2 text-[15px] font-semibold text-gray-900"
                                                            >
                                                                Note
                                                            </label>
                                                            <TextArea
                                                                rows={4}
                                                                placeholder="Enter Note"
                                                                maxLength={5}
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
                                                            <div className="flex space-x-2">
                                                                <button
                                                                    className="flex items-center space-x-2 p-1.5 rounded-lg bg-[#3a6f41] px-4 text-white font-medium active:scale-[.87] active:duration-75 transition-all"
                                                                    onClick={
                                                                        handleOpenAllocateModal
                                                                    }
                                                                >
                                                                    <div className="text-[15px]">
                                                                        Allocate
                                                                    </div>
                                                                </button>
                                                                <button
                                                                    className="flex items-center space-x-2 p-1.5 rounded-lg bg-[#b83232] px-4 text-white font-medium active:scale-[.87] active:duration-75 transition-all"
                                                                    onClick={
                                                                        handleAllocateRemove
                                                                    }
                                                                >
                                                                    <div className="text-[15px]">
                                                                        Remove
                                                                        Allocate
                                                                    </div>
                                                                </button>
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
                                                                        <th className="min-w-[80px] max-h-[80px] bg-[#d4f2d9] border-2 border-[#99d2a4] text-left px-8 py-2">
                                                                            Quantity
                                                                        </th>
                                                                        <th className="min-w-[150px] max-h-[150px] bg-[#d4f2d9] border-2 border-[#99d2a4] text-left px-8 py-2">
                                                                            Unit
                                                                            Price
                                                                        </th>
                                                                        <th className="min-w-[150px] max-h-[150px] bg-[#d4f2d9] border-2 border-[#99d2a4] text-left px-8 py-2">
                                                                            %
                                                                            Allocation
                                                                        </th>
                                                                        <th className="min-w-[180px] max-h-[180px] bg-[#d4f2d9] border-2 border-[#99d2a4] text-left px-8 py-2">
                                                                            Before
                                                                            VAT
                                                                        </th>
                                                                        <th className="min-w-[120px] max-h-[120px] bg-[#d4f2d9] border-2 border-[#99d2a4] text-left px-8 py-2">
                                                                            VAT
                                                                            (%)
                                                                        </th>
                                                                        <th className="border-r-0 min-w-[180px] max-h-[180px] bg-[#d4f2d9] border-2 border-[#99d2a4] text-left px-8 py-2">
                                                                            After
                                                                            VAT
                                                                            (%)
                                                                        </th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    <tr>
                                                                        <td className=" bg-[#F5FDF8] border-l-0 border border-[#6a9e72] px-10 py-2">
                                                                            <div className="flex w-fit m-auto flex-row-reverse">
                                                                                <button className="text-[#B83232] p-1.5 rounded-full hover:bg-[#feebeb] font-medium active:scale-[.87] active:duration-75 transition-all">
                                                                                    <LuTrash2 className="w-5 h-5" />
                                                                                </button>
                                                                                <button className="text-[#b43bcc] p-1.5 rounded-full hover:bg-[#ffe4ff] font-medium active:scale-[.87] active:duration-75 transition-all">
                                                                                    <IoCopyOutline className="w-5 h-5" />
                                                                                </button>
                                                                                <button className="text-[#f3dc31] p-1.5 rounded-full hover:bg-[#ffffe4] font-medium active:scale-[.87] active:duration-75 transition-all">
                                                                                    <LuPenSquare className="w-5 h-5" />
                                                                                </button>
                                                                            </div>
                                                                        </td>
                                                                        <td className="bg-[#F5FDF8] border border-[#6a9e72] px-8 py-2"></td>
                                                                        <td className="w-[200px] bg-[#F5FDF8] border border-[#6a9e72] px-8 py-2">
                                                                            Italy
                                                                        </td>
                                                                        <td className="bg-[#F5FDF8] border border-[#6a9e72] px-8 py-2">
                                                                            Alfreds
                                                                            Futterkiste
                                                                        </td>
                                                                        <td className="bg-[#F5FDF8] border border-[#6a9e72] px-8 py-2">
                                                                            Dante
                                                                            Sparks
                                                                        </td>
                                                                        <td className="bg-[#F5FDF8] border border-[#6a9e72] px-8 py-2">
                                                                            Italy
                                                                        </td>
                                                                        <td className="bg-[#F5FDF8] border border-[#6a9e72] px-8 py-2">
                                                                            Alfreds
                                                                            Futterkiste
                                                                        </td>
                                                                        <td className="bg-[#F5FDF8] border border-[#6a9e72] px-8 py-2">
                                                                            Dante
                                                                            Sparks
                                                                        </td>
                                                                        <td className="bg-[#F5FDF8] border border-[#6a9e72] px-8 py-2">
                                                                            Italy
                                                                        </td>
                                                                        <td className="bg-[#F5FDF8] border border-[#6a9e72] px-8 py-2">
                                                                            Alfreds
                                                                            Futterkiste
                                                                        </td>
                                                                        <td className="bg-[#F5FDF8] border border-[#6a9e72] px-8 py-2">
                                                                            Dante
                                                                            Sparks
                                                                        </td>
                                                                        <td className="bg-[#F5FDF8] border border-[#6a9e72] px-8 py-2">
                                                                            Italy
                                                                        </td>
                                                                        <td className="border-r-0 bg-[#F5FDF8] border border-[#6a9e72] px-8 py-2">
                                                                            Italy
                                                                        </td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    </div>
                                                    <div
                                                        className="flex items-center mb-6 border-2 border-t-0 border-gray-300 space-x-2 justify-center  bg-gray-50 hover:bg-[#e5feea] hover:text-[#3A6F41] hover:border-[#A3D1AD] text-gray-500 cursor-pointer py-2 text-[16px] font-semibold"
                                                        onClick={() =>
                                                            handleOpenModal(
                                                                "sales"
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
                                                                <label
                                                                    htmlFor="password"
                                                                    className="w-2/4 block mb-2 text-[15px] font-semibold text-gray-900  "
                                                                >
                                                                    Total
                                                                </label>
                                                                <input
                                                                    type="text"
                                                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-[15px] text-right rounded-lg block w-full p-1.5 "
                                                                    readOnly
                                                                    value="0000000.00"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="w-1/4">
                                                            <div className="flex items-center space-x-2">
                                                                <label
                                                                    htmlFor="password"
                                                                    className="w-2/4 block mb-2 text-[15px] font-semibold text-gray-900  "
                                                                >
                                                                    Tax
                                                                </label>
                                                                <input
                                                                    type="text"
                                                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-[15px] text-right rounded-lg block w-full p-1.5 "
                                                                    value="0000000.00"
                                                                    readOnly
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="w-1/4">
                                                            <div className="flex items-center space-x-2">
                                                                <label
                                                                    htmlFor="password"
                                                                    className="w-2/4 block mb-2 text-[15px] font-semibold text-gray-900  "
                                                                >
                                                                    Grand Total
                                                                </label>
                                                                <input
                                                                    type="text"
                                                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-[15px] text-right rounded-lg block w-full p-1.5 "
                                                                    value="0000000.00"
                                                                    readOnly
                                                                />
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
                                                                        <th className="min-w-[100px] max-h-[100px] bg-[#d4f2d9] border-2 border-[#99d2a4] text-left px-8 py-2">
                                                                            Unit
                                                                        </th>
                                                                        <th className="min-w-[80px] max-h-[80px] bg-[#d4f2d9] border-2 border-[#99d2a4] text-left px-8 py-2">
                                                                            Quantity
                                                                        </th>
                                                                        <th className="min-w-[150px] max-h-[150px] bg-[#d4f2d9] border-2 border-[#99d2a4] text-left px-8 py-2">
                                                                            Unit
                                                                            Price
                                                                        </th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    <tr>
                                                                        <td className=" bg-[#F5FDF8] border-l-0 border border-[#6a9e72] px-10 py-3">
                                                                            <div className="flex w-fit m-auto flex-row-reverse">
                                                                                <button className="text-[#B83232] p-1.5 rounded-full hover:bg-[#feebeb] font-medium active:scale-[.87] active:duration-75 transition-all">
                                                                                    <LuTrash2 className="w-5 h-5" />
                                                                                </button>
                                                                                <button className="text-[#b43bcc] p-1.5 rounded-full hover:bg-[#ffe4ff] font-medium active:scale-[.87] active:duration-75 transition-all">
                                                                                    <IoCopyOutline className="w-5 h-5" />
                                                                                </button>
                                                                                <button className="text-[#f3dc31] p-1.5 rounded-full hover:bg-[#ffffe4] font-medium active:scale-[.87] active:duration-75 transition-all">
                                                                                    <LuPenSquare className="w-5 h-5" />
                                                                                </button>
                                                                            </div>
                                                                        </td>
                                                                        <td className="bg-[#F5FDF8] border border-[#6a9e72] px-8 py-2"></td>
                                                                        <td className="w-[200px] bg-[#F5FDF8] border border-[#6a9e72] px-8 py-2">
                                                                            Italy
                                                                        </td>
                                                                        <td className="bg-[#F5FDF8] border border-[#6a9e72] px-8 py-2">
                                                                            Alfreds
                                                                            Futterkiste
                                                                        </td>
                                                                        <td className="bg-[#F5FDF8] border border-[#6a9e72] px-8 py-2">
                                                                            Dante
                                                                            Sparks
                                                                        </td>
                                                                        <td className="bg-[#F5FDF8] border border-[#6a9e72] px-8 py-2">
                                                                            Italy
                                                                        </td>
                                                                        <td className="bg-[#F5FDF8] border border-[#6a9e72] px-8 py-2">
                                                                            Alfreds
                                                                            Futterkiste
                                                                        </td>
                                                                        <td className="bg-[#F5FDF8] border border-[#6a9e72] px-8 py-2">
                                                                            Dante
                                                                            Sparks
                                                                        </td>
                                                                        <td className="bg-[#F5FDF8] border border-[#6a9e72] px-8 py-2">
                                                                            Italy
                                                                        </td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    </div>
                                                    <div
                                                        className="flex items-center mb-6 border-2 border-t-0 border-gray-300 space-x-2 justify-center  bg-gray-50 hover:bg-[#e5feea] hover:text-[#3A6F41] hover:border-[#A3D1AD] text-gray-500 cursor-pointer py-2 text-[16px] font-semibold"
                                                        onClick={() =>
                                                            handleOpenModal(
                                                                "additionalSales"
                                                            )
                                                        }
                                                    >
                                                        <LuPlus />
                                                        <div>Add new item</div>
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
                                                            <label
                                                                htmlFor="email"
                                                                className="block mb-2 text-[15px] font-semibold text-gray-900"
                                                            >
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
                                                            <label
                                                                htmlFor="email"
                                                                className="block mb-2 text-[15px] font-semibold text-gray-900"
                                                            >
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
                                                            <label
                                                                htmlFor=""
                                                                className="block mb-2 text-[15px] font-semibold text-gray-900"
                                                            >
                                                                Good/Service
                                                                Summary
                                                            </label>
                                                            <TextArea
                                                                rows={4}
                                                                placeholder="Enter Good/Service Summary"
                                                                maxLength={5}
                                                            />
                                                        </div>
                                                        <div className="col-span-1">
                                                            <label
                                                                htmlFor=""
                                                                className="block mb-2 text-[15px] font-semibold text-gray-900"
                                                            >
                                                                Note
                                                            </label>
                                                            <TextArea
                                                                rows={4}
                                                                placeholder="Enter Note"
                                                                maxLength={5}
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
                                                                        <th className="min-w-[100px] max-h-[100px] bg-[#d4f2d9] border-2 border-[#99d2a4] text-left px-8 py-2">
                                                                            Unit
                                                                        </th>
                                                                        <th className="min-w-[80px] max-h-[80px] bg-[#d4f2d9] border-2 border-[#99d2a4] text-left px-8 py-2">
                                                                            Quantity
                                                                        </th>
                                                                        <th className="min-w-[150px] max-h-[150px] bg-[#d4f2d9] border-2 border-[#99d2a4] text-left px-8 py-2">
                                                                            Unit
                                                                            Price
                                                                        </th>
                                                                        <th className="min-w-[150px] max-h-[150px] bg-[#d4f2d9] border-2 border-[#99d2a4] text-left px-8 py-2">
                                                                            %
                                                                            Allocation
                                                                        </th>
                                                                        <th className="min-w-[180px] max-h-[180px] bg-[#d4f2d9] border-2 border-[#99d2a4] text-left px-8 py-2">
                                                                            Before
                                                                            VAT
                                                                        </th>
                                                                        <th className="min-w-[120px] max-h-[120px] bg-[#d4f2d9] border-2 border-[#99d2a4] text-left px-8 py-2">
                                                                            VAT
                                                                            (%)
                                                                        </th>
                                                                        <th className="border-r-0 min-w-[180px] max-h-[180px] bg-[#d4f2d9] border-2 border-[#99d2a4] text-left px-8 py-2">
                                                                            After
                                                                            VAT
                                                                            (%)
                                                                        </th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    <tr>
                                                                        <td className=" bg-[#F5FDF8] border-l-0 border border-[#6a9e72] px-10 py-2">
                                                                            <div className="flex w-fit m-auto flex-row-reverse">
                                                                                <button className="text-[#B83232] p-1.5 rounded-full hover:bg-[#feebeb] font-medium active:scale-[.87] active:duration-75 transition-all">
                                                                                    <LuTrash2 className="w-5 h-5" />
                                                                                </button>
                                                                                <button className="text-[#b43bcc] p-1.5 rounded-full hover:bg-[#ffe4ff] font-medium active:scale-[.87] active:duration-75 transition-all">
                                                                                    <IoCopyOutline className="w-5 h-5" />
                                                                                </button>
                                                                                <button className="text-[#f3dc31] p-1.5 rounded-full hover:bg-[#ffffe4] font-medium active:scale-[.87] active:duration-75 transition-all">
                                                                                    <LuPenSquare className="w-5 h-5" />
                                                                                </button>
                                                                            </div>
                                                                        </td>
                                                                        <td className="bg-[#F5FDF8] border border-[#6a9e72] px-8 py-2"></td>
                                                                        <td className="w-[200px] bg-[#F5FDF8] border border-[#6a9e72] px-8 py-2">
                                                                            Italy
                                                                        </td>
                                                                        <td className="bg-[#F5FDF8] border border-[#6a9e72] px-8 py-2">
                                                                            Alfreds
                                                                            Futterkiste
                                                                        </td>
                                                                        <td className="bg-[#F5FDF8] border border-[#6a9e72] px-8 py-2">
                                                                            Dante
                                                                            Sparks
                                                                        </td>
                                                                        <td className="bg-[#F5FDF8] border border-[#6a9e72] px-8 py-2">
                                                                            Italy
                                                                        </td>
                                                                        <td className="bg-[#F5FDF8] border border-[#6a9e72] px-8 py-2">
                                                                            Alfreds
                                                                            Futterkiste
                                                                        </td>
                                                                        <td className="bg-[#F5FDF8] border border-[#6a9e72] px-8 py-2">
                                                                            Dante
                                                                            Sparks
                                                                        </td>
                                                                        <td className="bg-[#F5FDF8] border border-[#6a9e72] px-8 py-2">
                                                                            Italy
                                                                        </td>
                                                                        <td className="bg-[#F5FDF8] border border-[#6a9e72] px-8 py-2">
                                                                            Alfreds
                                                                            Futterkiste
                                                                        </td>
                                                                        <td className="bg-[#F5FDF8] border border-[#6a9e72] px-8 py-2">
                                                                            Dante
                                                                            Sparks
                                                                        </td>
                                                                        <td className="bg-[#F5FDF8] border border-[#6a9e72] px-8 py-2">
                                                                            Italy
                                                                        </td>
                                                                        <td className="border-r-0 bg-[#F5FDF8] border border-[#6a9e72] px-8 py-2">
                                                                            Italy
                                                                        </td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    </div>
                                                    <div
                                                        className="flex items-center mb-6 border-2 border-t-0 border-gray-300 space-x-2 justify-center  bg-gray-50 hover:bg-[#e5feea] hover:text-[#3A6F41] hover:border-[#A3D1AD] text-gray-500 cursor-pointer py-2 text-[16px] font-semibold"
                                                        onClick={() =>
                                                            handleOpenModal(
                                                                "cost"
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
                                                                <label
                                                                    htmlFor="password"
                                                                    className="w-2/4 block mb-2 text-[15px] font-semibold text-gray-900  "
                                                                >
                                                                    Total
                                                                </label>
                                                                <input
                                                                    type="text"
                                                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-[15px] text-right rounded-lg block w-full p-1.5 "
                                                                    readOnly
                                                                    value="0000000.00"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="w-1/4">
                                                            <div className="flex items-center space-x-2">
                                                                <label
                                                                    htmlFor="password"
                                                                    className="w-2/4 block mb-2 text-[15px] font-semibold text-gray-900  "
                                                                >
                                                                    Tax
                                                                </label>
                                                                <input
                                                                    type="text"
                                                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-[15px] text-right rounded-lg block w-full p-1.5 "
                                                                    value="0000000.00"
                                                                    readOnly
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="w-1/4">
                                                            <div className="flex items-center space-x-2">
                                                                <label
                                                                    htmlFor="password"
                                                                    className="w-2/4 block mb-2 text-[15px] font-semibold text-gray-900  "
                                                                >
                                                                    Grand Total
                                                                </label>
                                                                <input
                                                                    type="text"
                                                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-[15px] text-right rounded-lg block w-full p-1.5 "
                                                                    value="0000000.00"
                                                                    readOnly
                                                                />
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
                                                                        <th className="min-w-[100px] max-h-[100px] bg-[#d4f2d9] border-2 border-[#99d2a4] text-left px-8 py-2">
                                                                            Unit
                                                                        </th>
                                                                        <th className="min-w-[80px] max-h-[80px] bg-[#d4f2d9] border-2 border-[#99d2a4] text-left px-8 py-2">
                                                                            Quantity
                                                                        </th>
                                                                        <th className="min-w-[150px] max-h-[150px] bg-[#d4f2d9] border-2 border-[#99d2a4] text-left px-8 py-2">
                                                                            Unit
                                                                            Price
                                                                        </th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    <tr>
                                                                        <td className=" bg-[#F5FDF8] border-l-0 border border-[#6a9e72] px-10 py-3">
                                                                            <div className="flex w-fit m-auto flex-row-reverse">
                                                                                <button className="text-[#B83232] p-1.5 rounded-full hover:bg-[#feebeb] font-medium active:scale-[.87] active:duration-75 transition-all">
                                                                                    <LuTrash2 className="w-5 h-5" />
                                                                                </button>
                                                                                <button className="text-[#b43bcc] p-1.5 rounded-full hover:bg-[#ffe4ff] font-medium active:scale-[.87] active:duration-75 transition-all">
                                                                                    <IoCopyOutline className="w-5 h-5" />
                                                                                </button>
                                                                                <button className="text-[#f3dc31] p-1.5 rounded-full hover:bg-[#ffffe4] font-medium active:scale-[.87] active:duration-75 transition-all">
                                                                                    <LuPenSquare className="w-5 h-5" />
                                                                                </button>
                                                                            </div>
                                                                        </td>
                                                                        <td className="bg-[#F5FDF8] border border-[#6a9e72] px-8 py-2"></td>
                                                                        <td className="w-[200px] bg-[#F5FDF8] border border-[#6a9e72] px-8 py-2">
                                                                            Italy
                                                                        </td>
                                                                        <td className="bg-[#F5FDF8] border border-[#6a9e72] px-8 py-2">
                                                                            Alfreds
                                                                            Futterkiste
                                                                        </td>
                                                                        <td className="bg-[#F5FDF8] border border-[#6a9e72] px-8 py-2">
                                                                            Dante
                                                                            Sparks
                                                                        </td>
                                                                        <td className="bg-[#F5FDF8] border border-[#6a9e72] px-8 py-2">
                                                                            Italy
                                                                        </td>
                                                                        <td className="bg-[#F5FDF8] border border-[#6a9e72] px-8 py-2">
                                                                            Alfreds
                                                                            Futterkiste
                                                                        </td>
                                                                        <td className="bg-[#F5FDF8] border border-[#6a9e72] px-8 py-2">
                                                                            Dante
                                                                            Sparks
                                                                        </td>
                                                                        <td className="bg-[#F5FDF8] border border-[#6a9e72] px-8 py-2">
                                                                            Italy
                                                                        </td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    </div>
                                                    <div
                                                        className="flex items-center mb-6 border-2 border-t-0 border-gray-300 space-x-2 justify-center  bg-gray-50 hover:bg-[#e5feea] hover:text-[#3A6F41] hover:border-[#A3D1AD] text-gray-500 cursor-pointer py-2 text-[16px] font-semibold"
                                                        onClick={() =>
                                                            handleOpenModal(
                                                                "additionalCost"
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
                                                                                            <Input
                                                                                                type="text"
                                                                                                id="approval_type"
                                                                                                className="font-semibold"
                                                                                            />
                                                                                        </td>
                                                                                        <td className=" px-3 py-2 border-r-2 border-gray-300">
                                                                                            <Input
                                                                                                type="text"
                                                                                                id="approval_type"
                                                                                                className="font-semibold"
                                                                                            />
                                                                                        </td>
                                                                                        <td className="w-[200px] px-3 border-r-2 py-2">
                                                                                            <Input
                                                                                                type="text"
                                                                                                id="approval_type"
                                                                                                className="font-semibold"
                                                                                            />
                                                                                        </td>
                                                                                        <td className="w-[200px] px-3 py-2">
                                                                                            <Input
                                                                                                type="text"
                                                                                                id="approval_type"
                                                                                                className="font-semibold"
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
                                                                                    <tr className="border-b-2 border-gray-300">
                                                                                        <td className="font-semibold text-center  px-3 py-2 border-r-2 border-gray-300">
                                                                                            <button className="text-[#B83232] p-1.5 rounded-full hover:bg-[#feebeb] font-medium active:scale-[.87] active:duration-75 transition-all">
                                                                                                <LuTrash2 className="] w-5 h-5" />
                                                                                            </button>
                                                                                        </td>
                                                                                        <td className=" px-3 py-2 border-r-2 border-gray-300">
                                                                                            <Input
                                                                                                type="text"
                                                                                                id="approval_type"
                                                                                                className="font-semibold"
                                                                                            />
                                                                                        </td>
                                                                                        <td className="w-[200px] px-3 border-r-2 py-2">
                                                                                            <Input
                                                                                                type="text"
                                                                                                id="approval_type"
                                                                                                className="font-semibold"
                                                                                            />
                                                                                        </td>
                                                                                        <td className="w-[200px] border-r-2 border-gray-300 px-3 py-2">
                                                                                            <Input
                                                                                                type="text"
                                                                                                id="approval_type"
                                                                                                className="font-semibold"
                                                                                            />
                                                                                        </td>
                                                                                        <td className=" px-3 py-2 ">
                                                                                            <Input
                                                                                                type="text"
                                                                                                id="approval_type"
                                                                                                className="font-semibold"
                                                                                            />
                                                                                        </td>
                                                                                    </tr>
                                                                                    <tr className="">
                                                                                        <td className="font-semibold text-center  px-3 py-2 border-r-2 border-gray-300">
                                                                                            <button className="text-[#B83232] p-1.5 rounded-full hover:bg-[#feebeb] font-medium active:scale-[.87] active:duration-75 transition-all">
                                                                                                <LuTrash2 className="] w-5 h-5" />
                                                                                            </button>
                                                                                        </td>
                                                                                        <td className="px-3 py-2 border-r-2 border-gray-300">
                                                                                            <Input
                                                                                                type="text"
                                                                                                id="approval_type"
                                                                                                className="font-semibold"
                                                                                            />
                                                                                        </td>
                                                                                        <td className="px-3 py-2 border-r-2 border-gray-300">
                                                                                            <Input
                                                                                                type="text"
                                                                                                id="approval_type"
                                                                                                className="font-semibold"
                                                                                            />
                                                                                        </td>
                                                                                        <td className=" px-3 py-2 border-r-2 border-gray-300">
                                                                                            <Input
                                                                                                type="text"
                                                                                                id="approval_type"
                                                                                                className="font-semibold"
                                                                                            />
                                                                                        </td>
                                                                                        <td className=" px-3 py-2 ">
                                                                                            <Input
                                                                                                type="text"
                                                                                                id="approval_type"
                                                                                                className="font-semibold"
                                                                                            />
                                                                                        </td>
                                                                                    </tr>
                                                                                </tbody>
                                                                            </table>
                                                                        </div>
                                                                    </div>
                                                                    <div className="flex items-center mb-6 border-2 border-t-0 border-gray-300 space-x-2 justify-center  bg-gray-50 hover:bg-[#e5feea] hover:text-[#3A6F41] hover:border-[#A3D1AD] text-gray-500 cursor-pointer py-2 text-[16px] font-semibold">
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
                                                                                        <th className=" w-1/5 bg-[#D4F2D9] text-[#3A6F41] text-center text-[17px] px-8 py-2 border-r-2 border-gray-300">
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
                                                                                            New
                                                                                            Trading
                                                                                        </td>
                                                                                        <td className=" px-3 py-2 border-r-2 border-gray-300">
                                                                                            <Input
                                                                                                type="text"
                                                                                                id="approval_type"
                                                                                                className="font-semibold"
                                                                                            />
                                                                                        </td>
                                                                                        <td className="w-[200px] px-3 border-r-2 py-2">
                                                                                            <Input
                                                                                                type="text"
                                                                                                id="approval_type"
                                                                                                className="font-semibold"
                                                                                            />
                                                                                        </td>
                                                                                        <td className="w-[200px] px-3 py-2">
                                                                                            <Input
                                                                                                type="text"
                                                                                                id="approval_type"
                                                                                                className="font-semibold"
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
                                                            <label
                                                                htmlFor="email"
                                                                className="block mb-2 text-[15px] font-semibold text-gray-900"
                                                            >
                                                                Budget (Item)
                                                            </label>
                                                            <Select
                                                                showSearch
                                                                allowClear
                                                                style={{
                                                                    width: "100%",
                                                                    fontSize:
                                                                        "15px",
                                                                }}
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
                                                            />
                                                        </div>
                                                        <div className="col-span-1">
                                                            <label
                                                                htmlFor="email"
                                                                className="block mb-2 text-[15px] font-semibold text-gray-900"
                                                            >
                                                                Budget (Amount)
                                                            </label>
                                                            <Select
                                                                showSearch
                                                                allowClear
                                                                style={{
                                                                    width: "100%",
                                                                    fontSize:
                                                                        "15px",
                                                                }}
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
                                                            />
                                                        </div>
                                                        <div className="col-span-1">
                                                            <label
                                                                htmlFor=""
                                                                className="block mb-2 text-[15px] font-semibold text-gray-900"
                                                            >
                                                                Account Title
                                                            </label>
                                                            <Select
                                                                showSearch
                                                                allowClear
                                                                style={{
                                                                    width: "100%",
                                                                    fontSize:
                                                                        "15px",
                                                                }}
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
                                                            <label
                                                                htmlFor="email"
                                                                className="block mb-2 text-[15px] font-semibold text-gray-900"
                                                            >
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
                                                            <label
                                                                htmlFor="email"
                                                                className="block mb-2 text-[15px] font-semibold text-gray-900"
                                                            >
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
                                                            <label
                                                                htmlFor=""
                                                                className="block mb-2 text-[15px] font-semibold text-gray-900"
                                                            >
                                                                Location
                                                            </label>
                                                            <TextArea
                                                                rows={4}
                                                                placeholder="Enter Location"
                                                                maxLength={5}
                                                            />
                                                        </div>
                                                        <div className="col-span-1">
                                                            <label
                                                                htmlFor=""
                                                                className="block mb-2 text-[15px] font-semibold text-gray-900"
                                                            >
                                                                Content
                                                            </label>
                                                            <TextArea
                                                                rows={4}
                                                                placeholder="Enter Content"
                                                                maxLength={5}
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
                                                                            <Input
                                                                                type="text"
                                                                                id="approval_type"
                                                                                className="font-semibold"
                                                                            />
                                                                        </td>
                                                                        <td className="w-[200px] px-6 py-2">
                                                                            <div>
                                                                                Upload
                                                                                File
                                                                            </div>
                                                                        </td>
                                                                    </tr>
                                                                    <tr className="border-b-2 border-gray-300">
                                                                        <td className="font-semibold text-left  px-8 py-2 border-r-2 border-gray-300">
                                                                            Approval
                                                                            after
                                                                            implementation
                                                                        </td>
                                                                        <td className="px-6 py-2 border-r-2 border-gray-300">
                                                                            <Input
                                                                                type="text"
                                                                                id="approval_type"
                                                                                className="font-semibold"
                                                                            />
                                                                        </td>
                                                                        <td className=" px-6 py-2">
                                                                            <div>
                                                                                Upload
                                                                                File
                                                                            </div>
                                                                        </td>
                                                                    </tr>
                                                                    <tr className="">
                                                                        <td className="font-semibold text-left  px-8  py-2 border-r-2 border-gray-300">
                                                                            Other
                                                                        </td>
                                                                        <td className=" px-6 py-2 border-r-2 border-gray-300">
                                                                            <Input
                                                                                type="text"
                                                                                id="approval_type"
                                                                                className="font-semibold"
                                                                            />
                                                                        </td>
                                                                        <td className=" px-6 py-2">
                                                                            <div>
                                                                                Upload
                                                                                File
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
                                                                    <tr className="border-b-2 border-gray-300">
                                                                        <td className="font-semibold text-left  px-8 py-2 border-r-2 border-gray-300">
                                                                            New
                                                                            Trading
                                                                        </td>
                                                                        <td className=" px-6 py-2 border-r-2 border-gray-300">
                                                                            <Input
                                                                                type="text"
                                                                                id="approval_type"
                                                                                className="font-semibold"
                                                                            />
                                                                        </td>
                                                                        <td className="w-[200px] px-6 border-r-2 py-2">
                                                                            <Input
                                                                                type="text"
                                                                                id="approval_type"
                                                                                className="font-semibold"
                                                                            />
                                                                        </td>
                                                                        <td className="w-[200px] px-6 py-2">
                                                                            <Input
                                                                                type="text"
                                                                                id="approval_type"
                                                                                className="font-semibold"
                                                                            />
                                                                        </td>
                                                                    </tr>
                                                                    <tr className="">
                                                                        <td className="font-semibold text-left  px-8 py-2 border-r-2 border-gray-300">
                                                                            New
                                                                            Trading
                                                                        </td>
                                                                        <td className="px-6 py-2 border-r-2 border-gray-300">
                                                                            <Input
                                                                                type="text"
                                                                                id="approval_type"
                                                                                className="font-semibold"
                                                                            />
                                                                        </td>
                                                                        <td className="px-6 py-2 border-r-2 border-gray-300">
                                                                            <Input
                                                                                type="text"
                                                                                id="approval_type"
                                                                                className="font-semibold"
                                                                            />
                                                                        </td>
                                                                        <td className=" px-6 py-2">
                                                                            <Input
                                                                                type="text"
                                                                                id="approval_type"
                                                                                className="font-semibold"
                                                                            />
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
                        <Modal
                            title={
                                currentAction === "sales"
                                    ? "New Sales Item"
                                    : currentAction === "additionalSales"
                                    ? "New Addtional Sales Item"
                                    : currentAction === "cost"
                                    ? "New Cost Item"
                                    : "New Additional Cost Item"
                            }
                            visible={isModalOpen}
                            onOk={handleAddRow}
                            onCancel={handleCloseModal}
                            centered
                            maskClosable={false}
                            width={1200}
                            footer={[
                                <div className="flex items-center justify-end">
                                    <button
                                        className="p-2 px-4 font-medium text-[15px] bg-gray-100 hover:bg-gray-200 rounded-lg active:scale-[.87] active:duration-75 transition-all "
                                        onClick={handleCloseModal}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        className="p-2 px-8 ml-4 font-medium text-[15px] bg-[#3a6f41] text-white rounded-lg active:scale-[.87] active:duration-75 transition-all hover:bg-[#216721]"
                                        onClick={handleAddRow}
                                    >
                                        Save
                                    </button>
                                </div>,
                            ]}
                        >
                            {currentAction === "sales" ? (
                                <div className="">
                                    <div className="w-full my-3 mb-6 ">
                                        <div className="grid grid-cols-3 gap-4">
                                            <div className="col-span-1">
                                                <label
                                                    htmlFor="email"
                                                    className="block mb-2 text-[15px] font-semibold text-gray-900"
                                                >
                                                    Customer
                                                </label>
                                                <Select
                                                    showSearch
                                                    allowClear
                                                    style={{
                                                        width: "100%",
                                                        fontSize: "15px",
                                                    }}
                                                    placeholder="Select Customer"
                                                    filterOption={(
                                                        input,
                                                        option
                                                    ) =>
                                                        (
                                                            option?.label ?? ""
                                                        ).includes(input)
                                                    }
                                                    options={[
                                                        {
                                                            value: "1",
                                                            label: "Customer 1",
                                                        },
                                                        {
                                                            value: "2",
                                                            label: "Customer 2",
                                                        },
                                                        {
                                                            value: "3",
                                                            label: "Customer 3",
                                                        },
                                                    ]}
                                                />
                                            </div>
                                            <div className="col-span-1">
                                                <label
                                                    htmlFor="email"
                                                    className="block mb-2 text-[15px] font-semibold text-gray-900"
                                                >
                                                    Tax
                                                </label>
                                                <Input
                                                    type="text"
                                                    id="approval_type"
                                                    placeholder="Enter Approval Type"
                                                    className="font-semibold"
                                                    value="Tax Information"
                                                    disabled={true}
                                                />
                                            </div>
                                            <div className="col-span-1">
                                                <label
                                                    htmlFor="email"
                                                    className="block mb-2 text-[15px] font-semibold text-gray-900"
                                                >
                                                    Customer Site
                                                </label>
                                                <Select
                                                    showSearch
                                                    allowClear
                                                    style={{
                                                        width: "100%",
                                                        fontSize: "15px",
                                                    }}
                                                    placeholder="Select Customer Site"
                                                    filterOption={(
                                                        input,
                                                        option
                                                    ) =>
                                                        (
                                                            option?.label ?? ""
                                                        ).includes(input)
                                                    }
                                                    options={[
                                                        {
                                                            value: "1",
                                                            label: "Customer Site 1",
                                                        },
                                                        {
                                                            value: "2",
                                                            label: "Customer Site 2",
                                                        },
                                                        {
                                                            value: "3",
                                                            label: "Customer Site 3",
                                                        },
                                                    ]}
                                                />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4 mt-3">
                                            <div className="col-span-1">
                                                <label
                                                    // htmlFor="email"
                                                    className="block mb-2 text-[15px] font-semibold text-gray-900"
                                                >
                                                    Payment Term
                                                </label>
                                                <Select
                                                    showSearch
                                                    allowClear
                                                    style={{
                                                        width: "100%",
                                                        fontSize: "15px",
                                                    }}
                                                    placeholder="Select Payment Term"
                                                    filterOption={(
                                                        input,
                                                        option
                                                    ) =>
                                                        (
                                                            option?.label ?? ""
                                                        ).includes(input)
                                                    }
                                                    options={[
                                                        {
                                                            value: "1",
                                                            label: "Test 1",
                                                        },
                                                        {
                                                            value: "2",
                                                            label: "Test 2",
                                                        },
                                                        {
                                                            value: "3",
                                                            label: "Test 3",
                                                        },
                                                    ]}
                                                />
                                            </div>
                                            <div className="col-span-1">
                                                <label
                                                    // htmlFor="email"
                                                    className="block mb-2 text-[15px] font-semibold text-gray-900"
                                                >
                                                    Payment Term and Condition
                                                </label>
                                                <Input
                                                    type="text"
                                                    id="approval_type"
                                                    // placeholder="Enter Payment Term and Condition"
                                                    className="font-semibold"
                                                    disabled
                                                    value="Test 1"
                                                />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4 mt-3">
                                            <div className="col-span-1">
                                                <label
                                                    // htmlFor="email"
                                                    className="block mb-2 text-[15px] font-semibold text-gray-900"
                                                >
                                                    Currency
                                                </label>
                                                <Select
                                                    showSearch
                                                    allowClear
                                                    style={{
                                                        width: "100%",
                                                        fontSize: "15px",
                                                    }}
                                                    placeholder="Select Currency"
                                                    filterOption={(
                                                        input,
                                                        option
                                                    ) =>
                                                        (
                                                            option?.label ?? ""
                                                        ).includes(input)
                                                    }
                                                    options={[
                                                        {
                                                            value: "1",
                                                            label: "VND",
                                                        },
                                                        {
                                                            value: "2",
                                                            label: "USD",
                                                        },
                                                        {
                                                            value: "3",
                                                            label: "YEN",
                                                        },
                                                    ]}
                                                />
                                            </div>
                                            <div className="col-span-1">
                                                <label
                                                    htmlFor="email"
                                                    className="block mb-2 text-[15px] font-semibold text-gray-900"
                                                >
                                                    Exchange Rate
                                                </label>
                                                <Input
                                                    type="text"
                                                    id="approval_type"
                                                    placeholder="Enter Exchange Rate"
                                                    className="font-semibold"
                                                    value="1"
                                                />
                                            </div>
                                        </div>

                                        <div className="shadow-sm mt-5 mb-3 rounded-lg border-2 border-gray-300 ">
                                            <div className="flex items-center space-x-3 rounded-t-lg bg-gray-100 border-b-2 border-gray-300 p-1.5 px-4 text-[15px] text-[#37763F] font-bold uppercase ">
                                                <div>Item Information</div>
                                            </div>
                                            <div className="px-4 py-3 ">
                                                {/* Form */}
                                                <div className="grid grid-cols-3 gap-4">
                                                    <div className="col-span-1">
                                                        <label
                                                            htmlFor="email"
                                                            className="block mb-2 text-[15px] font-semibold text-gray-900"
                                                        >
                                                            Sub Item
                                                        </label>
                                                        <Select
                                                            showSearch
                                                            allowClear
                                                            style={{
                                                                width: "100%",
                                                                fontSize:
                                                                    "15px",
                                                            }}
                                                            placeholder="Select Sub Item"
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
                                                                    label: "Customer 1",
                                                                },
                                                                {
                                                                    value: "2",
                                                                    label: "Customer 2",
                                                                },
                                                                {
                                                                    value: "3",
                                                                    label: "Customer 3",
                                                                },
                                                            ]}
                                                        />
                                                    </div>
                                                    <div className="col-span-1">
                                                        <label
                                                            htmlFor="email"
                                                            className="block mb-2 text-[15px] font-semibold text-gray-900"
                                                        >
                                                            Item Name
                                                        </label>
                                                        <Input
                                                            type="text"
                                                            id="approval_type"
                                                            placeholder="Item Name Information"
                                                            className="font-semibold"
                                                            disabled={true}
                                                        />
                                                    </div>
                                                    <div className="col-span-1">
                                                        <label
                                                            htmlFor="email"
                                                            className="block mb-2 text-[15px] font-semibold text-gray-900"
                                                        >
                                                            Item Group
                                                        </label>
                                                        <Input
                                                            type="text"
                                                            id="approval_type"
                                                            placeholder="Item Group Information"
                                                            className="font-semibold"
                                                            disabled={true}
                                                        />
                                                    </div>
                                                </div>

                                                <div className="mt-2 grid grid-cols-1 gap-4">
                                                    <div className="col-span-1">
                                                        <label
                                                            htmlFor=""
                                                            className="block mb-2 text-[15px] font-semibold text-gray-900"
                                                        >
                                                            Description
                                                        </label>
                                                        <TextArea
                                                            rows={1}
                                                            placeholder="Enter Good/Service Summary"
                                                            maxLength={5}
                                                        />
                                                    </div>
                                                </div>

                                                <div className="mt-3 grid grid-cols-3 gap-4">
                                                    <div className="col-span-1">
                                                        <label
                                                            htmlFor="email"
                                                            className="block mb-2 text-[15px] font-semibold text-gray-900"
                                                        >
                                                            Unit
                                                        </label>
                                                        <Select
                                                            showSearch
                                                            allowClear
                                                            style={{
                                                                width: "100%",
                                                                fontSize:
                                                                    "15px",
                                                            }}
                                                            placeholder="Select Unit"
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
                                                                    label: "Customer 1",
                                                                },
                                                                {
                                                                    value: "2",
                                                                    label: "Customer 2",
                                                                },
                                                                {
                                                                    value: "3",
                                                                    label: "Customer 3",
                                                                },
                                                            ]}
                                                        />
                                                    </div>
                                                    <div className="col-span-1">
                                                        <label
                                                            htmlFor="email"
                                                            className="block mb-2 text-[15px] font-semibold text-gray-900"
                                                        >
                                                            Quantity
                                                        </label>
                                                        <Input
                                                            type="text"
                                                            id="approval_type"
                                                            placeholder="Enter Quanity"
                                                            className="font-semibold"
                                                        />
                                                    </div>
                                                    <div className="col-span-1">
                                                        <label
                                                            htmlFor="email"
                                                            className="block mb-2 text-[15px] font-semibold text-gray-900"
                                                        >
                                                            VAT (%)
                                                        </label>
                                                        <Select
                                                            showSearch
                                                            allowClear
                                                            style={{
                                                                width: "100%",
                                                                fontSize:
                                                                    "15px",
                                                            }}
                                                            placeholder="Select % VAT"
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
                                                                    label: "5%",
                                                                },
                                                                {
                                                                    value: "2",
                                                                    label: "10%",
                                                                },
                                                                {
                                                                    value: "3",
                                                                    label: "15%",
                                                                },
                                                            ]}
                                                        />
                                                    </div>
                                                </div>

                                                {/* Currency Convert */}
                                                <div className="mt-6 mb-2  border-2 border-gray-300 ">
                                                    <div className="overflow-x-auto">
                                                        <table className=" w-full bg-white border-collapse text-[15px]">
                                                            <thead className=" rounded-t-lg">
                                                                <tr className="border-b-2 border-gray-300">
                                                                    <th className="w-1/6 text-center border-r-2 border-gray-300 py-2"></th>
                                                                    <th className="bg-blue-50 w-2/5 text-blue-600 text-center text-[17px] px-8 py-2 border-r-2 border-gray-300">
                                                                        Original
                                                                        Price
                                                                    </th>
                                                                    <th className="w-2/5 bg-violet-100 text-violet-600 text-center text-[17px] px-8 py-2">
                                                                        Converted
                                                                        Price
                                                                        (VND)
                                                                    </th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                <tr className="border-b-2 border-gray-300">
                                                                    <td className="font-semibold text-center  px-6 py-2 border-r-2 border-gray-300">
                                                                        Unit
                                                                        Price
                                                                    </td>
                                                                    <td className=" px-6 py-2 border-r-2 border-gray-300">
                                                                        <Input
                                                                            type="text"
                                                                            id="approval_type"
                                                                            placeholder="Enter Price"
                                                                            className="font-semibold"
                                                                        />
                                                                    </td>
                                                                    <td className="w-[200px] px-6 py-2">
                                                                        <Input
                                                                            type="text"
                                                                            id="approval_type"
                                                                            placeholder="Converted Price"
                                                                            className="font-semibold"
                                                                            readOnly={
                                                                                true
                                                                            }
                                                                        />
                                                                    </td>
                                                                </tr>
                                                                <tr className="border-b-2 border-gray-300">
                                                                    <td className="font-semibold text-center px-8 py-2 border-r-2 border-gray-300">
                                                                        VAT
                                                                        Amount
                                                                    </td>
                                                                    <td className="px-6 py-2 border-r-2 border-gray-300">
                                                                        <Input
                                                                            type="text"
                                                                            id="approval_type"
                                                                            placeholder="Original Price"
                                                                            className="font-semibold"
                                                                            readOnly={
                                                                                true
                                                                            }
                                                                        />
                                                                    </td>
                                                                    <td className=" px-6 py-2">
                                                                        <Input
                                                                            type="text"
                                                                            id="approval_type"
                                                                            placeholder="Converted Price"
                                                                            className="font-semibold"
                                                                            readOnly={
                                                                                true
                                                                            }
                                                                        />
                                                                    </td>
                                                                </tr>
                                                                <tr className="border-b-2 border-gray-300">
                                                                    <td className="font-semibold text-center px-8 py-2 border-r-2 border-gray-300">
                                                                        Before
                                                                        VAT
                                                                    </td>
                                                                    <td className="px-6 py-2 border-r-2 border-gray-300">
                                                                        <Input
                                                                            type="text"
                                                                            id="approval_type"
                                                                            placeholder="Original Price"
                                                                            className="font-semibold"
                                                                            readOnly={
                                                                                true
                                                                            }
                                                                        />
                                                                    </td>
                                                                    <td className=" px-6 py-2">
                                                                        <Input
                                                                            type="text"
                                                                            id="approval_type"
                                                                            placeholder="Converted Price"
                                                                            className="font-semibold"
                                                                            readOnly={
                                                                                true
                                                                            }
                                                                        />
                                                                    </td>
                                                                </tr>
                                                                <tr className="">
                                                                    <td className="font-semibold text-center  px-8 py-2 border-r-2 border-gray-300">
                                                                        After
                                                                        VAT
                                                                    </td>
                                                                    <td className=" px-6 py-2 border-r-2 border-gray-300">
                                                                        <Input
                                                                            type="text"
                                                                            id="approval_type"
                                                                            placeholder="Original Price"
                                                                            className="font-semibold"
                                                                            readOnly={
                                                                                true
                                                                            }
                                                                        />
                                                                    </td>
                                                                    <td className=" px-6 py-2">
                                                                        <Input
                                                                            type="text"
                                                                            id="approval_type"
                                                                            placeholder="Converted Price"
                                                                            className="font-semibold"
                                                                            readOnly={
                                                                                true
                                                                            }
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
                            ) : currentAction === "additionalSales" ? (
                                <div className="">
                                    <div className="w-full my-3 mb-6 ">
                                        <div className="grid grid-cols-3 gap-4">
                                            <div className="col-span-1">
                                                <label
                                                    // htmlFor="email"
                                                    className="block mb-2 text-[15px] font-semibold text-gray-900"
                                                >
                                                    Customer
                                                </label>
                                                <Select
                                                    showSearch
                                                    allowClear
                                                    style={{
                                                        width: "100%",
                                                        fontSize: "15px",
                                                    }}
                                                    placeholder="Select Customer"
                                                    filterOption={(
                                                        input,
                                                        option
                                                    ) =>
                                                        (
                                                            option?.label ?? ""
                                                        ).includes(input)
                                                    }
                                                    options={[
                                                        {
                                                            value: "1",
                                                            label: "Customer 1",
                                                        },
                                                        {
                                                            value: "2",
                                                            label: "Customer 2",
                                                        },
                                                        {
                                                            value: "3",
                                                            label: "Customer 3",
                                                        },
                                                    ]}
                                                />
                                            </div>
                                            <div className="col-span-1">
                                                <label
                                                    // htmlFor="email"
                                                    className="block mb-2 text-[15px] font-semibold text-gray-900"
                                                >
                                                    Tax
                                                </label>
                                                <Input
                                                    type="text"
                                                    id="approval_type"
                                                    placeholder="Enter Approval Type"
                                                    className="font-semibold"
                                                    value="Tax Information"
                                                    disabled={true}
                                                />
                                            </div>
                                            <div className="col-span-1">
                                                <label
                                                    htmlFor="email"
                                                    className="block mb-2 text-[15px] font-semibold text-gray-900"
                                                >
                                                    Customer Site
                                                </label>
                                                <Select
                                                    showSearch
                                                    allowClear
                                                    style={{
                                                        width: "100%",
                                                        fontSize: "15px",
                                                    }}
                                                    placeholder="Select Customer Site"
                                                    filterOption={(
                                                        input,
                                                        option
                                                    ) =>
                                                        (
                                                            option?.label ?? ""
                                                        ).includes(input)
                                                    }
                                                    options={[
                                                        {
                                                            value: "1",
                                                            label: "Customer Site 1",
                                                        },
                                                        {
                                                            value: "2",
                                                            label: "Customer Site 2",
                                                        },
                                                        {
                                                            value: "3",
                                                            label: "Customer Site 3",
                                                        },
                                                    ]}
                                                />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4 mt-3">
                                            <div className="col-span-1">
                                                <label
                                                    htmlFor="email"
                                                    className="block mb-2 text-[15px] font-semibold text-gray-900"
                                                >
                                                    Currency
                                                </label>
                                                <Select
                                                    showSearch
                                                    allowClear
                                                    style={{
                                                        width: "100%",
                                                        fontSize: "15px",
                                                    }}
                                                    placeholder="Select Currency"
                                                    filterOption={(
                                                        input,
                                                        option
                                                    ) =>
                                                        (
                                                            option?.label ?? ""
                                                        ).includes(input)
                                                    }
                                                    options={[
                                                        {
                                                            value: "1",
                                                            label: "VND",
                                                        },
                                                        {
                                                            value: "2",
                                                            label: "USD",
                                                        },
                                                        {
                                                            value: "3",
                                                            label: "YEN",
                                                        },
                                                    ]}
                                                />
                                            </div>
                                            <div className="col-span-1">
                                                <label
                                                    htmlFor="email"
                                                    className="block mb-2 text-[15px] font-semibold text-gray-900"
                                                >
                                                    Exchange Rate
                                                </label>
                                                <Input
                                                    type="text"
                                                    id="approval_type"
                                                    placeholder="Enter Exchange Rate"
                                                    className="font-semibold"
                                                    value="1"
                                                />
                                            </div>
                                        </div>

                                        <div className="shadow-sm mt-5 mb-3 rounded-lg border-2 border-gray-300 ">
                                            <div className="flex items-center space-x-3 rounded-t-lg bg-gray-100 border-b-2 border-gray-300 p-1.5 px-4 text-[15px] text-[#37763F] font-bold uppercase ">
                                                <div>Item Information</div>
                                            </div>
                                            <div className="px-4 py-3 ">
                                                {/* Form */}
                                                <div className="grid grid-cols-3 gap-4">
                                                    <div className="col-span-1">
                                                        <label
                                                            htmlFor="email"
                                                            className="block mb-2 text-[15px] font-semibold text-gray-900"
                                                        >
                                                            Sub Item
                                                        </label>
                                                        <Select
                                                            showSearch
                                                            allowClear
                                                            style={{
                                                                width: "100%",
                                                                fontSize:
                                                                    "15px",
                                                            }}
                                                            placeholder="Select Sub Item"
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
                                                                    label: "Customer 1",
                                                                },
                                                                {
                                                                    value: "2",
                                                                    label: "Customer 2",
                                                                },
                                                                {
                                                                    value: "3",
                                                                    label: "Customer 3",
                                                                },
                                                            ]}
                                                        />
                                                    </div>
                                                    <div className="col-span-1">
                                                        <label
                                                            htmlFor="email"
                                                            className="block mb-2 text-[15px] font-semibold text-gray-900"
                                                        >
                                                            Item Name
                                                        </label>
                                                        <Input
                                                            type="text"
                                                            id="approval_type"
                                                            placeholder="Item Name Information"
                                                            className="font-semibold"
                                                            disabled={true}
                                                        />
                                                    </div>
                                                    <div className="col-span-1">
                                                        <label
                                                            htmlFor="email"
                                                            className="block mb-2 text-[15px] font-semibold text-gray-900"
                                                        >
                                                            Item Group
                                                        </label>
                                                        <Input
                                                            type="text"
                                                            id="approval_type"
                                                            placeholder="Item Group Information"
                                                            className="font-semibold"
                                                            disabled={true}
                                                        />
                                                    </div>
                                                </div>

                                                <div className="mt-2 grid grid-cols-1 gap-4">
                                                    <div className="col-span-1">
                                                        <label
                                                            htmlFor=""
                                                            className="block mb-2 text-[15px] font-semibold text-gray-900"
                                                        >
                                                            Description
                                                        </label>
                                                        <TextArea
                                                            rows={1}
                                                            placeholder="Enter Good/Service Summary"
                                                            maxLength={5}
                                                        />
                                                    </div>
                                                </div>

                                                <div className="mt-3 grid grid-cols-3 gap-4">
                                                    <div className="col-span-1">
                                                        <label
                                                            htmlFor="email"
                                                            className="block mb-2 text-[15px] font-semibold text-gray-900"
                                                        >
                                                            Unit
                                                        </label>
                                                        <Select
                                                            showSearch
                                                            allowClear
                                                            style={{
                                                                width: "100%",
                                                                fontSize:
                                                                    "15px",
                                                            }}
                                                            placeholder="Select Unit"
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
                                                                    label: "Customer 1",
                                                                },
                                                                {
                                                                    value: "2",
                                                                    label: "Customer 2",
                                                                },
                                                                {
                                                                    value: "3",
                                                                    label: "Customer 3",
                                                                },
                                                            ]}
                                                        />
                                                    </div>
                                                </div>

                                                {/* Checkout */}
                                                <div className="mt-6 mb-2  border-2 border-gray-300 ">
                                                    <div className="overflow-x-auto">
                                                        <table className=" w-full bg-white border-collapse text-[15px]">
                                                            <thead className=" rounded-t-lg">
                                                                <tr className="border-b-2 border-gray-300">
                                                                    <th className="w-1/6 text-center border-r-2 border-gray-300 py-2"></th>
                                                                    <th className="bg-blue-50 w-2/5 text-blue-600 text-center text-[17px] px-8 py-2 border-r-2 border-gray-300">
                                                                        Original
                                                                        Price
                                                                    </th>
                                                                    <th className="w-2/5 bg-violet-100 text-violet-600 text-center text-[17px] px-8 py-2">
                                                                        Converted
                                                                        Price
                                                                        (VND)
                                                                    </th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                <tr className="border-b-2 border-gray-300">
                                                                    <td className="font-semibold text-center  px-6 py-2 border-r-2 border-gray-300">
                                                                        Unit
                                                                        Price
                                                                    </td>
                                                                    <td className=" px-6 py-2 border-r-2 border-gray-300">
                                                                        <Input
                                                                            type="text"
                                                                            id="approval_type"
                                                                            placeholder="Enter Price"
                                                                            className="font-semibold"
                                                                        />
                                                                    </td>
                                                                    <td className="w-[200px] px-6 py-2">
                                                                        <Input
                                                                            type="text"
                                                                            id="approval_type"
                                                                            placeholder="Converted Price"
                                                                            className="font-semibold"
                                                                            readOnly={
                                                                                true
                                                                            }
                                                                        />
                                                                    </td>
                                                                </tr>
                                                                <tr className="border-b-2 border-gray-300">
                                                                    <td className="font-semibold text-center px-8 py-2 border-r-2 border-gray-300">
                                                                        VAT
                                                                        Amount
                                                                    </td>
                                                                    <td className="px-6 py-2 border-r-2 border-gray-300">
                                                                        <Input
                                                                            type="text"
                                                                            id="approval_type"
                                                                            placeholder="Original Price"
                                                                            className="font-semibold"
                                                                            readOnly={
                                                                                true
                                                                            }
                                                                        />
                                                                    </td>
                                                                    <td className=" px-6 py-2">
                                                                        <Input
                                                                            type="text"
                                                                            id="approval_type"
                                                                            placeholder="Converted Price"
                                                                            className="font-semibold"
                                                                            readOnly={
                                                                                true
                                                                            }
                                                                        />
                                                                    </td>
                                                                </tr>
                                                                <tr className="border-b-2 border-gray-300">
                                                                    <td className="font-semibold text-center px-8 py-2 border-r-2 border-gray-300">
                                                                        Before
                                                                        VAT
                                                                    </td>
                                                                    <td className="px-6 py-2 border-r-2 border-gray-300">
                                                                        <Input
                                                                            type="text"
                                                                            id="approval_type"
                                                                            placeholder="Original Price"
                                                                            className="font-semibold"
                                                                            readOnly={
                                                                                true
                                                                            }
                                                                        />
                                                                    </td>
                                                                    <td className=" px-6 py-2">
                                                                        <Input
                                                                            type="text"
                                                                            id="approval_type"
                                                                            placeholder="Converted Price"
                                                                            className="font-semibold"
                                                                            readOnly={
                                                                                true
                                                                            }
                                                                        />
                                                                    </td>
                                                                </tr>
                                                                <tr className="">
                                                                    <td className="font-semibold text-center  px-8 py-2 border-r-2 border-gray-300">
                                                                        After
                                                                        VAT
                                                                    </td>
                                                                    <td className=" px-6 py-2 border-r-2 border-gray-300">
                                                                        <Input
                                                                            type="text"
                                                                            id="approval_type"
                                                                            placeholder="Original Price"
                                                                            className="font-semibold"
                                                                            readOnly={
                                                                                true
                                                                            }
                                                                        />
                                                                    </td>
                                                                    <td className=" px-6 py-2">
                                                                        <Input
                                                                            type="text"
                                                                            id="approval_type"
                                                                            placeholder="Converted Price"
                                                                            className="font-semibold"
                                                                            readOnly={
                                                                                true
                                                                            }
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
                            ) : currentAction === "cost" ? (
                                <div className="">
                                    <div className="w-full my-3 mb-6 ">
                                        <div className="grid grid-cols-3 gap-4">
                                            <div className="col-span-1">
                                                <label
                                                    htmlFor="email"
                                                    className="block mb-2 text-[15px] font-semibold text-gray-900"
                                                >
                                                    Vendor
                                                </label>
                                                <Select
                                                    showSearch
                                                    allowClear
                                                    style={{
                                                        width: "100%",
                                                        fontSize: "15px",
                                                    }}
                                                    placeholder="Select Customer"
                                                    filterOption={(
                                                        input,
                                                        option
                                                    ) =>
                                                        (
                                                            option?.label ?? ""
                                                        ).includes(input)
                                                    }
                                                    options={[
                                                        {
                                                            value: "1",
                                                            label: "Customer 1",
                                                        },
                                                        {
                                                            value: "2",
                                                            label: "Customer 2",
                                                        },
                                                        {
                                                            value: "3",
                                                            label: "Customer 3",
                                                        },
                                                    ]}
                                                />
                                            </div>
                                            <div className="col-span-1">
                                                <label
                                                    htmlFor="email"
                                                    className="block mb-2 text-[15px] font-semibold text-gray-900"
                                                >
                                                    Tax
                                                </label>
                                                <Input
                                                    type="text"
                                                    id="approval_type"
                                                    placeholder="Enter Approval Type"
                                                    className="font-semibold"
                                                    value="Tax Information"
                                                    disabled={true}
                                                />
                                            </div>
                                            <div className="col-span-1">
                                                <label
                                                    htmlFor="email"
                                                    className="block mb-2 text-[15px] font-semibold text-gray-900"
                                                >
                                                    Customer Site
                                                </label>
                                                <Select
                                                    showSearch
                                                    allowClear
                                                    style={{
                                                        width: "100%",
                                                        fontSize: "15px",
                                                    }}
                                                    placeholder="Select Customer Site"
                                                    filterOption={(
                                                        input,
                                                        option
                                                    ) =>
                                                        (
                                                            option?.label ?? ""
                                                        ).includes(input)
                                                    }
                                                    options={[
                                                        {
                                                            value: "1",
                                                            label: "Customer Site 1",
                                                        },
                                                        {
                                                            value: "2",
                                                            label: "Customer Site 2",
                                                        },
                                                        {
                                                            value: "3",
                                                            label: "Customer Site 3",
                                                        },
                                                    ]}
                                                />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4 mt-3">
                                            <div className="col-span-1">
                                                <label
                                                    // htmlFor="email"
                                                    className="block mb-2 text-[15px] font-semibold text-gray-900"
                                                >
                                                    Payment Term
                                                </label>
                                                <Select
                                                    showSearch
                                                    allowClear
                                                    style={{
                                                        width: "100%",
                                                        fontSize: "15px",
                                                    }}
                                                    placeholder="Select Payment Term"
                                                    filterOption={(
                                                        input,
                                                        option
                                                    ) =>
                                                        (
                                                            option?.label ?? ""
                                                        ).includes(input)
                                                    }
                                                    options={[
                                                        {
                                                            value: "1",
                                                            label: "Test 1",
                                                        },
                                                        {
                                                            value: "2",
                                                            label: "Test 2",
                                                        },
                                                        {
                                                            value: "3",
                                                            label: "Test 3",
                                                        },
                                                    ]}
                                                />
                                            </div>
                                            <div className="col-span-1">
                                                <label
                                                    // htmlFor="email"
                                                    className="block mb-2 text-[15px] font-semibold text-gray-900"
                                                >
                                                    Payment Term and Condition
                                                </label>
                                                <Input
                                                    type="text"
                                                    id="approval_type"
                                                    // placeholder="Enter Payment Term and Condition"
                                                    className="font-semibold"
                                                    disabled
                                                    value="Test 1"
                                                />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4 mt-3">
                                            <div className="col-span-1">
                                                <label
                                                    htmlFor="email"
                                                    className="block mb-2 text-[15px] font-semibold text-gray-900"
                                                >
                                                    Currency
                                                </label>
                                                <Select
                                                    showSearch
                                                    allowClear
                                                    style={{
                                                        width: "100%",
                                                        fontSize: "15px",
                                                    }}
                                                    placeholder="Select Currency"
                                                    filterOption={(
                                                        input,
                                                        option
                                                    ) =>
                                                        (
                                                            option?.label ?? ""
                                                        ).includes(input)
                                                    }
                                                    options={[
                                                        {
                                                            value: "1",
                                                            label: "VND",
                                                        },
                                                        {
                                                            value: "2",
                                                            label: "USD",
                                                        },
                                                        {
                                                            value: "3",
                                                            label: "YEN",
                                                        },
                                                    ]}
                                                />
                                            </div>
                                            <div className="col-span-1">
                                                <label
                                                    htmlFor="email"
                                                    className="block mb-2 text-[15px] font-semibold text-gray-900"
                                                >
                                                    Exchange Rate
                                                </label>
                                                <Input
                                                    type="text"
                                                    id="approval_type"
                                                    placeholder="Enter Exchange Rate"
                                                    className="font-semibold"
                                                    value="1"
                                                />
                                            </div>
                                        </div>

                                        <div className="shadow-sm mt-5 mb-3 rounded-lg border-2 border-gray-300 ">
                                            <div className="flex items-center space-x-3 rounded-t-lg bg-gray-100 border-b-2 border-gray-300 p-1.5 px-4 text-[15px] text-[#37763F] font-bold uppercase ">
                                                <div>Item Information</div>
                                            </div>
                                            <div className="px-4 py-3 ">
                                                {/* Form */}
                                                <div className="grid grid-cols-3 gap-4">
                                                    <div className="col-span-1">
                                                        <label
                                                            htmlFor="email"
                                                            className="block mb-2 text-[15px] font-semibold text-gray-900"
                                                        >
                                                            Sub Item
                                                        </label>
                                                        <Select
                                                            showSearch
                                                            allowClear
                                                            style={{
                                                                width: "100%",
                                                                fontSize:
                                                                    "15px",
                                                            }}
                                                            placeholder="Select Sub Item"
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
                                                                    label: "Customer 1",
                                                                },
                                                                {
                                                                    value: "2",
                                                                    label: "Customer 2",
                                                                },
                                                                {
                                                                    value: "3",
                                                                    label: "Customer 3",
                                                                },
                                                            ]}
                                                        />
                                                    </div>
                                                    <div className="col-span-1">
                                                        <label
                                                            htmlFor="email"
                                                            className="block mb-2 text-[15px] font-semibold text-gray-900"
                                                        >
                                                            Item Name
                                                        </label>
                                                        <Input
                                                            type="text"
                                                            id="approval_type"
                                                            placeholder="Item Name Information"
                                                            className="font-semibold"
                                                            disabled={true}
                                                        />
                                                    </div>
                                                    <div className="col-span-1">
                                                        <label
                                                            htmlFor="email"
                                                            className="block mb-2 text-[15px] font-semibold text-gray-900"
                                                        >
                                                            Item Group
                                                        </label>
                                                        <Input
                                                            type="text"
                                                            id="approval_type"
                                                            placeholder="Item Group Information"
                                                            className="font-semibold"
                                                            disabled={true}
                                                        />
                                                    </div>
                                                </div>

                                                <div className="mt-2 grid grid-cols-1 gap-4">
                                                    <div className="col-span-1">
                                                        <label
                                                            htmlFor=""
                                                            className="block mb-2 text-[15px] font-semibold text-gray-900"
                                                        >
                                                            Description
                                                        </label>
                                                        <TextArea
                                                            rows={1}
                                                            placeholder="Enter Good/Service Summary"
                                                            maxLength={5}
                                                        />
                                                    </div>
                                                </div>

                                                <div className="mt-3 grid grid-cols-3 gap-4">
                                                    <div className="col-span-1">
                                                        <label
                                                            htmlFor="email"
                                                            className="block mb-2 text-[15px] font-semibold text-gray-900"
                                                        >
                                                            Unit
                                                        </label>
                                                        <Select
                                                            showSearch
                                                            allowClear
                                                            style={{
                                                                width: "100%",
                                                                fontSize:
                                                                    "15px",
                                                            }}
                                                            placeholder="Select Unit"
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
                                                                    label: "Customer 1",
                                                                },
                                                                {
                                                                    value: "2",
                                                                    label: "Customer 2",
                                                                },
                                                                {
                                                                    value: "3",
                                                                    label: "Customer 3",
                                                                },
                                                            ]}
                                                        />
                                                    </div>
                                                    <div className="col-span-1">
                                                        <label
                                                            htmlFor="email"
                                                            className="block mb-2 text-[15px] font-semibold text-gray-900"
                                                        >
                                                            Quantity
                                                        </label>
                                                        <Input
                                                            type="text"
                                                            id="approval_type"
                                                            placeholder="Enter Quanity"
                                                            className="font-semibold"
                                                        />
                                                    </div>
                                                    <div className="col-span-1">
                                                        <label
                                                            htmlFor="email"
                                                            className="block mb-2 text-[15px] font-semibold text-gray-900"
                                                        >
                                                            VAT (%)
                                                        </label>
                                                        <Select
                                                            showSearch
                                                            allowClear
                                                            style={{
                                                                width: "100%",
                                                                fontSize:
                                                                    "15px",
                                                            }}
                                                            placeholder="Select % VAT"
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
                                                                    label: "5%",
                                                                },
                                                                {
                                                                    value: "2",
                                                                    label: "10%",
                                                                },
                                                                {
                                                                    value: "3",
                                                                    label: "15%",
                                                                },
                                                            ]}
                                                        />
                                                    </div>
                                                </div>

                                                {/* Checkout */}
                                                <div className="mt-6 mb-2  border-2 border-gray-300 ">
                                                    <div className="overflow-x-auto">
                                                        <table className=" w-full bg-white border-collapse text-[15px]">
                                                            <thead className=" rounded-t-lg">
                                                                <tr className="border-b-2 border-gray-300">
                                                                    <th className="w-1/6 text-center border-r-2 border-gray-300 py-2"></th>
                                                                    <th className="bg-blue-50 w-2/5 text-blue-600 text-center text-[17px] px-8 py-2 border-r-2 border-gray-300">
                                                                        Original
                                                                        Price
                                                                    </th>
                                                                    <th className="w-2/5 bg-violet-100 text-violet-600 text-center text-[17px] px-8 py-2">
                                                                        Converted
                                                                        Price
                                                                        (VND)
                                                                    </th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                <tr className="border-b-2 border-gray-300">
                                                                    <td className="font-semibold text-center  px-6 py-2 border-r-2 border-gray-300">
                                                                        Unit
                                                                        Price
                                                                    </td>
                                                                    <td className=" px-6 py-2 border-r-2 border-gray-300">
                                                                        <Input
                                                                            type="text"
                                                                            id="approval_type"
                                                                            placeholder="Enter Price"
                                                                            className="font-semibold"
                                                                        />
                                                                    </td>
                                                                    <td className="w-[200px] px-6 py-2">
                                                                        <Input
                                                                            type="text"
                                                                            id="approval_type"
                                                                            placeholder="Converted Price"
                                                                            className="font-semibold"
                                                                            readOnly={
                                                                                true
                                                                            }
                                                                        />
                                                                    </td>
                                                                </tr>
                                                                <tr className="border-b-2 border-gray-300">
                                                                    <td className="font-semibold text-center px-8 py-2 border-r-2 border-gray-300">
                                                                        VAT
                                                                        Amount
                                                                    </td>
                                                                    <td className="px-6 py-2 border-r-2 border-gray-300">
                                                                        <Input
                                                                            type="text"
                                                                            id="approval_type"
                                                                            placeholder="Original Price"
                                                                            className="font-semibold"
                                                                            readOnly={
                                                                                true
                                                                            }
                                                                        />
                                                                    </td>
                                                                    <td className=" px-6 py-2">
                                                                        <Input
                                                                            type="text"
                                                                            id="approval_type"
                                                                            placeholder="Converted Price"
                                                                            className="font-semibold"
                                                                            readOnly={
                                                                                true
                                                                            }
                                                                        />
                                                                    </td>
                                                                </tr>
                                                                <tr className="border-b-2 border-gray-300">
                                                                    <td className="font-semibold text-center px-8 py-2 border-r-2 border-gray-300">
                                                                        Before
                                                                        VAT
                                                                    </td>
                                                                    <td className="px-6 py-2 border-r-2 border-gray-300">
                                                                        <Input
                                                                            type="text"
                                                                            id="approval_type"
                                                                            placeholder="Original Price"
                                                                            className="font-semibold"
                                                                            readOnly={
                                                                                true
                                                                            }
                                                                        />
                                                                    </td>
                                                                    <td className=" px-6 py-2">
                                                                        <Input
                                                                            type="text"
                                                                            id="approval_type"
                                                                            placeholder="Converted Price"
                                                                            className="font-semibold"
                                                                            readOnly={
                                                                                true
                                                                            }
                                                                        />
                                                                    </td>
                                                                </tr>
                                                                <tr className="">
                                                                    <td className="font-semibold text-center  px-8 py-2 border-r-2 border-gray-300">
                                                                        After
                                                                        VAT
                                                                    </td>
                                                                    <td className=" px-6 py-2 border-r-2 border-gray-300">
                                                                        <Input
                                                                            type="text"
                                                                            id="approval_type"
                                                                            placeholder="Original Price"
                                                                            className="font-semibold"
                                                                            readOnly={
                                                                                true
                                                                            }
                                                                        />
                                                                    </td>
                                                                    <td className=" px-6 py-2">
                                                                        <Input
                                                                            type="text"
                                                                            id="approval_type"
                                                                            placeholder="Converted Price"
                                                                            className="font-semibold"
                                                                            readOnly={
                                                                                true
                                                                            }
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
                            ) : currentAction === "additionalCost" ? (
                                <div className="">
                                    <div className="w-full my-3 mb-6 ">
                                        <div className="grid grid-cols-3 gap-4">
                                            <div className="col-span-1">
                                                <label
                                                    htmlFor="email"
                                                    className="block mb-2 text-[15px] font-semibold text-gray-900"
                                                >
                                                    Vendor
                                                </label>
                                                <Select
                                                    showSearch
                                                    allowClear
                                                    style={{
                                                        width: "100%",
                                                        fontSize: "15px",
                                                    }}
                                                    placeholder="Select Customer"
                                                    filterOption={(
                                                        input,
                                                        option
                                                    ) =>
                                                        (
                                                            option?.label ?? ""
                                                        ).includes(input)
                                                    }
                                                    options={[
                                                        {
                                                            value: "1",
                                                            label: "Customer 1",
                                                        },
                                                        {
                                                            value: "2",
                                                            label: "Customer 2",
                                                        },
                                                        {
                                                            value: "3",
                                                            label: "Customer 3",
                                                        },
                                                    ]}
                                                />
                                            </div>
                                            <div className="col-span-1">
                                                <label
                                                    htmlFor="email"
                                                    className="block mb-2 text-[15px] font-semibold text-gray-900"
                                                >
                                                    Tax
                                                </label>
                                                <Input
                                                    type="text"
                                                    id="approval_type"
                                                    placeholder="Enter Approval Type"
                                                    className="font-semibold"
                                                    value="Tax Information"
                                                    disabled={true}
                                                />
                                            </div>
                                            <div className="col-span-1">
                                                <label
                                                    htmlFor="email"
                                                    className="block mb-2 text-[15px] font-semibold text-gray-900"
                                                >
                                                    Customer Site
                                                </label>
                                                <Select
                                                    showSearch
                                                    allowClear
                                                    style={{
                                                        width: "100%",
                                                        fontSize: "15px",
                                                    }}
                                                    placeholder="Select Customer Site"
                                                    filterOption={(
                                                        input,
                                                        option
                                                    ) =>
                                                        (
                                                            option?.label ?? ""
                                                        ).includes(input)
                                                    }
                                                    options={[
                                                        {
                                                            value: "1",
                                                            label: "Customer Site 1",
                                                        },
                                                        {
                                                            value: "2",
                                                            label: "Customer Site 2",
                                                        },
                                                        {
                                                            value: "3",
                                                            label: "Customer Site 3",
                                                        },
                                                    ]}
                                                />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4 mt-3">
                                            <div className="col-span-1">
                                                <label
                                                    htmlFor="email"
                                                    className="block mb-2 text-[15px] font-semibold text-gray-900"
                                                >
                                                    Currency
                                                </label>
                                                <Select
                                                    showSearch
                                                    allowClear
                                                    style={{
                                                        width: "100%",
                                                        fontSize: "15px",
                                                    }}
                                                    placeholder="Select Currency"
                                                    filterOption={(
                                                        input,
                                                        option
                                                    ) =>
                                                        (
                                                            option?.label ?? ""
                                                        ).includes(input)
                                                    }
                                                    options={[
                                                        {
                                                            value: "1",
                                                            label: "VND",
                                                        },
                                                        {
                                                            value: "2",
                                                            label: "USD",
                                                        },
                                                        {
                                                            value: "3",
                                                            label: "YEN",
                                                        },
                                                    ]}
                                                />
                                            </div>
                                            <div className="col-span-1">
                                                <label
                                                    htmlFor="email"
                                                    className="block mb-2 text-[15px] font-semibold text-gray-900"
                                                >
                                                    Exchange Rate
                                                </label>
                                                <Input
                                                    type="text"
                                                    id="approval_type"
                                                    placeholder="Enter Exchange Rate"
                                                    className="font-semibold"
                                                    value="1"
                                                />
                                            </div>
                                        </div>

                                        <div className="shadow-sm mt-5 mb-3 rounded-lg border-2 border-gray-300 ">
                                            <div className="flex items-center space-x-3 rounded-t-lg bg-gray-100 border-b-2 border-gray-300 p-1.5 px-4 text-[15px] text-[#37763F] font-bold uppercase ">
                                                <div>Item Information</div>
                                            </div>
                                            <div className="px-4 py-3 ">
                                                {/* Form */}
                                                <div className="grid grid-cols-3 gap-4">
                                                    <div className="col-span-1">
                                                        <label
                                                            htmlFor="email"
                                                            className="block mb-2 text-[15px] font-semibold text-gray-900"
                                                        >
                                                            Sub Item
                                                        </label>
                                                        <Select
                                                            showSearch
                                                            allowClear
                                                            style={{
                                                                width: "100%",
                                                                fontSize:
                                                                    "15px",
                                                            }}
                                                            placeholder="Select Sub Item"
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
                                                                    label: "Customer 1",
                                                                },
                                                                {
                                                                    value: "2",
                                                                    label: "Customer 2",
                                                                },
                                                                {
                                                                    value: "3",
                                                                    label: "Customer 3",
                                                                },
                                                            ]}
                                                        />
                                                    </div>
                                                    <div className="col-span-1">
                                                        <label
                                                            htmlFor="email"
                                                            className="block mb-2 text-[15px] font-semibold text-gray-900"
                                                        >
                                                            Item Name
                                                        </label>
                                                        <Input
                                                            type="text"
                                                            id="approval_type"
                                                            placeholder="Item Name Information"
                                                            className="font-semibold"
                                                            disabled={true}
                                                        />
                                                    </div>
                                                    <div className="col-span-1">
                                                        <label
                                                            htmlFor="email"
                                                            className="block mb-2 text-[15px] font-semibold text-gray-900"
                                                        >
                                                            Item Group
                                                        </label>
                                                        <Input
                                                            type="text"
                                                            id="approval_type"
                                                            placeholder="Item Group Information"
                                                            className="font-semibold"
                                                            disabled={true}
                                                        />
                                                    </div>
                                                </div>

                                                <div className="mt-2 grid grid-cols-1 gap-4">
                                                    <div className="col-span-1">
                                                        <label
                                                            htmlFor=""
                                                            className="block mb-2 text-[15px] font-semibold text-gray-900"
                                                        >
                                                            Description
                                                        </label>
                                                        <TextArea
                                                            rows={1}
                                                            placeholder="Enter Good/Service Summary"
                                                            maxLength={5}
                                                        />
                                                    </div>
                                                </div>

                                                <div className="mt-3 grid grid-cols-3 gap-4">
                                                    <div className="col-span-1">
                                                        <label
                                                            htmlFor="email"
                                                            className="block mb-2 text-[15px] font-semibold text-gray-900"
                                                        >
                                                            Unit
                                                        </label>
                                                        <Select
                                                            showSearch
                                                            allowClear
                                                            style={{
                                                                width: "100%",
                                                                fontSize:
                                                                    "15px",
                                                            }}
                                                            placeholder="Select Unit"
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
                                                                    label: "Customer 1",
                                                                },
                                                                {
                                                                    value: "2",
                                                                    label: "Customer 2",
                                                                },
                                                                {
                                                                    value: "3",
                                                                    label: "Customer 3",
                                                                },
                                                            ]}
                                                        />
                                                    </div>
                                                </div>

                                                {/* Checkout */}
                                                <div className="mt-6 mb-2  border-2 border-gray-300 ">
                                                    <div className="overflow-x-auto">
                                                        <table className=" w-full bg-white border-collapse text-[15px]">
                                                            <thead className=" rounded-t-lg">
                                                                <tr className="border-b-2 border-gray-300">
                                                                    <th className="w-1/6 text-center border-r-2 border-gray-300 py-2"></th>
                                                                    <th className="bg-blue-50 w-2/5 text-blue-600 text-center text-[17px] px-8 py-2 border-r-2 border-gray-300">
                                                                        Original
                                                                        Price
                                                                    </th>
                                                                    <th className="w-2/5 bg-violet-100 text-violet-600 text-center text-[17px] px-8 py-2">
                                                                        Converted
                                                                        Price
                                                                        (VND)
                                                                    </th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                <tr className="border-b-2 border-gray-300">
                                                                    <td className="font-semibold text-center  px-6 py-2 border-r-2 border-gray-300">
                                                                        Unit
                                                                        Price
                                                                    </td>
                                                                    <td className=" px-6 py-2 border-r-2 border-gray-300">
                                                                        <Input
                                                                            type="text"
                                                                            id="approval_type"
                                                                            placeholder="Enter Price"
                                                                            className="font-semibold"
                                                                        />
                                                                    </td>
                                                                    <td className="w-[200px] px-6 py-2">
                                                                        <Input
                                                                            type="text"
                                                                            id="approval_type"
                                                                            placeholder="Converted Price"
                                                                            className="font-semibold"
                                                                            readOnly={
                                                                                true
                                                                            }
                                                                        />
                                                                    </td>
                                                                </tr>
                                                                <tr className="border-b-2 border-gray-300">
                                                                    <td className="font-semibold text-center px-8 py-2 border-r-2 border-gray-300">
                                                                        VAT
                                                                        Amount
                                                                    </td>
                                                                    <td className="px-6 py-2 border-r-2 border-gray-300">
                                                                        <Input
                                                                            type="text"
                                                                            id="approval_type"
                                                                            placeholder="Original Price"
                                                                            className="font-semibold"
                                                                            readOnly={
                                                                                true
                                                                            }
                                                                        />
                                                                    </td>
                                                                    <td className=" px-6 py-2">
                                                                        <Input
                                                                            type="text"
                                                                            id="approval_type"
                                                                            placeholder="Converted Price"
                                                                            className="font-semibold"
                                                                            readOnly={
                                                                                true
                                                                            }
                                                                        />
                                                                    </td>
                                                                </tr>
                                                                <tr className="border-b-2 border-gray-300">
                                                                    <td className="font-semibold text-center px-8 py-2 border-r-2 border-gray-300">
                                                                        Before
                                                                        VAT
                                                                    </td>
                                                                    <td className="px-6 py-2 border-r-2 border-gray-300">
                                                                        <Input
                                                                            type="text"
                                                                            id="approval_type"
                                                                            placeholder="Original Price"
                                                                            className="font-semibold"
                                                                            readOnly={
                                                                                true
                                                                            }
                                                                        />
                                                                    </td>
                                                                    <td className=" px-6 py-2">
                                                                        <Input
                                                                            type="text"
                                                                            id="approval_type"
                                                                            placeholder="Converted Price"
                                                                            className="font-semibold"
                                                                            readOnly={
                                                                                true
                                                                            }
                                                                        />
                                                                    </td>
                                                                </tr>
                                                                <tr className="">
                                                                    <td className="font-semibold text-center  px-8 py-2 border-r-2 border-gray-300">
                                                                        After
                                                                        VAT
                                                                    </td>
                                                                    <td className=" px-6 py-2 border-r-2 border-gray-300">
                                                                        <Input
                                                                            type="text"
                                                                            id="approval_type"
                                                                            placeholder="Original Price"
                                                                            className="font-semibold"
                                                                            readOnly={
                                                                                true
                                                                            }
                                                                        />
                                                                    </td>
                                                                    <td className=" px-6 py-2">
                                                                        <Input
                                                                            type="text"
                                                                            id="approval_type"
                                                                            placeholder="Converted Price"
                                                                            className="font-semibold"
                                                                            readOnly={
                                                                                true
                                                                            }
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
                            ) : null}
                        </Modal>

                        {/* Allocate Modals */}
                        <Modal
                            title={"Approval Allocation"}
                            visible={isAllocateModalOpen}
                            onCancel={handleCloseAllocateModal}
                            centered
                            maskClosable={false}
                            width={680}
                            footer={[
                                <div className="flex items-center justify-end">
                                    <button
                                        className="p-2 px-4 font-medium text-[15px] bg-gray-100 hover:bg-gray-200 rounded-lg active:scale-[.87] active:duration-75 transition-all "
                                        onClick={handleCloseAllocateModal}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        className="p-2 px-8 ml-4 font-medium text-[15px] bg-[#3a6f41] text-white rounded-lg active:scale-[.87] active:duration-75 transition-all hover:bg-[#216721]"
                                        onClick={handleAllocateSave}
                                    >
                                        Save
                                    </button>
                                </div>,
                            ]}
                        >
                            <div className="pt-3">
                                <div className=" rounded-t-lg border-2 border-[#A3D1AD] ">
                                    <div className="  bg-[#d4f2d9]  rounded-t-lg flex items-center justify-start px-3 py-1.5">
                                        <div className="flex space-x-3 items-center text-[18px] font-bold py-1.5 ">
                                            <IoIosListBox className="w-6 h-6 text-[#3A6F41]" />
                                            <div>Sales Item List</div>
                                        </div>
                                    </div>
                                    <div className="overflow-x-auto">
                                        <table className=" w-full bg-white border-collapse">
                                            <thead className="bg-[#e6efe7]">
                                                <tr className="text-[15px]">
                                                    <th className=" min-w-[60px] max-h-[60px] bg-[#d4f2d9] border-2 border-l-0 border-[#99d2a4]  text-center py-2">
                                                        Customer Name
                                                    </th>
                                                    <th className="min-w-[50px] max-h-[50px] bg-[#d4f2d9] border-2 border-[#99d2a4] border-r-0 text-center px-8 py-2">
                                                        % Allocate
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td className="  border-l-0 border border-[#6a9e72] px-3 py-2">
                                                        <Input
                                                            type="text"
                                                            id="approval_type"
                                                            placeholder="Costumer 1"
                                                            className="font-semibold"
                                                            disabled={true}
                                                        />
                                                    </td>
                                                    <td className="  border border-r-0 border-[#6a9e72] px-3 py-2">
                                                        <Input
                                                            type="text"
                                                            id="approval_type"
                                                            placeholder="Enter % Allocate"
                                                            className="font-semibold"
                                                        />
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className=" border-l-0 border border-[#6a9e72] px-3 py-2">
                                                        <Input
                                                            type="text"
                                                            id="approval_type"
                                                            placeholder="Costumer 2"
                                                            className="font-semibold"
                                                            disabled={true}
                                                        />
                                                    </td>
                                                    <td className=" border border-r-0 border-[#6a9e72] px-3 py-2">
                                                        <Input
                                                            type="text"
                                                            id="approval_type"
                                                            placeholder="Enter % Allocate"
                                                            className="font-semibold"
                                                        />
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>

                                <div className="mt-6 border-dashed border-b-2 border-gray-300"></div>

                                <div className="mt-6 mb-3 rounded-t-lg border-2 border-[#A3D1AD] ">
                                    <div className="  bg-[#d4f2d9]  rounded-t-lg flex items-center justify-start px-3 py-1.5">
                                        <div className="flex space-x-3 items-center text-[18px] font-bold py-1.5 ">
                                            <IoIosListBox className="w-6 h-6 text-[#3A6F41]" />
                                            <div>Purchasing Item List</div>
                                        </div>
                                    </div>
                                    <div className="overflow-x-auto">
                                        <table className=" w-full bg-white border-collapse">
                                            <thead className="bg-[#e6efe7]">
                                                <tr className="text-[15px]">
                                                    <th className=" min-w-[60px] max-h-[60px] bg-[#d4f2d9] border-2 border-l-0 border-[#99d2a4]  text-center py-2">
                                                        Vendor
                                                    </th>
                                                    <th className="min-w-[50px] max-h-[50px] bg-[#d4f2d9] border-2 border-[#99d2a4] text-center px-8 py-2 border-r-0">
                                                        Unit Price
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td className="  border-l-0 border border-[#6a9e72] px-3 py-2">
                                                        <Input
                                                            type="text"
                                                            id="approval_type"
                                                            placeholder="Vendor 1"
                                                            className="font-semibold"
                                                            disabled={true}
                                                        />
                                                    </td>
                                                    <td className="  border border-r-0 border-[#6a9e72] px-3 py-2">
                                                        <Input
                                                            type="text"
                                                            id="approval_type"
                                                            placeholder="Enter Unit Price"
                                                            className="font-semibold"
                                                        />
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className="  border-l-0 border border-[#6a9e72] px-3 py-2">
                                                        <Input
                                                            type="text"
                                                            id="approval_type"
                                                            placeholder="Vendor 2"
                                                            className="font-semibold"
                                                            disabled={true}
                                                        />
                                                    </td>
                                                    <td className=" border border-r-0 border-[#6a9e72] px-3 py-2">
                                                        <Input
                                                            type="text"
                                                            id="approval_type"
                                                            placeholder="Enter Unit Price"
                                                            className="font-semibold"
                                                        />
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
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

export default ApprovalBusinessFMSCreate;
