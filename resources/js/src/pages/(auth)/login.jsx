import React from "react";
import TransparentIconLogo from "../../assets/images/transparent-icon-logo.svg"
import BlackLogo from "../../assets/images/black-logo.svg"

function Login() {
    return (
        <div className="">
                <div className="pt-20 flex justify-center items-center bg-white">
                    <div className="bg-white max-w-md min-w-[380px] text-center">
                        <img src={TransparentIconLogo} alt="logo" className="h-28 mx-auto"/>
                        <h1 className="text-gray-800 font-bold text-2xl mb-1">
                            Welcome!
                        </h1>
                        <p className="font-normal text-gray-500 mb-7">
                            Please login to your account
                        </p>

                        <form className="">
                          <div className="">
                            <label htmlFor="email" className="text-sm text-left font-medium text-gray-900 block mb-2">Email</label>
                            <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full p-2.5 " placeholder="name@company.com" required/>
                          </div>
                          <div className="mt-4">
                            <label for="password" class="text-sm font-medium text-gray-900 block mb-2 text-left">Password</label>
                            <input type="password" name="password" id="password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full p-2.5 "/>
                          </div>
                          <button
                              type="submit"
                              className="block w-full bg-gray-900 mt-6 py-2 rounded-xl text-white font-semibold active:scale-[.95] active:duration-75 transition-all"
                          >
                              Sign In
                          </button>
                          <button className="text-[15px] pt-4 text-center hover:text-[#] cursor-pointer">
                              Forgot your password?
                          </button>
                        </form>
                        
                    </div>
                </div>
        </div>
    );
}

export default Login;
