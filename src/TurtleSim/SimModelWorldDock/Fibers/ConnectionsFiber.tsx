import React from "react"
import World from "@TurtleApp/Data/World";
import AeeWrapper from "@Turtle/Data/AeeWrapper";
import aee from "@Turtle/Data/Aee";
import SimEntity from "@TurtleSim/SimModelWorldDock/Data/SimEntity";
import ConnectionFiber from "@TurtleSim/SimModelWorldDock/Fibers/ConnectionFiber";
import {SelectableObject} from "@Turtle/Fibers/TransformControlsFiber";

interface ConnectionsFiberProps {
    world: World
}

type ConnectionEntry = {
    a: SimEntity
    b: SimEntity
    aIndex: number  // index of this connection among all where `a` is predecessor
    bIndex: number  // index of this connection among all where `b` is successor
    aCount: number  // total times `a` appears as predecessor
    bCount: number  // total times `b` appears as successor
}

export default function ConnectionsFiber({world}: ConnectionsFiberProps) {

    const [rKey, setRKey] = React.useState(0)
    const [connections, setConnections] = React.useState<ConnectionEntry[]>([])

    function refresh() {
        // First pass: collect raw pairs and count occurrences per entity
        const raw: Array<[SimEntity, SimEntity]> = []
        const aTotals = new Map<string, number>()
        const bTotals = new Map<string, number>()

        world.connections.entries().forEach(([aPoint, bPoints]) => {
            //TODO zmazat nevalidne connection ked sa stanu
            const a = world.entities.get(aPoint)
            if (!a) return

            bPoints.forEach((bPoint) => {
                const b = world.entities.get(bPoint)
                if (!b) return
                raw.push([a, b])
                aTotals.set(a.uid, (aTotals.get(a.uid) ?? 0) + 1)
                bTotals.set(b.uid, (bTotals.get(b.uid) ?? 0) + 1)
            })
        })

        // Second pass: assign per-entity running index
        const aRunning = new Map<string, number>()
        const bRunning = new Map<string, number>()
        const entries: ConnectionEntry[] = raw.map(([a, b]) => {
            const aIndex = aRunning.get(a.uid) ?? 0
            const bIndex = bRunning.get(b.uid) ?? 0
            aRunning.set(a.uid, aIndex + 1)
            bRunning.set(b.uid, bIndex + 1)
            return {
                a, b,
                aIndex, bIndex,
                aCount: aTotals.get(a.uid)!,
                bCount: bTotals.get(b.uid)!,
            }
        })

        setConnections(entries)
        setRKey(k => k + 1)  // safer than rKey + 1
    }

    function posChanged(obj: SelectableObject) {
        console.log(obj.entity.position)
        refresh()
    }

    React.useEffect(() => {
        refresh()
    }, [])

    return (
        <AeeWrapper
            key={rKey}
            aee={aee}
            WorldConnectionsChanged={refresh}
            EntityPosChanged={posChanged}
        >
            {
                connections.map((c) => (
                    <ConnectionFiber
                        key={`${c.a.uid}-${c.b.uid}`}
                        a={c.a}
                        b={c.b}
                        aIndex={c.aIndex}
                        bIndex={c.bIndex}
                        aCount={c.aCount}
                        bCount={c.bCount}
                    />
                ))
            }
        </AeeWrapper>
    )
}