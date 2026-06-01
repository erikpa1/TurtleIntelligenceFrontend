import React from "react"
import SimEntity from "@TurtleSim/SimModelWorldDock/Data/SimEntity";
import {Html} from "@react-three/drei";
import CylinderBetweenPoints from "@Turtle/Fibers/CylinderBetween";
import {useWorldConnection} from "@TurtleApp/Data/WorldZuses";
import {WorldSingleton} from "@TurtleApp/Data/World";
import TurtleColors from "@Turtle/Constants/TurtleColors";


interface ConnectionFiberProps {
    a: SimEntity
    b: SimEntity
    aIndex: number   // Nth outgoing connection from `a` (0-based)
    bIndex: number   // Nth incoming connection into `b` (0-based)
    aCount: number   // total outgoing from `a`
    bCount: number   // total incoming into `b`
}


export default function ConnectionFiber({
                                            a,
                                            b,
                                            aIndex,
                                            bIndex,
                                            aCount,
                                            bCount,
                                        }: ConnectionFiberProps) {

    const {phase, numbering} = useWorldConnection()


    console.log(numbering)

    function disconnectClicked() {
        WorldSingleton.I.DeleteConnection(a, b)
    }

    var numberingLabel = 0

    if (numbering > 0) {
        if (numbering === 1) {
            numberingLabel = aIndex
        } else if (numbering === 2) {
            numberingLabel = bIndex
        }
    }

    return (
        <CylinderBetweenPoints
            start={a.position as any}
            end={b.position as any}
        >

            {
                phase === -1 && (
                    <Html>
                        <div
                            style={{
                                width: "10px",
                                height: "10px",
                                backgroundColor: TurtleColors.RED,
                                cursor: "pointer",
                                borderRadius: "50%",
                                transform: "translate(-25%, -25%)",
                                border: `1px solid ${TurtleColors.GRAY}`,
                            }}
                            onClick={disconnectClicked}
                        />
                    </Html>
                )
            }

            {
                (numbering > 0) && (
                    <Html>
                        <div
                            style={{
                                width: "10px",
                                height: "10px",
                                cursor: "pointer",
                                color: "white",
                                transform: "translate(-25%, -50%)",
                            }}
                        >
                            {numberingLabel}
                        </div>
                    </Html>
                )
            }

        </CylinderBetweenPoints>
    )
}