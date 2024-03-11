import React, { useState } from "react";
import { Switch, Popconfirm } from "antd";
import toast from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";

import usersApi from "../../api/usersApi";

const Toggle = ({ id, isActive, type, onToggle }) => {
    const dispatch = useDispatch();
    const { userData } = useSelector((state) => state.auth);
    const [loading, setLoading] = useState(false);
    const handleToggle = (value) => {
        if (type == "active") {
            handleDisableUser();
        }
        if (type == "negotiator" || type == "permitter") {
            handleChangeRole();
        }
    };

    const handleDisableUser = async () => {
        setLoading(true);
        try {
            const res = await usersApi.disabledUser(id, dispatch);
            onToggle(!isActive);
        } catch (error) {
            toast.error("Ther was an error occured. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleChangeRole = async () => {
        let data = {};
        if (type == "negotiator") {
            data.IsNego = !isActive;
        }
        if (type == "permitter") {
            data.IsPermitter = !isActive;
        }
        if (Object.keys(data).length > 0) {
            setLoading(true);

            try {
                const res = await usersApi.updateUser(id, data, dispatch);
                onToggle(!isActive);
            } catch (error) {
                console.error(error);
                toast.error("There was an error occure. Please try again.");
            } finally {
                setLoading(false);
            }
        }
    };

    return (
        <Switch
            disabled={userData.id == id}
            checked={isActive}
            loading={loading}
            className="bg-[#1C1C1C]"
            onChange={handleToggle}
        />
    );
};

export default Toggle;
