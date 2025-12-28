import React from 'react'
import AeeWrapper from "@Turtle/Data/AeeWrapper";
import aee from "@Turtle/Data/Aee";
import SimEntity from "@TurtleApp/Routes/SimModelWorldDock/Data/SimEntity";
import RuntimeEntity from "@Turtle/Data/RuntimeEntity";
import RuntimeEntityFiber from "@TurtleApp/Routes/SimModelWorldDock/Submodules/RuntimeEntityFiber";


export function WorldRuntimeEntitiesFiber({world}) {

    const [runtimeEntities, setRuntimeEntities] = React.useState<Array<RuntimeEntity>>([])

    function entitiesSpawn(entities: RuntimeEntity[]) {
        setRuntimeEntities([...runtimeEntities, ...entities])
    }

    function entitiesUnspawn(ids: Set<number>) {
        setRuntimeEntities(runtimeEntities.filter((val) => ids.has(val.id) === false))
    }

    return (
        <AeeWrapper
            aee={aee}
            RuntimeEntitiesSpawned={entitiesSpawn}
            RuntimeEntitiesUnspawned={entitiesUnspawn}
        >
            <group>
                {
                    runtimeEntities.map((val) => {
                        return (
                            <RuntimeEntityFiber
                                key={val.id}
                                entity={val}
                            />
                        )
                    })
                }
            </group>
        </AeeWrapper>
    )
}