import React from "react";
import Actor from "@TurtleApp/Data/Actor";
import ActorsApi from "@TurtleApp/Api/ActorsApi";
import SelectItem from "@Turtle/ReflectiveUI/SelectItem";
import Entity, {TypeData} from "@Turtle/Data/Entity";
import {WorldSingleton} from "@TurtleApp/Data/World";
import SimEntity from "@TurtleSim/SimModelWorldDock/Data/SimEntity"

interface ActorsSelectProps {
    entity: SimEntity
    attribute: string
    typeData: TypeData
}

export function ConnectionSelect({
                                     entity,
                                     attribute,
                                     typeData,
                                 }: ActorsSelectProps) {

    const [connections, setConnections] = React.useState<Array<SimEntity>>([])

    function refresh() {

        const connections = WorldSingleton.I.connections.get(entity.uid)

        if (connections) {
            setConnections(Array.from(connections.values()).map((val) => {

                const tmp = WorldSingleton.I.entities.get(val)
                if (tmp) {
                    return tmp
                } else {
                    const nonExisting = new SimEntity()
                    nonExisting.name = "--404--"
                    return nonExisting
                }


            }))
        } else {
            setConnections([])
        }

    }

    React.useEffect(() => {
        refresh()
    }, [entity])

    return (
        <SelectItem
            attribute={attribute}
            entity={typeData}
            useEmpty={true}
            options={connections.map((val) => {
                return {
                    value: val.uid,
                    label: val.name,
                }
            })}

        />
    )
}