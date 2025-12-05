import {Route} from "react-router-dom";
import React from "react";

const InvoicesDock = React.lazy(() => import("@TurtleCrm/Invoices/InvoicesDock"))
const BusinessSubjectsDock = React.lazy(() => import("@TurtleCrm/BusinessSubjects/BusinessSubjectsDock"))
const ContractsDock = React.lazy(() => import("@TurtleCrm/Contacts/ContractsDock"))
const CitiesDock = React.lazy(() => import("@TurtleCrm/Cities/CitiesDock"))


export default function CrmRoutes() {
    return [
        <Route
            path={"/invoices"}
            element={<InvoicesDock/>}
        />
        ,
        <Route
            path={"/invoices/:uid"}
            element={<InvoicesDock/>}
        />,
        <Route
            path={"/contacts"}
            element={<ContractsDock/>}
        />
        ,
        <Route
            path={"/contacts/:contractUid"}
            element={<ContractsDock/>}/>
        ,
        <Route
            path={"/business-subjects"}
            element={<BusinessSubjectsDock/>}/>
        ,
        <Route
            path={"/business-subjects/:subUid"}
            element={<BusinessSubjectsDock/>}/>
        ,
        <Route
            path={"/contacts"}
            element={<ContractsDock/>}/>
        ,
        <Route
            path={"/cities"}
            element={<CitiesDock/>}/>
        ,
    ]
}