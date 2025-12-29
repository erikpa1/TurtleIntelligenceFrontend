import React from "react"
import World from "@TurtleApp/Data/World";
import AeeWrapper from "@Turtle/Data/AeeWrapper";
import aee from "@Turtle/Data/Aee";
import SimEntity from "@TurtleSim/SimModelWorldDock/Data/SimEntity";
import ConnectionFiber from "@TurtleSim/SimModelWorldDock/Submodules/ConnectionFiber";

interface ConnectionsFiberProps {
    world: World
}

export default function ConnectionsFiber({world}: ConnectionsFiberProps) {

    const [rKey, setRKey] = React.useState(0)

    const [connections, setConnections] = React.useState<Array<[Entity, Entity]>>([])

    function refresh() {


        const pairs = new Array<[Entity, Entity]>()

        world.connections.entries().forEach(([aPoint, bPoints],) => {

            //TODO zmazat nevalidne connection ked sa stanu
            const a = world.entities.get(aPoint)

            if (a) {
                bPoints.forEach((bPoint) => {
                    const b = world.entities.get(bPoint)
                    if (b) {
                        pairs.push([a, b])
                    }
                })
            }

        })

        setConnections(pairs)
        setRKey(rKey + 1)
    }

    React.useEffect(() => {
        refresh()
    }, [])


    return (
        <AeeWrapper
            key={rKey}
            aee={aee}
            WorldConnectionsChanged={refresh}
            EntityPosChanged={refresh}
        >
            {
                connections.map((val) => {
                    return (
                        <ConnectionFiber
                            key={`${val[0].uid}-${val[1].uid}`}
                            a={val[0]}
                            b={val[1]}
                        />
                    )
                })
            }
        </AeeWrapper>

    )
}