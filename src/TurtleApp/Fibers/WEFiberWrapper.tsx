import Entity from "../../Turtle/Data/Entity";
import {useTransformControls} from "../../Turtle/Fibers/TransformControlsFiber";


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


    function clicked() {
        useTransformControls.getState().setObjectToSelect(entity.uid)
    }

    return (
        <group
            name={entity.uid}
            position={entity.position as any}
            onClick={clicked}
        >
            {children}
        </group>

    )

}