import React from "react"
import StringItem from "@Turtle/ReflectiveUI/StringItem";
import {EntityNameProperty, EntityTypeProperty} from "@TurtleApp/Routes/WorldDock/EntitiesProps/Common";


interface BufferEntityPropertiesProps {
    entity: any
}

export default function BufferEntitiyProperties({
                                                    entity,

                                                }: BufferEntityPropertiesProps) {
    return (
        <div>

            <StringItem
                attribute={"capacity"}
                entity={entity}
            />
        </div>
    )
}