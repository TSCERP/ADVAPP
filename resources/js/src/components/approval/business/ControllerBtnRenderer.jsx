import React, { useCallback } from "react";
import { LuPenSquare, LuPrinter, LuTrash2 } from "react-icons/lu";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const ControllerBtnRenderer = ({ data, readOnly }) => {
    const onPrintClick = useCallback(() => {
        toast("This (Edit) module is under development.");
    }, []);
    const onDeleteClick = useCallback(() => {
        toast("This (Delete) module is under development.");
    }, []);

    return (
        <div className="h-full flex items-center justify-center gap-x-3">
            {!readOnly && (
                <Link
                    // Nhớ thêm id nhé !!!
                    to={`${data.path}/edit/${data.id}`}
                    className="text-gray-700 hover:text-[#57a3e1]"
                >
                    <div>
                        <LuPenSquare className="w-5 h-5" />
                    </div>
                </Link>
            )}
            <button onClick={onPrintClick}>
                <LuPrinter className="text-gray-700 hover:text-[#57a3e1] w-5 h-5" />
            </button>
            <button onClick={onDeleteClick}>
                <LuTrash2 className="text-gray-700 hover:text-[#57a3e1] w-5 h-5" />
            </button>
        </div>
    );
};

export default ControllerBtnRenderer;
