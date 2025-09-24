import React from "react"
import {ActorsSelect} from "@TurtleApp/Routes/SimModelWorldDock/BehProps/ActorSelect";
import TimeExrItem from "@Turtle/ReflectiveUI/TimeExprItem";
import Entity from "@Turtle/Data/Entity";


interface MergeBehPropertiesProps {
    entity: Entity
}

export default function MergeBehProperties({
                                               entity,
                                           }: MergeBehPropertiesProps) {

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