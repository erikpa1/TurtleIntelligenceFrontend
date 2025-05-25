import {create} from "zustand";
import React from "react";
import Myio from "@Turtle/Data/myio";


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
    setSecond: (second: number) => set((newState) => ({second: second})),
    setEndSecond: (second: number) => set((newState) => ({endSecond: second})),
}))


export function runningSimulationController() {

    const {setSecond, setEndSecond} = useActiveSimulation()

    const myIO = React.useMemo(() => {
        const tmp = new Myio()
        return tmp
    }, [])


    function simStepReceived(stepData: any) {
        setSecond(stepData.second)
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