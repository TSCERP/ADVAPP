import React, {
    useState,
    useCallback,
    useEffect,
    useMemo,
    useRef,
} from "react";
import { Link, useNavigate } from "react-router-dom";
import { Input, Avatar, Switch } from "antd";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";

import { AgGridReact } from "ag-grid-react";

import {
    LuPenSquare,
    LuPlus,
    LuRefreshCcw,
    LuFilter,
    LuExternalLink,
    LuCircle,
    LuCheck,
    LuX,
    LuChevronDown,
    LuChevronUp,
    LuRotateCcw,
} from "react-icons/lu";

// import Toggle from "../../components/users/Toggle";
import masterDataApi from "../../api/masterDataApi";

const { Search } = Input;

function ItemList() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // States
    const [items, setItems] = useState([]);
    const [search, setSearch] = useState("");
    const [quickFilterText, setQuickFilterText] = useState("");
    const [firstTimeRender, setFirstTimeRender] = useState(true);

    // Column Definitions: Defines & controls grid columns.
    const [colDefs, setColDefs] = useState([
        {
            headerName: "Id",
            field: "ItemID",
            filter: "agTextColumnFilter",
            maxWidth: 110,
        },
        {
            headerName: "Item Group ID",
            field: "ItemGroupID",
            filter: "agTextColumnFilter",
        },
        {
            headerName: "Item Group Name",
            field: "ItemGroupName",
            filter: "agTextColumnFilter",
        },
        {
            headerName: "Item Code",
            field: "ItemCode",
            filter: "agTextColumnFilter",
            // cellRenderer: ({ data }) => (
            //     <Link to={`/users/view/${data.id}`}>{`${data.FirstName} ${" "} ${data.LastName}`}</Link>
            // ),
        },
        {
            headerName: "Item Name",
            field: "ItemName",
            filter: "agTextColumnFilter",
        },
        {
            headerName: "Sub Item ID",
            field: "SubItemID",
            filter: "agTextColumnFilter",
        },
        {
            headerName: "Sub Item Code",
            field: "SubItemCode",
            filter: "agTextColumnFilter",
        },
        {
            headerName: "Sub Item Name",
            field: "SubItemName",
            filter: "agTextColumnFilter",
        },
        {
            headerName: "Sub Item Full Name",
            field: "SubItemName",
            filter: "agTextColumnFilter",
        },
        {
            headerName: "Sub Item Name - en",
            field: "SubItemName",
            filter: "agTextColumnFilter",
        },
    ]);

    // Refs
    const gridRef = useRef(null);

    const defaultColDef = useMemo(() => {
        return {
            flex: 1,
            minWidth: 190,
            floatingFilter: true,
            sortable: true,
        };
    }, []);

    const paginationPageSizeSelector = useMemo(() => {
        return [10, 50, 100, 200];
    }, []);

    const onBtExport = useCallback(() => {
        gridRef.current.api.exportDataAsExcel();
        toast.success("Export successfully.");
    }, []);

    // Get all item - Reload also
    const getAllItems = async () => {
        if (!firstTimeRender) {
            gridRef.current.api.showLoadingOverlay();
        }
        try {
            const res = await masterDataApi.getAllItem(dispatch);
            // const finalRes = res.map((item) => ({
            //     ...item,
            //     FullName: item.FullName
            //         ? item.FullName
            //         : `${item.FirstName} ${item.LastName}`,
            // }));
            // console.log(finalRes);
            setItems(res);
        } catch (error) {
            console.log(error.response);
            // toast.error("Failed to get users, reloading page.");
            // navigate(0);
        } finally {
            if (!firstTimeRender) {
                gridRef.current.api.hideOverlay();
            }
            setFirstTimeRender(false);
        }
    };

    const handleSearch = (e) => {
        setSearch(e.target.value);
    };

    // const handleToggleVendor = (active, id, type) => {
    //     switch (type) {
    //         case "permitter":
    //             setVendors((prev) => {
    //                 return prev.map((vendor) => {
    //                     if (vendor.id == id) {
    //                         return { ...vendor, IsPermitter: active };
    //                     } else {
    //                         return vendor;
    //                     }
    //                 });
    //             });
    //             break;
    //         case "negotiator":
    //             setVendors((prev) => {
    //                 return prev.map((vendor) => {
    //                     if (vendor.id == id) {
    //                         return { ...vendor, IsNego: active };
    //                     } else {
    //                         return vendor;
    //                     }
    //                 });
    //             });
    //             break;
    //         default:
    //             setVendors((prev) => {
    //                 return prev.map((vendor) => {
    //                     if (vendor.id == id) {
    //                         return { ...vendor, IsActive: active };
    //                     } else {
    //                         return vendor;
    //                     }
    //                 });
    //             });
    //             break;
    //     }
    // };

    // Effects
    useEffect(() => {
        getAllItems();
    }, []);

    useEffect(() => {
        const delayInputTimeoutId = setTimeout(() => {
            setQuickFilterText(search);
        }, 500);
        return () => clearTimeout(delayInputTimeoutId);
    }, [search, 500]);

    useEffect(() => {
        if (!firstTimeRender) {
            gridRef.current.api.setGridOption(
                "quickFilterText",
                quickFilterText
            );
        }
    }, [quickFilterText]);

    return (
        <div className="h-[calc(100vh-60px)] bg-[#FBFBFB]">
            <div className="h-full p-5 space-y-4">
                {/* Header */}
                <div className="flex items-center justify-between w-full">
                    <div className="text-transparent bg-clip-text bg-gradient-to-r from-[#0D0D0D] to-[#3a6e42] text-[1.65rem] font-bold">
                        Item List
                    </div>
                    <div className="flex gap-x-2">
                        <div
                            className="flex items-center gap-x-2 text-[15px] bg-[#fff] border-2 border-gray-300 text-gray-800 px-4 py-1.5 rounded-full font-medium  active:scale-[.94] active:duration-75 transition-all hover:bg-gray-100 cursor-pointer"
                            onClick={onBtExport}
                        >
                            <LuExternalLink className="flex items-center w-4 h-4 " />
                            Export
                        </div>
                        <div
                            className="flex items-center gap-x-2 text-[15px] bg-[#fff] border-2 border-gray-300 text-gray-800 px-4 py-1.5 rounded-full font-medium  active:scale-[.94] active:duration-75 transition-all hover:bg-gray-100 cursor-pointer"
                            onClick={getAllItems}
                        >
                            <LuRefreshCcw className="flex items-center w-4 h-4 " />
                            Reload
                        </div>
                        <Link to={"/approval/budget/create"}>
                            <div className="flex items-center gap-x-2 text-[15px] bg-[#3a6f41] hover:bg-[#216721] text-white px-4 py-[7px] rounded-full font-medium  active:scale-[.94] active:duration-75 transition-all ">
                                <LuPlus className="flex items-center w-4 h-4 text-white" />
                                Create New
                            </div>
                        </Link>
                    </div>
                </div>

                {/* Search */}
                <div className="flex flex-col items-center p-3.5 px-4 rounded-xl bg-white border border-[#DDDDDD] shadow-[0_8px_40px_rgb(0,0,0,0.10)] space-y-4 w-full">
                    <div className="flex w-full gap-x-4">
                        {/* Search */}
                        <div className="w-1/4">
                            <label className="text-[15px] font-semibold mb-1">
                                What are you looking for?
                            </label>
                            <Search
                                className="mt-1"
                                placeholder="Enter keywords"
                                onChange={(e) => handleSearch(e)}
                            />
                        </div>
                    </div>
                </div>

                {/* List */}
                <div className=" my-4 rounded-lg ">
                    <div style={{ width: "100%" }}>
                        <div
                            className="ag-theme-quartz"
                            style={{
                                height: 700,
                                fontFamily: "Inter, sans-serif",
                            }}
                        >
                            <AgGridReact
                                ref={gridRef}
                                rowData={items}
                                columnDefs={colDefs}
                                defaultColDef={defaultColDef}
                                pagination={true}
                                paginationPageSizeSelector={
                                    paginationPageSizeSelector
                                }
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ItemList;
