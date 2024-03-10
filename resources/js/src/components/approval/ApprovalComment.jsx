import React, { useState } from "react";
import { Input, message, Button, Avatar, Divider, Popconfirm } from "antd";
import { IoChatboxOutline, IoDocumentTextSharp } from "react-icons/io5";
import { GrAttachment } from "react-icons/gr";
import { AiOutlineSend, AiOutlineInfoCircle } from "react-icons/ai";
import { UserOutlined } from "@ant-design/icons";
import toast from "react-hot-toast";
import MentionTextArea from "./MentionTextArea";

const tempUsers = [
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
    {
        id: "emma",
        display: "emmanuel@nobody.com",
    },
    {
        id: "emma",
        display: "emmanuel@nobody.com",
    },
    {
        id: "emma",
        display: "emmanuel@nobody.com",
    },
];

const tempComments = [
    {
        id: 1,
        userId: 111,
        name: "Trần Văn B",
        email: "tranvanb@gmail.com",
        type: "file",
        comment: "",
        file: {
            id: "file2",
            fileName: "Test2.docx",
            fileExtension: "docx",
            path: "",
            size: "23K",
        },

        createdDate: "21/12/2023 08:10",
    },
    {
        id: 2,
        userId: 111,
        name: "Trần Văn B",
        email: "tranvanb@gmail.com",
        type: "file",
        comment: "",
        file: {
            id: "file2",
            fileName: "Test2.docx",
            fileExtension: "docx",
            path: "",
            size: "523KB",
        },

        createdDate: "21/12/2023 08:10",
    },
    {
        id: 3,
        userId: 110,
        avatar: "https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg",
        name: "Trần Văn C",
        email: "tranvanc@gmail.com",
        type: "comment",
        comment:
            "Comment cái gì đó dài thật là dài Comment cái gì đó dài thật là dài Comment cái gì đó dài thật là dài Comment cái gì đó dài thật là dài 2",
        file: {},
        createdDate: "30/12/2023 08:10",
    },
    {
        id: 4,
        userId: 110,
        avatar: "https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg",
        name: "Trần Văn C",
        email: "tranvanc@gmail.com",
        type: "comment",
        comment:
            "test @[Isaac Newton](isaac) test2 @[Sam Victor](sam)@[emmanuel@nobody.com](emma) test 3 @[emmanuel@nobody.com](emma)",
        file: {},
        createdDate: "30/12/2023 08:10",
    },
];

