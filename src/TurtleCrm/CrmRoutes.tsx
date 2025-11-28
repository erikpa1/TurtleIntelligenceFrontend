import {Route} from "react-router-dom";
import React from "react";
import InvoicesDock from "@TurtleCrm/Invoices/InvoicesDock";
import BusinessSubjectsDock from "@TurtleCrm/BusinessSubjects/BusinessSubjectsDock";
import ContractsDock from "@TurtleCrm/Contacts/ContractsDock";


export default function CrmRoutes() {
    return [
        <Route
            path={"/invoices"}
            element={<InvoicesDock/>}/>
        ,
        <Route
            path={"/invoices/:uid"}
            element={<InvoicesDock/>}
        />,
        <Route
            path={"/contacts"}
            element={<ContractsDock/>}/>
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

    ]
}