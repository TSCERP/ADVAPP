import React, { useLayoutEffect } from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";
import { useLocation } from "react-router-dom";
import { Layout } from "antd";

// General
import Home from "../pages/home";
import Login from "../pages/(auth)/login";
import NotFound from "../pages/errors/notfound";

// Approval
import ApprovalBusinessSpotList from "../pages/approval/business/spot/list";
import ApprovalBusinessSpotCreate from "../pages/approval/business/spot/create";
import ApprovalBusinessSpotEdit from "../pages/approval/business/spot/edit";
import ApprovalBusinessSpotView from "../pages/approval/business/spot/view";

import ApprovalBusinessFMSList from "../pages/approval/business/fms/list";
import ApprovalBusinessFMSCreate from "../pages/approval/business/fms/create";
import ApprovalBusinessFMSEdit from "../pages/approval/business/fms/edit";
import ApprovalBusinessFMSView from "../pages/approval/business/fms/view";
import ApprovalBusinessFMSConfirm from "../pages/approval/business/fms/confirm";

import ApprovalBusinessYearlyList from "../pages/approval/business/yearly/list";
import ApprovalBusinessYearlyCreate from "../pages/approval/business/yearly/create";
import ApprovalBusinessYearlyEdit from "../pages/approval/business/yearly/edit";
import ApprovalBusinessYearlyView from "../pages/approval/business/yearly/view";

import ApprovalBudgetCreate from "../pages/approval/budget/create";
import ApprovalBudgetList from "../pages/approval/budget/list";
import ApprovalBudgetEdit from "../pages/approval/budget/edit";
import ApprovalBudgetView from "../pages/approval/budget/view";

import ApprovalSGAView from "../pages/approval/sg&a-cost/view";
import ApprovalSGAList from "../pages/approval/sg&a-cost/list";
import ApprovalSGACreate from "../pages/approval/sg&a-cost/create";
import ApprovalSGAEdit from "../pages/approval/sg&a-cost/edit";
import ApprovalOtherCreate from "../pages/approval/other/create";
import ApprovalOtherList from "../pages/approval/other/list";
import ApprovalOtherEdit from "../pages/approval/other/edit";
import ApprovalOtherView from "../pages/approval/other/view";

// Contract Management
import ContractList from "../pages/contract-management/contract/list";
import ContractCreate from "../pages/contract-management/contract/create";
import ContractEdit from "../pages/contract-management/contract/edit";
import ContractView from "../pages/contract-management/contract/view";

import ContractApendixList from "../pages/contract-management/contract-apendix/list";
import ContractApendixCreate from "../pages/contract-management/contract-apendix/create";
import ContractApendixEdit from "../pages/contract-management/contract-apendix/edit";
import ContractApendixView from "../pages/contract-management/contract-apendix/view";

import ContractLiquidationList from "../pages/contract-management/liquidation/list";
import ContractLiquidationCreate from "../pages/contract-management/liquidation/create";
import ContractLiquidationEdit from "../pages/contract-management/liquidation/edit";
import ContractLiquidationView from "../pages/contract-management/liquidation/view";
import ContractReviseApendixList from "../pages/contract-management/revise-apendix/list";
import ContractReviseApendixCreate from "../pages/contract-management/revise-apendix/create";
import ContractReviseApendixEdit from "../pages/contract-management/revise-apendix/edit";
import ContractReviseApendixView from "../pages/contract-management/revise-apendix/view";

// Sale Quotation
import SalesQuotationList from "../pages/sales-quotation/list";
import SalesQuotationCreate from "../pages/sales-quotation/create";
import SalesQuotationEdit from "../pages/sales-quotation/edit";
import SalesQuotationView from "../pages/sales-quotation/view";

// Customer Handover
import CustomerHandoverList from "../pages/customer-handover/list";
import CustomerHandoverCreate from "../pages/customer-handover/create";
import CustomerHandoverEdit from "../pages/customer-handover/edit";
import CustomerHandoverView from "../pages/customer-handover/view";

// Purchase Order
import PurchaseOrderList from "../pages/purchase-order/list";
import PurchaseOrderCreate from "../pages/purchase-order/create";
import PurchaseOrderEdit from "../pages/purchase-order/edit";
import PurchaseOrderView from "../pages/purchase-order/view";

