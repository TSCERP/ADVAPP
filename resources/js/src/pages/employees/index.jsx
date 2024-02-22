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

function Employees() {
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
                    <div className="text-2xl font-bold">Employees</div>
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

                {/* Search&Filter Section */}
                {/* <div className="flex items-center px-3 rounded-lg bg-[#f4f4f4]">
                    <div>
                        <label
                            htmlFor="default-search"
                            className="mb-2 font-medium text-gray-900 sr-only dark:text-white"
                        >
                            Search
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 start-0 flex items-center ps-4 pointer-events-none">
                                <svg
                                    className="w-4 h-4 text-gray-500 "
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 20 20"
                                >
                                    <path
                                        stroke="currentColor"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                                    />
                                </svg>
                            </div>
                            <input
                                type="search"
                                id="default-search"
                                className="block w-full p-3 ps-12 text-[15px] text-gray-900 border border-gray-300 rounded-full bg-gray-50  "
                                placeholder="Search Approvals"
                                required
                            />
                        </div>
                    </div>
                    <div className="py-6 bg-gray-200">Filter</div>
                </div> */}

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

export default Employees;
