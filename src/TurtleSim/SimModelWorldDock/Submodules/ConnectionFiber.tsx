import React from "react"
import SimEntity from "@TurtleSim/SimModelWorldDock/Data/SimEntity";
import {Html, Sphere} from "@react-three/drei";
import CylinderBetweenPoints from "@Turtle/Fibers/CylinderBetween";
import {useWorldConnection} from "@TurtleApp/Data/WorldZuses";
import {CloseOutlined} from "@ant-design/icons";
import {Button} from "antd";
import {WorldSingleton} from "@TurtleApp/Data/World";
import ColorConstants from "@Turtle/Constants/ColorConstants";


interface ConnectionFiberProps {
    a: SimEntity
    b: SimEntity
}


export default function ConnectionFiber({
                                            a,
                                            b
                                        }: ConnectionFiberProps) {

    const {phase} = useWorldConnection()


    function disconnectClicked() {
        console.log(a, b)
        WorldSingleton.I.DeleteConnection(a, b)
    }


    return (
        <CylinderBetweenPoints
            start={a.position as any}
            end={b.position as any}
        >

            {
                phase === -1 && (
                    <Html>
                        <Button
                            type={"primary"}
                            size={"small"}
                            onClick={disconnectClicked}
                            style={{
                                backgroundColor: ColorConstants.RED
                            }}
                        >
                            <CloseOutlined/>
                        </Button>
                    </Html>
                )
            }
        </CylinderBetweenPoints>
    )
}