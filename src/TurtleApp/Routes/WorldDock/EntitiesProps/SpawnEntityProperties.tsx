import React from "react"
import IntItem from "@Turtle/ReflectiveUI/NumberItem"
import {Flex} from "antd"
import Entity from "@Turtle/Data/Entity"

interface SpawnEntityPropertiesProps {
    entity: Entity
}

export default function SpawnEntitiyProperties({
                                                   entity,
                                               }: SpawnEntityPropertiesProps) {
    return (
        <Flex vertical>
            <IntItem
                attribute={"spawn_limit"}
                entity={entity.typeData}
            />
        </Flex>
    )
}