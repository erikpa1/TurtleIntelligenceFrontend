export default class Scene {
    uid = ""
    name = ""

    ToJson() {
        return {
            uid: this.uid,
            name: this.name,
        }
    }

    FromJson(json: any) {
        this.uid = json.uid ?? ""
        this.name = json.name ?? ""
    }

}

