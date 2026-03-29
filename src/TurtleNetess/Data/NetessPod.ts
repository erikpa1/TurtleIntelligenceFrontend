export default class NetessPod {

    uid = ""
    name = ""
    restConfig = new PodRestConfig()


    ToJson(): any {
        return {
            uid: this.uid,
            name: this.name,
            restConfig: this.restConfig.ToJson()
        }
    }

    FromJson(jObj: any) {
        this.name = jObj.name ?? ""
        this.uid = jObj.uid ?? ""
        this.restConfig.FromJson(jObj.restConfig ?? {})
    }

}

export class PodRestConfig {
    ip = "127.0.0.1"
    port = 8081
    apiKey = ""

    ToJson(): any {
        return {
            ip: this.ip,
            port: this.port,
            apiKey: this.apiKey,
        }
    }

    FromJson(jObj: any) {
        this.ip = jObj.ip ?? ""
        this.port = jObj.port
        this.apiKey = jObj.apiKey ?? ""
    }
}
