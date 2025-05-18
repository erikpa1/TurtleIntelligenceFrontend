import React from "react"
import World from "@TurtleApp/Data/World";
import Entity from "@Turtle/Data/Entity";
import AeeWrapper from "@Turtle/Data/AeeWrapper";
import aee from "@Turtle/Data/Aee";
import EntityFiber from "@TurtleApp/Routes/WorldDock/Submodules/EntityFiber";


interface EntitiesFiberProps {
    world: World
}

export default function EntitiesFiber({world}: EntitiesFiberProps) {

    const [entities, setEntities] = React.useState<Array<Entity>>(Array.from(world.entities.values()))

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
                            <EntityFiber
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