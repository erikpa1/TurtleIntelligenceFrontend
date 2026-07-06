// Item is the frontend mirror of inventory/items.Item on the backend.
// It represents a material master record (product / part) used both by the
// inventory module and as a product/component inside manufacturing BOMs.

export const ITEM_CATEGORIES = ["raw", "semiFinished", "finished", "trading"] as const
export type ItemCategory = (typeof ITEM_CATEGORIES)[number]

export const ITEM_UOMS = ["pcs", "kg", "g", "l", "ml", "m", "cm", "m2", "m3", "h"] as const

export default class Item {
    uid = ""
    sku = ""
    name = ""
    description = ""
    category: string = "raw"
    type = "Material"
    uom = "pcs"
    unitPrice = 0
    currency = "EUR"
    qtyOnHand = 0
    reorderPoint = 0
    warehouse = ""
    active = true

    ToJson(): any {
        return {
            uid: this.uid,
            sku: this.sku,
            name: this.name,
            description: this.description,
            category: this.category,
            type: this.type,
            uom: this.uom,
            unitPrice: this.unitPrice,
            currency: this.currency,
            qtyOnHand: this.qtyOnHand,
            reorderPoint: this.reorderPoint,
            warehouse: this.warehouse,
            active: this.active,
        }
    }

    FromJson(jObj: any) {
        this.uid = jObj.uid ?? ""
        this.sku = jObj.sku ?? ""
        this.name = jObj.name ?? ""
        this.description = jObj.description ?? ""
        this.category = jObj.category ?? "raw"
        this.type = jObj.type ?? "Material"
        this.uom = jObj.uom ?? "pcs"
        this.unitPrice = jObj.unitPrice ?? 0
        this.currency = jObj.currency ?? "EUR"
        this.qtyOnHand = jObj.qtyOnHand ?? 0
        this.reorderPoint = jObj.reorderPoint ?? 0
        this.warehouse = jObj.warehouse ?? ""
        this.active = jObj.active ?? true
    }
}
