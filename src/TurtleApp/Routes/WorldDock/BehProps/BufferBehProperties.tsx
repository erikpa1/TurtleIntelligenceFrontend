import React from "react"
import StringItem from "@Turtle/ReflectiveUI/StringItem";
import {Flex} from "antd";
import IntItem from "@Turtle/ReflectiveUI/NumberItem";
import {ActorsSelect} from "@TurtleApp/Routes/WorldDock/BehProps/ActorSelect";
import Entity from "@Turtle/Data/Entity";

interface BufferEntityPropertiesProps {
    entity: Entity
}

export default function BufferBehProperties({
                                                    entity,
                                                }: BufferEntityPropertiesProps) {

    if (Object.keys(entity.typeData).length === 0) {
        entity.typeData = {
            capacity: 10,
        }
    }

    return (
        <>
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

        </>
    )
}



