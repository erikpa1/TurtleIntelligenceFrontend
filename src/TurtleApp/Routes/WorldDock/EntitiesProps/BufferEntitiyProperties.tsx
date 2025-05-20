import React from "react"
import StringItem from "@Turtle/ReflectiveUI/StringItem";

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