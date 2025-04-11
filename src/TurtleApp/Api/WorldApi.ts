import turxios from "../../Turtle/Api/Turxios";


export default class WorldApi {


    static async Simulate(worldUid: string) {
        console.log("Here")
        await turxios.post("/api/w/simulate")
    }


}