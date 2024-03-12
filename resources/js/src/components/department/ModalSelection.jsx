import React, { useState } from "react";
import { Modal, Button, Select } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { changeUserDepartment } from "../../redux/auth/auth.slice";

const ModalSelection = ({ handleCloseModal = null }) => {
    const dispatch = useDispatch();
    const { department } = useSelector((state) => state.auth);

    const [open, setOpen] = useState(true);
    const [departments, setDepartments] = useState([
        {
            id: 1,
            value: "1",
            label: "Dept 1",
        },
        {
            id: 2,
            value: "2",
            label: "Dept 2",
        },
        {
            id: 3,
            value: "3",
            label: "Dept 3",
        },
    ]);
    const [currentSelection, setCurrentSelection] = useState("");

    const handleOk = () => {
        if (currentSelection) {
            dispatch(changeUserDepartment(currentSelection));
            if (handleCloseModal) {
                handleCloseModal();
            }
        } else {
            toast.error("Please select a department.");
        }
    };

    const handleCancel = () => {
        console.log("Cancelling");
        if (department) {
            if (handleCloseModal) {
                handleCloseModal();
            }
        }
    };
    console.log("Bị qq gì: ", department);

    return (
        <Modal
            open={open}
            title="Select department"
            onCancel={handleCancel}
            footer={(_, { OkBtn, CancelBtn }) => (
                <Button
                    disabled={!currentSelection}
                    className="bg-green-500 text-white hover:bg-green-200 border-0"
                    onClick={handleOk}
                >
                    OK
                </Button>
            )}
        >
            <>
                <h3>Please choose your current department</h3>
                <div className="mt-3">
                    <label className="block mb-2 text-[15px] font-semibold text-gray-900">
                        Current Accessing Department
                    </label>
                    <Select
                        showSearch
                        allowClear
                        className="w-full text-[15px] mb-3"
                        placeholder="Select Current Accessing Department"
                        filterOption={(input, option) =>
                            (option?.label ?? "").includes(input)
                        }
                        options={departments}
                        defaultValue={department}
                        value={currentSelection}
                        onChange={(value) => setCurrentSelection(value)}
                    />
                </div>
            </>
        </Modal>
    );
};

export default ModalSelection;
