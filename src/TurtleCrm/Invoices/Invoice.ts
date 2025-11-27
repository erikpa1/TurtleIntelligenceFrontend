export default class Invoice {

    uid = ""
    name = ""
    customer = ""
    metadata = {}

    ToJson(): any {
        return {
            uid: this.uid,
            name: this.name,
            customer: this.customer,
            metadata: this.metadata
        }
    }

    FromJson(jObj: any) {
        this.uid = jObj.uid ?? ""
        this.name = jObj.name ?? ""
        this.customer = jObj.customer ?? ""
        this.metadata = jObj.metadata ?? {}
    }


}