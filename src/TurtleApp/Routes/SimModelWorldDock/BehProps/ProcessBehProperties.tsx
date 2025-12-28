import React from "react"
import SimEntity from "@TurtleApp/Routes/SimModelWorldDock/Data/SimEntity"

import {ActorsSelect} from "@TurtleApp/Routes/SimModelWorldDock/BehProps/ActorSelect";
import TimeExrItem from "@Turtle/ReflectiveUI/TimeExprItem";

interface ProcessEntityPropertiesProps {
    entity: SimEntity
}

export default function ProcessBehProperties({
                                                 entity,
                                             }: ProcessEntityPropertiesProps) {


    if (Object.keys(entity.typeData).length === 0) {
        entity.typeData = {
            transformsTo: "",
            process_time: "00:10",
        }
    }


    return (
        <>
            <ActorsSelect
                typeData={entity.typeData}
                attribute={"transformsTo"}
            />

            <TimeExrItem
                attribute={"processTime"}
                entity={entity.typeData}
            />


        </>
    )
}

