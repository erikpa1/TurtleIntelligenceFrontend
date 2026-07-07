import React from "react";

import IntItem from "@Turtle/ReflectiveUI/NumberItem";
import SimEntity from "@TurtleSim/SimModelWorldDock/Data/SimEntity";
import { BoolAttributeView } from "@Turtle/Components/Forms/BoolPropertyView";

interface LogisticsControlBehPropertiesProps {
    entity: SimEntity;
}

export default function LogisticsControlBehProperties({
    entity,
}: LogisticsControlBehPropertiesProps) {
    if (Object.keys(entity.typeData).length === 0) {
        //DO nothing yer
    }

    return <></>;
}
