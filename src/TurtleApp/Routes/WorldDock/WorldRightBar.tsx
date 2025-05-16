import AeeWrapper from "@Turtle/Data/AeeWrapper";
import aee from "@Turtle/Data/Aee";
import Entity from "@Turtle/Data/Entity";
import React from "react";
import {Empty} from "antd";


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
        <div>
            {entity.uid}
        </div>
    )
}