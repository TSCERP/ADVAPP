import React, { useState, useEffect, useRef } from "react";

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
    Avatar,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";

import {
    IoReload,
    IoCopyOutline,
    IoCloudUpload,
    IoChatbubbleEllipsesOutline,
    IoChatboxOutline,
    IoEyeOutline,
    IoPrintOutline,
} from "react-icons/io5";
import { IoIosListBox } from "react-icons/io";
import { LuTrash2, LuPlus, LuSend, LuLink2, LuBook } from "react-icons/lu";
import {
    MdDeleteOutline,
    MdOutlineLink,
    MdOutlineCancel,
} from "react-icons/md";
import { AiOutlineSend, AiOutlineInfoCircle } from "react-icons/ai";
import { FaArrowUp, FaCheck, FaInfo, FaRedoAlt, FaLink } from "react-icons/fa";
import { TbSquareRoundedLetterC, TbSquareRoundedLetterS } from "react-icons/tb";
import { FaCircleDollarToSlot, FaRegCopy } from "react-icons/fa6";
import { BiEdit } from "react-icons/bi";

import { GrAttachment } from "react-icons/gr";
import moment from "moment";
import toast from "react-hot-toast";

import ApprovalComment from "../../../components/approval/ApprovalComment";
import Check from "../../../utils/icons/Check";
import formatBytes from "../../../utils/number/formatBytes";
import MentionTextArea from "../../../components/approval/MentionTextArea";

// Get instance variables
const { TextArea } = Input;
const oldTitle = document.title;
const newTitle = "View Approval Budget - Aeon Delight Vietnam";

