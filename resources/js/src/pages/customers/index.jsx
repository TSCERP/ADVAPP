import React, { useState } from "react";
import {
    LuPenSquare,
    LuPlus,
    LuChevronDown,
    LuExternalLink,
} from "react-icons/lu";

import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css"; // Core CSS
import "ag-grid-community/styles/ag-theme-quartz.css"; // Theme
import { Link } from "react-router-dom";

import "../../assets/styles/index.css";

function Customers() {
    const [rowData, setRowData] = useState([
        {
            mission: "Voyager",
            company: "NASA",
            location: "Cape Canaveral",
            date: "1977-09-05",
            rocket: "BIÊN BẢN NGHIỆM THU ",
            price: 86580000,
            successful: true,
        },
        {
            mission: "Apollo 13",
            company: "NASA",
            location: "Kennedy Space Center",
            date: "1970-04-11",
            rocket: "Saturn V",
            price: 3750000,
            successful: false,
        },
        {
            mission: "Falcon 9",
            company: "SpaceX",
            location: "Cape Canaveral",
            date: "2015-12-22",
            rocket: "Falcon 9",
            price: 9750000,
            successful: true,
        },
        {
            mission: "Falcon 9",
            company: "SpaceX",
            location: "Cape Canaveral",
            date: "2015-12-22",
            rocket: "Falcon 9",
            price: 9750000,
            successful: true,
        },
        {
            mission: "Falcon 9",
            company: "SpaceX",
            location: "Cape Canaveral",
            date: "2015-12-22",
            rocket: "Falcon 9",
            price: 9750000,
            successful: true,
        },
        {
            mission: "Falcon 9",
            company: "SpaceX",
            location: "Cape Canaveral",
            date: "2015-12-22",
            rocket: "Falcon 9",
            price: 9750000,
            successful: true,
        },
        {
            mission: "Falcon 9",
            company: "SpaceX",
            location: "Cape Canaveral",
            date: "2015-12-22",
            rocket: "Falcon 9",
            price: 9750000,
            successful: true,
        },
        {
            mission: "Falcon 9",
            company: "SpaceX",
            location: "Cape Canaveral",
            date: "2015-12-22",
            rocket: "Falcon 9",
            price: 9750000,
            successful: true,
        },
        {
            mission: "Falcon 9",
            company: "SpaceX",
            location: "Cape Canaveral",
            date: "2015-12-22",
            rocket: "Falcon 9",
            price: 9750000,
            successful: true,
        },
        {
            mission: "Falcon 9",
            company: "SpaceX",
            location: "Cape Canaveral",
            date: "2015-12-22",
            rocket: "Falcon 9",
            price: 9750000,
            successful: true,
        },
        {
            mission: "Falcon 9",
            company: "SpaceX",
            location: "Cape Canaveral",
            date: "2015-12-22",
            rocket: "Falcon 9",
            price: 9750000,
            successful: true,
        },
        {
            mission: "Falcon 9",
            company: "SpaceX",
            location: "Cape Canaveral",
            date: "2015-12-22",
            rocket: "Falcon 9",
            price: 9750000,
            successful: true,
        },
        {
            mission: "Falcon 9",
            company: "SpaceX",
            location: "Cape Canaveral",
            date: "2015-12-22",
            rocket: "Falcon 9",
            price: 9750000,
            successful: true,
        },
        {
            mission: "Falcon 9",
            company: "SpaceX",
            location: "Cape Canaveral",
            date: "2015-12-22",
            rocket: "Falcon 9",
            price: 9750000,
            successful: true,
        },
    ]);

    // Column Definitions: Defines & controls grid columns.
    const [colDefs, setColDefs] = useState([
        { field: "mission" },
        { field: "company" },
        { field: "location" },
        { field: "date" },
        { field: "price" },
        { field: "successful" },
        { field: "rocket" },
    ]);

    return (
        <div className="h-[calc(100vh-60px)] bg-[#FBFBFB]">
            <div className="h-full p-5 space-y-4">
                {/* Header */}
                <div className="flex items-center justify-between w-full">
                    <div className="text-2xl font-bold">Customers</div>
                    <div className="flex gap-x-3">
                        {/* <button className="flex items-center gap-x-2 text-[14px] bg-[#228b22] text-white px-4 py-2 rounded-full font-medium">
                        <LuPlus className="flex items-center w-4 h-4 text-white" />
                        Create
                    </button> */}
                        <div className="flex items-center gap-x-2 text-[15px] bg-[#fff] border-2 border-gray-300 text-gray-800 px-4 py-2 rounded-full font-medium  active:scale-[.94] active:duration-75 transition-all hover:bg-gray-100 cursor-pointer">
                            <LuExternalLink className="flex items-center w-4 h-4 " />
                            Export
                        </div>
                    </div>
                </div>

                {/* List */}
                <div className=" my-4 rounded-lg ">
                    <div style={{ width: "100%" }}>
                        <div
                            className="ag-theme-quartz"
                            style={{
                                height: 580,
                                fontFamily: "Inter, sans-serif",
                            }}
                        >
                            <AgGridReact
                                rowData={rowData}
                                columnDefs={colDefs}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Customers;
