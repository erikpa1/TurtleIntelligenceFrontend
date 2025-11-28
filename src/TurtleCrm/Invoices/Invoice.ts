export enum InvoiceType {
    INCOMING = 0,
    OUTCOMING = 1,
    REPAIR = 2
}

export default class Invoice {

    uid = ""
    name = ""
    busSub = ""
    type = InvoiceType.INCOMING
    total = 0
    paidPart = 0
    parentInvoice = ""

    metadata = {}

    ToJson(): any {
        return {
            uid: this.uid,
            name: this.name,
            busSub: this.busSub,
            total: this.total,
            metadata: this.metadata,

        }
    }

    FromJson(jObj: any) {
        this.uid = jObj.uid ?? ""
        this.name = jObj.name ?? ""
        this.busSub = jObj.busSub ?? ""
        this.total = jObj.total ?? 0
        this.metadata = jObj.metadata ?? {}


    }


}