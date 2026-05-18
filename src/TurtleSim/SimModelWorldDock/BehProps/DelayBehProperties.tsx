import React from "react";
import SimEntity from "@TurtleSim/SimModelWorldDock/Data/SimEntity";

import { ActorsSelect } from "@TurtleSim/SimModelWorldDock/BehProps/ActorSelect";
import TimeExrItem from "@Turtle/ReflectiveUI/TimeExprItem";
import { IntProperty } from "@Turtle/Data/Properties";
import IntItem from "@Turtle/ReflectiveUI/NumberItem";

interface ProcessEntityPropertiesProps {
    entity: SimEntity;
}

export default function DelayBehProperties({
    entity,
}: ProcessEntityPropertiesProps) {
    if (Object.keys(entity.typeData).length === 0) {
        entity.typeData = {
            limit: 1,
            delay: "00:10",
        };
    }

    return (
        <>
            <IntItem attribute={"limit"} entity={entity.typeData} />
            <TimeExrItem attribute={"delay"} entity={entity.typeData} />
        </>
    );
}
