import React from "react"
import {Plane} from "@react-three/drei";
import AeeWrapper from "@Turtle/Data/AeeWrapper";
import aee from "@Turtle/Data/Aee";
import {HoverPlane} from "@Turtle/Fibers/Drawing";

export default function PickEntityFiber({}) {

    const [isDrawing, setIsDrawing] = React.useState(false)


    return (
        <AeeWrapper
            aee={aee}
            World_PickEntity={() => {
                setIsDrawing(true)
            }}
            World_CancelPick={() => {
                setIsDrawing(false)
            }}
        >
            {
                isDrawing &&
                <HoverPlane/>
            }
        </AeeWrapper>
    )

}