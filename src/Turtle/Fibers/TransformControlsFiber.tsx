import React from "react";

import {TransformControls} from "@react-three/drei";
import {useThree} from "@react-three/fiber"
import {create} from "zustand";
import * as THREE from "three"


interface ActiveTransformControls {
    objectToSelect: THREE.Object3D | null
    setObjectToSelect: (obj: THREE.Object3D | null) => void
}


export const useTransformControls = create<ActiveTransformControls>((set) => ({
    objectToSelect: null,
    setObjectToSelect: (obj: THREE.Object3D | null) => set((newState) => ({objectToSelect: obj})),
}))


export default function TransformControlsFiber({}) {

    const {objectToSelect} = useTransformControls()


    return (
        <>
            {
                objectToSelect && (
                    <TransformControls
                        mode="translate"
                        object={objectToSelect}
                    />
                )
            }
        </>
    )


}