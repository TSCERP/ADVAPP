import React, {
    useState,
    useEffect,
    useRef,
    useCallback,
    forwardRef,
} from "react";
import {
    Input,
    Modal,
    Select,
    message,
    Upload,
    Button,
    Avatar,
    Checkbox,
    Tabs,
    DatePicker,
    Space,
    Divider,
} from "antd";
import { useDropzone } from "react-dropzone";
import { Link, useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

import { FaCamera } from "react-icons/fa";
import { LuTrash2, LuPlus, LuSave, LuLink2 } from "react-icons/lu";
import { UserOutlined } from "@ant-design/icons";
import { MdDisabledVisible, MdDeleteOutline } from "react-icons/md";

import DefaultAvatar from "../../assets/images/Default-Avatar.png";

const { TextArea } = Input;
const oldTitle = document.title;
const newTitle_view = "User Information - Aeon Delight Vietnam";
const newTitle_edit = "Edit User Information - Aeon Delight Vietnam";

function UserProfile({ mode }) {
    const { userId } = useParams();
    const navigate = useNavigate();

    const fileInputRef = useRef();
    const authorizationInputRef = useRef(null);
    const branchSelectRef = useRef(null);
    const sapIdSelectRef = useRef(null);
    const factorySelectRef = useRef(null);

    const [isFirstLoading, setIsFirstLoading] = useState(true);
    const [roles, setRoles] = useState([]);
    const [branches, setBranches] = useState([]);
    const [sapId, setSapId] = useState([]);
    const [factoryLoading, setFactoryLoading] = useState(false);
    const [factories, setFactories] = useState([]);

    const [formKey, setFormKey] = useState(0);
    // const { user, setUser } = useAppContext();
    const [loading, setLoading] = useState(false);

    const [avatarLoading, setAvatarLoading] = useState(false);

    const [avatar, setAvatar] = useState({
        file: null,
        imgSrc: DefaultAvatar,
        autoImg: null,
    });

    const [hasChanged, setHasChanged] = useState(false);

    const [originalAvatar, setOriginalAvatar] = useState(null);

    const [selectedFile, setSelectedFile] = useState(null);

    const [userInfo, setUserInfo] = useState({
        EmployeeCode: "111",
        FirstName: "Test",
        LastName: "Test",
        Title: "",
        Email: "",
        IsSupperadm: false,
        IsNego: false,
        IsActive: true,
        IntegrationKey: "1",
        Division: "",
        Department: "",
        Team: "",
        Section: "",
        Branch: "",
        Location: "",
        UserRole: ["admin", "client"],
    });

    const [originalInfo, setOriginalInfo] = useState(null);

    const [signature, setSignature] = useState(null);
    const [previewSignature, setPreviewSignature] = useState(null);

    const handleChangeAvatar = (event) => {
        setAvatarLoading(true);
        const file = event.target.files[0];
        setSelectedFile(file);
        const reader = new FileReader();

        reader.onload = (event) => {
            const imgSrc = event.target.result;
            setAvatar({
                ...avatar,
                file: file,
                imgSrc: imgSrc,
            });
        };

        reader.readAsDataURL(file);
        setAvatarLoading(false);
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop: (acceptedFiles, rejectedFiles) => {
            if (rejectedFiles && rejectedFiles.length > 0) {
                toast.error("Chỉ được upload file hình ảnh");
            } else {
                const imageFile = acceptedFiles[0];
                // Kiểm tra kích thước
                if (imageFile.size > 2 * 1024 * 1024) {
                    toast.error("Vui lòng chọn hình có kích thước <= 2MB.");
                    return;
                }
                setSignature(imageFile);
                const reader = new FileReader();
                reader.onload = () => {
                    const previewUrl = reader.result;
                    setPreviewSignature(previewUrl);
                };
                reader.readAsDataURL(imageFile);
            }
        },
        accept: "image/*",
        multiple: false,
    });

    const blobToBase64 = (blob) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => {
                const base64String = reader.result.split(",")[1];
                resolve(base64String);
            };
            reader.onerror = () => {
                reject(new Error("Chuyển đổi Blob thành Base64 thất bại."));
            };
            reader.readAsDataURL(blob);
        });
    };

    // const handleDeleteAvatar = async () => {
    //     setAvatar({
    //         ...avatar,
    //         file: null,
    //         imgSrc: null,
    //     });

    //     if (selectedFile) {
    //         setSelectedFile(null);
    //     }

    //     if (!avatar.autoImg) {
    //         if (input.lastName && input.firstName) {
    //             setAvatarLoading(true);
    //             const tempName =
    //                 input.lastName.trim().charAt(0) +
    //                 input.firstName.trim().charAt(0);
    //             const base64 = await getAutoAvatar(tempName);
    //             setAvatar({
    //                 autoImg: base64,
    //                 file: null,
    //                 imgSrc: null,
    //             });
    //             setAvatarLoading(false);
    //         }
    //     } else {
    //         setAvatar({
    //             autoImg: avatar.autoImg,
    //             file: null,
    //             imgSrc: null,
    //         });
    //     }
    // };

    // const handleSignOut = async () => {
    //     try {
    //         const res = await usersApi.signOut();
    //         localStorage.removeItem("userInfo");
    //         Cookies.remove("isAuthenticated");
    //         setUser(null);
    //         toast.success("Vui lòng đăng nhập để tiếp tục");
    //     } catch (error) {
    //         console.error(error);
    //         localStorage.removeItem("userInfo");
    //         Cookies.remove("isAuthenticated");
    //         setUser(null);
    //         toast.success("Vui lòng đăng nhập để tiếp tục");
    //     }
    // };

    // const handleFormSubmit = async (values) => {
    //     const updatedValues = { ...values };
    //     const { password: newPassword, ...updatedInfo } = values;
    //     const { password: oldPassword, ...oldInfo } = originalInfo;
    //     const isChanged = areObjectsEqual(updatedInfo, oldInfo);

    //     if (!isChanged || newPassword || originalAvatar != avatar.file) {
    //         setLoading(true);
    //         if (selectedFile) {
    //             if (selectedFile instanceof File) {
    //                 updatedValues.avatar = selectedFile;
    //             }
    //         } else if (
    //             avatar.file == originalAvatar ||
    //             avatar.imgSrc == originalAvatar
    //         ) {
    //             updatedValues.avatar = "";
    //             delete updatedValues.avatar;
    //         } else {
    //             updatedValues.avatar = -1;
    //         }

    //         // console.log("Updated values: ", updatedValues);

    //         try {
    //             const res = await usersApi.updateUser(userId, updatedValues);
    //             // console.log("Thành công: ", res);
    //             if (user.id != userId) {
    //                 toast.success("Điều chỉnh thông tin thành công.");
    //             }
    //             if (user.id == userId && newPassword) {
    //                 // if (newPassword) {
    //                 handleSignOut();
    //                 setLoading(false);
    //                 return;
    //                 // }
    //             }
    //             toast.success("Điều chỉnh thông tin thành công.");
    //             getCurrentUser();
    //             setLoading(false);
    //         } catch (error) {
    //             console.error(error);
    //             toast.error("Có lỗi xảy ra, vui lòng thử lại.");
    //             setLoading(false);
    //         }
    //         // console.log("Giá trị updated values: ", updatedValues);
    //     } else {
    //         toast("Bạn chưa điều chỉnh thông tin.", {
    //             icon: ` ℹ️`,
    //         });
    //         return;
    //     }
    // };

    // const getAutoAvatar = async (name) => {
    //     try {
    //         const res = await generateAvatar(name);
    //         const base64 = await blobToBase64(res);
    //         const imgSrc = `data:image/png;base64,${base64}`;
    //         // setAvatar({ ...avatar, imgSrc: null, autoImg: imgSrc });
    //         return imgSrc;
    //     } catch (error) {
    //         console.error(error);
    //         return null;
    //     }
    // };

    // const getCurrentUser = useCallback(async () => {
    //     try {
    //         if (!userId) {
    //             navigate("/notfound");
    //             return;
    //         }
    //         const data = await usersApi.getUserDetails(userId);
    //         const {
    //             first_name: firstName,
    //             last_name: lastName,
    //             email,
    //             username: username,
    //             gender,
    //             sap_id: sapId,
    //             integration_id: integrationId,
    //             plant,
    //             branch,
    //             avatar,
    //             roles,
    //         } = data.user;

    //         const role = data.UserRole;

    //         const userData = {
    //             firstName: firstName || "",
    //             lastName: lastName || "",
    //             email: email || "",
    //             username: username || "",
    //             gender,
    //             password: "",
    //             authorization: role,
    //             sapId: sapId || "",
    //             integrationId: integrationId || "1",
    //             factory: plant || "",
    //             branch: branch || "",
    //         };

    //         // console.log("User: ", userData);

    //         if (branch) {
    //             const res = await usersApi.getFactoriesByBranchId(branch);

    //             const options = res.map((item) => ({
    //                 value: item.Code,
    //                 label: item.Name,
    //             }));

    //             setFactories(options);
    //             setIsFirstLoading(false);
    //         }

    //         // const userData = await res;
    //         setInput(userData);
    //         setOriginalInfo(userData);

    //         if (avatar) {
    //             setOriginalAvatar(avatar);
    //             setAvatar({
    //                 autoImg: null,
    //                 file: data.user.avatar,
    //                 imgSrc: data.user.avatar,
    //             });
    //         }
    //         setFormKey((prevKey) => prevKey + 1);
    //     } catch (error) {
    //         // console.error(error);
    //         toast.error("Không tìm thấy user");
    //         if (error.response && error.response.status === 404) {
    //             navigate("/notfound", { replace: true });
    //         }
    //     }
    // }, [userId]);

    // useEffect(() => {
    //     if (input.lastName && input.firstName && !avatar.file) {
    //         const tempName =
    //             input.lastName.trim().charAt(0) +
    //             input.firstName.trim().charAt(0);
    //         const res = (async () => {
    //             const base64 = await getAutoAvatar(tempName);
    //             // console.log("Auto ava: ", base64);
    //             setAvatar({ ...avatar, autoImg: base64 });
    //         })();
    //         setAvatarLoading(false);
    //     }

    //     if (!input.lastName && !input.firstName) {
    //         setAvatar({ ...avatar, imgSrc: null, autoImg: DefaultAvatar });
    //     }
    // }, [input]);

    // useEffect(() => {
    //     const handleBeforeUnload = (event) => {
    //         if (hasChanged) {
    //             const message =
    //                 "Bạn có chắc chắn muốn rời đi? Các thay đổi chưa được lưu.";
    //             event.returnValue = message;
    //             return message;
    //         }
    //     };

    //     window.addEventListener("beforeunload", handleBeforeUnload);

    //     return () => {
    //         window.removeEventListener("beforeunload", handleBeforeUnload);
    //     };
    // }, [hasChanged]);

    // useEffect(() => {
    //     // if (isFirstLoading) {
    //     const selectedBranch = input.branch;

    //     const getFactoriesByBranchId = async () => {
    //         setFactoryLoading(true);
    //         try {
    //             if (selectedBranch) {
    //                 factorySelectRef.current.clearValue();
    //                 setFactories([]);
    //                 const res = await usersApi.getFactoriesByBranchId(
    //                     selectedBranch
    //                 );

    //                 const options = res.map((item) => ({
    //                     value: item.Code,
    //                     label: item.Name,
    //                 }));

    //                 setFactories(options);
    //                 setInput((prev) => ({ ...prev, factory: "" }));
    //             } else {
    //                 setFactories([]);
    //                 // factorySelectRef.current?.selectOption([]);
    //             }
    //         } catch (error) {
    //             console.error(error);
    //         }
    //         setFactoryLoading(false);
    //     };

    //     // console.log("Chỗ này call api nè: ", factorySelectRef.current);
    //     getFactoriesByBranchId();
    //     // }
    // }, [input.branch]);

    // useEffect(() => {
    //     if (loading) {
    //         document.body.classList.add("body-no-scroll");
    //     } else {
    //         document.body.classList.remove("body-no-scroll");
    //     }
    // }, [loading]);

    useEffect(() => {
        document.title = mode == "view" ? newTitle_view : newTitle_edit;
        return () => {
            document.title = oldTitle;
        };
    }, []);

    return (
        <>
            <div className="p-6 page m-7 my-7 border border-gray-200 shadow-[0_8px_30px_rgb(0,0,0,0.13)] bg-white rounded-xl">
                <div className="flex justify-between">
                    <div className="text-[27px] font-bold">
                        {mode == "view"
                            ? "User Information"
                            : "Edit Information"}
                    </div>
                    <div className="flex gap-3">
                        <button className="flex items-center space-x-2 p-2 rounded-lg bg-[#3a6f41] px-4 text-white font-medium active:scale-[.87] active:duration-75 transition-all">
                            <MdDisabledVisible className="w-5 h-5" />
                            <div className="text-[15px]">Deactive User</div>
                        </button>
                        <button className="flex items-center space-x-2 p-2 rounded-lg bg-red-500 px-4 text-white font-medium active:scale-[.87] active:duration-75 transition-all">
                            <MdDeleteOutline className="w-5 h-5" />
                            <div className="text-[15px]">Delete User</div>
                        </button>
                        <button className="flex items-center space-x-2 p-2 rounded-lg bg-[#3a6f41] px-4 text-white font-medium active:scale-[.87] active:duration-75 transition-all">
                            <LuSave className="w-5 h-5" />
                            <div className="text-[15px]">Save</div>
                        </button>
                    </div>
                </div>
                {/* General Information */}
                <div className="my-6">
                    <div className="uppercase my-1 text-[17px] font-bold">
                        General Information
                    </div>

                    <div className="h-[2px] rounded-full bg-[#3a6f41] w-full"></div>

                    <div className="flex mt-4">
                        {/* Avatar Section */}
                        <div className="w-2/5 flex items-center justify-center">
                            <label
                                htmlFor="avatar-file"
                                className="relative p-3 rounded-full border-dashed border-2 border-green-400 cursor-pointer group"
                            >
                                <Avatar
                                    icon={<UserOutlined />}
                                    size={280}
                                    className="aspect-square p-2 ease duration-300 group-hover:opacity-40"
                                />
                                <FaCamera
                                    size={54}
                                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-80 group-hover:duration-250"
                                />
                            </label>
                            <input
                                id="avatar-file"
                                type="file"
                                className="hidden"
                            />
                        </div>
                        {/* General Information */}
                        <div className="flex-1">
                            <div className="mt-4 grid grid-cols-3 gap-4">
                                <div className="col-span-1">
                                    <label className="block mb-2 text-[15px] font-semibold text-gray-900">
                                        First Name
                                    </label>
                                    <Input
                                        type="text"
                                        placeholder="Enter First Name"
                                        className="w-full text-[15px] !font-normal !text-gray-900 !cursor-default"
                                        disabled={true}
                                    />
                                </div>
                                <div className="col-span-1">
                                    <label className="block mb-2 text-[15px] font-semibold text-gray-900">
                                        Last Name
                                    </label>
                                    <Input
                                        type="text"
                                        placeholder="Enter Last Name"
                                        className="w-full text-[15px] !font-normal !text-gray-900 !cursor-default"
                                        disabled={true}
                                    />
                                </div>
                                <div className="col-span-1">
                                    <label className="block mb-2 text-[15px] font-semibold text-gray-900">
                                        Title
                                    </label>
                                    <Input
                                        type="text"
                                        placeholder="Enter Title"
                                        className="w-full text-[15px] !font-normal !text-gray-900 !cursor-default"
                                        disabled={true}
                                    />
                                </div>
                            </div>

                            <div className="mt-4 grid grid-cols-2 gap-4">
                                <div className="col-span-1">
                                    <label className="block mb-2 text-[15px] font-semibold text-gray-900">
                                        Email
                                    </label>
                                    <Input
                                        type="text"
                                        placeholder="Enter Email"
                                        className="w-full text-[15px] !font-normal !text-gray-900 !cursor-default"
                                        disabled={true}
                                    />
                                </div>
                                <div className="col-span-1">
                                    <label className="block mb-2 text-[15px] font-semibold text-gray-900">
                                        Phone
                                    </label>
                                    <Input
                                        type="text"
                                        placeholder="Enter Phone"
                                        className="w-full text-[15px] !font-normal !text-gray-900 !cursor-default"
                                        disabled={true}
                                    />
                                </div>
                            </div>

                            <div className="mt-4 grid grid-cols-2 gap-4">
                                <div className="col-span-1">
                                    <label className="block mb-2 text-[15px] font-semibold text-gray-900">
                                        Branch
                                    </label>
                                    <Select
                                        showSearch
                                        allowClear
                                        className="w-full text-[15px] !font-normal !text-gray-900 !cursor-default"
                                        disabled={true}
                                        placeholder="Select Branch"
                                        filterOption={(input, option) =>
                                            (option?.label ?? "").includes(
                                                input
                                            )
                                        }
                                        options={[
                                            {
                                                value: "1",
                                                label: "Branch 1",
                                            },
                                            {
                                                value: "2",
                                                label: "Branch 2",
                                            },
                                            {
                                                value: "3",
                                                label: "Branch 3",
                                            },
                                        ]}
                                    />
                                </div>
                                <div className="col-span-1">
                                    <label className="block mb-2 text-[15px] font-semibold text-gray-900">
                                        Division
                                    </label>
                                    <Select
                                        showSearch
                                        allowClear
                                        className="w-full text-[15px] !font-normal !text-gray-900 !cursor-default"
                                        disabled={true}
                                        placeholder="Select Division"
                                        filterOption={(input, option) =>
                                            (option?.label ?? "").includes(
                                                input
                                            )
                                        }
                                        options={[
                                            {
                                                value: "1",
                                                label: "Division 1",
                                            },
                                            {
                                                value: "2",
                                                label: "Division 2",
                                            },
                                            {
                                                value: "3",
                                                label: "Division 3",
                                            },
                                        ]}
                                    />
                                </div>
                            </div>

                            <div className="mt-4 grid grid-cols-2 gap-4">
                                <div className="col-span-1">
                                    <label className="block mb-2 text-[15px] font-semibold text-gray-900">
                                        Department
                                    </label>
                                    <Select
                                        showSearch
                                        allowClear
                                        className="w-full text-[15px] !font-normal !text-gray-900 !cursor-default"
                                        disabled={true}
                                        placeholder="Select Department"
                                        filterOption={(input, option) =>
                                            (option?.label ?? "").includes(
                                                input
                                            )
                                        }
                                        options={[
                                            {
                                                value: "1",
                                                label: "Department 1",
                                            },
                                            {
                                                value: "2",
                                                label: "Department 2",
                                            },
                                            {
                                                value: "3",
                                                label: "Department 3",
                                            },
                                        ]}
                                    />
                                </div>
                                <div className="col-span-1">
                                    <label className="block mb-2 text-[15px] font-semibold text-gray-900">
                                        Section
                                    </label>
                                    <Select
                                        showSearch
                                        allowClear
                                        className="w-full text-[15px] !font-normal !text-gray-900 !cursor-default"
                                        disabled={true}
                                        placeholder="Select Section"
                                        filterOption={(input, option) =>
                                            (option?.label ?? "").includes(
                                                input
                                            )
                                        }
                                        options={[
                                            {
                                                value: "1",
                                                label: "Section 1",
                                            },
                                            {
                                                value: "2",
                                                label: "Section 2",
                                            },
                                            {
                                                value: "3",
                                                label: "Section 3",
                                            },
                                        ]}
                                    />
                                </div>
                            </div>

                            <div className="mt-4 grid grid-cols-2 gap-4">
                                <div className="col-span-1">
                                    <label className="block mb-2 text-[15px] font-semibold text-gray-900">
                                        Team
                                    </label>
                                    <Select
                                        showSearch
                                        allowClear
                                        className="w-full text-[15px] !font-normal !text-gray-900 !cursor-default"
                                        disabled={true}
                                        placeholder="Select Team"
                                        filterOption={(input, option) =>
                                            (option?.label ?? "").includes(
                                                input
                                            )
                                        }
                                        options={[
                                            {
                                                value: "1",
                                                label: "Team 1",
                                            },
                                            {
                                                value: "2",
                                                label: "Team 2",
                                            },
                                            {
                                                value: "3",
                                                label: "Team 3",
                                            },
                                        ]}
                                    />
                                </div>
                                <div className="col-span-1">
                                    <label className="block mb-2 text-[15px] font-semibold text-gray-900">
                                        Location
                                    </label>
                                    <Select
                                        showSearch
                                        allowClear
                                        className="w-full text-[15px] !font-normal !text-gray-900 !cursor-default"
                                        disabled={true}
                                        placeholder="Select Location"
                                        filterOption={(input, option) =>
                                            (option?.label ?? "").includes(
                                                input
                                            )
                                        }
                                        options={[
                                            {
                                                value: "1",
                                                label: "Location 1",
                                            },
                                            {
                                                value: "2",
                                                label: "Location 2",
                                            },
                                            {
                                                value: "3",
                                                label: "Location 3",
                                            },
                                        ]}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Header */}
                <div className="uppercase my-1 text-[17px] font-bold">
                    Role and Permission
                </div>

                <div className="h-[2px] rounded-full bg-[#3a6f41] w-full"></div>
                <div className="flex flex-col mt-4">
                    <div className="mt-4 grid grid-cols-5 gap-4">
                        <div className="col-span-1">
                            <label className="block mb-2 text-[15px] font-semibold text-gray-900">
                                Is Active
                            </label>
                            <Checkbox
                                className="w-full text-[15px] !font-normal !text-gray-900 !cursor-default"
                                disabled={true}
                                value={true}
                            />
                        </div>
                        <div className="col-span-1">
                            <label className="block mb-2 text-[15px] font-semibold text-gray-900">
                                Is Administrator
                            </label>
                            <Checkbox
                                className="w-full text-[15px] !font-normal !text-gray-900 !cursor-default"
                                disabled={true}
                                value={true}
                            />
                        </div>
                        <div className="col-span-1">
                            <label className="block mb-2 text-[15px] font-semibold text-gray-900">
                                Is Permitter
                            </label>
                            <Checkbox
                                className="w-full text-[15px] !font-normal !text-gray-900 !cursor-default"
                                disabled={true}
                                value={true}
                            />
                        </div>
                        <div className="col-span-1">
                            <label className="block mb-2 text-[15px] font-semibold text-gray-900">
                                Is Negotiator
                            </label>
                            <Checkbox
                                className="w-full text-[15px] !font-normal !text-gray-900 !cursor-default"
                                disabled={true}
                                value={true}
                            />
                        </div>
                        <div className="col-span-1">
                            <label className="block mb-2 text-[15px] font-semibold text-gray-900">
                                Is Final Approver
                            </label>
                            <Checkbox
                                className="w-full text-[15px] !font-normal !text-gray-900 !cursor-default"
                                disabled={true}
                                value={true}
                            />
                        </div>
                    </div>
                    <div className="mt-4">
                        <div className="col-span-1">
                            <label className="block mb-2 text-[15px] font-semibold text-gray-900">
                                Password
                            </label>
                            <Input
                                type="password"
                                placeholder="Enter Password"
                                className="w-full text-[15px] !font-normal !text-gray-900 !cursor-default"
                                disabled={true}
                            />
                        </div>
                        <div className="col-span-1 mt-3">
                            <label className="block mb-2 text-[15px] font-semibold text-gray-900">
                                Confirm Password
                            </label>
                            <Input
                                type="password"
                                placeholder="Enter Confirm Password"
                                className="w-full text-[15px] !font-normal !text-gray-900 !cursor-default"
                                disabled={true}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default UserProfile;
