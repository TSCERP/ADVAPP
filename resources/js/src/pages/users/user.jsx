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
import { Formik, Field, Form, ErrorMessage, useFormikContext } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

import { LuTrash2, LuPlus, LuSave, LuLink2 } from "react-icons/lu";

import DefaultAvatar from "../../assets/images/Default-Avatar.png";

const { TextArea } = Input;
const oldTitle = document.title;
const newTitle = "User Information - Aeon Delight Vietnam";

function UserProfile() {
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

    const [input, setInput] = useState({
        firstName: "",
        lastName: "",
        email: "",
        username: "",
        gender: "",
        password: "",
        authorization: "",
        sapId: "",
        integrationId: "1",
        factory: "",
        branch: "",
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

    const handleDeleteAvatar = async () => {
        setAvatar({
            ...avatar,
            file: null,
            imgSrc: null,
        });

        if (selectedFile) {
            setSelectedFile(null);
        }

        if (!avatar.autoImg) {
            if (input.lastName && input.firstName) {
                setAvatarLoading(true);
                const tempName =
                    input.lastName.trim().charAt(0) +
                    input.firstName.trim().charAt(0);
                const base64 = await getAutoAvatar(tempName);
                setAvatar({
                    autoImg: base64,
                    file: null,
                    imgSrc: null,
                });
                setAvatarLoading(false);
            }
        } else {
            setAvatar({
                autoImg: avatar.autoImg,
                file: null,
                imgSrc: null,
            });
        }
    };

    const handleSignOut = async () => {
        try {
            const res = await usersApi.signOut();
            localStorage.removeItem("userInfo");
            Cookies.remove("isAuthenticated");
            setUser(null);
            toast.success("Vui lòng đăng nhập để tiếp tục");
        } catch (error) {
            console.error(error);
            localStorage.removeItem("userInfo");
            Cookies.remove("isAuthenticated");
            setUser(null);
            toast.success("Vui lòng đăng nhập để tiếp tục");
        }
    };

    const handleFormSubmit = async (values) => {
        const updatedValues = { ...values };
        const { password: newPassword, ...updatedInfo } = values;
        const { password: oldPassword, ...oldInfo } = originalInfo;
        const isChanged = areObjectsEqual(updatedInfo, oldInfo);

        if (!isChanged || newPassword || originalAvatar != avatar.file) {
            setLoading(true);
            if (selectedFile) {
                if (selectedFile instanceof File) {
                    updatedValues.avatar = selectedFile;
                }
            } else if (
                avatar.file == originalAvatar ||
                avatar.imgSrc == originalAvatar
            ) {
                updatedValues.avatar = "";
                delete updatedValues.avatar;
            } else {
                updatedValues.avatar = -1;
            }

            // console.log("Updated values: ", updatedValues);

            try {
                const res = await usersApi.updateUser(userId, updatedValues);
                // console.log("Thành công: ", res);
                if (user.id != userId) {
                    toast.success("Điều chỉnh thông tin thành công.");
                }
                if (user.id == userId && newPassword) {
                    // if (newPassword) {
                    handleSignOut();
                    setLoading(false);
                    return;
                    // }
                }
                toast.success("Điều chỉnh thông tin thành công.");
                getCurrentUser();
                setLoading(false);
            } catch (error) {
                console.error(error);
                toast.error("Có lỗi xảy ra, vui lòng thử lại.");
                setLoading(false);
            }
            // console.log("Giá trị updated values: ", updatedValues);
        } else {
            toast("Bạn chưa điều chỉnh thông tin.", {
                icon: ` ℹ️`,
            });
            return;
        }
    };

    const getAutoAvatar = async (name) => {
        try {
            const res = await generateAvatar(name);
            const base64 = await blobToBase64(res);
            const imgSrc = `data:image/png;base64,${base64}`;
            // setAvatar({ ...avatar, imgSrc: null, autoImg: imgSrc });
            return imgSrc;
        } catch (error) {
            console.error(error);
            return null;
        }
    };

    const getCurrentUser = useCallback(async () => {
        try {
            if (!userId) {
                navigate("/notfound");
                return;
            }
            const data = await usersApi.getUserDetails(userId);
            const {
                first_name: firstName,
                last_name: lastName,
                email,
                username: username,
                gender,
                sap_id: sapId,
                integration_id: integrationId,
                plant,
                branch,
                avatar,
                roles,
            } = data.user;

            const role = data.UserRole;

            const userData = {
                firstName: firstName || "",
                lastName: lastName || "",
                email: email || "",
                username: username || "",
                gender,
                password: "",
                authorization: role,
                sapId: sapId || "",
                integrationId: integrationId || "1",
                factory: plant || "",
                branch: branch || "",
            };

            // console.log("User: ", userData);

            if (branch) {
                const res = await usersApi.getFactoriesByBranchId(branch);

                const options = res.map((item) => ({
                    value: item.Code,
                    label: item.Name,
                }));

                setFactories(options);
                setIsFirstLoading(false);
            }

            // const userData = await res;
            setInput(userData);
            setOriginalInfo(userData);

            if (avatar) {
                setOriginalAvatar(avatar);
                setAvatar({
                    autoImg: null,
                    file: data.user.avatar,
                    imgSrc: data.user.avatar,
                });
            }
            setFormKey((prevKey) => prevKey + 1);
        } catch (error) {
            // console.error(error);
            toast.error("Không tìm thấy user");
            if (error.response && error.response.status === 404) {
                navigate("/notfound", { replace: true });
            }
        }
    }, [userId]);

    useEffect(() => {
        if (input.lastName && input.firstName && !avatar.file) {
            const tempName =
                input.lastName.trim().charAt(0) +
                input.firstName.trim().charAt(0);
            const res = (async () => {
                const base64 = await getAutoAvatar(tempName);
                // console.log("Auto ava: ", base64);
                setAvatar({ ...avatar, autoImg: base64 });
            })();
            setAvatarLoading(false);
        }

        if (!input.lastName && !input.firstName) {
            setAvatar({ ...avatar, imgSrc: null, autoImg: DefaultAvatar });
        }
    }, [input]);

    useEffect(() => {
        const handleBeforeUnload = (event) => {
            if (hasChanged) {
                const message =
                    "Bạn có chắc chắn muốn rời đi? Các thay đổi chưa được lưu.";
                event.returnValue = message;
                return message;
            }
        };

        window.addEventListener("beforeunload", handleBeforeUnload);

        return () => {
            window.removeEventListener("beforeunload", handleBeforeUnload);
        };
    }, [hasChanged]);

    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             setLoading(true);

    //             const branchesPromise = usersApi.getAllBranches();
    //             const rolesPromise = roleApi.getAllRole();
    //             const sapIdPromise = usersApi.getAllSapId();

    //             const [branchesRes, rolesRes, sapIdRes] = await Promise.all([
    //                 branchesPromise,
    //                 rolesPromise,
    //                 sapIdPromise,
    //             ]);

    //             const branchesOptions = branchesRes.map((item) => ({
    //                 value: item.BPLId,
    //                 label: item.BPLName,
    //             }));
    //             setBranches(branchesOptions);

    //             const rolesOptions = rolesRes.map((item) => ({
    //                 value: item.id,
    //                 label:
    //                     item.name.charAt(0).toUpperCase() + item.name.slice(1),
    //             }));
    //             setRoles(rolesOptions);

    //             const sapIdOptions = sapIdRes.map((item) => ({
    //                 value: item.USER_CODE,
    //                 label: item.NAME + " - " + item.USER_CODE,
    //             }));
    //             setSapId(sapIdOptions);

    //             await getCurrentUser();

    //             setLoading(false);
    //         } catch (error) {
    //             console.error(error);
    //             setLoading(false);
    //         }
    //     };

    //     fetchData();

    //     document.title = "Woodsland - Chi tiết người dùng";

    //     return () => {
    //         document.title = "Woodsland";
    //         document.body.classList.remove("body-no-scroll");
    //     };
    // }, []);

    useEffect(() => {
        console.log("Hello");
        // if (isFirstLoading) {
        const selectedBranch = input.branch;

        const getFactoriesByBranchId = async () => {
            setFactoryLoading(true);
            try {
                if (selectedBranch) {
                    factorySelectRef.current.clearValue();
                    setFactories([]);
                    const res = await usersApi.getFactoriesByBranchId(
                        selectedBranch
                    );

                    const options = res.map((item) => ({
                        value: item.Code,
                        label: item.Name,
                    }));

                    setFactories(options);
                    setInput((prev) => ({ ...prev, factory: "" }));
                } else {
                    setFactories([]);
                    // factorySelectRef.current?.selectOption([]);
                }
            } catch (error) {
                console.error(error);
            }
            setFactoryLoading(false);
        };

        // console.log("Chỗ này call api nè: ", factorySelectRef.current);
        getFactoriesByBranchId();
        // }
    }, [input.branch]);

    useEffect(() => {
        if (loading) {
            document.body.classList.add("body-no-scroll");
        } else {
            document.body.classList.remove("body-no-scroll");
        }
    }, [loading]);

    return (
        <>
            <div className="p-6 page m-7 my-7 border border-gray-200 shadow-[0_8px_30px_rgb(0,0,0,0.13)] bg-white rounded-xl">
                <div className="flex justify-between">
                    <div className="text-[27px] font-bold">
                        User Information
                    </div>
                    <button
                        className="flex items-center space-x-2 p-2 rounded-lg bg-[#3a6f41] px-4 text-white font-medium active:scale-[.87] active:duration-75 transition-all"
                        // onClick={handleSave}
                    >
                        <LuSave className="w-5 h-5" />
                        <div className="text-[15px]">Save</div>
                    </button>
                </div>
                {/* General Infomation */}
                <div className="my-6">
                    {/* Header */}
                    <div className="uppercase my-1 text-[17px] font-bold">
                        General Information
                    </div>

                    <div className="h-[2px] rounded-full bg-[#3a6f41] w-full"></div>

                    <div className="flex">
                        <div className="w-2/5 flex items-center justify-center">
                            <Avatar className="w-[12rem] h-[12rem]" />
                        </div>
                        <div className="flex-1">
                            <div className="mt-4 grid grid-cols-2 gap-4">
                                <div className="col-span-1">
                                    <label
                                        htmlFor="email"
                                        className="block mb-2 text-[15px] font-semibold text-gray-900"
                                    >
                                        First Name
                                    </label>
                                    <Input
                                        type="text"
                                        id="approval_type"
                                        placeholder="Enter First Name"
                                        className="font-semibold"
                                    />
                                </div>
                                <div className="col-span-1">
                                    <label
                                        htmlFor="email"
                                        className="block mb-2 text-[15px] font-semibold text-gray-900"
                                    >
                                        Last Name
                                    </label>
                                    <Input
                                        type="text"
                                        id="approval_type"
                                        placeholder="Enter PIC Information"
                                        className="font-semibold"
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
                                        id="approval_type"
                                        placeholder="Enter First Name"
                                        className="font-semibold"
                                    />
                                </div>
                                <div className="col-span-1">
                                    <label className="block mb-2 text-[15px] font-semibold text-gray-900">
                                        Gender
                                    </label>
                                    <Select
                                        showSearch
                                        allowClear
                                        className="w-full text-[15px]"
                                        placeholder="Select Approval Category"
                                        filterOption={(input, option) =>
                                            (option?.label ?? "").includes(
                                                input
                                            )
                                        }
                                        options={[
                                            {
                                                value: "1",
                                                label: "Male",
                                            },
                                            {
                                                value: "2",
                                                label: "Female",
                                            },
                                        ]}
                                    />
                                </div>
                            </div>

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
                                            (option?.label ?? "").includes(
                                                input
                                            )
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
                                            (option?.label ?? "").includes(
                                                input
                                            )
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
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default UserProfile;
