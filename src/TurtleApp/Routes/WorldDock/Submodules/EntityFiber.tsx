import React from "react"
import Entity from "@Turtle/Data/Entity"
import {Cylinder, Sphere} from "@react-three/drei"


interface EntityFiberProps {
    entity: Entity
}


export default function EntityFiber({entity}: EntityFiberProps) {


    React.useEffect(() => {

    }, [entity])

    return (
        <group position={entity.position as any}>
            <Cylinder
                scale={[1, 0.5, 1]}
                position={[0, 0.25, 0]}
            >
                <meshStandardMaterial/>
            </Cylinder>
        </group>
    )
}