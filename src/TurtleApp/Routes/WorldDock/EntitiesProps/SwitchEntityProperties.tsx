import Entity from "@Turtle/Data/Entity";
import {ActorsSelect} from "@TurtleApp/Routes/WorldDock/EntitiesProps/ActorSelect";
import StringItem from "@Turtle/ReflectiveUI/StringItem";
import React from "react";
import SelectItem from "@Turtle/ReflectiveUI/SelectItem";
import {useTranslation} from "react-i18next";


interface ProcessEntityPropertiesProps {
    entity: Entity
}


export default function SwitchEntityProperties({
                                                   entity,
                                               }: ProcessEntityPropertiesProps) {

    const [t] = useTranslation()

    if (Object.keys(entity.typeData).length === 0) {
        entity.typeData = {
            mode: 0,
        }
    }

    return (
        <>

            <SelectItem
                attribute={"mode"}
                entity={entity.typeData}
                options={[
                    {
                        value: 0,
                        label: t("firstfree"),
                    },
                    {
                        value: 1,
                        label: t("roundrobin"),
                    }
                ]}

            />
        </>
    )
}