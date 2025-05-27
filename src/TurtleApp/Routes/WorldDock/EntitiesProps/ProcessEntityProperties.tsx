import React from "react"
import IntItem from "@Turtle/ReflectiveUI/NumberItem"
import {Flex} from "antd"
import Entity from "@Turtle/Data/Entity"

import {ActorsSelect} from "@TurtleApp/Routes/WorldDock/EntitiesProps/ActorSelect";
import StringItem from "@Turtle/ReflectiveUI/StringItem";

interface ProcessEntityPropertiesProps {
    entity: Entity
}

export default function ProcessEntityProperties({
                                                    entity,
                                                }: ProcessEntityPropertiesProps) {


    if (Object.keys(entity.typeData).length === 0) {
        entity.typeData = {
            transformsTo: "",
            process_time: "00:10",
        }
    }


    return (
        <Flex
            vertical
            gap={15}
        >
            <ActorsSelect
                typeData={entity.typeData}
                attribute={"transformsTo"}
            />

            <StringItem
                attribute={"processTime"}
                entity={entity.typeData}
            />


        </Flex>
    )
}

