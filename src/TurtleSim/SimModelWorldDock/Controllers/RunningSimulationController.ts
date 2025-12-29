import {create} from "zustand";
import React from "react";
import Myio from "@Turtle/Data/myio";
import {SimSecondUpdate} from "@TurtleApp/Data/SimulationResponse";
import aee from "@Turtle/Data/Aee";
import {RuntimeActor} from "@TurtleApp/Data/Actor";
import {WorldSingleton} from "@TurtleApp/Data/World";
import {SimUpcomingEvent} from "@TurtleSim/SimModelWorldDock/Data/SimUpcomingEvent";


interface RunningSimulationController {
    isPaused: boolean
    setIsPaused: (state: boolean) => void

    isRunning: string
    setIsRunning: (state: string) => void

    second: number
    endSecond: number
    setSecond: (second: number) => void
    setEndSecond: (second: number) => void

}


export const useActiveSimulation = create<RunningSimulationController>((set) => ({
    isPaused: false,
    setIsPaused: (state: boolean) => set((newState) => ({isPaused: state})),
    isRunning: "",
    setIsRunning: (state: string) => set((newState) => ({isRunning: state})),
    second: 0,
    endSecond: 100,
    events: [],
    setSecond: (second: number) => set((newState) => ({second: second})),
    setEndSecond: (second: number) => set((newState) => ({endSecond: second})),
}))


export function runningSimulationController() {

    const {setSecond} = useActiveSimulation()

    const myIO = React.useMemo(() => {
        const tmp = new Myio()
        return tmp
    }, [])


    function simStepReceived(stepData: SimSecondUpdate) {

        stepData.events = stepData.events.map((val) => {
            const tmp = new SimUpcomingEvent()
            tmp.FromJson(val)
            return tmp
        })

        setSecond(stepData.second)

        WorldSingleton.I.activeSecond = stepData.second

        const spawned = Object.values(stepData.spawned)

        if (spawned.length > 0) {
            const spawnedOnes = spawned.map((val) => {
                const tmp = new RuntimeActor()
                tmp.FromJson(val)
                return tmp
            })
            aee.emit("SimRunActorSpawned", spawnedOnes)
        }

        if (stepData.unspawned.length > 0) {
            aee.emit("SimRunActorUnspawned", stepData.unspawned)

        }

        const states = Object.entries(stepData.states)

        if (states.length > 0) {
            states.forEach(([key, val]) => {
                aee.emit(`a-${key}`, val)
            })
        }

        const events = Object.entries(stepData.events)

        if (events.length > 0) {
            events.forEach(([key, val]) => {
                aee.emit(`a-${key}`, val)
            })
        }


        aee.emit("SimSecond", stepData)
    }

    React.useEffect(() => {
        myIO.connect()
        myIO.on("simstep", simStepReceived)

        return () => {
            myIO.disconnect()
            myIO.off("simstep", simStepReceived)
        }
    }, [])


    return myIO


}