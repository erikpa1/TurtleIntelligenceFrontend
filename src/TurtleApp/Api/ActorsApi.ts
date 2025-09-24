import Actor from "@TurtleApp/Data/Actor";
import turxios from "@Turtle/Api/Turxios";

export default class ActorsApi {


    static async QueryActors(query?: any): Promise<Array<Actor>> {

        const data = (await turxios.get<Array<any>>("/api/actors/query", {
            headers: {
                query: JSON.stringify(query ?? {})
            }
        })).data

        return data.map((val) => {
            const tmp = new Actor()
            tmp.FromJson(val)
            return tmp
        })
    }

    static async DeleteActor(uid: string) {
        await turxios.delete("/api/actor", {
            params: {
                uid: uid
            }
        })
    }


    static async COUActor(actor: Actor) {
        const data = new FormData()
        data.set("data", JSON.stringify(actor.ToJson()))
        await turxios.post("/api/actor", data)
    }

}