import React from "react";

import {TransformControls} from "@react-three/drei";
import {useThree} from "@react-three/fiber"
import {create} from "zustand";
import * as THREE from "three"


interface SelectableObject {
    obj: THREE.Object3D
    modifyFunction: () => void
}

interface ActiveTransformControls {
    objectToSelect: SelectableObject | null
    setObjectToSelect: (obj: SelectableObject | null) => void
}


export const useTransformControls = create<ActiveTransformControls>((set) => ({
    objectToSelect: null,
    setObjectToSelect: (obj: SelectableObject | null) => set((newState) => ({objectToSelect: obj})),
}))


export default function TransformControlsFiber({}) {

    const {objectToSelect} = useTransformControls()


    return (
        <>
            {
                objectToSelect && (
                    <TransformControls
                        showY={false}
                        rotationSnap={0.1}
                        size={0.5}
                        scale={[0.5, 0.5, 0.5]}

                        mode="translate"
                        object={objectToSelect.obj}
                        onObjectChange={() => {
                            objectToSelect?.modifyFunction()
                        }}

                    />
                )
            }
        </>
    )


}