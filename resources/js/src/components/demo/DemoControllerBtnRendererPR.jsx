import React, { useCallback } from "react";
import { LuPenSquare, LuPrinter, LuTrash2 } from "react-icons/lu";
import { GiConfirmed } from "react-icons/gi";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const DemoControllerBtnRendererPR = ({ data }) => {
    const onPrintClick = useCallback(() => {
        toast("This (Edit) module is under development.");
    }, []);
    const onDeleteClick = useCallback(() => {
        toast("This (Delete) module is under development.");
    }, []);

    return (
        <div className="h-full flex items-center justify-center gap-x-3 px-1">
            <Link
                // Nhớ thêm id nhé !!!
                to={`${data.path}/edit/${data.id}`}
                className="text-gray-700 hover:text-[#57a3e1]"
            >
                <div>
                    <LuPenSquare className="w-5 h-5" />
                </div>
            </Link>
            <button
                className="text-gray-700 hover:text-[#57a3e1]"
            >
                    <LuPrinter className="w-5 h-5" />
            </button>
            {/* <button>
                <GiConfirmed className="text-gray-700 hover:text-green-600 w-5 h-5" />
            </button>
            <button>
                <IoMdCloseCircleOutline className="text-gray-700 hover:text-gray-500 w-6 h-6" />
            </button> */}
            <button onClick={onDeleteClick}>
                <LuTrash2 className="text-gray-700 hover:text-red-600 w-5 h-5" />
            </button>
        </div>
    );
};

export default DemoControllerBtnRendererPR;