const ApprovalComment = (props) => {
    const {
        key = Math.random(),
        borderless,
        isExpanded,
        tagUsers = tempUsers,
        comments = tempComments,
        postComment,
    } = props;

    // All state
    const [comment, setComment] = useState("");
    const [currentFiles, setCurrentFiles] = useState([]);

    // Functions
    const handleComment = () => {
        if (comment && comment != "") {
            console.log("Comment nè: ", comment);
            setComment("");
        }
    };

    const resoleTagFormatToHTMLRender = (inputString) => {
        const htmlString = inputString.replace(
            /\@\[([^\]]+)\]\(([^\)]+)\)/g,
            '<span class="text-blue-500 hover:text-blue-700 transition duration-300">@$1</span>'
        );
        return htmlString;
    };

    const confirmDeleteComment = (id) => {
        console.log("Delete comment nè!");
    };

    const handleFileChange = (event) => {
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

        // Xử lý các tác vụ khác nếu cần
        toast("Developing...");
    };

    return (
        <div
            className={`flex mb-6 ${!borderless && "border-2 border-t-0 border-gray-300" } space-x-2 justify-center bg-gray-50 py-2 text-[16px] ${
                isExpanded ? "expanded" : "collapsed"
            }`}
        >
            <div className="w-full h-full px-4">
                <div className="comment-header flex items-center gap-4">
                    <IoChatboxOutline size={22} />
                    <h1 className="text-xl font-semibold">Comments</h1>
                </div>
                <Divider className="mt-3 mb-4" />

                <div className="comment-boby flex flex-col gap-4 max-h-[600px] overflow-y-auto">
                    {comments && comments.length > 0 ? (
                        comments.map((childComment, _idx) => {
                            if (childComment.type == "comment") {
                                return (
                                    <div
                                        className={`flex gap-4 ${
                                            childComment.userId == 110 &&
                                            "flex-row-reverse"
                                        }`}
                                    >
                                        <Avatar
                                            src={
                                                childComment.avatar
                                                    ? `${childComment.avatar}`
                                                    : null
                                            }
                                            icon={
                                                !childComment.avatar && (
                                                    <UserOutlined />
                                                )
                                            }
                                            className="mt-3"
                                        />
                                        <div className="max-w-[50%]">
                                            <div className="bg-[#F1F1F1] rounded-lg py-3 px-4">
                                                <h3>
                                                    {childComment.name ||
                                                        childComment.email}
                                                </h3>
                                                <div
                                                    className="font-normal text-wrap"
                                                    dangerouslySetInnerHTML={{
                                                        __html: resoleTagFormatToHTMLRender(
                                                            childComment.comment
                                                        ),
                                                    }}
                                                />
                                            </div>
                                            <div
                                                className={`flex mt-1 ${
                                                    childComment.userId != 110
                                                        ? "justify-end w-full"
                                                        : "justify-between"
                                                }`}
                                            >
                                                {childComment.userId == 110 && (
                                                    <Popconfirm
                                                        title="Delete comment"
                                                        description="Are you sure to delete this comment? This action cannot be reversed"
                                                        okButtonProps={{
                                                            ghost: true,
                                                            danger: true,
                                                        }}
                                                        onConfirm={() =>
                                                            confirmDeleteComment(
                                                                childComment.id
                                                            )
                                                        }
                                                    >
                                                        <span className="text-sm text-red-600 font-normal cursor-pointer">
                                                            Delete
                                                        </span>
                                                    </Popconfirm>
                                                )}
                                                <span className="text-sm font-normal">
                                                    {childComment.createdDate}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                );
                            } else {
                                return (
                                    <div
                                        className={`flex gap-4 ${
                                            childComment.userId == 110 &&
                                            "flex-row-reverse"
                                        }`}
                                    >
                                        <Avatar
                                            src={
                                                childComment.avatar
                                                    ? `${childComment.avatar}`
                                                    : null
                                            }
                                            icon={
                                                !childComment.avatar && (
                                                    <UserOutlined />
                                                )
                                            }
                                            className="mt-3"
                                        />
                                        <div className="max-w-[50%]">
                                            <div className="bg-[#F1F1F1] rounded-lg py-3 px-4">
                                                <h3 className="">
                                                    {childComment.name ||
                                                        childComment.email}
                                                </h3>
                                                <a
                                                    href=""
                                                    download
                                                    className="flex items-center gap-4 mt-1 px-3 py-2 border border-[#8d8d8d6a] rounded-lg cursor-pointer hover:opacity-80 ease duration-50"
                                                >
                                                    <div className="flex justify-center items-center rounded-full p-1 bg-[#e0e0e0] w-8 h-8">
                                                        <IoDocumentTextSharp />
                                                    </div>
                                                    <div className="flex flex-col gap-1 min-w-[180px]">
                                                        <h3 className="text-sm font-semibold">
                                                            {
                                                                childComment
                                                                    .file
                                                                    .fileName
                                                            }
                                                        </h3>
                                                        <span className="font-normal text-xs">
                                                            {
                                                                childComment
                                                                    .file.size
                                                            }
                                                        </span>
                                                    </div>
                                                </a>
                                            </div>
                                            <div
                                                className={`flex mt-1 ${
                                                    childComment.userId != 110
                                                        ? "justify-end w-full"
                                                        : "justify-between"
                                                }`}
                                            >
                                                {childComment.userId == 110 && (
                                                    <Popconfirm
                                                        title="Delete comment"
                                                        description="Are you sure to delete this comment? This action cannot be reversed"
                                                        okText="Yes"
                                                        cancelText="No"
                                                    >
                                                        <span className="text-sm font-normal cursor-pointer text-red-600">
                                                            Delete
                                                        </span>
                                                    </Popconfirm>
                                                )}
                                                <span className="text-sm font-normal">
                                                    {childComment.createdDate}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                );
                            }
                        })
                    ) : (
                        <span>There was no comment yet.</span>
                    )}
                </div>

                <Divider className="mt-3 mb-4" />

                <div className="comment-footer">
                    <div className="relative bg-white flex items-center gap-4 p-3 rounded antd-textarea">
                        <MentionTextArea
                            placeholder="Type your comment"
                            tagList={tagUsers}
                            value={comment}
                            setValue={(value) => setComment(value)}
                            onEnter={(value) => {
                                setComment(value);
                                handleComment();
                            }}
                        />

                        <div className="flex gap-3 absolute top-1/2 -translate-y-1/2 right-4">
                            <input
                                id={`approval-comment-${key}-file`}
                                type="file"
                                multiple="multiple"
                                className="hidden"
                                accept=".doc, .docx, .txt, .xls, .xlsx, .pdf, .jpg, .jpeg, .png, .gif"
                                onChange={handleFileChange}
                            ></input>
                            <label
                                htmlFor={`approval-comment-${key}-file`}
                                className="cursor-pointer"
                            >
                                <GrAttachment size={22} />
                            </label>
                            <button onClick={() => handleComment()}>
                                <AiOutlineSend size={22} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ApprovalComment;
