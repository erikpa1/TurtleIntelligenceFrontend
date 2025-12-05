import DynamicApi from "@Turtle/DynamicModules/DynamicApi";
import Invoice from "@TurtleCrm/Invoices/Invoice";


export default class InvoicesApi extends DynamicApi<Invoice> {
    static bucket = "invoice"
    static nameSpaceAndBucket = "crm/invoice"
    static TConstructor = Invoice

}
