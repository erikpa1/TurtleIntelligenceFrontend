import Entity from "../../Turtle/Data/Entity";
import {useTransformControls} from "../../Turtle/Fibers/TransformControlsFiber";
import React from "react";
import * as THREE from "three";
import AeeWrapper from "@Turtle/Data/AeeWrapper";
import aee from "@Turtle/Data/Aee";
import {Simulate} from "react-dom/test-utils";
import click = Simulate.click;
import {Box3D} from "@Turtle/Fibers/Drawing";
import EntitiesFactory from "@TurtleApp/Data/EntitiesFactory";


export interface EntityFiberProps {
    entity: Entity
}

export interface _WEFiberWrapperProps {
    children: any
    entity: Entity
}

export default function WEFiberWrapper({
                                           children,
                                           entity
                                       }: _WEFiberWrapperProps) {


    const groupRef = React.useRef<THREE.Group>(null)

    const [connectionState, setConnectionState] = React.useState(0)


    function posScaleRotChanged() {

        const group = groupRef.current
        if (group) {
            entity.position[0] = group.position.x
            entity.position[1] = group.position.y
            entity.position[2] = group.position.z
        }
    }


    function clicked() {
        entity.modified = true
        useTransformControls.getState().setObjectToSelect({
            obj: groupRef.current as any,
            modifyFunction: posScaleRotChanged
        })
    }

    function clickedFromWorld() {
        clicked()
        aee.emit("SelectEntityFromWorld", entity)
    }

    function someEntityClicked(externalEntity: Entity) {
        if (externalEntity === entity) {
            clicked()
        }
    }

    function connectFirstOne() {
        setConnectionState(1)
    }

    function connectSecondOne() {
        setConnectionState(2)

    }

    function stopConnection() {
        setConnectionState(0)

    }

    return (
        <AeeWrapper
            aee={aee}
            SelectEntityInWorld={someEntityClicked}
            ConnectFirstOne={connectFirstOne}
            ConnectSecondOne={connectSecondOne}
            ConnectStop={stopConnection}
        >
            <group
                ref={groupRef}
                name={entity.uid}
                position={entity.position as any}
                onClick={clickedFromWorld}
            >
                {children}

                {
                    (connectionState === 1 && EntitiesFactory.CanConnectOutput(entity.type)) && (
                        <Box3D
                            color={"lightgreen"}
                            onClick={() => {
                                aee.emit("FirstOneSelected", entity)
                            }}
                        />
                    )
                }

                {
                    (connectionState === 2 && EntitiesFactory.CanConnectInput(entity.type)) && (
                        <Box3D
                            color={"green"}
                            onClick={() => {
                                aee.emit("SecondOneSelected", entity)
                            }}
                        />
                    )
                }
            </group>
        </AeeWrapper>


    )

}