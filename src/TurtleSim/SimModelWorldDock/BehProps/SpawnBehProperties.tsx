import React from "react";
import IntItem from "@Turtle/ReflectiveUI/NumberItem";
import SimEntity from "@TurtleSim/SimModelWorldDock/Data/SimEntity";

import {ActorsSelect} from "@TurtleSim/SimModelWorldDock/BehProps/ActorSelect";
import {BoolAttributeView} from "@Turtle/Components/Forms/BoolPropertyView";

interface SpawnEntityPropertiesProps {
    entity: SimEntity;
}

export default function SpawnBehProperties({
                                               entity,
                                           }: SpawnEntityPropertiesProps) {
    const tData = entity.typeData;

    fixDefaultData(tData);

    return (
        <>
            <ActorsSelect typeData={tData} attribute={"actor"}/>

            <IntItem attribute={"spawn_interval"} entity={tData}/>

            <BoolAttributeView entity={tData} attribute={"spawn_on_init"}/>

            <IntItem attribute={"spawn_limit"} entity={tData}/>

            <IntItem attribute={"spawn_multiplication"} entity={tData}/>
        </>
    );
}

function fixDefaultData(typeData: any) {
    if (!typeData.spawn_interval) {
        typeData.spawn_interval = 5;
    }

    if (!typeData.spawn_limit) {
        typeData.spawn_limit = 0;
    }

    if (!typeData.spawn_multiplication) {
        typeData.spawn_multiplication = 1;
    }

    if (!typeData.spawn_on_init) {
        typeData.spawn_on_init = false;
    }
}
