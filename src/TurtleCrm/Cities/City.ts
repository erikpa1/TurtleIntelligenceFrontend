export default class City {
    uid = ""
    name = ""
    state = ""
    abbreviation = ""
    postNumber = ""
    gps = {
        lot: 0,
        lan: 0
    }

    ToJson(): any {
        return {
            uid: this.uid,
            name: this.name,
            state: this.state,
            abbreviation: this.abbreviation,
            postNumber: this.postNumber,
            gps: this.gps,
        }
    }

    FromJson(jObj: any) {
        this.uid = jObj.uid ?? ""
        this.name = jObj.name ?? ""
        this.state = jObj.state ?? ""
        this.abbreviation = jObj.abbreviation ?? ""
        this.gps = jObj.gps ?? this.gps
    }


}