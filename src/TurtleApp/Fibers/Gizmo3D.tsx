import React from "react"

import PrimitiveMesh from "@Turtle/Fibers/PrimitiveMesh"
import ModelsGallery from "@TurtleApp/Data/ModelsGallery"
import {create} from "zustand/index";
import {Plane} from "@react-three/drei";


interface IGizmoFlag {
    position: [number, number, number]
    setPosition: (pos: [number, number, number]) => void
}


export const useGizmo3D = create<IGizmoFlag>((set) => ({
    position: [0, 0, 0],
    setPosition: (newPosition: [number, number, number]) => set((newState) => ({position: newPosition})),
}))


export default function Gizmo3DFlag({}) {

    const gizmoZus = useGizmo3D()

    return (
        <group>
            <group position={gizmoZus.position}>
                <PrimitiveMesh path={ModelsGallery.FLAG}/>
            </group>
            <Plane
                onContextMenu={(e) => {
                    e.stopPropagation()
                    useGizmo3D.getState().setPosition([e.point.x, 0, e.point.z])
                }}
                scale={[10000, 10000, 1]}
                rotation={[-Math.PI / 2, 0, 0]}
                visible={false}
            />
        </group>

    )
}