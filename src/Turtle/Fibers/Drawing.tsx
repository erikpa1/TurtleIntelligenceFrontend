//Created by https://claude.ai/chat/d7ad5b89-be22-4a20-be06-4d2aaa70c373
import React from "react";

import * as THREE from "three"
import {Line, Plane} from "@react-three/drei";

export function Cross({position}) {

// Define the points for a cross shape
    const crossPoints = React.useMemo(() => {
        // Horizontal line points
        const horizontal = [
            new THREE.Vector3(-0.5, 0, 0),
            new THREE.Vector3(0.5, 0, 0)
        ];

        // Vertical line points
        const vertical = [
            new THREE.Vector3(0, 0, -0.5),
            new THREE.Vector3(0, 0, 0.5)
        ];

        return [horizontal, vertical];
    }, []);

    return (
        <group position={position}>
            {/* Horizontal line */}
            <Line
                points={crossPoints[0]}
                color="red"
                lineWidth={2}
            />
            {/* Vertical line */}
            <Line
                points={crossPoints[1]}
                color="red"
                lineWidth={2}
            />
        </group>
    );
}


// Plane component that shows cross on hover
export function HoverPlane() {

    const [mousePos, setMousePos] = React.useState([0, 0, 0]);

    // Function to handle pointer move
    function handlePointerMove(event: any) {
        event.stopPropagation()
        setMousePos(event.point)

    }

    return (
        <group>
            <Plane
                rotation={[-Math.PI / 2, 0, 0]}
                onPointerMove={handlePointerMove}
                scale={[1000, 1000, 1]}
                visible={false}
            />
            <Cross position={mousePos}/>
        </group>
    );
}