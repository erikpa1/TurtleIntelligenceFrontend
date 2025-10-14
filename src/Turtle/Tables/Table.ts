export const TABLE_TYPE_OPTIONS = [
    {label: 'String', value: 'string'},
    {label: 'Int32', value: 'int32'},
    {label: 'Int64', value: 'int64'},
    {label: 'Float', value: 'float'},
    {label: 'Double', value: 'double'},
    {label: 'Boolean', value: 'boolean'},
    {label: 'Date', value: 'date'},
    {label: 'DateTime', value: 'datetime'},
];


export class TurtleTable {

    uid = ""
    name = ""
    tableType = ""
    headers: string[] = ["Name", "Age", "Weight"]
    valueTypes: string[] = ["string", "int32", "int32"]
    defaultValues: any[] = ["", 0, 0]
    hasDatabaseTable = true

    ToJson() {
        return {
            uid: this.uid,
            name: this.name,
            headers: this.headers,
            tableType: this.tableType,
            valueTypes: this.valueTypes,
            defaultValues: this.defaultValues,
            hasDatabaseTable: this.hasDatabaseTable,
        }
    }

    FromJson(jObj: any) {
        this.uid = jObj.uid ?? ""
        this.name = jObj.name ?? ""
        this.tableType = jObj.tableType ?? ""
        this.hasDatabaseTable = jObj.hasDatabaseTable ?? true
        this.headers = jObj.headers ?? []
        this.valueTypes = jObj.valueTypes ?? []
        this.defaultValues = jObj.defaultValues ?? []
    }

}