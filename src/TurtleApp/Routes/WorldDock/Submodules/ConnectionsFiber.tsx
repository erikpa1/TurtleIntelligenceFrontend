import React from "react"
import World from "@TurtleApp/Data/World";
import AeeWrapper from "@Turtle/Data/AeeWrapper";
import aee from "@Turtle/Data/Aee";
import Entity from "@Turtle/Data/Entity";
import ConnectionFiber from "@TurtleApp/Routes/WorldDock/Submodules/ConnectionFiber";

interface ConnectionsFiberProps {
    world: World
}

export default function ConnectionsFiber({world}: ConnectionsFiberProps) {


    const [connections, setConnections] = React.useState<Array<[Entity, Entity]>>([])

    function refresh() {

        const pairs = new Array<[Entity, Entity]>()

        console.log(world.connections)

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

    }

    React.useEffect(() => {
        refresh()
    }, [])

    console.log(connections)

    console.log("Hereee")

    return (
        <AeeWrapper
            aee={aee}
            WorldConnectionsChanged={refresh}
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