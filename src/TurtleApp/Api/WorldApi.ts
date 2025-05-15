import turxios from "../../Turtle/Api/Turxios";
import World from "@TurtleApp/Data/World";
import {json} from "react-router-dom";
import axios from "axios";


export default class WorldApi {


    static async Simulate(worldUid: string) {
        await axios.post("/api/w/simulate")
    }

    static async SaveWorld(world: World) {
        const jsonData = JSON.stringify(world.ToJsonModified())

        const formData = new FormData()
        formData.set("data", jsonData)
        formData.set("tmp", "xxxxxx")
        console.log(jsonData)


        await axios.post("/api/w/save", formData)
    }


}