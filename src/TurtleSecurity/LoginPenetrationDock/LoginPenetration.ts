export default class LoginPenetration {

    uid = ""
    name = ""
    url = ""
    iterationsCount = 100
    email = ""

    ToJson(): any {
        return {
            uid: this.uid,
            name: this.name,
            url: this.url,
            iterationsCount: this.iterationsCount,
            email: this.email,
        }
    }

    FromJson(jObj: any) {
        this.uid = jObj.uid ?? ""
        this.name = jObj.name ?? ""
        this.url = jObj.url ?? ""
        this.iterationsCount = jObj.iterationsCount ?? this.iterationsCount
        this.email = jObj.email ?? ""
    }

}