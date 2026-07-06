import {DeleteEntity, GetEntity, PostEntity, QueryEntities} from "@Turtle/Api/Turxios"
import Bom from "@TurtleManufacturing/Data/Bom"

// BomsApi talks to the dedicated manufacturing/bom backend routes
// (see manufacutring/bom/bom_api.go).
export default class BomsApi {
    static async List(): Promise<Bom[]> {
        return await QueryEntities("/api/manufacturing/boms", {}, Bom)
    }

    static async Get(uid: string): Promise<Bom | null> {
        return await GetEntity("/api/manufacturing/bom", uid, Bom)
    }

    static async COU(bom: Bom) {
        await PostEntity("/api/manufacturing/bom", bom)
    }

    static async Delete(uid: string) {
        await DeleteEntity("/api/manufacturing/bom", uid)
    }
}
