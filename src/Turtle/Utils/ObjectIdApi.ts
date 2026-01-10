import AgentNodeParent from "../../TurtleBlueprints/Data/Nodes/AgentNodeParent";
import {fetchMongoUid} from "@Turtle/Utils/Uid";
import Turxios from "@Turtle/Api/Turxios"


export default class ObjectIdApi {
    static async GetMongoId(): Promise<string> {
        return await fetchMongoUid()
    }

    static GetObjectIdQuery(name: string, value): any {
        const tmp = {}
        tmp[name] = {"$oid": value}
        return tmp
    }

    static async GetObjectIdFromString(uid: string): Promise<string> {
        const tmp= (await Turxios.get("/api/object-id/from-str", {
            params: {
                uid: uid
            },
            transformResponse: [(data) => {
                // Prevent Axios from parsing the response
                return data
            }]

        })).data

        console.log(tmp)
        return tmp
    }
}