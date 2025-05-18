//Created by https://claude.ai/chat/d7ad5b89-be22-4a20-be06-4d2aaa70c373
import React from "react";

import * as THREE from "three"
import {Box, Line, Plane} from "@react-three/drei";

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


interface HoverPlaneProps {
    picked: (position: number[]) => void
}

// Plane component that shows cross on hover
export function HoverPlane({picked}: HoverPlaneProps) {

    const [mousePos, setMousePos] = React.useState([0, 0, 0]);

    // Function to handle pointer move
    function handlePointerMove(event: any) {
        event.stopPropagation()
        setMousePos(event.point)

    }

    function onClick(event: any) {
        event.stopPropagation()
        picked([event.point.x, event.point.y, event.point.z])
    }

    return (
        <group>
            <Plane
                rotation={[-Math.PI / 2, 0, 0]}
                onPointerMove={handlePointerMove}
                onClick={onClick}
                scale={[1000, 1000, 1]}
                visible={false}
            />
            <Cross position={mousePos}/>
        </group>
    );
}


interface Box3DProps {
    position?: Array<number>
    scale?: Array<number>
    color: string
    offset?: Array<number>
    onClick?: (e: any) => void
    onDoubleClick?: (e: any) => void
    hidden?: boolean
}


export function Box3D({
                          position,
                          hidden,
                          onDoubleClick,
                          onClick,
                          offset,
                          scale, color
                      }: Box3DProps) {

    const _origin = offset ?? [0, 0, 0]
    const _position = position ?? [0, 0, 0]
    const _scale = scale ?? [1, 1, 1]

    const [visible, setVisible] = React.useState(!hidden)

    React.useEffect(() => {
        setVisible(!hidden)
    }, [hidden])

    return (
        <group
            position={_position as any}
            scale={_scale as any}
            visible={visible}
        >
            <group position={_origin as any}>
                <Box
                    visible={false}
                    onClick={(e) => {
                        e.stopPropagation()
                        onClick && onClick(e)
                    }}
                    onDoubleClick={(e) => {
                        e.stopPropagation()
                        onDoubleClick && onDoubleClick(e)
                    }}
                    onPointerEnter={(e) => {
                        e.stopPropagation()
                        setVisible(true)
                    }}
                    onPointerLeave={(e) => {
                        e.stopPropagation()
                        setVisible(!hidden)
                    }}
                />
                {
                    visible && (
                        <Line
                            depthTest={false}
                            renderOrder={990}
                            points={[
                                [-0.5, -0.5, -0.5],
                                [0.5, -0.5, -0.5],
                                [0.5, -0.5, 0.5],
                                [-0.5, -0.5, 0.5],
                                [-0.5, -0.5, -0.5],
                                [-0.5, 0.5, -0.5],
                                [0.5, 0.5, -0.5],
                                [0.5, -0.5, -0.5],
                                [0.5, -0.5, -0.5],
                                [0.5, 0.5, -0.5],
                                [0.5, 0.5, 0.5],
                                [0.5, -0.5, 0.5],
                                [0.5, -0.5, 0.5],
                                [0.5, 0.5, 0.5],
                                [-0.5, 0.5, 0.5],
                                [-0.5, -0.5, 0.5],
                                [-0.5, -0.5, 0.5],
                                [-0.5, 0.5, 0.5],
                                [-0.5, 0.5, -0.5]
                            ]}
                            color={color}
                        />
                    )
                }
            </group>
        </group>
    )

}
