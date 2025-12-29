import React from "react"
import SimEntity from "@TurtleSim/SimModelWorldDock/Data/SimEntity"
import {Cylinder, Plane, Sphere, useTexture} from "@react-three/drei"
import WEFiberWrapper from "@TurtleApp/Fibers/WEFiberWrapper";
import SimFactory from "@TurtleSim/Factories/SimFactory";
import ErrorBoundary from "@Turtle/Components/ErrorBoundary";

interface EntityFiberProps {
    entity: SimEntity
}

export default function SimEntityFiber({entity}: EntityFiberProps) {


    React.useEffect(() => {

    }, [entity])

    return (
        <WEFiberWrapper entity={entity}>

            <ErrorBoundary onError={<></>}>
                <_EntityIcon textPath={SimFactory.GetIconSvg(entity.type)}/>
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