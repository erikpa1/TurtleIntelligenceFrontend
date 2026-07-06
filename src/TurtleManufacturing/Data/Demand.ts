// DemandOrder mirrors manufacutring/demand.DemandOrder on the backend.

export const DEMAND_TYPES = ["sales", "forecast"] as const
export const DEMAND_STATUSES = ["open", "released", "closed"] as const

export default class Demand {
    uid = ""
    reference = ""
    productUid = ""
    productSku = ""
    quantity = 1
    uom = "pcs"
    dueDate = ""
    demandType: string = "sales"
    status: string = "open"

    ToJson(): any {
        return {
            uid: this.uid,
            reference: this.reference,
            productUid: this.productUid,
            productSku: this.productSku,
            quantity: this.quantity,
            uom: this.uom,
            dueDate: this.dueDate,
            demandType: this.demandType,
            status: this.status,
        }
    }

    FromJson(jObj: any) {
        this.uid = jObj.uid ?? ""
        this.reference = jObj.reference ?? ""
        this.productUid = jObj.productUid ?? ""
        this.productSku = jObj.productSku ?? ""
        this.quantity = jObj.quantity ?? 0
        this.uom = jObj.uom ?? "pcs"
        this.dueDate = jObj.dueDate ?? ""
        this.demandType = jObj.demandType ?? "sales"
        this.status = jObj.status ?? "open"
    }
}
