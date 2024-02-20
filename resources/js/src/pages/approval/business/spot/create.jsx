import React from "react";
import { LuSave } from "react-icons/lu";

function ApprovalBusinessSpotCreate() {
    return (
        <div className="m-5 my-6 border border-gray-200 shadow-sm bg-white rounded-xl h-full ">
            <div className="p-6">
                {/* Header */}
                <div className="flex justify-between">
                  <div className="text-2xl font-bold">Approval Spot</div>
                  <button className="flex items-center space-x-2 p-2 rounded-lg bg-[#3a6f41] px-4 text-white font-medium active:scale-[.87] active:duration-75 transition-all">
                    <LuSave className="w-5 h-5"/>
                    <div className="text-[15px]">Save</div>
                  </button>
                </div>

                {/* General Infomation */}
                <div className="my-4">
                  <div className="uppercase my-1 text-lg font-bold">General Information</div>
                  <div className=" h-[2px] rounded-full bg-[#3a6f41] w-full">

                  </div>
                </div>

                {/* Tabs */}
                <div>
                    {/* Sales & Cost Tab */}
                    <div>
                        {/* Detail of Sales */}
                        <div></div>

                        {/* Detail of Cost */}
                        <div></div>
                    </div>

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
    );
}

export default ApprovalBusinessSpotCreate;
