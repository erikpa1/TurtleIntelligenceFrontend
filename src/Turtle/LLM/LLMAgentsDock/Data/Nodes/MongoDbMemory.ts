export class MongoDbMemory {

    type = 0
    dbConnection = ""
    connStr = ""

    container = ""

    FromJson(jObj: any) {
        this.connStr = jObj.connStr ?? this.connStr
        this.dbConnection = jObj.dbConnection ?? this.dbConnection
        this.container = jObj.container ?? this.container
    }

    ToJson(): any {
        return {
            connStr: this.connStr,
            dbConnection: this.dbConnection,
            container: this.container
        }
    }


}