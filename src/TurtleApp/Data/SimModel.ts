export default class SimModel {
    uid = ""
    name = ""

    FromJson(data: any) {
        this.uid = data.uid ?? ""
        this.name = data.name ?? ""
    }

    ToJson(): any {
        return {
            uid: this.uid,
            name: this.name,
        }
    }
}