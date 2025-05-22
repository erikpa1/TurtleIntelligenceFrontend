import React from "react";
import Actor from "@TurtleApp/Data/Actor";
import ActorsApi from "@TurtleApp/Api/ActorsApi";
import SelectItem from "@Turtle/ReflectiveUI/SelectItem";

interface ActorsSelectProps {
    attribute: string
    entity: any
}

export function ActorsSelect({
                                 attribute,
                                 entity,
                             }: ActorsSelectProps) {

    const [actors, setActors] = React.useState<Array<Actor>>([])

    async function refresh() {
        setActors(await ActorsApi.QueryActors({}))
    }

    React.useEffect(() => {
        refresh()
    }, [])


    return (
        <SelectItem
            attribute={attribute}
            entity={entity.typeData}
            useEmpty={true}
            options={actors.map((val) => {
                return {
                    value: val.uid,
                    label: val.name,
                }
            })}

        />
    )
}