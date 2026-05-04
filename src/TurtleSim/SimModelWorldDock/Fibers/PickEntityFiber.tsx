import React from "react"
import {Plane} from "@react-three/drei";
import AeeWrapper from "@Turtle/Data/AeeWrapper";
import aee from "@Turtle/Data/Aee";
import {HoverPlane} from "@Turtle/Fibers/Drawing";

export default function PickEntityFiber({}) {

    //Funkciu nemozno pridat do REACT komponentu
    const [callBack, setCallback] = React.useState<any>({guard: null})

    function picked(point: number[]) {
        callBack.guard(point)
        setCallback({guard: null})
    }

    return (
        <AeeWrapper
            aee={aee}
            World_PickEntity={(cb) => {
                setCallback({guard: cb})
            }}
            World_CancelPick={() => {
                setCallback({guard: null})
            }}
        >
            {
                callBack.guard &&
                <HoverPlane
                    picked={picked}
                />
            }
        </AeeWrapper>
    )

}