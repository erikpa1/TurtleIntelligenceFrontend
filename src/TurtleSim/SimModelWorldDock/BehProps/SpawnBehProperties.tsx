import React from "react"
import IntItem from "@Turtle/ReflectiveUI/NumberItem"
import {Flex} from "antd"
import SimEntity from "@TurtleSim/SimModelWorldDock/Data/SimEntity"

import {ActorsSelect} from "@TurtleSim/SimModelWorldDock/BehProps/ActorSelect";

interface SpawnEntityPropertiesProps {
    entity: SimEntity
}

export default function SpawnBehProperties({
                                               entity,
                                           }: SpawnEntityPropertiesProps) {

    const tData = entity.typeData

    return (
        <>
            <ActorsSelect
                typeData={tData}
                attribute={"actor"}
            />

            <IntItem
                attribute={"spawn_interval"}
                entity={tData}
            />

            <IntItem
                attribute={"spawn_limit"}
                entity={tData}
            />

        </>
    )
}

