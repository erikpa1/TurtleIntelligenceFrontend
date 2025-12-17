export class HttpTriggerNodeData {
    limiter = 0
    method = "GET"


    FromJson(jObj: any) {
        this.method = jObj.method || this.method
    }

    ToJson(): any {
        return {
            method: this.method,
        }
    }


}