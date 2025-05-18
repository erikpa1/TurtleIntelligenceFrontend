import Entity from "../../Turtle/Data/Entity";
import {useTransformControls} from "../../Turtle/Fibers/TransformControlsFiber";
import React from "react";
import * as THREE from "three";
import AeeWrapper from "@Turtle/Data/AeeWrapper";
import aee from "@Turtle/Data/Aee";
import {Simulate} from "react-dom/test-utils";
import click = Simulate.click;


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

    function clicked() {
        entity.modified = true
        useTransformControls.getState().setObjectToSelect(groupRef.current)
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

    return (
        <AeeWrapper
            aee={aee}
            SelectEntityInWorld={someEntityClicked}
        >
            <group
                ref={groupRef}
                name={entity.uid}
                position={entity.position as any}
                onClick={clickedFromWorld}
            >
                {children}
            </group>
        </AeeWrapper>


    )

}