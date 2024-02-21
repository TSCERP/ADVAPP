import React, { useState } from "react";
import "../../assets/styles/index.css";
import TransparentIconLogo from "../../assets/images/transparent-icon-logo.svg";
import BlackLogo from "../../assets/images/black-logo.svg";
import FullLogo from "../../assets/images/full-logo.svg";
import useAppContext from "../../store/AppContext";
import { Link, useNavigate, Navigate } from "react-router-dom";
import Loader from "../../components/AppLoader";
import Cookies from "js-cookie";
import usersApi from "../../api/userApi";
import toast from "react-hot-toast";
import { CgSpinnerTwo } from "react-icons/cg";

function Login() {
    const navigate = useNavigate();

    const { setUser, isAuthenticated, setIsAuthenticated } = useAppContext();
    const [email, setEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        console.log("1.Thông tin xác thực nhận được:", { email, password });
        try {
            const response = await usersApi.login(email, password);
            console.log("2. Kết quả trả về từ API:", response);
            Cookies.set("isAuthenticated", "true", { expires: 1 });
            let currentUser = {
                id: response.id,
                userEmail: response.email,
                firstName: response.firstName,
                LastName: response.LastName,
                access_token: response.access_token,
                phone: response.phone,
                title: response.title,
                avatar: response.avatar,
                branch: response.branch,
                employeeCode: response.employeeCode,
                location: response.location,
                permissions: response.permissions,
            };
            console.log("3. Thông tin user được lưu lại:", currentUser);
            localStorage.setItem("userInfo", JSON.stringify(currentUser));
            setUser(currentUser);
            setIsLoading(false);
            setIsAuthenticated(true);
            navigate("/");
            toast.success("Login successfully!");
        } catch (error) {
            console.log("4.Lỗi đăng nhập", error);
            toast.error("Login failed. Please try again!");
            setIsLoading(false);
        }
    };

    return isAuthenticated ? (
        <Navigate to="/" />
    ) : (
        <section className="h-screen flex justify-between bg-[#F6F5F5]">
                <form className="m-auto flex justify-center bg-transparent">
                    <div className="bg-transparent max-w-md min-w-[380px] text-center">
                        <div className="flex">
                            <img
                                src={FullLogo}
                                alt="logo"
                                className="h-20 mx-auto mb-14"
                            />
                        </div>
                        <p className=" login-page inter-font font-medium text-lg text-gray-500 mb-7">
                            Please login to your account.
                        </p>

                        <div className="">
                            <label
                                htmlFor="email"
                                className="text-[15px] text-left font-medium text-gray-900 block mb-2"
                            >
                                Email
                            </label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-[15px] rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full p-2.5 "
                                placeholder="name@company.com"
                                onChange={(e) =>
                                    setEmail(e.target.value.trim())
                                }
                            />
                        </div>
                        <div className="mt-4">
                            <label
                                htmlFor="password"
                                className="text-[15px] font-medium text-gray-900 block mb-2 text-left"
                            >
                                Password
                            </label>
                            <input
                                type="password"
                                name="password"
                                id="password"
                                placeholder="••••••••"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-[15px] rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full p-2.5"
                                onChange={(e) =>
                                    setPassword(e.target.value.trim())
                                }
                            />
                        </div>
                        <button
                            type="submit"
                            className={`block w-full text-[17px]  mt-6 py-2 rounded-xl ${isLoading ? "bg-[#D1D3D6] text-gray-600" : "bg-[#0D0D0D] text-white "}  font-semibold active:scale-[.95] active:duration-75 transition-all`}
                            style={{ pointerEvents: isLoading ? 'none' : 'auto' }}
                            onClick={handleSubmit}
                        >
                            {isLoading ? (
                                <div className="flex items-center justify-center space-x-3 cursor-none">
                                    <CgSpinnerTwo className="w-6 h-6 animate-spin"/>
                                    <div>Singing In...</div>
                                </div>
                            ) : "Sign In" }
                        </button>
                        <p className="font-normal text-sm text-gray-500 mt-24">
                            © 2023-2024 Grant Thornton Vietnam.
                        </p>
                    </div>
                </form>
        </section>
    );
}

export default Login;
