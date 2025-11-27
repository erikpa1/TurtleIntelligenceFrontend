import {Route} from "react-router-dom";
import React from "react";
import InvoicesDock from "@TurtleCrm/Invoices/InvoicesDock";


export default function CrmRoutes() {
    return [
        <Route
            path={"/invoices"}
            element={<InvoicesDock/>}/>
        ,
        <Route
            path={"/invoices/:uid"}
            element={<InvoicesDock/>}
        />
    ]
}