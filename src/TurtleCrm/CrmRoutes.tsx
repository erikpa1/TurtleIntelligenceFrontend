import {Route} from "react-router-dom";
import React from "react";
import InvoicesDock from "@TurtleCrm/Invoices/InvoicesDock";
import BusinessSubjectsDock from "@TurtleCrm/BusinessSubjects/BusinessSubjectsDock";


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
            path={"/business-subjects"}
            element={<BusinessSubjectsDock/>}/>
        ,
        <Route
            path={"/business-subjects/:subUid"}
            element={<BusinessSubjectsDock/>}/>
        ,
    ]
}