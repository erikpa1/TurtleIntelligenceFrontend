export enum XApiKeyType {
    EXTERNAL = 0,
    INTERNAL = 1
}


export class XApiKey {

    uid = ""
    name = ""
    value = ""
    issuer = ""
    headerName = "X-ApiKey"
    expires = 0
    type = 0


    ToJson(): any {
        return {
            uid: this.uid,
            name: this.name,
            value: this.value,
            headerName: this.headerName,
            expires: this.expires,
        }
    }

    FromJson(jObj: any): any {
        this.uid = jObj.uid ?? ""
        this.name = jObj.name ?? ""
        this.value = jObj.value ?? ""
        this.headerName = jObj.headerName ?? ""
        this.expires = jObj.expires ?? 0

    }

}