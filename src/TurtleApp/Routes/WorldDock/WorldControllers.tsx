import React from "react";
import TurtleApp from "@TurtleApp/TurtleApp";
import {WorldSingleton} from "@TurtleApp/Data/World";
import aee, {AnyEventEmmiter} from "@Turtle/Data/Aee";
import WorldApi from "@TurtleApp/Api/WorldApi";

export default function WorldControllers({}) {


    const save = saveController()
    const connect = connectionController()

    return (
        <></>
    )
}

function connectionController() {


    async function firstOneSelected(entity: any) {
        aee.emit("ConnectSecondOne", null)
    }

    async function secondOneSelected(entity: any) {
        console.log(entity)

        if (AnyEventEmmiter.isCtrlPressed) {
            aee.emit("ConnectSecondOne", null)
        } else {
            aee.emit("ConnectStop", null)
        }
    }

    React.useEffect(() => {
        aee.on("FirstOneSelected", firstOneSelected)
        aee.on("SecondOneSelected", secondOneSelected)

        return () => {
            aee.off("FirstOneSelected", firstOneSelected)
            aee.off("SecondOneSelected", secondOneSelected)
        }
    }, [])

    return []
}

function saveController() {

    async function savePressed() {
        TurtleApp.Lock()
        await WorldApi.SaveWorld(WorldSingleton.I)
        TurtleApp.Unlock()
    }


    React.useEffect(() => {
        aee.on("SaveWorld", savePressed)

        return () => {
            aee.off("SaveWorld", savePressed)
        }
    }, [])

    return []
}