// Vendor Handover
import VendorHandoverList from "../pages/vendor-handover/list";
import VendorHandoverCreate from "../pages/vendor-handover/create";
import VendorHandoverEdit from "../pages/vendor-handover/edit";
import VendorHandoverView from "../pages/vendor-handover/view";

// Payment Request
import PaymentRequestList from "../pages/payment-request/list";
import PaymentRequestCreate from "../pages/payment-request/create";
import PaymentRequestEdit from "../pages/payment-request/edit";
import PaymentRequestView from "../pages/payment-request/view";

// Master Data
import EmployeeList from "../pages/employees/index";
import VendorList from "../pages/vendors/index";
import CustomerList from "../pages/customers/index";
import ItemList from "../pages/items/index";

// Administration
import UsersList from "../pages/users/index";
import UserProfile from "../pages/users/user";
import CreateUser from "../pages/users/create";
import Roles from "../pages/roles";
import Integration from "../pages/integration";
import Settings from "../pages/settings";

function AppRoutes() {
    const location = useLocation();

    useLayoutEffect(() => {
        document.documentElement.scrollTo(0, 0);
    }, [location.pathname]);

    return (
        <Routes>
            {/* General */}
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Home />} />

            {/* Approval */}
            {/* Approval Business - Spot */}
            <Route
                path="/approval/business/spot"
                element={<ApprovalBusinessSpotList />}
            />
            <Route
                path="/approval/business/spot/create"
                element={<ApprovalBusinessSpotCreate />}
            />
            <Route
                path="/approval/business/spot/edit/:id"
                element={<ApprovalBusinessSpotEdit />}
            />
            <Route
                path="/approval/business/spot/view/:id"
                element={<ApprovalBusinessSpotView />}
            />

            {/* Approval Business - FMS */}
            <Route
                path="/approval/business/fms"
                element={<ApprovalBusinessFMSList />}
            />
            <Route
                path="/approval/business/fms/create/"
                element={<ApprovalBusinessFMSCreate />}
            />
            <Route
                path="/approval/business/fms/edit/:id"
                element={<ApprovalBusinessFMSEdit />}
            />
            <Route
                path="/approval/business/fms/view/:id"
                element={<ApprovalBusinessFMSView />}
            />
            <Route
                path="/approval/business/fms/confirm"
                element={<ApprovalBusinessFMSConfirm />}
            />

            {/* Approval Business - Yearly */}
            <Route
                path="/approval/business/yearly"
                element={<ApprovalBusinessYearlyList />}
            />
            <Route
                path="/approval/business/yearly/create"
                element={<ApprovalBusinessYearlyCreate />}
            />
            <Route
                path="/approval/business/yearly/edit/:id"
                element={<ApprovalBusinessYearlyEdit />}
            />
            <Route
                path="/approval/business/yearly/view/:id"
                element={<ApprovalBusinessYearlyView />}
            />
            {/* Approval Budget */}
            <Route path="/approval/budget" element={<ApprovalBudgetList />} />
            <Route
                path="/approval/budget/create"
                element={<ApprovalBudgetCreate />}
            />
            <Route
                path="/approval/budget/edit/:id"
                element={<ApprovalBudgetEdit />}
            />
            <Route
                path="/approval/budget/view/:id"
                element={<ApprovalBudgetView />}
            />

            {/* Approval SG&A Cost */}
            <Route path="/approval/sg&a" element={<ApprovalSGAList />} />
            <Route
                path="/approval/sg&a/create"
                element={<ApprovalSGACreate />}
            />
            <Route
                path="/approval/sg&a/edit/:id"
                element={<ApprovalSGAEdit />}
            />
            <Route
                path="/approval/sg&a/view/:id"
                element={<ApprovalSGAView />}
            />

            {/* Approval Other */}
            <Route path="/approval/other" element={<ApprovalOtherList />} />
            <Route
                path="/approval/other/create"
                element={<ApprovalOtherCreate />}
            />
            <Route
                path="/approval/other/edit/:id"
                element={<ApprovalOtherEdit />}
            />
            <Route
                path="/approval/other/view/:id"
                element={<ApprovalOtherView />}
            />

            {/* Contract Management */}
            {/* Contract Management - Contracts */}
            <Route
                path="/contract-management/contracts"
                element={<ContractList />}
            />
            <Route
                path="/contract-management/contracts/create"
                element={<ContractCreate />}
            />
            <Route
                path="/contract-management/contracts/edit"
                element={<ContractEdit />}
            />
            <Route
                path="/contract-management/contracts/view"
                element={<ContractView />}
            />

            {/* Contract Management - Contract Apendix */}
            <Route
                path="/contract-management/contract-appendix"
                element={<ContractApendixList />}
            />
            <Route
                path="/contract-management/contract-appendix/create"
                element={<ContractApendixCreate />}
            />
            <Route
                path="/contract-management/contract-appendix/edit"
                element={<ContractApendixEdit />}
            />
            <Route
                path="/contract-management/contract-appendix/view"
                element={<ContractApendixView />}
            />

            {/* Contract Management - Liquidation */}
            <Route
                path="/contract-management/liquidation"
                element={<ContractLiquidationList />}
            />
            <Route
                path="/contract-management/liquidation/create"
                element={<ContractLiquidationCreate />}
            />
            <Route
                path="/contract-management/liquidation/edit"
                element={<ContractLiquidationEdit />}
            />
            <Route
                path="/contract-management/liquidation/view"
                element={<ContractLiquidationView />}
            />

            {/* Contract Management - Revised Apendix */}
            <Route
                path="/contract-management/revised-appendix"
                element={<ContractReviseApendixList />}
            />
            <Route
                path="/contract-management/revised-appendix/create"
                element={<ContractReviseApendixCreate />}
            />
            <Route
                path="/contract-management/revised-appendix/edit"
                element={<ContractReviseApendixEdit />}
            />
            <Route
                path="/contract-management/revised-appendix/view"
                element={<ContractReviseApendixView />}
            />

            {/* Customer Handover */}
            <Route
                path="/customer-handover"
                element={<CustomerHandoverList />}
            />
            <Route
                path="/customer-handover/create"
                element={<CustomerHandoverCreate />}
            />
            <Route
                path="/customer-handover/edit"
                element={<CustomerHandoverEdit />}
            />
            <Route
                path="/customer-handover/view"
                element={<CustomerHandoverView />}
            />

            {/* Sales Quotation */}
            <Route path="/sales-quotation" element={<SalesQuotationList />} />
            <Route
                path="/sales-quotation/create"
                element={<SalesQuotationCreate />}
            />
            <Route
                path="/sales-quotation/edit"
                element={<SalesQuotationEdit />}
            />
            <Route
                path="/sales-quotation/view"
                element={<SalesQuotationView />}
            />

            {/* Purchase Order */}
            <Route path="/purchase-order" element={<PurchaseOrderList />} />
            <Route
                path="/purchase-order/create"
                element={<PurchaseOrderCreate />}
            />
            <Route
                path="/purchase-order/edit"
                element={<PurchaseOrderEdit />}
            />
            <Route
                path="/purchase-order/view"
                element={<PurchaseOrderView />}
            />

            {/* Vendor Handover */}
            <Route path="/vendor-handover" element={<VendorHandoverList />} />
            <Route
                path="/vendor-handover/create"
                element={<VendorHandoverCreate />}
            />
            <Route
                path="/vendor-handover/edit"
                element={<VendorHandoverEdit />}
            />
            <Route
                path="/vendor-handover/view"
                element={<VendorHandoverView />}
            />

            {/* Payment Request */}
            <Route path="/payment-request" element={<PaymentRequestList />} />
            <Route
                path="/payment-request/create"
                element={<PaymentRequestCreate />}
            />
            <Route
                path="/payment-request/edit"
                element={<PaymentRequestEdit />}
            />
            <Route
                path="/payment-request/view"
                element={<PaymentRequestView />}
            />

            {/* Master Data */}
            <Route path="/employees" element={<EmployeeList />} />
            <Route path="/vendors" element={<VendorList />} />
            <Route path="/customers" element={<CustomerList />} />
            <Route path="/items" element={<ItemList />} />

            {/* Administration */}
            <Route path="/users" element={<UsersList />} />
            <Route
                path="/users/view/:id"
                element={<UserProfile mode="view" />}
            />
            <Route
                path="/users/edit/:id"
                element={<UserProfile mode="edit" />}
            />
            <Route path="/users/create" element={<CreateUser />} />
            <Route path="/roles" element={<Roles />} />
            <Route path="/integration" element={<Integration />} />
            <Route path="/settings" element={<Settings />} />

            <Route path="*" element={<NotFound />} />
        </Routes>
    );
}

export default AppRoutes;
