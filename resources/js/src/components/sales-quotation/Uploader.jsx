import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useDropzone } from "react-dropzone";

import { IoCloudUpload } from "react-icons/io5";
import { LuTrash2 } from "react-icons/lu";

import formatBytes from "../../utils/number/formatBytes";

const Uploader = (props) => {
    const { id, files, changeCurrentFiles } = props;

    console.log(files);

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
                if (currentFiles.length + acceptedFiles.length > 7) {
                    toast("Only accept 7 files per row.");
                    return;
                } else {
                    setCurrentFiles([
                        ...currentFiles,
                        ...Array.from(acceptedFiles),
                    ]);
                }
            },
        });

    const [currentFiles, setCurrentFiles] = useState([]);

    const handleAttachmentFileChange = (event) => {
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
            setCurrentFiles([...currentFiles, ...Array.from(files)]);
        }
    };

    const handleRemoveAttachment = (idx) => {
        setCurrentFiles(currentFiles.filter((_, index) => index != idx));
        toast.success("File has been removed.");
    };

    useEffect(() => {
        changeCurrentFiles(currentFiles);
    }, [currentFiles]);

    return (
        <>
            <div className="overflow-x-auto">
                <div className="px-4 py-2 ">
                    <div
                        {...getRootProps({ className: "dropzone" })}
                        className={`p-8 rounded-xl border-2 border-dashed bg-[#bdffe43a] ${
                            isDragActive && "border-green-600"
                        }`}
                    >
                        <div className="flex flex-col items-center justify-center">
                            <IoCloudUpload className="w-12 h-12 text-[#c1c1c1]" />
                            <h2 className="font-semibold text-xl md:text-2xl">
                                Drag and drop file here
                            </h2>
                            <p className="my-2">
                                File supported: .pdf, .doc(x), .txt. Maximum 7
                                upload files. Maximum file upload size: 5MB
                            </p>
                            <input
                                id={id}
                                type="file"
                                className="hidden"
                                accept=".doc, .docx, .txt, .xls, .xlsx, .pdf, .jpg, .jpeg, .png, .gif"
                                onChange={(e) => handleAttachmentFileChange(e)}
                                multiple
                                {...getInputProps()}
                            ></input>
                            <label
                                // htmlFor={id}
                                onClick={open}
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
                                        <th className="w-[100px] bg-[#D4F2D9] text-[#3A6F41] text-center border-r-2 border-gray-300 py-2">
                                            File No.
                                        </th>
                                        <th className="w-2/3 bg-[#D4F2D9] text-[#3A6F41] text-center text-[17px] px-8 py-2 border-r-2 border-gray-300">
                                            File Upload
                                        </th>
                                        <th className="max-w-[100px] bg-[#D4F2D9] text-[#3A6F41] text-center text-[17px] px-8 py-2">
                                            Action
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentFiles.length > 0 ? (
                                        currentFiles.map((f, idx) => (
                                            <tr
                                                className="border-b-2 border-gray-300"
                                                key={idx}
                                            >
                                                <td className="font-semibold text-left  px-8 py-2 border-r-2 border-gray-300">
                                                    {idx + 1}
                                                </td>
                                                <td className="font-semibold text-left  px-8 py-2 border-r-2 border-gray-300">
                                                    <a
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            const fileURL =
                                                                URL.createObjectURL(
                                                                    f
                                                                );
                                                            window.open(
                                                                fileURL
                                                            );
                                                        }}
                                                    >
                                                        {f.name} {" - "}{" "}
                                                        {formatBytes(f.size)}
                                                    </a>
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
                                        ))
                                    ) : (
                                        <tr>
                                            <td
                                                colSpan={3}
                                                className="text-center font-semibold p-2"
                                            >
                                                No file attachment
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Uploader;
