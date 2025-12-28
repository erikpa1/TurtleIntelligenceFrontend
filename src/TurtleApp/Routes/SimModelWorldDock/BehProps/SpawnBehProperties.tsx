import React from "react"
import IntItem from "@Turtle/ReflectiveUI/NumberItem"
import {Flex} from "antd"
import SimEntity from "@TurtleApp/Routes/SimModelWorldDock/Data/SimEntity"

import {ActorsSelect} from "@TurtleApp/Routes/SimModelWorldDock/BehProps/ActorSelect";

interface SpawnEntityPropertiesProps {
    entity: SimEntity
}

export default function SpawnEntitiyProperties({
                                                   entity,
                                               }: SpawnEntityPropertiesProps) {
    return (
        <Flex
            vertical
            gap={15}
        >
            <ActorsSelect
                typeData={entity.typeData}
                attribute={"actor"}
            />

            <IntItem
                attribute={"spawn_interval"}
                entity={entity.typeData}
            />

            <IntItem
                attribute={"spawn_limit"}
                entity={entity.typeData}
            />

        </Flex>
    )
}

