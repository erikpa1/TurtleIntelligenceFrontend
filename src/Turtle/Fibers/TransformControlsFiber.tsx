import React from "react";

import {TransformControls} from "@react-three/drei";
import {useThree} from "@react-three/fiber"
import {create} from "zustand";


interface ActiveTransformControls {
    objectToSelect: string
    setObjectToSelect: (obj: string) => void
}


export const useTransformControls = create<ActiveTransformControls>((set) => ({
    objectToSelect: "",
    setObjectToSelect: (newOne: string) => set((newState) => ({objectToSelect: newOne})),
}))


export default function TransformControlsFiber({}) {

    const trZus = useTransformControls()

    const scene = useThree((state) => state.scene)

    return (
        <>
            {
                trZus.objectToSelect !== "" && (
                    <TransformControls
                        mode="translate"
                        object={scene.getObjectByName(trZus.objectToSelect)}
                    />
                )
            }
        </>
    )


}