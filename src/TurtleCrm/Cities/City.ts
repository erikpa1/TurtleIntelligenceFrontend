export default class City {
    uid = ""
    name = ""
    state = ""

    ToJson(): any {
        return {
            uid: this.uid,
            name: this.name,
            state: this.state,
        }
    }

    FromJson(jObj: any) {
        this.uid = jObj.uid ?? ""
        this.name = jObj.name ?? ""
        this.state = jObj.state ?? ""
    }


}