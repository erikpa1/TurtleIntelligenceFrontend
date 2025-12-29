import React from "react"
import World from "@TurtleApp/Data/World";
import SimEntity from "@TurtleSim/SimModelWorldDock/Data/SimEntity";
import AeeWrapper from "@Turtle/Data/AeeWrapper";
import aee from "@Turtle/Data/Aee";
import SimEntityFiber from "@TurtleSim/SimModelWorldDock/Submodules/SimEntityFiber";


interface EntitiesFiberProps {
    world: World
}

export default function SimEntitiesFiber({world}: EntitiesFiberProps) {

    const [entities, setEntities] = React.useState<Array<SimEntity>>(Array.from(world.entities.values()))

    function refresh() {
        setEntities(Array.from(world.entities.values()))
    }

    return (
        <AeeWrapper
            aee={aee}
            WorldEntitiesChanged={refresh}
        >
            <group>
                {
                    entities.map((val) => {
                        return (
                            <SimEntityFiber
                                key={val.uid}
                                entity={val}
                            />
                        )
                    })
                }
            </group>
        </AeeWrapper>
    )
}