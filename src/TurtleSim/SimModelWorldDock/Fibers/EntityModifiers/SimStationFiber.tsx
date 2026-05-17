import React from "react"
import {Html} from "@react-three/drei"
import {SimFiber} from "@TurtleSim/SimModelWorldDock/Fibers/EntityModifiers/SimFiber"
import {useActiveSimulation} from "@TurtleSim/SimModelWorldDock/Controllers/RunningSimulationController"
import {SimSecondUpdate} from "@TurtleApp/Data/SimulationResponse";
import aee from "@Turtle/Data/Aee";


export default function SimStationFiber({entity}: SimFiber) {
    const [activeCount, setActiveCount] = React.useState(0)
    const {isRunning} = useActiveSimulation()


    function receivedNewEvents(stepState: SimSecondUpdate) {
        if (stepState.states) {
            const stateExists = stepState.states[entity.runtimeId]
            if (stateExists) {
                if (Object.hasOwn(stateExists, "remaining")) {
                    setActiveCount(stateExists.remaining as any)
                }
            }
        }
    }

    React.useEffect(() => {
        aee.on("SimSecond", receivedNewEvents)
        return () => {
            aee.off("SimSecond", receivedNewEvents)
        }
    }, [])


    if (isRunning === "") {
        return null
    }


    return (
        <Html
            position={[0, 0, 1.2]}

            transform
            rotation={[-Math.PI / 2, 0, 0]}
            style={{pointerEvents: "none"}}
        >
            <div style={{
                fontSize: "11px",
                color: "#ffffff",
                backgroundColor: "#000000",
                padding: 2,
                whiteSpace: "nowrap",
                userSelect: "none",
            }}>
                {activeCount}
            </div>
        </Html>
    )
}