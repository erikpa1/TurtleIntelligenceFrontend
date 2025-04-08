import Entity from "../../Turtle/Data/Entity";


export interface EntityFiberProps {
    entity: Entity
}

export interface _WEFiberWrapperProps {
    children: any
    entity: Entity
}

export default function _WEFiberWrapper({
                                            children,
                                            entity
                                        }: _WEFiberWrapperProps) {

    return (
        <group position={entity.position as any}>
            {children}
        </group>

    )

}