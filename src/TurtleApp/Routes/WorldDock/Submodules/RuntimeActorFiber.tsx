import React from "react";
import Aee from "@Turtle/Data/Aee";
import AeeWrapper from "@Turtle/Data/AeeWrapper";
import aee from "@Turtle/Data/Aee";
import {Cylinder} from "@react-three/drei";
import {RuntimeActor} from "@TurtleApp/Data/Actor";


interface RuntimeActorFiberProps {
    actor: RuntimeActor
}

export default function RuntimeActorFiber({actor}: RuntimeActorFiberProps) {


    const [position, setPosition] = React.useState<[number, number, number]>(actor.position as any)

    function refreshFn(newState: any) {

        console.log(newState)

        if (newState.position) {
            actor.position = newState.position
            setPosition(newState.position)
        }

    }

    return (
        <AeeWrapper
            aee={aee}
            WorldActorChanged={refreshFn}
            {
                ...{[`a-${actor.id}`]: refreshFn}
            }
        >
            <group position={position}>
                <Cylinder
                    args={[1, 1, 1, 32]}
                    scale={[0.25, 1.5, 0.25]}
                    position={[0, 0.75, 0]}
                />
            </group>
        </AeeWrapper>
    )

}