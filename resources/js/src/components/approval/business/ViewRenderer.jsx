import React from "react";
import { Link } from "react-router-dom";

const ViewRenderer = ({ value, data }) => {
    return (
        <Link to={`${data.path}/view`} className="">
            {value}
        </Link>
    );
};

export default ViewRenderer;
