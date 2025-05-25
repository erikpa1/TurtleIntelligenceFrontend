import turxios from "../../Turtle/Api/Turxios";
import World from "@TurtleApp/Data/World";
import {json} from "react-router-dom";
import axios from "axios";


export default class WorldApi {


    static async Simulate(worldUid: string): Promise<string> {
        return (await axios.post("/api/w/simulate", null, {
            params: {
                uid: worldUid
            }
        })).data
    }

    static async PauseSimulation(simUid: string) {
        await axios.post("/api/w/pause", null, {
            params: {
                uid: simUid
            }
        })
    }

    static async ResumeSimulation(simUid: string) {
        await axios.post("/api/w/resume", null, {
            params: {
                uid: simUid
            }
        })
    }

    static async StopSimulation(simUid: string) {
        await axios.post("/api/w/stop", null, {
            params: {
                uid: simUid
            }
        })
    }

    static async SaveWorld(world: World) {
        const jsonData = JSON.stringify(world.ToJsonModified())

        const formData = new FormData()
        formData.set("data", jsonData)
        formData.set("tmp", "xxxxxx")


        await axios.post("/api/w/save", formData)
    }

    static async GetWorld(worldUid: string): Promise<World> {

        const data = (await axios.get("/api/w", {
            params: {
                uid: worldUid
            }
        })).data

        const world = new World()
        world.FromJson(data)

        return world

    }


}