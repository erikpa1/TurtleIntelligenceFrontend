import {TurtleTable} from "@Turtle/Tables/Table";
import {DeleteEntity, PostEntity, QueryEntities} from "@Turtle/Api/Turxios";


export default class TablesApi {

    static async COU(table: TurtleTable) {
        await PostEntity("/api/table", table)
    }

    static async List(): Promise<Array<TurtleTable>> {
        return await QueryEntities("/api/tables", {}, TurtleTable)
    }

    static async Delete(uid: string) {
        await DeleteEntity("/api/table", uid)
    }

}