function ApprovalBudgetView() {
    /**
     *  All constants defined here
     */
    const currentTime = moment().format("DD/MM/YYYY");
    const users = [
        {
            id: "isaac",
            display: "Isaac Newton",
        },
        {
            id: "sam",
            display: "Sam Victor",
        },
        {
            id: "emma",
            display: "emmanuel@nobody.com",
        },
    ];

    /**
     *  All states defined here
     */
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
    const [isPermitterCommentExpanding, setIsPermitterCommentExpanding] =
        useState(false);
    const [isApproverCommentExpanding, setIsApproverCommentExpanding] =
        useState(false);
    const [isApproverInfoModalOpen, setIsApproverInfoModalOpen] =
        useState(false);

    const [fileAttachment, setFileAttachment] = useState([]);

    const [costStartDate, setCostStartDate] = useState("");
    const [costEndDate, setCostEndDate] = useState("");

    const [permitterComment, setPermitterComment] = useState("");
    const [approverComment, setApproverComment] = useState("");

    /**
     *  All refs defined here
     */

    /**
     *  All functions defined here
     */

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
                    {/* Header */}
                    <div className="flex justify-between">
                        <div className="flex gap-3">
                            <span className="text-[27px] font-bold">
                                Approval Budget
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
                                    Budget Type
                                </label>
                                <Select
                                    disabled={true}
                                    className="w-full text-[15px] !font-normal !text-gray-900 !cursor-default"
                                    placeholder="Select Budget Type"
                                    filterOption={(input, option) =>
                                        (option?.label ?? "").includes(input)
                                    }
                                    options={[
                                        {
                                            value: "1",
                                            label: "SG&A /Revenue Direct",
                                        },
                                        {
                                            value: "2",
                                            label: "SG&A/Revenue Indirect",
                                        },
                                    ]}
                                    value={"1"}
                                />
                            </div>
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
                        </div>

                        <div className="mt-4 ">
                            <label className="block mb-2 text-[15px] font-semibold text-gray-900">
                                Subject
                            </label>
                            <TextArea
                                rows={4}
                                placeholder="Enter Subject Content"
                                className="w-full text-[15px] !font-normal !text-gray-900 !cursor-default"
                                disabled={true}
                                value={"Test 1"}
                            />
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

                        <div className="mt-4">
                            <div className="col-span-1">
                                <label className="block mb-2 text-[15px] font-semibold text-gray-900">
                                    Related Approval
                                </label>
                                <Input
                                    type="text"
                                    placeholder="Enter Related Approval URL Link"
                                    className="w-full text-[15px] !font-normal !text-gray-900 !cursor-default"
                                    disabled={true}
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-4 gap-4 mt-4">
                            <div className="col-span-1">
                                <label className="block mb-2 text-[15px] font-semibold text-gray-900">
                                    Start Date
                                </label>
                                <DatePicker
                                    className="w-full text-[15px] !font-normal !text-gray-900 !cursor-default"
                                    disabled={true}
                                    onChange={(date, dateString) => {
                                        setCostStartDate(dateString);
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
                                    onChange={(date, dateString) => {
                                        setCostEndDate(dateString);
                                    }}
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

                                                    <div className="mt-4 flex">
                                                        <div className="w-full">
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
                                                    <div className="mt-4 mb-2 border-2 border-gray-300">
                                                        <div className="overflow-x-auto">
                                                            <table className=" w-full bg-white border-collapse text-[15px]">
                                                                <thead className="text-[17px] rounded-t-lg">
                                                                    <tr className="border-b-2 border-gray-300">
                                                                        <th className="w-[80px] bg-[#D4F2D9] text-[#3A6F41] text-center border-r-2 border-gray-300 py-2">
                                                                            File
                                                                            No.
                                                                        </th>
                                                                        <th className="w-1/3 bg-[#D4F2D9] text-[#3A6F41] text-center text-[17px] px-8 py-2 border-r-2 border-gray-300">
                                                                            File
                                                                            Upload
                                                                        </th>
                                                                        <th className="w-2/5 bg-[#D4F2D9] text-[#3A6F41] text-center text-[17px] px-8 py-2">
                                                                            Description
                                                                        </th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    {fileAttachment.length >
                                                                    0 ? (
                                                                        fileAttachment.map(
                                                                            (
                                                                                f,
                                                                                idx
                                                                            ) => (
                                                                                <tr
                                                                                    className="border-b-2 border-gray-300"
                                                                                    key={
                                                                                        f.id
                                                                                    }
                                                                                >
                                                                                    <td className="font-semibold text-left  px-8 py-2 border-r-2 border-gray-300">
                                                                                        {idx +
                                                                                            1}
                                                                                    </td>
                                                                                    <td className="font-semibold text-left  px-8 py-2 border-r-2 border-gray-300">
                                                                                        <a
                                                                                            onClick={(
                                                                                                e
                                                                                            ) => {
                                                                                                e.preventDefault();
                                                                                                const fileURL =
                                                                                                    URL.createObjectURL(
                                                                                                        f.file
                                                                                                    );
                                                                                                window.open(
                                                                                                    fileURL
                                                                                                );
                                                                                            }}
                                                                                        >
                                                                                            {
                                                                                                f
                                                                                                    .file
                                                                                                    .name
                                                                                            }{" "}
                                                                                            {
                                                                                                " - "
                                                                                            }{" "}
                                                                                            {formatBytes(
                                                                                                f
                                                                                                    .file
                                                                                                    .size
                                                                                            )}
                                                                                        </a>
                                                                                    </td>
                                                                                    <td className="px-6 py-2 border-r-2 border-gray-300">
                                                                                        <TextArea
                                                                                            rows={
                                                                                                1
                                                                                            }
                                                                                            className="!text-black !cursor-default"
                                                                                            value={
                                                                                                f.description
                                                                                            }
                                                                                            // disabled={mode == "view"}
                                                                                            onChange={(
                                                                                                e
                                                                                            ) =>
                                                                                                setFileAttachment(
                                                                                                    fileAttachment.map(
                                                                                                        (
                                                                                                            file
                                                                                                        ) => {
                                                                                                            if (
                                                                                                                file.id ==
                                                                                                                f.id
                                                                                                            ) {
                                                                                                                return {
                                                                                                                    ...file,
                                                                                                                    description:
                                                                                                                        e
                                                                                                                            .target
                                                                                                                            .value,
                                                                                                                };
                                                                                                            } else
                                                                                                                return file;
                                                                                                        }
                                                                                                    )
                                                                                                )
                                                                                            }
                                                                                        />
                                                                                    </td>
                                                                                </tr>
                                                                            )
                                                                        )
                                                                    ) : (
                                                                        <tr>
                                                                            <td
                                                                                colSpan={
                                                                                    3
                                                                                }
                                                                                className="text-center font-semibold p-2"
                                                                            >
                                                                                No
                                                                                file
                                                                                attachment
                                                                            </td>
                                                                        </tr>
                                                                    )}
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

                        {/* Final Apporver Approval Info Modal */}
                        <Modal
                            title={"Approval Information"}
                            visible={isApproverInfoModalOpen}
                            onCancel={() => setIsApproverInfoModalOpen(false)}
                            centered
                            maskClosable={false}
                            width={680}
                            footer={[
                                <div className="flex items-center justify-end">
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
                                                            placeholder="Negotiator 1"
                                                            className="font-semibold"
                                                            disabled={true}
                                                        />
                                                    </td>
                                                    <td className="  border border-r-0 border-[#6a9e72] px-3 py-2">
                                                        <Input
                                                            type="text"
                                                            placeholder="Approved with condition"
                                                            className="font-semibold"
                                                        />
                                                    </td>
                                                    <td className="  border border-r-0 border-[#6a9e72] px-3 py-2">
                                                        <Input
                                                            type="text"
                                                            placeholder="10/12/2023"
                                                            className="font-semibold"
                                                        />
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className="  border-l-0 border border-[#6a9e72] px-3 py-2">
                                                        <Input
                                                            type="text"
                                                            placeholder="Negotiator 1"
                                                            className="font-semibold"
                                                            disabled={true}
                                                        />
                                                    </td>
                                                    <td className="  border border-r-0 border-[#6a9e72] px-3 py-2">
                                                        <Input
                                                            type="text"
                                                            placeholder="Approved"
                                                            className="font-semibold"
                                                        />
                                                    </td>
                                                    <td className="  border border-r-0 border-[#6a9e72] px-3 py-2">
                                                        <Input
                                                            type="text"
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
}

export default ApprovalBudgetView;
