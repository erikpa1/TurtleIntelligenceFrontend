// Bom is the frontend mirror of manufacutring/bom.Bom on the backend.

export const BOM_STATUSES = ["draft", "active", "obsolete"] as const
export type BomStatus = (typeof BOM_STATUSES)[number]

export interface BomComponent {
    itemUid: string
    sku: string
    name: string
    quantity: number
    uom: string
    scrapPct: number
    position: number
}

export function newBomComponent(): BomComponent {
    return {
        itemUid: "",
        sku: "",
        name: "",
        quantity: 1,
        uom: "pcs",
        scrapPct: 0,
        position: 0,
    }
}

export default class Bom {
    uid = ""
    code = ""
    name = ""
    description = ""
    productUid = ""
    productSku = ""
    baseQuantity = 1
    uom = "pcs"
    version = "1"
    status: string = "draft"
    components: BomComponent[] = []

    ToJson(): any {
        return {
            uid: this.uid,
            code: this.code,
            name: this.name,
            description: this.description,
            productUid: this.productUid,
            productSku: this.productSku,
            baseQuantity: this.baseQuantity,
            uom: this.uom,
            version: this.version,
            status: this.status,
            components: this.components.map((c, i) => ({...c, position: i})),
        }
    }

    FromJson(jObj: any) {
        this.uid = jObj.uid ?? ""
        this.code = jObj.code ?? ""
        this.name = jObj.name ?? ""
        this.description = jObj.description ?? ""
        this.productUid = jObj.productUid ?? ""
        this.productSku = jObj.productSku ?? ""
        this.baseQuantity = jObj.baseQuantity ?? 1
        this.uom = jObj.uom ?? "pcs"
        this.version = jObj.version ?? "1"
        this.status = jObj.status ?? "draft"
        this.components = Array.isArray(jObj.components)
            ? jObj.components.map((c: any) => ({
                  itemUid: c.itemUid ?? "",
                  sku: c.sku ?? "",
                  name: c.name ?? "",
                  quantity: c.quantity ?? 0,
                  uom: c.uom ?? "pcs",
                  scrapPct: c.scrapPct ?? 0,
                  position: c.position ?? 0,
              }))
            : []
    }
}
