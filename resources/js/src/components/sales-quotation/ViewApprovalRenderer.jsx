import React from "react";
import { Link } from "react-router-dom";

const ViewApprovalRenderer = ({ value, data }) => {
    const approvalPath = {
        spot: "/approval/business/spot",
        fms: "/approval/business/fms",
        yearly: "/approval/business/yearly",
        budget: "/approval/budget",
        "sg&a": "/approval/sg&a",
        other: "/approval/other",
    }
    return (
        <Link to={`${data.approvalType && approvalPath[data.approvalType]}/view/${data.approvalId}`} className="">
            {value}
        </Link>
    );
};

export default ViewApprovalRenderer;
