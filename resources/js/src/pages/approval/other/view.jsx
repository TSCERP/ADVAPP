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
    IoWarningOutline,
} from "react-icons/io5";
import { IoIosListBox } from "react-icons/io";
import { LuTrash2, LuPlus, LuSave, LuLink2, LuPenSquare } from "react-icons/lu";
import { MdOutlineLink } from "react-icons/md";
import { AiOutlineSend, AiOutlineInfoCircle } from "react-icons/ai";
import { FaArrowUp, FaCheck, FaInfo, FaRedoAlt, FaLink } from "react-icons/fa";
import { TbSquareRoundedLetterC, TbSquareRoundedLetterS } from "react-icons/tb";
import { FaCircleDollarToSlot } from "react-icons/fa6";

import { GrAttachment } from "react-icons/gr";
import moment from "moment";
import toast from "react-hot-toast";

import MentionTextArea from "../../../components/approval/MentionTextArea";

// Get instance variables
const { TextArea } = Input;
const oldTitle = document.title;
const newTitle = "View Approval Budget - Aeon Delight Vietnam";

function ApprovalOtherView() {
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
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isAllocateModalOpen, setIsAllocateModalOpen] = useState(false);
    const [isPermitterCommentExpanding, setIsPermitterCommentExpanding] =
        useState(false);
    const [isApproverCommentExpanding, setIsApproverCommentExpanding] =
        useState(false);
    const [isApproverInfoModalOpen, setIsApproverInfoModalOpen] =
        useState(false);

    const [currentAction, setCurrentAction] = useState(null);

    const [salesStartDate, setSalesStartDate] = useState("");
    const [salesEndDate, setSalesEndDate] = useState("");
    const [costStartDate, setCostStartDate] = useState("");
    const [costEndDate, setCostEndDate] = useState("");

    const [permitterComment, setPermitterComment] = useState("");
    const [approverComment, setApproverComment] = useState("");
    const [negotiatorActions, setNegotiatorActions] = useState([
        {
            id: 1,
            comment: false,
            commentText: "",
            info: false,
        },
        {
            id: 2,
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
                            Approval Other
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
                        </div>

                        <div className="mt-4 flex gap-4">
                            <div className="w-full">
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
                                                                                            <div className="flex gap-2 items-center">
                                                                                                <Input
                                                                                                    type="text"
                                                                                                    id="approval_type"
                                                                                                    className="font-semibold"
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
                                                                    {isPermitterCommentExpanding && (
                                                                        <div
                                                                            className={`flex mb-6 border-2 border-t-0 border-gray-300 space-x-2 justify-center bg-gray-50 py-2 text-[16px] ${
                                                                                isPermitterCommentExpanding
                                                                                    ? "expanded"
                                                                                    : "collapsed"
                                                                            }`}
                                                                        >
                                                                            <div className="w-full px-4">
                                                                                <div className="comment-header flex items-center gap-4">
                                                                                    <IoChatboxOutline
                                                                                        size={
                                                                                            22
                                                                                        }
                                                                                    />
                                                                                    <h1 className="text-xl font-semibold">
                                                                                        Comments
                                                                                    </h1>
                                                                                </div>
                                                                                <Divider className="mt-3 mb-4" />
                                                                                <div className="comment-boby flex flex-col gap-4">
                                                                                    <div className="flex gap-4">
                                                                                        <Avatar
                                                                                            src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"
                                                                                            className="mt-3"
                                                                                        />
                                                                                        <div className="max-w-[50%]">
                                                                                            <div className="bg-[#F1F1F1] rounded-lg py-3 px-4">
                                                                                                <h3>
                                                                                                    Trần
                                                                                                    Văn
                                                                                                    B
                                                                                                </h3>
                                                                                                <div className="font-normal text-wrap">
                                                                                                    Comment
                                                                                                    cái
                                                                                                    gì
                                                                                                    đó
                                                                                                    dài
                                                                                                    thật
                                                                                                    là
                                                                                                    dài
                                                                                                    Comment
                                                                                                    cái
                                                                                                    gì
                                                                                                    đó
                                                                                                    dài
                                                                                                    thật
                                                                                                    là
                                                                                                    dài
                                                                                                    Comment
                                                                                                    cái
                                                                                                    gì
                                                                                                    đó
                                                                                                    dài
                                                                                                    thật
                                                                                                    là
                                                                                                    dài
                                                                                                    Comment
                                                                                                    cái
                                                                                                    gì
                                                                                                    đó
                                                                                                    dài
                                                                                                    thật
                                                                                                    là
                                                                                                    dài
                                                                                                </div>
                                                                                            </div>
                                                                                            <div className="flex justify-between mt-1">
                                                                                                <span className="text-sm font-normal cursor-pointer">
                                                                                                    Delete
                                                                                                </span>
                                                                                                <span className="text-sm font-normal">
                                                                                                    21/12/2023
                                                                                                    08:10
                                                                                                </span>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className="flex flex-row-reverse gap-4">
                                                                                        <Avatar
                                                                                            src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"
                                                                                            className="mt-3"
                                                                                        />
                                                                                        <div className="max-w-[50%]">
                                                                                            <div className="bg-[#F1F1F1] rounded-lg py-3 px-4">
                                                                                                <h3>
                                                                                                    Trần
                                                                                                    Văn
                                                                                                    B
                                                                                                </h3>
                                                                                                <div className="font-normal text-wrap">
                                                                                                    Comment
                                                                                                    cái
                                                                                                    gì
                                                                                                    đó
                                                                                                    dài
                                                                                                    thật
                                                                                                    là
                                                                                                    dài
                                                                                                    Comment
                                                                                                    cái
                                                                                                    gì
                                                                                                    đó
                                                                                                    dài
                                                                                                    thật
                                                                                                    là
                                                                                                    dài
                                                                                                    Comment
                                                                                                    cái
                                                                                                    gì
                                                                                                    đó
                                                                                                    dài
                                                                                                    thật
                                                                                                    là
                                                                                                    dài
                                                                                                    Comment
                                                                                                    cái
                                                                                                    gì
                                                                                                    đó
                                                                                                    dài
                                                                                                    thật
                                                                                                    là
                                                                                                    dài
                                                                                                </div>
                                                                                            </div>
                                                                                            <div className="flex justify-between mt-1">
                                                                                                <span className="text-sm font-normal cursor-pointer">
                                                                                                    Delete
                                                                                                </span>
                                                                                                <span className="text-sm font-normal">
                                                                                                    21/12/2023
                                                                                                    08:10
                                                                                                </span>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                                <Divider className="mt-3 mb-4" />
                                                                                <div className="comment-footer">
                                                                                    <div className="relative bg-white flex items-center gap-4 p-3 rounded antd-textarea">
                                                                                        {/* <textarea rows={2} className="text-normal w-[95%] focus:outline-none rounded" style={{ resize: "none" }}/> */}
                                                                                        <MentionTextArea
                                                                                            placeholder="Type your comment"
                                                                                            tagList={
                                                                                                users
                                                                                            }
                                                                                            value={
                                                                                                permitterComment
                                                                                            }
                                                                                            setValue={
                                                                                                setPermitterComment
                                                                                            }
                                                                                        />

                                                                                        <div className="flex gap-3 absolute top-1/2 -translate-y-1/2 right-4">
                                                                                            <button>
                                                                                                <GrAttachment
                                                                                                    size={
                                                                                                        22
                                                                                                    }
                                                                                                />
                                                                                            </button>
                                                                                            <button>
                                                                                                <AiOutlineSend
                                                                                                    size={
                                                                                                        22
                                                                                                    }
                                                                                                />
                                                                                            </button>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    )}
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
                                                                        Negotiators
                                                                    </h4>
                                                                    <div className="mt-2 mb-2  border-2 border-gray-300 ">
                                                                        <div className="overflow-x-auto overflow-y-visible no-scrollbar">
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
                                                                                            <div className="flex gap-2 items-center">
                                                                                                <Input
                                                                                                    type="text"
                                                                                                    id="approval_type"
                                                                                                    className="font-semibold"
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
                                                                                    {negotiatorActions[0]
                                                                                        .comment && (
                                                                                        <tr className="border-b-2 border-gray-300">
                                                                                            <td colSpan="5">
                                                                                                <div
                                                                                                    className={`flex pb-6 space-x-2 justify-center bg-gray-50 py-2 text-[16px] ${
                                                                                                        negotiatorActions[0]
                                                                                                            .comment
                                                                                                            ? "expanded"
                                                                                                            : "collapsed"
                                                                                                    }`}
                                                                                                >
                                                                                                    <div className="w-full px-4">
                                                                                                        <div className="comment-header flex items-center gap-4">
                                                                                                            <IoChatboxOutline
                                                                                                                size={
                                                                                                                    22
                                                                                                                }
                                                                                                            />
                                                                                                            <h1 className="text-xl font-semibold">
                                                                                                                Comments
                                                                                                            </h1>
                                                                                                        </div>
                                                                                                        <Divider className="mt-3 mb-4" />
                                                                                                        <div className="comment-boby flex flex-col gap-4">
                                                                                                            <div className="flex gap-4">
                                                                                                                <Avatar
                                                                                                                    src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"
                                                                                                                    className="mt-3"
                                                                                                                />
                                                                                                                <div className="max-w-[50%]">
                                                                                                                    <div className="bg-[#F1F1F1] rounded-lg py-3 px-4">
                                                                                                                        <h3>
                                                                                                                            Trần
                                                                                                                            Văn
                                                                                                                            B
                                                                                                                        </h3>
                                                                                                                        <div className="font-normal text-wrap">
                                                                                                                            Comment
                                                                                                                            cái
                                                                                                                            gì
                                                                                                                            đó
                                                                                                                            dài
                                                                                                                            thật
                                                                                                                            là
                                                                                                                            dài
                                                                                                                            Comment
                                                                                                                            cái
                                                                                                                            gì
                                                                                                                            đó
                                                                                                                            dài
                                                                                                                            thật
                                                                                                                            là
                                                                                                                            dài
                                                                                                                            Comment
                                                                                                                            cái
                                                                                                                            gì
                                                                                                                            đó
                                                                                                                            dài
                                                                                                                            thật
                                                                                                                            là
                                                                                                                            dài
                                                                                                                            Comment
                                                                                                                            cái
                                                                                                                            gì
                                                                                                                            đó
                                                                                                                            dài
                                                                                                                            thật
                                                                                                                            là
                                                                                                                            dài
                                                                                                                        </div>
                                                                                                                    </div>
                                                                                                                    <div className="flex justify-between mt-1">
                                                                                                                        <span className="text-sm font-normal cursor-pointer">
                                                                                                                            Delete
                                                                                                                        </span>
                                                                                                                        <span className="text-sm font-normal">
                                                                                                                            21/12/2023
                                                                                                                            08:10
                                                                                                                        </span>
                                                                                                                    </div>
                                                                                                                </div>
                                                                                                            </div>
                                                                                                            <div className="flex flex-row-reverse gap-4">
                                                                                                                <Avatar
                                                                                                                    src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"
                                                                                                                    className="mt-3"
                                                                                                                />
                                                                                                                <div className="max-w-[50%]">
                                                                                                                    <div className="bg-[#F1F1F1] rounded-lg py-3 px-4">
                                                                                                                        <h3>
                                                                                                                            Trần
                                                                                                                            Văn
                                                                                                                            B
                                                                                                                        </h3>
                                                                                                                        <div className="font-normal text-wrap">
                                                                                                                            Comment
                                                                                                                            cái
                                                                                                                            gì
                                                                                                                            đó
                                                                                                                            dài
                                                                                                                            thật
                                                                                                                            là
                                                                                                                            dài
                                                                                                                            Comment
                                                                                                                            cái
                                                                                                                            gì
                                                                                                                            đó
                                                                                                                            dài
                                                                                                                            thật
                                                                                                                            là
                                                                                                                            dài
                                                                                                                            Comment
                                                                                                                            cái
                                                                                                                            gì
                                                                                                                            đó
                                                                                                                            dài
                                                                                                                            thật
                                                                                                                            là
                                                                                                                            dài
                                                                                                                            Comment
                                                                                                                            cái
                                                                                                                            gì
                                                                                                                            đó
                                                                                                                            dài
                                                                                                                            thật
                                                                                                                            là
                                                                                                                            dài
                                                                                                                        </div>
                                                                                                                    </div>
                                                                                                                    <div className="flex justify-between mt-1">
                                                                                                                        <span className="text-sm font-normal cursor-pointer">
                                                                                                                            Delete
                                                                                                                        </span>
                                                                                                                        <span className="text-sm font-normal">
                                                                                                                            21/12/2023
                                                                                                                            08:10
                                                                                                                        </span>
                                                                                                                    </div>
                                                                                                                </div>
                                                                                                            </div>
                                                                                                        </div>
                                                                                                        <Divider className="mt-3 mb-4" />
                                                                                                        <div className="comment-footer">
                                                                                                            <div className="relative bg-white flex items-center gap-4 p-3 rounded antd-textarea">
                                                                                                                {/* <textarea rows={2} className="text-normal w-[95%] focus:outline-none rounded" style={{ resize: "none" }}/> */}
                                                                                                                <MentionTextArea
                                                                                                                    placeholder="Type your comment"
                                                                                                                    tagList={
                                                                                                                        users
                                                                                                                    }
                                                                                                                    value={
                                                                                                                        negotiatorActions[0]
                                                                                                                            .commentText
                                                                                                                    }
                                                                                                                    setValue={(
                                                                                                                        val
                                                                                                                    ) =>
                                                                                                                        setNegotiatorActions(
                                                                                                                            negotiatorActions.map(
                                                                                                                                (
                                                                                                                                    nego,
                                                                                                                                    indx
                                                                                                                                ) => {
                                                                                                                                    if (
                                                                                                                                        indx ==
                                                                                                                                        0
                                                                                                                                    ) {
                                                                                                                                        return {
                                                                                                                                            ...nego,
                                                                                                                                            commentText:
                                                                                                                                                val,
                                                                                                                                        };
                                                                                                                                    } else
                                                                                                                                        return nego;
                                                                                                                                }
                                                                                                                            )
                                                                                                                        )
                                                                                                                    }
                                                                                                                />

                                                                                                                <div className="flex gap-3 absolute top-1/2 -translate-y-1/2 right-4">
                                                                                                                    <button>
                                                                                                                        <GrAttachment
                                                                                                                            size={
                                                                                                                                22
                                                                                                                            }
                                                                                                                        />
                                                                                                                    </button>
                                                                                                                    <button>
                                                                                                                        <AiOutlineSend
                                                                                                                            size={
                                                                                                                                22
                                                                                                                            }
                                                                                                                        />
                                                                                                                    </button>
                                                                                                                </div>
                                                                                                            </div>
                                                                                                        </div>
                                                                                                    </div>
                                                                                                </div>
                                                                                            </td>
                                                                                        </tr>
                                                                                    )}
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
                                                                                            <div className="flex gap-2 items-center">
                                                                                                <Input
                                                                                                    type="text"
                                                                                                    id="approval_type"
                                                                                                    className="font-semibold"
                                                                                                />
                                                                                                <IoChatbubbleEllipsesOutline
                                                                                                    className="w-6 h-6 text-[#3A6F41] hover:cursor-pointer"
                                                                                                    onClick={() =>
                                                                                                        setNegotiatorActions(
                                                                                                            negotiatorActions.map(
                                                                                                                (
                                                                                                                    nego,
                                                                                                                    index
                                                                                                                ) => {
                                                                                                                    if (
                                                                                                                        index ==
                                                                                                                        1
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
                                                                                                        )
                                                                                                    }
                                                                                                />
                                                                                                <AiOutlineInfoCircle
                                                                                                    className="w-6 h-6 text-[#3A6F41] hover:cursor-pointer"
                                                                                                    onClick={() =>
                                                                                                        setNegotiatorActions(
                                                                                                            negotiatorActions.map(
                                                                                                                (
                                                                                                                    nego,
                                                                                                                    index
                                                                                                                ) => {
                                                                                                                    if (
                                                                                                                        index ==
                                                                                                                        1
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
                                                                                                        )
                                                                                                    }
                                                                                                />
                                                                                            </div>
                                                                                        </td>
                                                                                    </tr>
                                                                                    {negotiatorActions[1]
                                                                                        .comment && (
                                                                                        <tr className="border-b-2 border-gray-300">
                                                                                            <td colSpan="5">
                                                                                                <div
                                                                                                    className={`flex pb-6 border-gray-300 space-x-2 justify-center bg-gray-50 py-2 text-[16px] ${
                                                                                                        negotiatorActions[1]
                                                                                                            .comment
                                                                                                            ? "expanded"
                                                                                                            : "collapsed"
                                                                                                    }`}
                                                                                                >
                                                                                                    <div className="w-full px-4">
                                                                                                        <div className="comment-header flex items-center gap-4">
                                                                                                            <IoChatboxOutline
                                                                                                                size={
                                                                                                                    22
                                                                                                                }
                                                                                                            />
                                                                                                            <h1 className="text-xl font-semibold">
                                                                                                                Comments
                                                                                                            </h1>
                                                                                                        </div>
                                                                                                        <Divider className="mt-3 mb-4" />
                                                                                                        <div className="comment-boby flex flex-col gap-4">
                                                                                                            <div className="flex gap-4">
                                                                                                                <Avatar
                                                                                                                    src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"
                                                                                                                    className="mt-3"
                                                                                                                />
                                                                                                                <div className="max-w-[50%]">
                                                                                                                    <div className="bg-[#F1F1F1] rounded-lg py-3 px-4">
                                                                                                                        <h3>
                                                                                                                            Trần
                                                                                                                            Văn
                                                                                                                            B
                                                                                                                        </h3>
                                                                                                                        <div className="font-normal text-wrap">
                                                                                                                            Comment
                                                                                                                            cái
                                                                                                                            gì
                                                                                                                            đó
                                                                                                                            dài
                                                                                                                            thật
                                                                                                                            là
                                                                                                                            dài
                                                                                                                            Comment
                                                                                                                            cái
                                                                                                                            gì
                                                                                                                            đó
                                                                                                                            dài
                                                                                                                            thật
                                                                                                                            là
                                                                                                                            dài
                                                                                                                            Comment
                                                                                                                            cái
                                                                                                                            gì
                                                                                                                            đó
                                                                                                                            dài
                                                                                                                            thật
                                                                                                                            là
                                                                                                                            dài
                                                                                                                            Comment
                                                                                                                            cái
                                                                                                                            gì
                                                                                                                            đó
                                                                                                                            dài
                                                                                                                            thật
                                                                                                                            là
                                                                                                                            dài
                                                                                                                        </div>
                                                                                                                    </div>
                                                                                                                    <div className="flex justify-between mt-1">
                                                                                                                        <span className="text-sm font-normal cursor-pointer">
                                                                                                                            Delete
                                                                                                                        </span>
                                                                                                                        <span className="text-sm font-normal">
                                                                                                                            21/12/2023
                                                                                                                            08:10
                                                                                                                        </span>
                                                                                                                    </div>
                                                                                                                </div>
                                                                                                            </div>
                                                                                                            <div className="flex flex-row-reverse gap-4">
                                                                                                                <Avatar
                                                                                                                    src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"
                                                                                                                    className="mt-3"
                                                                                                                />
                                                                                                                <div className="max-w-[50%]">
                                                                                                                    <div className="bg-[#F1F1F1] rounded-lg py-3 px-4">
                                                                                                                        <h3>
                                                                                                                            Trần
                                                                                                                            Văn
                                                                                                                            B
                                                                                                                        </h3>
                                                                                                                        <div className="font-normal text-wrap">
                                                                                                                            Comment
                                                                                                                            cái
                                                                                                                            gì
                                                                                                                            đó
                                                                                                                            dài
                                                                                                                            thật
                                                                                                                            là
                                                                                                                            dài
                                                                                                                            Comment
                                                                                                                            cái
                                                                                                                            gì
                                                                                                                            đó
                                                                                                                            dài
                                                                                                                            thật
                                                                                                                            là
                                                                                                                            dài
                                                                                                                            Comment
                                                                                                                            cái
                                                                                                                            gì
                                                                                                                            đó
                                                                                                                            dài
                                                                                                                            thật
                                                                                                                            là
                                                                                                                            dài
                                                                                                                            Comment
                                                                                                                            cái
                                                                                                                            gì
                                                                                                                            đó
                                                                                                                            dài
                                                                                                                            thật
                                                                                                                            là
                                                                                                                            dài
                                                                                                                        </div>
                                                                                                                    </div>
                                                                                                                    <div className="flex justify-between mt-1">
                                                                                                                        <span className="text-sm font-normal cursor-pointer">
                                                                                                                            Delete
                                                                                                                        </span>
                                                                                                                        <span className="text-sm font-normal">
                                                                                                                            21/12/2023
                                                                                                                            08:10
                                                                                                                        </span>
                                                                                                                    </div>
                                                                                                                </div>
                                                                                                            </div>
                                                                                                        </div>
                                                                                                        <Divider className="mt-3 mb-4" />
                                                                                                        <div className="comment-footer">
                                                                                                            <div className="relative bg-white flex items-center gap-4 p-3 rounded antd-textarea">
                                                                                                                {/* <textarea rows={2} className="text-normal w-[95%] focus:outline-none rounded" style={{ resize: "none" }}/> */}
                                                                                                                <MentionTextArea
                                                                                                                    placeholder="Type your comment"
                                                                                                                    tagList={
                                                                                                                        users
                                                                                                                    }
                                                                                                                    value={
                                                                                                                        negotiatorActions[1]
                                                                                                                            .commentText
                                                                                                                    }
                                                                                                                    setValue={(
                                                                                                                        val
                                                                                                                    ) =>
                                                                                                                        setNegotiatorActions(
                                                                                                                            negotiatorActions.map(
                                                                                                                                (
                                                                                                                                    nego,
                                                                                                                                    indx
                                                                                                                                ) => {
                                                                                                                                    if (
                                                                                                                                        indx ==
                                                                                                                                        1
                                                                                                                                    ) {
                                                                                                                                        return {
                                                                                                                                            ...nego,
                                                                                                                                            commentText:
                                                                                                                                                val,
                                                                                                                                        };
                                                                                                                                    } else
                                                                                                                                        return nego;
                                                                                                                                }
                                                                                                                            )
                                                                                                                        )
                                                                                                                    }
                                                                                                                />

                                                                                                                <div className="flex gap-3 absolute top-1/2 -translate-y-1/2 right-4">
                                                                                                                    <button>
                                                                                                                        <GrAttachment
                                                                                                                            size={
                                                                                                                                22
                                                                                                                            }
                                                                                                                        />
                                                                                                                    </button>
                                                                                                                    <button>
                                                                                                                        <AiOutlineSend
                                                                                                                            size={
                                                                                                                                22
                                                                                                                            }
                                                                                                                        />
                                                                                                                    </button>
                                                                                                                </div>
                                                                                                            </div>
                                                                                                        </div>
                                                                                                    </div>
                                                                                                </div>
                                                                                            </td>
                                                                                        </tr>
                                                                                    )}
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
                                                                    className="static -top-0.5 z-10 -ml-3.5 h-7 w-7 rounded-full text-[#3A6F41]"
                                                                >
                                                                    <path
                                                                        fillRule="evenodd"
                                                                        d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                                                                        clipRule="evenodd"
                                                                    />
                                                                </svg>
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
                                                                                            <div className="flex gap-2 items-center">
                                                                                                <Input
                                                                                                    type="text"
                                                                                                    id="approval_type"
                                                                                                    className="font-semibold"
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
                                                                    {isApproverCommentExpanding && (
                                                                        <div
                                                                            className={`flex mb-6 border-2 border-t-0 border-gray-300 space-x-2 justify-center bg-gray-50 py-2 text-[16px] ${
                                                                                isApproverCommentExpanding
                                                                                    ? "expanded"
                                                                                    : "collapsed"
                                                                            }`}
                                                                        >
                                                                            <div className="w-full px-4">
                                                                                <div className="comment-header flex items-center gap-4">
                                                                                    <IoChatboxOutline
                                                                                        size={
                                                                                            22
                                                                                        }
                                                                                    />
                                                                                    <h1 className="text-xl font-semibold">
                                                                                        Comments
                                                                                    </h1>
                                                                                </div>
                                                                                <Divider className="mt-3 mb-4" />
                                                                                <div className="comment-boby flex flex-col gap-4">
                                                                                    <div className="flex gap-4">
                                                                                        <Avatar
                                                                                            src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"
                                                                                            className="mt-3"
                                                                                        />
                                                                                        <div className="max-w-[50%]">
                                                                                            <div className="bg-[#F1F1F1] rounded-lg py-3 px-4">
                                                                                                <h3>
                                                                                                    Trần
                                                                                                    Văn
                                                                                                    B
                                                                                                </h3>
                                                                                                <div className="font-normal text-wrap">
                                                                                                    Comment
                                                                                                    cái
                                                                                                    gì
                                                                                                    đó
                                                                                                    dài
                                                                                                    thật
                                                                                                    là
                                                                                                    dài
                                                                                                    Comment
                                                                                                    cái
                                                                                                    gì
                                                                                                    đó
                                                                                                    dài
                                                                                                    thật
                                                                                                    là
                                                                                                    dài
                                                                                                    Comment
                                                                                                    cái
                                                                                                    gì
                                                                                                    đó
                                                                                                    dài
                                                                                                    thật
                                                                                                    là
                                                                                                    dài
                                                                                                    Comment
                                                                                                    cái
                                                                                                    gì
                                                                                                    đó
                                                                                                    dài
                                                                                                    thật
                                                                                                    là
                                                                                                    dài
                                                                                                </div>
                                                                                            </div>
                                                                                            <div className="flex justify-between mt-1">
                                                                                                <span className="text-sm font-normal cursor-pointer">
                                                                                                    Delete
                                                                                                </span>
                                                                                                <span className="text-sm font-normal">
                                                                                                    21/12/2023
                                                                                                    08:10
                                                                                                </span>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className="flex flex-row-reverse gap-4">
                                                                                        <Avatar
                                                                                            src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"
                                                                                            className="mt-3"
                                                                                        />
                                                                                        <div className="max-w-[50%]">
                                                                                            <div className="bg-[#F1F1F1] rounded-lg py-3 px-4">
                                                                                                <h3>
                                                                                                    Trần
                                                                                                    Văn
                                                                                                    B
                                                                                                </h3>
                                                                                                <div className="font-normal text-wrap">
                                                                                                    Comment
                                                                                                    cái
                                                                                                    gì
                                                                                                    đó
                                                                                                    dài
                                                                                                    thật
                                                                                                    là
                                                                                                    dài
                                                                                                    Comment
                                                                                                    cái
                                                                                                    gì
                                                                                                    đó
                                                                                                    dài
                                                                                                    thật
                                                                                                    là
                                                                                                    dài
                                                                                                    Comment
                                                                                                    cái
                                                                                                    gì
                                                                                                    đó
                                                                                                    dài
                                                                                                    thật
                                                                                                    là
                                                                                                    dài
                                                                                                    Comment
                                                                                                    cái
                                                                                                    gì
                                                                                                    đó
                                                                                                    dài
                                                                                                    thật
                                                                                                    là
                                                                                                    dài
                                                                                                </div>
                                                                                            </div>
                                                                                            <div className="flex justify-between mt-1">
                                                                                                <span className="text-sm font-normal cursor-pointer">
                                                                                                    Delete
                                                                                                </span>
                                                                                                <span className="text-sm font-normal">
                                                                                                    21/12/2023
                                                                                                    08:10
                                                                                                </span>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                                <Divider className="mt-3 mb-4" />
                                                                                <div className="comment-footer">
                                                                                    <div className="relative bg-white flex items-center gap-4 p-3 rounded antd-textarea">
                                                                                        {/* <textarea rows={2} className="text-normal w-[95%] focus:outline-none rounded" style={{ resize: "none" }}/> */}
                                                                                        <MentionTextArea
                                                                                            placeholder="Type your comment"
                                                                                            tagList={
                                                                                                users
                                                                                            }
                                                                                            value={
                                                                                                approverComment
                                                                                            }
                                                                                            setValue={
                                                                                                setApproverComment
                                                                                            }
                                                                                        />

                                                                                        <div className="flex gap-3 absolute top-1/2 -translate-y-1/2 right-4">
                                                                                            <button>
                                                                                                <GrAttachment
                                                                                                    size={
                                                                                                        22
                                                                                                    }
                                                                                                />
                                                                                            </button>
                                                                                            <button>
                                                                                                <AiOutlineSend
                                                                                                    size={
                                                                                                        22
                                                                                                    }
                                                                                                />
                                                                                            </button>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    )}
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
                                                    <div className="p-8 rounded-xl border-2 border-dashed bg-[#bdffe43a]">
                                                        <div className="flex flex-col items-center justify-center">
                                                            <IoCloudUpload className="w-12 h-12 text-[#c1c1c1]" />
                                                            <h2 className="font-semibold text-xl md:text-2xl">
                                                                Drag and drop
                                                                file here
                                                            </h2>
                                                            <p className="my-2">
                                                                File supported:
                                                                PDF, DOCX.
                                                                Maximum 7 upload
                                                                files. Maximum
                                                                file upload
                                                                size: 5MB
                                                            </p>
                                                            <input
                                                                id="upload-budget-attachment"
                                                                type="file"
                                                                className="hidden"
                                                            ></input>
                                                            <label htmlFor="upload-budget-attachment">
                                                                <button className="p-2 px-4 mt-2 font-medium text-[15px] bg-[#3a6f41] text-white rounded-lg active:scale-[.87] active:duration-75 transition-all hover:bg-[#216721]">
                                                                    Choose File
                                                                </button>
                                                            </label>
                                                        </div>
                                                    </div>
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
                                                                        <th className="max-w-[100px] bg-[#D4F2D9] text-[#3A6F41] text-center text-[17px] px-8 py-2">
                                                                            Action
                                                                        </th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    <tr className="border-b-2 border-gray-300">
                                                                        <td className="font-semibold text-left  px-8 py-2 border-r-2 border-gray-300">
                                                                            1
                                                                        </td>
                                                                        <td className="font-semibold text-left  px-8 py-2 border-r-2 border-gray-300">
                                                                            <a>
                                                                                Test
                                                                                1
                                                                            </a>
                                                                        </td>
                                                                        <td className="px-6 py-2 border-r-2 border-gray-300">
                                                                            <Input
                                                                                type="text"
                                                                                id="attachment_description"
                                                                                className="font-semibold"
                                                                            />
                                                                        </td>
                                                                        <td className="px-6 py-2">
                                                                            <div className="flex w-fit m-auto flex-row-reverse">
                                                                                <button className="text-[#B83232] p-1.5 rounded-full hover:bg-[#feebeb] font-medium active:scale-[.87] active:duration-75 transition-all">
                                                                                    <LuTrash2 className="w-5 h-5" />
                                                                                </button>
                                                                            </div>
                                                                        </td>
                                                                    </tr>
                                                                    <tr className="border-b-2 border-gray-300">
                                                                        <td className="font-semibold text-left  px-8 py-2 border-r-2 border-gray-300">
                                                                            2
                                                                        </td>
                                                                        <td className="font-semibold text-left  px-8 py-2 border-r-2 border-gray-300">
                                                                            <a>
                                                                                Test
                                                                                1
                                                                            </a>
                                                                        </td>
                                                                        <td className="px-6 py-2 border-r-2 border-gray-300">
                                                                            <Input
                                                                                type="text"
                                                                                id="attachment_description"
                                                                                className="font-semibold"
                                                                            />
                                                                        </td>
                                                                        <td className="px-6 py-2">
                                                                            <div className="flex w-fit m-auto flex-row-reverse">
                                                                                <button className="text-[#B83232] p-1.5 rounded-full hover:bg-[#feebeb] font-medium active:scale-[.87] active:duration-75 transition-all">
                                                                                    <LuTrash2 className="w-5 h-5" />
                                                                                </button>
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

                        {/* Negotiator Approval Info Modal */}
                        <Modal
                            title={"Approval Information"}
                            visible={negotiatorActions.some(
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
                                <div className="flex items-center justify-end">
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
}

export default ApprovalOtherView;
