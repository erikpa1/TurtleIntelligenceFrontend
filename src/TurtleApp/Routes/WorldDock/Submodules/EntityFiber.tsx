import React from "react"
import Entity from "@Turtle/Data/Entity"
import {Cylinder, Plane, Sphere, useTexture} from "@react-three/drei"
import WEFiberWrapper from "@TurtleApp/Fibers/WEFiberWrapper";


interface EntityFiberProps {
    entity: Entity
}


export default function EntityFiber({entity}: EntityFiberProps) {

    const texture = useTexture("/iconsPng/flag_check.png")

    React.useEffect(() => {

    }, [entity])

    return (
        <WEFiberWrapper entity={entity}>

            <Plane
                position={[0, 0.27, 0]}
                rotation={[-Math.PI / 2, 0, 0]}
            >
                <meshStandardMaterial map={texture}/>
            </Plane>
            <Cylinder
                args={[1, 1, 1, 32]}
                scale={[0.75, 0.25, 0.75]}
                position={[0, 0.25 / 2, 0]}
            >
                <meshStandardMaterial/>
            </Cylinder>
        </WEFiberWrapper>
    )
}