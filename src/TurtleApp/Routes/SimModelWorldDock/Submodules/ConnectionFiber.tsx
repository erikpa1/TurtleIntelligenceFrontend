import React from "react"
import Entity from "@Turtle/Data/Entity";
import {Html, Sphere} from "@react-three/drei";
import CylinderBetweenPoints from "@Turtle/Fibers/CylinderBetween";
import {useWorldConnection} from "@TurtleApp/Data/WorldZuses";
import {CloseOutlined} from "@ant-design/icons";
import {Button} from "antd";
import {WorldSingleton} from "@TurtleApp/Data/World";


interface ConnectionFiberProps {
    a: Entity
    b: Entity
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
                            onClick={disconnectClicked}
                            style={{
                                backgroundColor: "red"
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