import SimFactory from "@TurtleSim/Factories/SimFactory"
import IconApi from "@Turtle/Icons/IconApi"


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