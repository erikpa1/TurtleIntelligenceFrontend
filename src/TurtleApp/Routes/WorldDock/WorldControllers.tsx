import React from "react";
import TurtleApp from "@TurtleApp/TurtleApp";
import {WorldSingleton} from "@TurtleApp/Data/World";
import aee from "@Turtle/Data/Aee";
import WorldApi from "@TurtleApp/Api/WorldApi";

export default function WorldControllers({}) {


    const save = saveController()


    console.log("World controllers")

    return (
        <></>
    )
}

function saveController() {

    async function savePressed() {
        TurtleApp.Lock()
        await WorldApi.SaveWorld(WorldSingleton.I)
        TurtleApp.Unlock()
    }


    console.log("Here")

    React.useEffect(() => {
        aee.on("SaveWorld", savePressed)

        return () => {
            aee.off("SaveWorld", savePressed)
        }
    }, [])

    return []
}