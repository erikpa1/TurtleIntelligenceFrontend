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

    const [entities, setEntities] = React.useState<Array<Entity>>(world.entities)

    function refresh() {
        console.log(world.entities)
        setEntities([...world.entities])
    }

    console.log(entities)

    return (
        <AeeWrapper
            aee={aee}
            WorldEntitiesChanged={refresh}
        >
            <group>
                {
                    entities.map((val) => {

                        console.log(val.uid)

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