// Routing mirrors manufacutring/routing.Routing on the backend.

export interface RoutingOperation {
    sequence: number
    name: string
    workCenterUid: string
    workCenterName: string
    setupMinutes: number
    runMinutesPerUnit: number
}

export function newOperation(): RoutingOperation {
    return {
        sequence: 0,
        name: "",
        workCenterUid: "",
        workCenterName: "",
        setupMinutes: 0,
        runMinutesPerUnit: 0,
    }
}

export default class Routing {
    uid = ""
    code = ""
    name = ""
    productUid = ""
    productSku = ""
    operations: RoutingOperation[] = []

    ToJson(): any {
        return {
            uid: this.uid,
            code: this.code,
            name: this.name,
            productUid: this.productUid,
            productSku: this.productSku,
            operations: this.operations.map((o, i) => ({...o, sequence: i + 1})),
        }
    }

    FromJson(jObj: any) {
        this.uid = jObj.uid ?? ""
        this.code = jObj.code ?? ""
        this.name = jObj.name ?? ""
        this.productUid = jObj.productUid ?? ""
        this.productSku = jObj.productSku ?? ""
        this.operations = Array.isArray(jObj.operations)
            ? jObj.operations.map((o: any) => ({
                  sequence: o.sequence ?? 0,
                  name: o.name ?? "",
                  workCenterUid: o.workCenterUid ?? "",
                  workCenterName: o.workCenterName ?? "",
                  setupMinutes: o.setupMinutes ?? 0,
                  runMinutesPerUnit: o.runMinutesPerUnit ?? 0,
              }))
            : []
    }
}
