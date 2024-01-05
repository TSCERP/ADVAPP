import React from "react";
import BaseLayout from "../layouts/BaseLayout";
import { CgSpinnerTwoAlt } from "react-icons/cg";

function Home() {
    return (
            <div className="">
                <h1 className="w-full pt-6 text-3xl text-gray-700 font-semibold pl-6 ">
                    Welcome to
                </h1>
                <h1 className="w-full pt-2 pb-3 text-5xl bg-clip-text text-transparent bg-gradient-to-r from-black to-gray-500 font-bold pl-6 ">
                    AEON Delight Vietnam.
                </h1>

                {/* Underdeveloping */}
                <div className="m-6 mb-0 pt-6 text-lg text-gray-500 uppercase bg-transparent rounded-lg">
                    <div className="flex justify-center items-center"><CgSpinnerTwoAlt className="mr-2 animate-spin"/><div className="font-bold ">Under Developing</div></div> 
                </div>
                <div className="mx-6 text-center text-lg text-gray-500">We're working on it. So stay tune!</div> 
            </div>
    );
}

export default Home;
