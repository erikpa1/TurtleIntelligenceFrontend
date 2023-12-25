import React from "react"
import {useGLTF} from "@react-three/drei";


export default function CardTile({position}) {

    const mesh = useGLTF("/meshes/wheat-field.glb", true)

    return (
        <group
            scale={[0.95, 0.5, 0.95]}
            position={position ?? [0, 0, 0]}
        >
            <primitive object={mesh.scene.clone(true)}/>
        </group>
    )
}