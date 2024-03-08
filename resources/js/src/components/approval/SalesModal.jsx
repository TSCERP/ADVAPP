import React, { useState, useEffect } from "react";
import { Modal, Input, Select, InputNumber } from "antd";
import { nanoid } from "nanoid";
import roundDecimalNumber from "../../utils/number/roundDecimalNumber";
import "../../assets/styles/override-antd[view].css";

const { TextArea } = Input;

const titleMapping = {
    view: {
        sales: "View Sales Item",
        additionalSales: "View Additional Sales Item",
    },
    create: {
        sales: "Create Sales Item",
        additionalSales: "Create Additional Sales Item",
        additionalCost: "Create Additional Purchasing Item",
    },
    edit: {
        sales: "Edit Sales Item",
        additionalSales: "Edit Additional Sales Item",
    },
    duplicate: {
        sales: "Create Sales Item",
        additionalSales: "Create Additional Sales Item",
    },
};

// Temp data
const tempCustomers = [
    {
        value: "1",
        label: "Customer 1",
    },
    {
        value: "2",
        label: "Customer 2",
    },
    {
        value: "3",
        label: "Customer 3",
    },
];

const tempCustomerSites = [
    {
        value: "1",
        label: "Customer Site 1",
    },
    {
        value: "2",
        label: "Customer Site 2",
    },
    {
        value: "3",
        label: "Customer Site 3",
    },
];

const tempPaymentTerms = [
    {
        value: "1",
        label: "Payment term 1",
    },
    {
        value: "2",
        label: "Payment term 2",
    },
    {
        value: "3",
        label: "Payment term 3",
    },
];

const tempCurrency = [
    {
        value: "1",
        label: "VND",
    },
    {
        value: "2",
        label: "USD",
    },
    {
        value: "3",
        label: "YEN",
    },
];

const tempSubItems = [
    {
        value: "1",
        label: "Item 1",
    },
    {
        value: "2",
        label: "Item 2",
    },
    {
        value: "3",
        label: "Item 3",
    },
];

const tempUnits = [
    {
        value: "1",
        label: "Package",
    },
    {
        value: "2",
        label: "Box",
    },
    {
        value: "3",
        label: "Time",
    },
];

const tempVAT = [
    {
        value: "1",
        label: "Không có thuế",
    },
    {
        value: "2",
        label: "Không chịu thuế",
    },
    {
        value: "3",
        label: "5%",
    },
    {
        value: "4",
        label: "8%",
    },
    {
        value: "5",
        label: "10%",
    },
];

