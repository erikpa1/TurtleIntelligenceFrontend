import AeeWrapper from "@Turtle/Data/AeeWrapper";
import aee from "@Turtle/Data/Aee";
import Entity from "@Turtle/Data/Entity";
import React from "react";
import {Empty, Form} from "antd";
import BufferEntitiyProperties from "@TurtleApp/Routes/WorldDock/EntitiesProps/BufferEntitiyProperties";
import {EntityNameProperty, EntityTypeProperty} from "@TurtleApp/Routes/WorldDock/EntitiesProps/Common";


export default function WorldRightBar() {

    const [entity, setEntity] = React.useState<Entity | null>(null)

    function entityPicked(entity: Entity) {
        setEntity(entity)
    }

    return (
        <AeeWrapper
            aee={aee}
            WorldEntityClicked={entityPicked}
            SelectEntityFromWorld={entityPicked}
        >
            {
                entity ? <_EntityEditProps entity={entity}/> : <Empty/>
            }
        </AeeWrapper>
    )
}

interface _EntityEditPropsProps {
    entity: Entity
}

function _EntityEditProps({entity}: _EntityEditPropsProps) {
    return (
        <Form
            layout={'horizontal'}
            key={entity.uid}
        >
            <EntityNameProperty entity={entity}/>

            <EntityTypeProperty entity={entity}/>

            {
                entity.type == "buffer" && (
                    <BufferEntitiyProperties
                        entity={entity}
                    />
                )
            }

        </Form>
    )
}