import React from "react"

import {Button, Divider, Flex, Spin, Splitter, Tabs} from "antd";

import WorldFiber from "./WorldFiber";
import WorldHierarchy from "@TurtleApp/Routes/SimModelWorldDock/WorldHierarchy";
import {useParams} from "react-router-dom";

import WorldControllers from "@TurtleApp/Routes/SimModelWorldDock/WorldControllers";
import WorldApi from "@TurtleApp/Api/WorldApi";
import World, {WorldSingleton} from "@TurtleApp/Data/World";
import WorldTopBar from "@TurtleApp/Routes/SimModelWorldDock/WorldTopBar";
import WorldRightBar from "@TurtleApp/Routes/SimModelWorldDock/WorldRightBar";
import InitWorldFactory from "@TurtleApp/Routes/SimModelWorldDock/WorldInit";


InitWorldFactory()

export default function SimModelWorldDock({}) {

    const {modelUid} = useParams()

    const [world, setWorld] = React.useState<World | null>(null)

    const [isLoading, setIsLoading] = React.useState(false)


    async function refresh() {
        setIsLoading(true)
        const world = await WorldApi.GetWorld(modelUid as any)
        WorldSingleton.I = world

        document.title = `Model - ${world.name}`
        setWorld(world)
        setIsLoading(false)

    }

    React.useEffect(() => {
        refresh()
    }, [modelUid])


    if (isLoading) {
        return (
            <Spin size="large"/>
        )
    } else {
        if (world) {
            return (
                <_WorldDock world={world}/>
            )
        } else {
            return (<div/>)
        }

    }


}

interface _WorldDockProps {
    world: World
}

function _WorldDock({world}: _WorldDockProps) {


    return (
        <div>
            <WorldTopBar/>

            <Splitter style={{
                height: "100%",
                // backgroundColor: "#212124"
            }}>

                <Splitter.Panel
                    defaultSize="20%"
                    style={{
                        backgroundColor: "white"
                    }}
                >
                    <div style={{
                        paddingLeft: "15px",
                        paddingRight: "15px"
                    }}>
                        <WorldHierarchy world={world}/>
                    </div>

                </Splitter.Panel>

                <Splitter.Panel
                    defaultSize="60%"
                    style={{
                        backgroundColor: "#212124"
                    }}
                >
                    <div style={{
                        position: "relative",
                    }}>
                        <div style={{
                            height: "95vh",
                        }}>
                            <WorldFiber world={world}/>
                        </div>
                        {/*<_Framing/>*/}
                        {/*<AddButton/>*/}
                    </div>
                </Splitter.Panel>

                <Splitter.Panel
                    defaultSize="20%"
                    style={{
                        padding: "15px"

                    }}
                >
                    <WorldRightBar/>
                </Splitter.Panel>

            </Splitter>

            <WorldControllers/>
        </div>

    )
}
