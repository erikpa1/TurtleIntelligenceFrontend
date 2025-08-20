import React from "react"
import {Cylinder} from "@react-three/drei"
import RuntimeEntity from "@Turtle/Data/RuntimeEntity"
import aee from "@Turtle/Data/Aee";


interface RuntimeEntityFiberProps {
    entity: RuntimeEntity
}


export default function RuntimeEntityFiber({entity}: RuntimeEntityFiberProps) {

    const [position, setPosition] = React.useState<[number, number, number]>([0, 0, 0])

    async function updateState(newState: any) {
        if (newState.position) {
            setPosition(newState.position)
        }
    }

    React.useEffect(() => {
        aee.on(`r${entity.id}`, updateState)

        return () => {
            aee.off(`r${entity.id}`, updateState)
        }
    }, [])

    return (
        <Cylinder
            args={[1, 1, 1, 32]}
            scale={[0.75, 0.25, 0.75]}
            position={position}
        >
            <meshStandardMaterial color={"red"}/>
        </Cylinder>
    )
}