const SalesModal = (props) => {
    //Constants
    const { mode, type, info, isModalOpen, handleSave, handleCloseModal } = props;

    console.log("info: ", info)

    const salesVAT = [
        {
            id: 1,
            label: "Không có thuế",
            amount: 0,
        },
        {
            id: 2,
            label: "Không chịu thuế",
            amount: 0,
        },
        {
            id: 3,
            label: "5%",
            amount: 5,
        },
        {
            id: 4,
            label: "8%",
            amount: 8,
        },
        {
            id: 5,
            label: "10%",
            amount: 10,
        },
    ];

    // States
    const [customerList, setCustomerList] = useState(tempCustomers || []);
    const [customerSites, setCustomerSites] = useState(tempCustomerSites || []);
    const [currency, setCurrency] = useState(tempCurrency || []);
    const [customerTax, setCustomerTax] = useState("");
    const [paymentTerms, setPaymentTerms] = useState(tempPaymentTerms || []);
    const [subItems, setSubItems] = useState(tempSubItems || []);
    const [units, setUnits] = useState(tempUnits || []);
    const [vat, setVat] = useState(tempVAT || []);

    // Đối với mode view nhớ thêm giá trị mặc định vào !!!
    const [selectedCustomer, setSelectedCustomer] = useState(
         info?.customerId || null
    ); // Nhớ xoá
    const [selectedCustomerSite, setSelectedCustomerSite] = useState(
        info?.customerSiteId || null 
    ); // Nhớ xoá
    const [selectedPaymentTerm, setSelectedPaymentTerm] = useState(info?.paymentTerm || null);
    const [selectedCurrency, setSelectedCurrency] = useState(info?.currency || null);
    const [exchangeRate, setExchangeRate] = useState(info?.currency || 1);
    const [selectedSubItem, setSelectedSubItem] = useState(info?.subItem || null);
    const [currentItemName, setCurrentItemName] = useState(info?.itemName || null);
    const [currentItemGroup, setCurrentItemGroup] = useState(info?.itemGroup || null);
    const [description, setDescription] = useState(info?.description || "");
    const [selectedUnit, setSelectedUnit] = useState(info?.unitId ||null);
    const [quantity, setQuantity] = useState(info?.quantity || 1);
    const [selectedVAT, setSelectedVat] = useState(info?.vat ||null);
    const [unitPrice, setUnitPrice] = useState(info?.unitPrice || 0);

    const [price, setPrice] = useState({
        original: {
            unitPrice: info?.unitPrice || 0,
            vatAmount: info?.vatAmount || 0,
            beforeVAT: info?.beforeVAT || 0,
            afterVAT: info?.afterVAT || 0,
        },
        converted: {
            unitPrice: info?.cUnitPrice || 0,
            vatAmount: info?.cVATAmount || 0,
            beforeVAT: info?.cBeforeVAT || 0,
            afterVAT: info?.cAfterVAT || 0,
        },
    });

    const [historyProps, setHistoryProps] = useState({
        customer: selectedCustomer,
        customerSite: selectedCustomerSite,
        paymentTerm: selectedPaymentTerm,
        currency: selectedCurrency,
        exchangeRate: exchangeRate,
        subItem: selectedSubItem,
        description: description,
        unit: selectedUnit,
        quantity: quantity,
        vat: selectedVAT,
        price: price,
    });

    // useEffect
    // Change tax in according to selected customer
    useEffect(() => {
        if (selectedCustomer) {
            console.log("Đổi tax nè: ", selectedCustomer);
        }
    }, [selectedCustomer]);

    // Change payment & condition in according to selected payment term
    useEffect(() => {
        if (selectedPaymentTerm) {
            console.log("Đổi payment term nè: ", selectedPaymentTerm);
        }
    }, [selectedPaymentTerm]);

    // Listent to the change of unit price
    useEffect(() => {
        if (
            price &&
            typeof price.original.unitPrice == "number" &&
            price.original.unitPrice !== null
        ) {
            const newPrice = { ...price };
            let currentUnitPrice = price.original.unitPrice;
            newPrice.original.unitPrice = currentUnitPrice;
            if (selectedVAT) {
                let currentVATValue = salesVAT.find(($) => $.id == selectedVAT)
                    ? salesVAT.find(($) => $.id == selectedVAT).amount
                    : 0;
                newPrice.original.vatAmount = roundDecimalNumber(
                    (currentUnitPrice * quantity * currentVATValue) / 100
                );
                newPrice.original.beforeVAT = roundDecimalNumber(
                    currentUnitPrice * quantity
                );
                newPrice.original.afterVAT = roundDecimalNumber(
                    newPrice.original.beforeVAT + newPrice.original.vatAmount
                );
            } else {
                let currentVATValue = 0;
                newPrice.original.vatAmount = roundDecimalNumber(
                    (currentUnitPrice * quantity * currentVATValue) / 100
                );
                newPrice.original.beforeVAT = roundDecimalNumber(
                    currentUnitPrice * quantity
                );
                newPrice.original.afterVAT = roundDecimalNumber(
                    newPrice.original.beforeVAT + newPrice.original.vatAmount
                );
            }

            if (exchangeRate) {
                newPrice.converted.unitPrice = roundDecimalNumber(
                    newPrice.original.unitPrice * exchangeRate
                );
                newPrice.converted.vatAmount = roundDecimalNumber(
                    newPrice.original.vatAmount * exchangeRate
                );
                newPrice.converted.beforeVAT = roundDecimalNumber(
                    newPrice.original.beforeVAT * exchangeRate
                );
                newPrice.converted.afterVAT = roundDecimalNumber(
                    newPrice.original.afterVAT * exchangeRate
                );
            }

            setPrice(newPrice);
        }
    }, [price.original.unitPrice, quantity, exchangeRate]);

    // Functions
    const handleSubmit = () => {
        let submitInfo;
        if (type == "sales") {
            submitInfo = {
                customer: selectedCustomer,
                customerSite: selectedCustomerSite,
                paymentTerm: selectedPaymentTerm,
                currency: selectedCurrency,
                exchangeRate: exchangeRate,
                subItem: selectedSubItem,
                description: description,
                unit: selectedUnit,
                quantity: quantity,
                vat: selectedVAT,
                price: price,
            };
            if (type == 'create') {
                submitInfo.id = nanoid(8);
            }
            handleSave(submitInfo);
        } else if (type == "additionalSales") {
            submitInfo = {
                customer: selectedCustomer,
                customerSite: selectedCustomerSite,
                currency: selectedCurrency,
                exchangeRate: exchangeRate,
                subItem: selectedSubItem,
                description: description,
                unit: selectedUnit,
                price: price,
            };
            if (type == 'create') {
                submitInfo.id = nanoid(8);
            }
            handleSave(submitInfo);
        }
    };

    const handleClose = () => {
        if (type != "view") {
            let submitInfo;
            handleCloseModal();
            if (type == "sales") {
                submitInfo = {
                    customer: selectedCustomer,
                    customerSite: selectedCustomerSite,
                    paymentTerm: selectedPaymentTerm,
                    currency: selectedCurrency,
                    exchangeRate: exchangeRate,
                    subItem: selectedSubItem,
                    description: description,
                    unit: selectedUnit,
                    quantity: quantity,
                    vat: selectedVAT,
                    price: price,
                };
                // Kiểm tra xem so với history props thì có thay đổi không?
                return;
            } else if (type == "additionalSales") {
                submitInfo = {
                    customer: selectedCustomer,
                    customerSite: selectedCustomerSite,
                    currency: selectedCurrency,
                    exchangeRate: exchangeRate,
                    subItem: selectedSubItem,
                    description: description,
                    unit: selectedUnit,
                    price: price,
                };
                // Kiểm tra xem so với history props thì có thay đổi không?
                return;
            }
        } else handleCloseModal();
    };

    if (
        !["create", "edit", "view", "duplicate"].includes(mode) &&
        !["sales", "additionalSales"].includes(type)
    )
        return <></>;

    const currentTitle = titleMapping[mode][type];


    return (
        <Modal
            title={<h1 className="text-2xl">{currentTitle}</h1>}
            open={isModalOpen}
            onOk={handleSubmit}
            onCancel={handleClose}
            centered
            // destroyOnClose={true}
            maskClosable={false}
            width={1200}
            footer={[
                <div key={1} className="flex items-center justify-end">
                    <button
                        className="p-2 px-4 font-medium text-[15px] bg-gray-100 hover:bg-gray-200 rounded-lg active:scale-[.87] active:duration-75 transition-all "
                        onClick={handleClose}
                    >
                        Cancel
                    </button>
                    {mode != "view" && (
                        <button
                            className="p-2 px-8 ml-4 font-medium text-[15px] bg-[#3a6f41] text-white rounded-lg active:scale-[.87] active:duration-75 transition-all hover:bg-[#216721]"
                            onClick={handleSubmit}
                        >
                            Save
                        </button>
                    )}
                </div>,
            ]}
        >
            <div className="">
                <div className="w-full my-3 mb-6 ">
                    <div className="grid grid-cols-3 gap-4">
                        <div className="col-span-1">
                            <label className="block mb-2 text-[15px] font-semibold text-gray-900">
                                Customer
                            </label>
                            <Select
                                showSearch
                                allowClear
                                className={`w-full text-[15px] ${
                                    mode == "view" &&
                                    "!font-normal !text-gray-900 !cursor-default"
                                }`}
                                placeholder="Select Customer"
                                filterOption={(input, option) =>
                                    (option?.label ?? "").includes(input)
                                }
                                disabled={mode == "view"}
                                value={selectedCustomer}
                                options={customerList}
                                onChange={(value) => setSelectedCustomer(value)}
                            />
                        </div>
                        <div className="col-span-1">
                            <label className="block mb-2 text-[15px] font-semibold text-gray-900">
                                Tax
                            </label>
                            <Input
                                type="text"
                                placeholder="Enter Approval Type"
                                className={`!text-black ${
                                    mode == "view" && "!cursor-default"
                                }`}
                                value={customerTax}
                                disabled={true}
                            />
                        </div>
                        <div className="col-span-1">
                            <label className="block mb-2 text-[15px] font-semibold text-gray-900">
                                Customer Site
                            </label>
                            <Select
                                showSearch
                                allowClear
                                className={`w-full text-[15px] ${
                                    mode == "view" &&
                                    "!font-normal !text-gray-900 !cursor-default"
                                }`}
                                placeholder="Select Customer Site"
                                filterOption={(input, option) =>
                                    (option?.label ?? "").includes(input)
                                }
                                options={customerSites}
                                value={selectedCustomerSite}
                                disabled={mode == "view"}
                                onChange={(value) =>
                                    setSelectedCustomerSite(value)
                                }
                            />
                        </div>
                    </div>

                    {type != "additionalSales" && (
                        <div className="grid grid-cols-2 gap-4 mt-3">
                            <div className="col-span-1">
                                <label className="block mb-2 text-[15px] font-semibold text-gray-900">
                                    Payment Term
                                </label>
                                <Select
                                    showSearch
                                    allowClear
                                    className={`w-full text-[15px] ${
                                        mode == "view" &&
                                        "!font-normal !text-gray-900 cursor-default"
                                    }`}
                                    placeholder="Select Payment Term"
                                    filterOption={(input, option) =>
                                        (option?.label ?? "").includes(input)
                                    }
                                    options={paymentTerms}
                                    value={selectedPaymentTerm}
                                    disabled={mode == "view"}
                                    onChange={(value) =>
                                        setSelectedPaymentTerm(value)
                                    }
                                />
                            </div>
                            <div className="col-span-1">
                                <label
                                    //
                                    className="block mb-2 text-[15px] font-semibold text-gray-900"
                                >
                                    Payment Term and Condition
                                </label>
                                <Input
                                    type="text"
                                    placeholder="Enter Payment Term and Condition"
                                    className={`!text-black ${
                                        mode == "view" && "!cursor-default"
                                    }`}
                                    disabled={true}
                                    value={selectedPaymentTerm}
                                />
                            </div>
                        </div>
                    )}

                    <div className="grid grid-cols-2 gap-4 mt-3">
                        <div className="col-span-1">
                            <label
                                //
                                className="block mb-2 text-[15px] font-semibold text-gray-900"
                            >
                                Currency
                            </label>
                            <Select
                                showSearch
                                allowClear
                                className={`w-full text-[15px] ${
                                    mode == "view" &&
                                    "!font-normal !text-gray-900 cursor-default"
                                }`}
                                placeholder="Select Currency"
                                filterOption={(input, option) =>
                                    (option?.label ?? "").includes(input)
                                }
                                options={currency}
                                value={selectedCurrency}
                                disabled={mode == "view"}
                                onChange={(value) => setSelectedCurrency(value)}
                            />
                        </div>
                        <div className="col-span-1">
                            <label className="block mb-2 text-[15px] font-semibold text-gray-900">
                                Exchange Rate
                            </label>
                            <InputNumber
                                controls={false}
                                addonAfter="vnđ"
                                placeholder="Enter Exchange Rate"
                                className={`exchange-rate w-full text-right text-[15px] ${
                                    mode == "view" &&
                                    "!font-normal !text-gray-900 cursor-default"
                                }`}
                                min={1}
                                formatter={(value) =>
                                    `${value}`.replace(
                                        /\B(?=(\d{3})+(?!\d))/g,
                                        ","
                                    )
                                }
                                parser={(value) => {
                                    const floatValue = parseFloat(
                                        value.replace(/,/g, "")
                                    );
                                    const roundedValue = isNaN(floatValue)
                                        ? 1
                                        : floatValue % 1 === 0
                                        ? floatValue
                                        : floatValue.toFixed(2);
                                    return Math.max(1, roundedValue);
                                }}
                                defaultValue={exchangeRate}
                                disabled={mode == "view"}
                                onChange={(value) => setExchangeRate(value)}
                            />
                        </div>
                    </div>

                    <div className="shadow-sm mt-5 mb-3 rounded-lg border-2 border-gray-300 ">
                        <div className="flex items-center space-x-3 rounded-t-lg bg-gray-100 border-b-2 border-gray-300 p-1.5 px-4 text-[15px] text-[#37763F] font-bold uppercase ">
                            <div>Item Information</div>
                        </div>
                        <div className="px-4 py-3 ">
                            {/* Form */}
                            <div className="grid grid-cols-3 gap-4">
                                <div className="col-span-1">
                                    <label className="block mb-2 text-[15px] font-semibold text-gray-900">
                                        Sub Item
                                    </label>
                                    <Select
                                        showSearch
                                        allowClear
                                        className={`w-full text-[15px] ${
                                            mode == "view" &&
                                            "!font-normal !text-gray-900 cursor-default"
                                        }`}
                                        placeholder="Select Sub Item"
                                        filterOption={(input, option) =>
                                            (option?.label ?? "").includes(
                                                input
                                            )
                                        }
                                        options={subItems}
                                        value={selectedSubItem}
                                        disabled={mode == "view"}
                                        onChange={(value) =>
                                            setSelectedSubItem(value)
                                        }
                                    />
                                </div>
                                <div className="col-span-1">
                                    <label className="block mb-2 text-[15px] font-semibold text-gray-900">
                                        Item Name
                                    </label>
                                    <Input
                                        type="text"
                                        placeholder="Item Name Information"
                                        className={`!text-black ${
                                            mode == "view" && "!cursor-default"
                                        }`}
                                        disabled={true}
                                        value={selectedSubItem?.name || ""}
                                    />
                                </div>
                                <div className="col-span-1">
                                    <label className="block mb-2 text-[15px] font-semibold text-gray-900">
                                        Item Group
                                    </label>
                                    <Input
                                        type="text"
                                        placeholder="Item Group Information"
                                        className={`!text-black ${
                                            mode == "view" && "!cursor-default"
                                        }`}
                                        disabled={true}
                                        value={selectedSubItem?.group || ""}
                                    />
                                </div>
                            </div>

                            <div className="mt-2 grid grid-cols-1 gap-4">
                                <div className="col-span-1">
                                    <label
                                        className="block mb-2 text-[15px] font-semibold text-gray-900"
                                    >
                                        Description
                                    </label>
                                    <TextArea
                                        rows={2}
                                        placeholder="Enter Good/Service Summary"
                                        className={`!text-black ${
                                            mode == "view" && "!cursor-default"
                                        }`}
                                        value={description}
                                        disabled={mode == "view"}
                                        onChange={(e) =>
                                            setDescription(e.target.value)
                                        }
                                    />
                                </div>
                            </div>

                            <div className="mt-3 grid grid-cols-3 gap-4">
                                <div className="col-span-1">
                                    <label className="block mb-2 text-[15px] font-semibold text-gray-900">
                                        Unit
                                    </label>
                                    <Select
                                        showSearch
                                        allowClear
                                        className={`w-full text-[15px] ${
                                            mode == "view" &&
                                            "!font-normal !text-gray-900 cursor-default"
                                        }`}
                                        placeholder="Select Unit"
                                        filterOption={(input, option) =>
                                            (option?.label ?? "").includes(
                                                input
                                            )
                                        }
                                        options={units}
                                        value={selectedUnit}
                                        disabled={mode == "view"}
                                        onChange={(value) =>
                                            setSelectedUnit(value)
                                        }
                                    />
                                </div>
                                {type != "additionalSales" && (
                                    <>
                                        <div className="col-span-1">
                                            <label className="block mb-2 text-[15px] font-semibold text-gray-900">
                                                Quantity
                                            </label>
                                            <InputNumber
                                                min={1}
                                                className={`w-full !text-black ${
                                                    mode == "view" &&
                                                    "!cursor-default"
                                                }`}
                                                disabled={mode == "view"}
                                                formatter={(value) =>
                                                    `${value}`.replace(
                                                        /\B(?=(\d{3})+(?!\d))/g,
                                                        ","
                                                    )
                                                }
                                                parser={(value) => {
                                                    const integerValue =
                                                        parseInt(
                                                            value.replace(
                                                                /,/g,
                                                                ""
                                                            ),
                                                            10
                                                        );
                                                    return isNaN(integerValue)
                                                        ? 1
                                                        : integerValue;
                                                }}
                                                step={1}
                                                defaultValue={quantity}
                                                onChange={(value) =>
                                                    setQuantity(value)
                                                }
                                            />
                                        </div>
                                        <div className="col-span-1">
                                            <label className="block mb-2 text-[15px] font-semibold text-gray-900">
                                                VAT (%)
                                            </label>
                                            <Select
                                                showSearch
                                                allowClear
                                                className={`w-full text-[15px] ${
                                                    mode == "view" &&
                                                    "!font-normal !text-gray-900 cursor-default"
                                                }`}
                                                placeholder="Select % VAT"
                                                filterOption={(input, option) =>
                                                    (
                                                        option?.label ?? ""
                                                    ).includes(input)
                                                }
                                                options={vat}
                                                value={selectedVAT}
                                                disabled={mode == "view"}
                                                onChange={(value) =>
                                                    setSelectedVat(value)
                                                }
                                            />
                                        </div>
                                    </>
                                )}
                            </div>

                            {/* Currency Convert */}
                            <div className="mt-6 mb-2  border-2 border-gray-300 ">
                                <div className="overflow-x-auto">
                                    <table className=" w-full bg-white border-collapse text-[15px]">
                                        <thead className=" rounded-t-lg">
                                            <tr className="border-b-2 border-gray-300">
                                                <th className="w-1/6 text-center border-r-2 border-gray-300 py-2"></th>
                                                <th className="bg-blue-50 w-2/5 text-blue-600 text-center text-[17px] px-8 py-2 border-r-2 border-gray-300">
                                                    Original Price
                                                </th>
                                                <th className="w-2/5 bg-violet-100 text-violet-600 text-center text-[17px] px-8 py-2">
                                                    Converted Price (VND)
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr className="border-b-2 border-gray-300">
                                                <td className="font-semibold text-center  px-6 py-2 border-r-2 border-gray-300">
                                                    Unit Price
                                                </td>
                                                <td className=" px-6 py-2 border-r-2 border-gray-300">
                                                    <InputNumber
                                                        controls={false}
                                                        min={0}
                                                        placeholder="Enter Unit Price"
                                                        // size="large"
                                                        className={`converted-price w-full !text-black ${
                                                            mode == "view" &&
                                                            "!cursor-default"
                                                        }`}
                                                        disabled={
                                                            mode == "view"
                                                        }
                                                        formatter={(value) =>
                                                            `${value}`.replace(
                                                                /\B(?=(\d{3})+(?!\d))/g,
                                                                ","
                                                            )
                                                        }
                                                        parser={(value) => {
                                                            if (value == 0)
                                                                return "0";
                                                            const floatValue =
                                                                parseFloat(
                                                                    value.replace(
                                                                        /,/g,
                                                                        ""
                                                                    )
                                                                );
                                                            const roundedValue =
                                                                isNaN(
                                                                    floatValue
                                                                )
                                                                    ? 1
                                                                    : floatValue %
                                                                          1 ===
                                                                      0
                                                                    ? floatValue
                                                                    : floatValue.toFixed(
                                                                          2
                                                                      );
                                                            return Math.max(
                                                                1,
                                                                roundedValue
                                                            );
                                                        }}
                                                        // step={1}
                                                        value={
                                                            price.original
                                                                .unitPrice
                                                        }
                                                        onChange={(value) => {
                                                            const newPrice = {
                                                                ...price,
                                                            };
                                                            newPrice.original.unitPrice =
                                                                value;
                                                            setPrice(newPrice);
                                                        }}
                                                    />
                                                </td>
                                                <td className="w-[200px] px-6 py-2">
                                                    <InputNumber
                                                        controls={false}
                                                        addonAfter="vnđ"
                                                        placeholder="Converted Unit Price"
                                                        className={`converted-price w-full !text-black text-[15px] ${
                                                            mode == "view" &&
                                                            "!font-normal !text-gray-900 cursor-default"
                                                        }`}
                                                        min={0}
                                                        // size="large"
                                                        formatter={(value) =>
                                                            `${value}`.replace(
                                                                /\B(?=(\d{3})+(?!\d))/g,
                                                                ","
                                                            )
                                                        }
                                                        parser={(value) => {
                                                            const floatValue =
                                                                parseFloat(
                                                                    value.replace(
                                                                        /,/g,
                                                                        ""
                                                                    )
                                                                );
                                                            const roundedValue =
                                                                isNaN(
                                                                    floatValue
                                                                )
                                                                    ? 1
                                                                    : floatValue %
                                                                          1 ===
                                                                      0
                                                                    ? floatValue
                                                                    : floatValue.toFixed(
                                                                          2
                                                                      );
                                                            return Math.max(
                                                                1,
                                                                roundedValue
                                                            );
                                                        }}
                                                        defaultValue={
                                                            price.converted
                                                                .unitPrice
                                                        }
                                                        value={
                                                            price.converted
                                                                .unitPrice
                                                        }
                                                        disabled={true}
                                                    />
                                                </td>
                                            </tr>
                                            <tr className="border-b-2 border-gray-300">
                                                <td className="font-semibold text-center px-8 py-2 border-r-2 border-gray-300">
                                                    VAT Ammount
                                                </td>
                                                <td className="px-6 py-2 border-r-2 border-gray-300">
                                                    <InputNumber
                                                        controls={false}
                                                        min={0}
                                                        // size="large"
                                                        className={`converted-price w-full !text-black ${
                                                            mode == "view" &&
                                                            "!cursor-default"
                                                        }`}
                                                        disabled={true}
                                                        formatter={(value) =>
                                                            `${value}`.replace(
                                                                /\B(?=(\d{3})+(?!\d))/g,
                                                                ","
                                                            )
                                                        }
                                                        parser={(value) => {
                                                            const floatValue =
                                                                parseFloat(
                                                                    value.replace(
                                                                        /,/g,
                                                                        ""
                                                                    )
                                                                );
                                                            const roundedValue =
                                                                isNaN(
                                                                    floatValue
                                                                )
                                                                    ? 1
                                                                    : floatValue %
                                                                          1 ===
                                                                      0
                                                                    ? floatValue
                                                                    : floatValue.toFixed(
                                                                          2
                                                                      );
                                                            return Math.max(
                                                                1,
                                                                roundedValue
                                                            );
                                                        }}
                                                        step={1}
                                                        defaultValue={
                                                            price.original
                                                                .vatAmount
                                                        }
                                                        value={
                                                            price.original
                                                                .vatAmount
                                                        }
                                                    />
                                                </td>
                                                <td className=" px-6 py-2">
                                                    <InputNumber
                                                        controls={false}
                                                        addonAfter="vnđ"
                                                        placeholder="Converted VAT Amount"
                                                        className={`converted-price w-full !text-black text-[15px] ${
                                                            mode == "view" &&
                                                            "!font-normal !text-gray-900 cursor-default"
                                                        }`}
                                                        min={0}
                                                        // size="large"
                                                        formatter={(value) =>
                                                            `${value}`.replace(
                                                                /\B(?=(\d{3})+(?!\d))/g,
                                                                ","
                                                            )
                                                        }
                                                        parser={(value) => {
                                                            const floatValue =
                                                                parseFloat(
                                                                    value.replace(
                                                                        /,/g,
                                                                        ""
                                                                    )
                                                                );
                                                            const roundedValue =
                                                                isNaN(
                                                                    floatValue
                                                                )
                                                                    ? 1
                                                                    : floatValue %
                                                                          1 ===
                                                                      0
                                                                    ? floatValue
                                                                    : floatValue.toFixed(
                                                                          2
                                                                      );
                                                            return Math.max(
                                                                1,
                                                                roundedValue
                                                            );
                                                        }}
                                                        value={
                                                            price.converted
                                                                .vatAmount
                                                        }
                                                        disabled={true}
                                                    />
                                                </td>
                                            </tr>
                                            <tr className="border-b-2 border-gray-300">
                                                <td className="font-semibold text-center px-8 py-2 border-r-2 border-gray-300">
                                                    Before VAT
                                                </td>
                                                <td className="px-6 py-2 border-r-2 border-gray-300">
                                                    <InputNumber
                                                        controls={false}
                                                        min={0}
                                                        // size="large"
                                                        className={`converted-price w-full !text-black ${
                                                            mode == "view" &&
                                                            "!cursor-default"
                                                        }`}
                                                        disabled={true}
                                                        formatter={(value) =>
                                                            `${value}`.replace(
                                                                /\B(?=(\d{3})+(?!\d))/g,
                                                                ","
                                                            )
                                                        }
                                                        parser={(value) => {
                                                            const floatValue =
                                                                parseFloat(
                                                                    value.replace(
                                                                        /,/g,
                                                                        ""
                                                                    )
                                                                );
                                                            const roundedValue =
                                                                isNaN(
                                                                    floatValue
                                                                )
                                                                    ? 1
                                                                    : floatValue %
                                                                          1 ===
                                                                      0
                                                                    ? floatValue
                                                                    : floatValue.toFixed(
                                                                          2
                                                                      );
                                                            return Math.max(
                                                                1,
                                                                roundedValue
                                                            );
                                                        }}
                                                        step={1}
                                                        defaultValue={
                                                            price.original
                                                                .beforeVAT
                                                        }
                                                        value={
                                                            price.original
                                                                .beforeVAT
                                                        }
                                                    />
                                                </td>
                                                <td className=" px-6 py-2">
                                                    <InputNumber
                                                        controls={false}
                                                        addonAfter="vnđ"
                                                        placeholder="Converted Before VAT"
                                                        className={`converted-price w-full !text-black text-[15px] ${
                                                            mode == "view" &&
                                                            "!font-normal !text-gray-900 cursor-default"
                                                        }`}
                                                        min={0}
                                                        // size="large"
                                                        formatter={(value) =>
                                                            `${value}`.replace(
                                                                /\B(?=(\d{3})+(?!\d))/g,
                                                                ","
                                                            )
                                                        }
                                                        parser={(value) => {
                                                            const floatValue =
                                                                parseFloat(
                                                                    value.replace(
                                                                        /,/g,
                                                                        ""
                                                                    )
                                                                );
                                                            const roundedValue =
                                                                isNaN(
                                                                    floatValue
                                                                )
                                                                    ? 1
                                                                    : floatValue %
                                                                          1 ===
                                                                      0
                                                                    ? floatValue
                                                                    : floatValue.toFixed(
                                                                          2
                                                                      );
                                                            return Math.max(
                                                                1,
                                                                roundedValue
                                                            );
                                                        }}
                                                        defaultValue={
                                                            price.converted
                                                                .beforeVAT
                                                        }
                                                        value={
                                                            price.converted
                                                                .beforeVAT
                                                        }
                                                        disabled={true}
                                                    />
                                                </td>
                                            </tr>
                                            <tr className="">
                                                <td className="font-semibold text-center  px-8 py-2 border-r-2 border-gray-300">
                                                    After VAT
                                                </td>
                                                <td className=" px-6 py-2 border-r-2 border-gray-300">
                                                    <InputNumber
                                                        controls={false}
                                                        min={0}
                                                        // size="large"
                                                        className={`converted-price w-full !text-black ${
                                                            mode == "view" &&
                                                            "!cursor-default"
                                                        }`}
                                                        disabled={true}
                                                        formatter={(value) =>
                                                            `${value}`.replace(
                                                                /\B(?=(\d{3})+(?!\d))/g,
                                                                ","
                                                            )
                                                        }
                                                        parser={(value) => {
                                                            const floatValue =
                                                                parseFloat(
                                                                    value.replace(
                                                                        /,/g,
                                                                        ""
                                                                    )
                                                                );
                                                            const roundedValue =
                                                                isNaN(
                                                                    floatValue
                                                                )
                                                                    ? 1
                                                                    : floatValue %
                                                                          1 ===
                                                                      0
                                                                    ? floatValue
                                                                    : floatValue.toFixed(
                                                                          2
                                                                      );
                                                            return Math.max(
                                                                1,
                                                                roundedValue
                                                            );
                                                        }}
                                                        step={1}
                                                        defaultValue={
                                                            price.original
                                                                .afterVAT
                                                        }
                                                        value={
                                                            price.original
                                                                .afterVAT
                                                        }
                                                    />
                                                </td>
                                                <td className=" px-6 py-2">
                                                    <InputNumber
                                                        controls={false}
                                                        addonAfter="vnđ"
                                                        placeholder="Converted After VAT"
                                                        className={`converted-price w-full !text-black text-[15px] ${
                                                            mode == "view" &&
                                                            "!font-normal !text-gray-900 cursor-default"
                                                        }`}
                                                        min={0}
                                                        // size="large"
                                                        formatter={(value) =>
                                                            `${value}`.replace(
                                                                /\B(?=(\d{3})+(?!\d))/g,
                                                                ","
                                                            )
                                                        }
                                                        parser={(value) => {
                                                            if (
                                                                typeof value ==
                                                                    "number" &&
                                                                value == 0
                                                            )
                                                                return 0;
                                                            const floatValue =
                                                                parseFloat(
                                                                    value.replace(
                                                                        /,/g,
                                                                        ""
                                                                    )
                                                                );
                                                            const roundedValue =
                                                                isNaN(
                                                                    floatValue
                                                                )
                                                                    ? 1
                                                                    : floatValue %
                                                                          1 ===
                                                                      0
                                                                    ? floatValue
                                                                    : floatValue.toFixed(
                                                                          2
                                                                      );
                                                            return Math.max(
                                                                1,
                                                                roundedValue
                                                            );
                                                        }}
                                                        defaultValue={
                                                            price.converted
                                                                .afterVAT
                                                        }
                                                        value={
                                                            price.converted
                                                                .afterVAT
                                                        }
                                                        disabled={true}
                                                    />
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    );
};

export default SalesModal;
