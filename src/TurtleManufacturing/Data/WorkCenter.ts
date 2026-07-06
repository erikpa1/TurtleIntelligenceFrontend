// WorkCenter mirrors manufacutring/workcenters.WorkCenter on the backend.

export default class WorkCenter {
    uid = ""
    code = ""
    name = ""
    description = ""
    capacityHoursPerDay = 8
    efficiency = 100
    costPerHour = 0
    active = true

    ToJson(): any {
        return {
            uid: this.uid,
            code: this.code,
            name: this.name,
            description: this.description,
            capacityHoursPerDay: this.capacityHoursPerDay,
            efficiency: this.efficiency,
            costPerHour: this.costPerHour,
            active: this.active,
        }
    }

    FromJson(jObj: any) {
        this.uid = jObj.uid ?? ""
        this.code = jObj.code ?? ""
        this.name = jObj.name ?? ""
        this.description = jObj.description ?? ""
        this.capacityHoursPerDay = jObj.capacityHoursPerDay ?? 8
        this.efficiency = jObj.efficiency ?? 100
        this.costPerHour = jObj.costPerHour ?? 0
        this.active = jObj.active ?? true
    }
}
