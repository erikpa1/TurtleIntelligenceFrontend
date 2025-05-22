import React from "react"
import IntItem from "@Turtle/ReflectiveUI/NumberItem"
import {Flex} from "antd"
import Entity from "@Turtle/Data/Entity"

import {ActorsSelect} from "@TurtleApp/Routes/WorldDock/EntitiesProps/ActorSelect";

interface SpawnEntityPropertiesProps {
    entity: Entity
}

export default function SpawnEntitiyProperties({
                                                   entity,
                                               }: SpawnEntityPropertiesProps) {
    return (
        <Flex
            vertical
            gap={5}
        >
            <ActorsSelect
                entity={entity}
                attribute={"actor"}
            />

            <IntItem
                attribute={"spawn_limit"}
                entity={entity.typeData}
            />

        </Flex>
    )
}

