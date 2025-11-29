import React from "react";
import DynamicHierarchy from "@Turtle/DynamicModules/DynamicHierarchy";
import InvoicesApi from "@TurtleCrm/Invoices/InvoicesApi";
import Invoice from "@TurtleCrm/Invoices/Invoice";
import COUInvoice from "@TurtleCrm/Invoices/COUInvoice";

export default function InvoicesHierarchy() {
    return <DynamicHierarchy<Invoice> api={InvoicesApi} cou={COUInvoice}/>
}