import {DeleteEntity, GetEntity, PostEntity, QueryEntities} from "@Turtle/Api/Turxios"
import turxios from "@Turtle/Api/Turxios"

import Demand from "@TurtleManufacturing/Data/Demand"
import WorkCenter from "@TurtleManufacturing/Data/WorkCenter"
import Routing from "@TurtleManufacturing/Data/Routing"

// Master data CRUD for the advanced planning modules.

export class DemandApi {
    static async List(): Promise<Demand[]> {
        return await QueryEntities("/api/manufacturing/demands", {}, Demand)
    }
    static async Get(uid: string): Promise<Demand | null> {
        return await GetEntity("/api/manufacturing/demand", uid, Demand)
    }
    static async COU(d: Demand) {
        await PostEntity("/api/manufacturing/demand", d)
    }
    static async Delete(uid: string) {
        await DeleteEntity("/api/manufacturing/demand", uid)
    }
}

export class WorkCentersApi {
    static async List(): Promise<WorkCenter[]> {
        return await QueryEntities("/api/manufacturing/workcenters", {}, WorkCenter)
    }
    static async Get(uid: string): Promise<WorkCenter | null> {
        return await GetEntity("/api/manufacturing/workcenter", uid, WorkCenter)
    }
    static async COU(w: WorkCenter) {
        await PostEntity("/api/manufacturing/workcenter", w)
    }
    static async Delete(uid: string) {
        await DeleteEntity("/api/manufacturing/workcenter", uid)
    }
}

export class RoutingsApi {
    static async List(): Promise<Routing[]> {
        return await QueryEntities("/api/manufacturing/routings", {}, Routing)
    }
    static async Get(uid: string): Promise<Routing | null> {
        return await GetEntity("/api/manufacturing/routing", uid, Routing)
    }
    static async COU(r: Routing) {
        await PostEntity("/api/manufacturing/routing", r)
    }
    static async Delete(uid: string) {
        await DeleteEntity("/api/manufacturing/routing", uid)
    }
}

// ---- Planning engine result types ----

export interface PlannedOrder {
    itemUid: string
    sku: string
    name: string
    orderType: "production" | "purchase"
    quantity: number
    uom: string
    releaseDate: string
    dueDate: string
    bomLevel: number
}

export interface RequirementRow {
    itemUid: string
    sku: string
    name: string
    bomLevel: number
    grossRequirement: number
    onHand: number
    safetyStock: number
    scheduledReceipts: number
    netRequirement: number
    plannedOrder: number
    procurementType: string
    requiredDate: string
}

export interface MrpException {
    severity: "warning" | "error"
    itemUid: string
    sku: string
    message: string
}

export interface MrpResult {
    generatedAt: string
    plannedOrders: PlannedOrder[]
    requirements: RequirementRow[]
    exceptions: MrpException[]
}

export interface ScheduledOperation {
    orderRef: string
    itemUid: string
    sku: string
    operationName: string
    sequence: number
    workCenterUid: string
    workCenterName: string
    quantity: number
    start: string
    end: string
    durationHours: number
    dueDate: string
    late: boolean
}

export interface WorkCenterLoad {
    workCenterUid: string
    workCenterName: string
    loadHours: number
    capacityHours: number
    utilization: number
    operations: number
}

export interface ApsResult {
    generatedAt: string
    horizonStart: string
    horizonEnd: string
    operations: ScheduledOperation[]
    workCenterLoads: WorkCenterLoad[]
    unscheduled: string[]
}

export class MrpApi {
    static async Run(): Promise<MrpResult> {
        return (await turxios.post("/api/manufacturing/mrp/run")).data as MrpResult
    }
}

export class ApsApi {
    static async Run(): Promise<ApsResult> {
        return (await turxios.post("/api/manufacturing/aps/run")).data as ApsResult
    }
}
