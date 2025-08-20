import React from "react"
import Entity from "@Turtle/Data/Entity"
import {Cylinder, Plane, Sphere, useTexture} from "@react-three/drei"
import WEFiberWrapper from "@TurtleApp/Fibers/WEFiberWrapper";
import EntitiesFactory from "@TurtleApp/Factories/EntitiesFactory";
import ErrorBoundary from "@Turtle/Components/ErrorBoundary";
import {Box3D} from "@Turtle/Fibers/Drawing";

interface EntityFiberProps {
    entity: Entity
}

export default function EntityFiber({entity}: EntityFiberProps) {


    React.useEffect(() => {

    }, [entity])

    return (
        <WEFiberWrapper entity={entity}>

            <ErrorBoundary onError={<></>}>
                <_EntityIcon textPath={EntitiesFactory.GetIconSvg(entity.type)}/>
            </ErrorBoundary>

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

function _EntityIcon({textPath}) {

    const texture = useTexture(textPath)

    return (
        <Plane
            position={[0, 0.27, 0]}
            rotation={[-Math.PI / 2, 0, 0]}
        >
            <meshStandardMaterial
                map={texture as any}
                transparent={true}
            />
        </Plane>
    )


}