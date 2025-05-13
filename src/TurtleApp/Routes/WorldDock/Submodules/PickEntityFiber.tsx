import React from "react"
import {Plane} from "@react-three/drei";
import AeeWrapper from "@Turtle/Data/AeeWrapper";
import aee from "@Turtle/Data/Aee";
import {HoverPlane} from "@Turtle/Fibers/Drawing";

export default function PickEntityFiber({}) {

    const [callBack, setCallback] = React.useState<any>(null)


    function picked(point: number[]) {
        callBack(point)
        setCallback(null)
    }

    console.log(callBack)

    return (
        <AeeWrapper
            aee={aee}
            World_PickEntity={(cb) => {
                console.log("Started drawing", cb)
                setCallback(cb)
            }}
            World_CancelPick={() => {
                setCallback(null)
            }}
        >
            {
                callBack &&
                <HoverPlane
                    picked={picked}
                />
            }
        </AeeWrapper>
    )

}