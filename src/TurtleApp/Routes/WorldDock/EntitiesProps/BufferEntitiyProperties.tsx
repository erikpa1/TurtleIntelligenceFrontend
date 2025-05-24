import React from "react"
import StringItem from "@Turtle/ReflectiveUI/StringItem";
import {Flex} from "antd";
import IntItem from "@Turtle/ReflectiveUI/NumberItem";
import {ActorsSelect} from "@TurtleApp/Routes/WorldDock/EntitiesProps/ActorSelect";
import Entity from "@Turtle/Data/Entity";

interface BufferEntityPropertiesProps {
    entity: Entity
}

export default function BufferEntitiyProperties({
                                                    entity,
                                                }: BufferEntityPropertiesProps) {
    return (
        <Flex
            vertical
            gap={5}
        >

            <StringItem
                attribute={"capacity"}
                entity={entity}
            />

            <ActorsSelect
                typeData={entity.typeData}
                attribute={"initial_actor"}
            />

            <IntItem
                attribute={"initial_count"}
                entity={entity.typeData}
            />

        </Flex>
    )
}



