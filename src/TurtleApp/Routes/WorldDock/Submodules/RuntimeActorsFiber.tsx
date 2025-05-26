import React from "react"
import {useActiveSimulation} from "@TurtleApp/Routes/WorldDock/Controllers/RunningSimulationController";
import RuntimeActorFiber from "@TurtleApp/Routes/WorldDock/Submodules/RuntimeActorFiber";
import AeeWrapper from "@Turtle/Data/AeeWrapper";
import aee from "@Turtle/Data/Aee";
import {RuntimeActor} from "@TurtleApp/Data/Actor";

export default function RuntimeActorsFiber() {

    const {isRunning} = useActiveSimulation()

    const actorsGuard = React.useMemo(() => {
        return {
            actors: new Map<number, RuntimeActor>(),
        }
    }, [])

    const [actors, setActors] = React.useState<RuntimeActor[]>([])

    function spawnActors(newActors: Array<RuntimeActor>) {

        console.log(newActors)

        newActors.forEach((val) => {
            actorsGuard.actors.set(val.id, val)
        })

        setActors(Array.from(actorsGuard.actors.values()))

    }

    function unspawnActors(actors: number[]) {
        actors.forEach((val) => {
            actorsGuard.actors.delete(val)
        })

        setActors(Array.from(actorsGuard.actors.values()))
    }

    React.useEffect(() => {
        if (isRunning !== "") {
            actorsGuard.actors.clear()
            setActors(Array.from(actorsGuard.actors.values()))
        }
    }, [isRunning])

    return (
        <AeeWrapper
            aee={aee}
            SimRunActorSpawned={spawnActors}
            SimRunActorUnspawned={unspawnActors}
        >
            {
                isRunning !== "" && (
                    actors.map((val) => {
                        return (
                            <RuntimeActorFiber
                                actor={val}
                                key={val.id}
                            />
                        )
                    })
                )
            }
        </AeeWrapper>
    )


}