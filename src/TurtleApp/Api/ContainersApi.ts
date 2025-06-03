import Container from "@TurtleApp/Data/Container"
import Turxios from "@Turtle/Api/Turxios";

export class ContainersApi {

    static async ListContainers(): Promise<Array<any>> {
        //return await Axios.get<Array<any>>('/api/containers');
        return []
    }

    static async CreateContainer(container: Container) {
        const formData = new FormData()
        formData.set("data", JSON.stringify(container.ToJson()))
        await Turxios.post('/api/container', formData);
    }

}