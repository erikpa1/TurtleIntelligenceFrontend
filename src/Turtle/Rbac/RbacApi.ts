import Turxios from "@Turtle/Api/Turxios";


export default class RbacApi {

    static async ListApi(api: string): Promise<Array<string>> {
        return (await Turxios.get<string[]>(api)).data
    }

}