import React from "react";
import TurtleApp from "@TurtleApp/TurtleApp";
import {WorldSingleton} from "@TurtleApp/Data/World";
import aee, {AnyEventEmmiter} from "@Turtle/Data/Aee";
import WorldApi from "@TurtleApp/Api/WorldApi";
import SimEntity from "@TurtleApp/Routes/SimModelWorldDock/Data/SimEntity";
import {useWorldConnection} from "@TurtleApp/Data/WorldZuses";
import {runningSimulationController} from "@TurtleApp/Routes/SimModelWorldDock/Controllers/RunningSimulationController";

export default function WorldControllers({}) {


    const save = saveController()
    const connect = connectionController()

    const myio = runningSimulationController()

    return (
        <></>
    )
}

interface ConnMemoGuard {
    a: null | Entity
    b: null | Entity
}

function connectionController() {


    const {setPhase} = useWorldConnection()

    const guard: ConnMemoGuard = React.useMemo(() => {
        return {
            a: null,
            b: null
        }
    }, [])


    async function firstOneSelected(entity: any) {
        guard.a = entity

        setPhase(2)

    }

    async function secondOneSelected(entity: any) {
        guard.b = entity

        if (guard.a && guard.b) {
            WorldSingleton.I.AddConnection(guard.a, guard.b)

            if (AnyEventEmmiter.isCtrlPressed) {
                guard.a = entity
                setPhase(2)
            } else {
                guard.a = null
                guard.b = null
                setPhase(0)
            }
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