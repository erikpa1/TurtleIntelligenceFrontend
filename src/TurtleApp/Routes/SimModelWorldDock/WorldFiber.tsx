import React from "react";
import {Canvas} from "@react-three/fiber";
import {
    Environment,
    GizmoHelper,
    GizmoViewport,
    Grid,
    MapControls,
} from "@react-three/drei"


import TransformControlsFiber, {useTransformControls} from "@Turtle/Fibers/TransformControlsFiber"
import Gizmo3DFlag from "../../Fibers/Gizmo3D";

import {useParams} from "react-router-dom";
import PickEntityFiber from "@TurtleApp/Routes/SimModelWorldDock/Submodules/PickEntityFiber";
import EntitiesFiber from "@TurtleApp/Routes/SimModelWorldDock/EntitiesFiber";
import {WorldSingleton} from "@TurtleApp/Data/World";
import {WorldRuntimeEntitiesFiber} from "@TurtleApp/Routes/SimModelWorldDock/WorldRuntimeEntitiesFiber";
import ConnectionsFiber from "@TurtleApp/Routes/SimModelWorldDock/Submodules/ConnectionsFiber";
import RuntimeActorsFiber from "@TurtleApp/Routes/SimModelWorldDock/Submodules/RuntimeActorsFiber";


export default function WorldFiber({world}) {


    React.useEffect(() => {
        //pass
    }, [])

    return (
        <Canvas
            shadows
            className={"gl-canvas"}
            camera={{
                far: 10000,
                position: [4, 3, 12]
            }}
            style={{
                height: "100%"
            }}
            // raycaster={{params: {Line: {threshold: 0.15}}}}
            onDoubleClick={() => {
                useTransformControls.getState().setObjectToSelect(null)
            }}
        >

            <_Grid/>
            <_SceneCameraRotationGizmo/>
            <_UniversalWorldEnvironment/>

            <TransformControlsFiber/>

            <MapControls makeDefault target={[0, 0, 0]}
                         enableDamping={false}
                         maxPolarAngle={Math.PI / 2}/>

            {/*<_TmpTiles/>*/}

            <Gizmo3DFlag/>

            <_SubModules world={world}/>

        </Canvas>
    )
}

function _SubModules({world}) {
    return (
        <>
            <EntitiesFiber world={world}/>
            <ConnectionsFiber world={world}/>
            <PickEntityFiber/>
            <WorldRuntimeEntitiesFiber world={world}/>
            <RuntimeActorsFiber/>
        </>
    )
}


function _Grid({}) {
    const gridConfig = {
        cellSize: 0.5,
        cellThickness: 0.5,
        cellColor: '#6f6f6f',
        sectionSize: 3,
        sectionThickness: 1,
        sectionColor: '#9d4b4b',
        // fadeDistance: 30,
        // fadeStrength: 1,
        followCamera: false,
        infiniteGrid: true
    }
    return <Grid
        position={[0, -0.01, 0]}
        args={[10.5, 10.5]}
        {...gridConfig}
    />
}


function _SceneCameraRotationGizmo() {
    return (
        <GizmoHelper
            alignment={"top-right"} // widget alignment within scene
            margin={[80, 80]} // widget margins (X, Y)
        >
            <GizmoViewport axisColors={['red', '#34eb37', '#347deb']} labelColor="black"/>
            {/* alternative: <GizmoViewcube /> */}
        </GizmoHelper>

    )
}

function _UniversalWorldEnvironment({}) {
    return (
        <React.Suspense fallback={""}>
            <Environment files={"/textures/venice_sunset_1k.hdr"}/>
        </React.Suspense>
    )
}