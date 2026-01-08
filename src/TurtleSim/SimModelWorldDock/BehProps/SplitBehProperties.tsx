import React from "react"
import SimEntity from "@TurtleSim/SimModelWorldDock/Data/SimEntity";

import {Divider, Flex, Form, Select, Tabs} from "antd";
import {useTranslation} from "react-i18next";
import {WorldSingleton} from "@TurtleApp/Data/World";

interface SplitBehPropertiesProps {
    entity: SimEntity
}

export default function SplitBehProperties({
                                               entity,
                                           }: SplitBehPropertiesProps) {

    if (Object.keys(entity.typeData).length === 0) {
        entity.typeData = {
            splits: [
                {"actor": "", "targetConnection": "", count: 1}
            ]
        }
    }


    return (
        <>
            <_SplitCreationLine entity={entity}/>

        </>
    )
}


function _SplitCreationLine({entity}: SplitBehPropertiesProps) {

    const [t] = useTranslation()

    const [splitType, setSplitType] = React.useState("local")

    return (
        <>
            <Divider titlePlacement="start">
                {t("Splitting")}
            </Divider>

            <Tabs
                defaultActiveKey="table"
                centered
                size={"small"}
                onChange={setSplitType}
                items={[
                    {
                        label: t("local"),
                        key: "local",
                    },
                    {
                        label: t("table"),
                        key: "table",
                    },
                ]}
            />

            {
                splitType === "table" && (
                    <div>TODO</div>
                )
            }

            {
                splitType === "local" && (
                    <_ConnectionActorSelect entity={entity}/>
                )
            }


        </>
    )
}

function _ConnectionActorSelect({entity}: SplitBehPropertiesProps) {

    const [t] = useTranslation()

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
        <Form.Item
            label={"Actor A"}
            style={{
                margin: 0
            }}
        >
            <Select
                size={"small"}
                defaultValue={""}
                onChange={(value) => {

                }}
            >

                {
                    connections.map((entity) => {
                        return (
                            <Select.Option
                                key={entity.uid}
                                value={entity.uid}
                            >
                                {entity.name}
                            </Select.Option>
                        )
                    })

                }


            </Select>

        </Form.Item>
    )


}