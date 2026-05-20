import SimFactory from "@TurtleSim/Factories/SimFactory"
import IconApi from "../../TurtleIcons/IconApi"


export default class SimLibrary {


    static Register() {
        SimFactory.Register({
            type: "human",
            icon: IconApi,
        })
    }

    static Unregister() {

    }

}