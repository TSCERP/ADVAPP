import React, { useState, useEffect, useRef } from "react";
import moment from "moment";
import toast from "react-hot-toast";
import { nanoid } from "nanoid";
import { useDropzone } from "react-dropzone";
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
} from "antd";
import { UploadOutlined } from "@ant-design/icons";

import { IoReload, IoCopyOutline, IoCloudUpload } from "react-icons/io5";
import { IoIosListBox } from "react-icons/io";
import { LuTrash2, LuPlus, LuSave, LuLink2, LuPenSquare } from "react-icons/lu";
import { MdOutlineLink } from "react-icons/md";
import { FaArrowUp, FaCheck, FaInfo, FaRedoAlt, FaLink } from "react-icons/fa";
import { TbSquareRoundedLetterC, TbSquareRoundedLetterS } from "react-icons/tb";
import { FaCircleDollarToSlot } from "react-icons/fa6";

import formatBytes from "../../../utils/number/formatBytes";

// Get instance variables
const { TextArea } = Input;
const oldTitle = document.title;
const newTitle = "Edit Approval Budget - Aeon Delight Vietnam";

const ApprovalBudgetEdit = () => {
    /**
     *  All constants defined here
     */
    const currentTime = moment().format("DD/MM/YYYY");

    /**
     *  All hooks defined here
     */
    const { getRootProps, getInputProps, open, isDragActive, acceptedFiles } =
        useDropzone({
            noClick: true,
            noKeyboard: true,
            accept: {
                "application/msword": [".doc"],
                "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
                    [".docx"],
                "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
                    [".xls", ".xlsx"],
                "text/plain": [".txt"],
                "application/vnd.ms-excel": [".xls"],
                "application/pdf": [".pdf"],
                "image/jpeg": [".jpg", ".jpeg"],
                "image/png": [".png"],
                "image/gif": [".gif"],
            },
            maxFiles: 7,
            maxSize: 5 * 1024 * 1024,
            onDropRejected: (rejectedFiles) => {
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

                console.log("File(s) rejected:", rejectedFiles);

                for (let i = 0; i < rejectedFiles.length; i++) {
                    const file = rejectedFiles[i];

                    // Kiểm tra loại file
                    if (!allowedFileTypes.includes(file.type)) {
                        toast.error(
                            "Accepted doc, docx, txt, excel, pdf, image only"
                        );
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
            },
            onDrop: (acceptedFiles) => {
                if (fileAttachment.length + acceptedFiles.length > 7) {
                    toast("Only accept 7 files upload.");
                    return;
                } else {
                    // Tạo mảng mới với các đối tượng mới
                    const newFileAttachments = Array.from(acceptedFiles).map(
                        (file) => ({
                            id: nanoid(8),
                            description: "",
                            file: file,
                        })
                    );

                    // Cập nhật state
                    setFileAttachment([
                        ...fileAttachment,
                        ...newFileAttachments,
                    ]);
                }
            },
        });

    /**
     *  All states defined here
     */
    const [permitter, setPermitter] = useState(null);
    const [approver, setApprover] = useState(null);
    const [fileAttachment, setFileAttachment] = useState([]);

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
    const handleAttachmentFileChange = (event) => {
        const fileInput = event.target;

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

            if (!allowedFileTypes.includes(file.type)) {
                toast.error("Accepted doc, docx, txt, excel, pdf, image only");
                fileInput.value = "";
                return;
            }

            if (file.size > maxSize) {
                alert(`File ${file.name} is larger than 5MB.`);
                fileInput.value = "";
                return;
            }
        }

        const files = event.target.files;

        // Tạo mảng mới với các đối tượng mới
        const newFileAttachments = Array.from(files).map((file) => ({
            id: nanoid(8),
            description: "",
            file: file,
        }));

        // Cập nhật state
        setFileAttachment([...fileAttachment, ...newFileAttachments]);
    };

    const handleRemoveAttachment = (idx) => {
        setFileAttachment(fileAttachment.filter((_, index) => index != idx));
        toast.success("File has been removed.");
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
                            Edit Approval Budget
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
                                    Budget Type
                                </label>
                                <Select
                                    showSearch
                                    allowClear
                                    className="w-full text-[15px]"
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
                                />
                            </div>
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

                        <div className="mt-4">
                            <label className="block mb-2 text-[15px] font-semibold text-gray-900">
                                Subject
                            </label>
                            <TextArea
                                rows={4}
                                placeholder="Enter Subject Content"
                                className="w-full"
                            />
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

                        <div className="grid grid-cols-4 gap-4 mt-4">
                            <div className="col-span-1">
                                <label className="block mb-2 text-[15px] font-semibold text-gray-900">
                                    Start Date
                                </label>
                                <DatePicker
                                    className="w-full text-[15px]"
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
                                    className="w-full text-[15px]"
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
                                                                                                rows={
                                                                                                    1
                                                                                                }
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

                                                    <div className="mt-4 flex">
                                                        <div className="w-full">
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
                                                    <div {...getRootProps({
                                                            className:
                                                                "dropzone",
                                                        })}
                                                        className={`p-8 rounded-xl border-2 border-dashed bg-[#bdffe43a] ${
                                                            isDragActive &&
                                                            "border-green-600"
                                                        }`}>
                                                        <div className="flex flex-col items-center justify-center">
                                                            <IoCloudUpload className="w-12 h-12 text-[#c1c1c1]" />
                                                            <h2 className="font-semibold text-xl md:text-2xl">
                                                                Drag and drop
                                                                file here
                                                            </h2>
                                                            <p className="my-2">
                                                                File supported:
                                                                .pdf, .doc(x),
                                                                .txt. Maximum 7
                                                                upload files.
                                                                Maximum file
                                                                upload size: 5MB
                                                            </p>
                                                            <input
                                                                id="upload-budget-attachment"
                                                                type="file"
                                                                className="hidden"
                                                                accept=".doc, .docx, .txt, .xls, .xlsx, .pdf, .jpg, .jpeg, .png, .gif"
                                                                // onChange={(e) =>
                                                                //     handleAttachmentFileChange(
                                                                //         e
                                                                //     )
                                                                // }
                                                                multiple
                                                                {...getInputProps()}
                                                            ></input>
                                                            <label
                                                                htmlFor="upload-budget-attachment"
                                                                className="p-2 px-4 mt-2 font-medium text-[15px] bg-[#3a6f41] text-white rounded-lg cursor-pointer active:scale-[.87] active:duration-75 transition-all hover:bg-[#216721]"
                                                            >
                                                                Choose File
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
                                                                                    <td className="px-6 py-2">
                                                                                        <div className="flex w-fit m-auto flex-row-reverse">
                                                                                            <button
                                                                                                onClick={() =>
                                                                                                    handleRemoveAttachment(
                                                                                                        idx
                                                                                                    )
                                                                                                }
                                                                                                className="text-[#B83232] p-1.5 rounded-full hover:bg-[#feebeb] font-medium active:scale-[.87] active:duration-75 transition-all"
                                                                                            >
                                                                                                <LuTrash2 className="w-5 h-5" />
                                                                                            </button>
                                                                                        </div>
                                                                                    </td>
                                                                                </tr>
                                                                            )
                                                                        )
                                                                    ) : (
                                                                        <tr>
                                                                            <td
                                                                                colSpan={
                                                                                    4
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
        </>
    );
};

export default ApprovalBudgetEdit;
