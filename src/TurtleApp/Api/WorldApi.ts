import turxios from "../../Turtle/Api/Turxios";
import World from "@TurtleApp/Data/World";


export default class WorldApi {


    static async Simulate(worldUid: string) {
        console.log("Here")
        await turxios.post("/api/w/simulate")
    }

    static async SaveWorld(world: World) {
        const formData = new FormData()
        formData.set("data", JSON.stringify(world.ToJsonModified()))
        await turxios.post("/api/w/save")
    }


}