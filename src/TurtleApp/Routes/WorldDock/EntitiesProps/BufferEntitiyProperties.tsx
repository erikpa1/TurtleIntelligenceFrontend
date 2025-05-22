import React from "react"
import StringItem from "@Turtle/ReflectiveUI/StringItem";
import Actor from "@TurtleApp/Data/Actor";
import SelectItem from "@Turtle/ReflectiveUI/SelectItem";
import {Flex} from "antd";
import ActorsApi from "@TurtleApp/Api/ActorsApi";
import IntItem from "@Turtle/ReflectiveUI/NumberItem";
import {ActorsSelect} from "@TurtleApp/Routes/WorldDock/EntitiesProps/ActorSelect";

interface BufferEntityPropertiesProps {
    entity: any
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
                entity={entity}
                attribute={"initial_actor"}
            />

            <IntItem
                attribute={"initial_count"}
                entity={entity.typeData}
            />

        </Flex>
    )
}



