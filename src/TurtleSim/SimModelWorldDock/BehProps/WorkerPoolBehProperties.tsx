import React from "react";

import IntItem from "@Turtle/ReflectiveUI/NumberItem";
import SimEntity from "@TurtleSim/SimModelWorldDock/Data/SimEntity";
import { BoolAttributeView } from "@Turtle/Components/Forms/BoolPropertyView";

interface WorkerPoolBehPropertiesProps {
    entity: SimEntity;
}

export default function WorkerPoolBehProperties({
    entity,
}: WorkerPoolBehPropertiesProps) {
    if (Object.keys(entity.typeData).length === 0) {
        entity.typeData = {
            spawn_limit: 1,
        };
    }

    return (
        <>
            <IntItem attribute={"spawn_limit"} entity={entity.typeData} />

            <BoolAttributeView
                entity={entity.typeData}
                attribute={"spawn_on_init"}
            />

            {/*
            <BoolAttributeView
                entity={entity.typeData}
                attribute="free"
            />*/}
        </>
    );
}
