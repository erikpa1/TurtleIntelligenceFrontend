import React from "react";
import {Canvas} from "@react-three/fiber";
import {Environment, GizmoHelper, GizmoViewport, Grid, OrbitControls} from "@react-three/drei";


export default function SimulationWorld({}) {
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
            raycaster={{params: {Line: {threshold: 0.15}}}}
            onDoubleClick={() => {
            }}
        >

            <_Grid/>
            <_SceneCameraRotationGizmo/>
            <_UniversalWorldEnvironment/>
            <OrbitControls makeDefault target={[0, 0, 0]}
                           enableDamping={false}
                           maxPolarAngle={Math.PI / 2}/>

        </Canvas>
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
            alignment="bottom-right" // widget alignment within scene
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