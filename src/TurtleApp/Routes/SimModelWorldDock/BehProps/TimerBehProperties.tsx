
import React from "react"

import IntItem from "@Turtle/ReflectiveUI/NumberItem"
import SimEntity from "@TurtleApp/Routes/SimModelWorldDock/Data/SimEntity"

interface TimerBehPropertiesProps {
    entity: SimEntity
}

export default function TimerBehProperties({
                                                entity,
                                            }: TimerBehPropertiesProps) {

    if (Object.keys(entity.typeData).length === 0) {
        entity.typeData = {
            capacity: 10,
        }
    }

    return (
        <>

            <IntItem
                attribute={"period"}
                entity={entity.typeData}
            />

            <IntItem
                attribute={"waitStart"}
                entity={entity.typeData}
            />

        </>
    )
}



