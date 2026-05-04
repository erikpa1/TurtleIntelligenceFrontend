import React from "react"

import {Spin, Splitter, Tabs} from "antd";

import WorldFiber from "./WorldFiber";
import SimWorldHierarchy from "@TurtleSim/SimModelWorldDock/SimWorldHierarchy";
import {useParams} from "react-router-dom";

import WorldControllers from "@TurtleSim/SimModelWorldDock/WorldControllers";
import WorldApi from "@TurtleApp/Api/WorldApi";
import World, {WorldSingleton} from "@TurtleApp/Data/World";
import WorldTopBar from "@TurtleSim/SimModelWorldDock/WorldTopBar";
import SimWorldRightBar from "@TurtleSim/SimModelWorldDock/SimWorldRightBar/SimWorldRightBar";
import InitWorldFactory from "@TurtleSim/SimModelWorldDock/WorldInit";
import TopBarWrapper, {TopBarWrapperNoFlex} from "@Turtle/Components/TopBarWrapper";
import {useTurtleTheme} from "@Turtle/Theme/useTurleTheme";
import {useTranslation} from "react-i18next";
import ColorConstants from "@Turtle/Constants/ColorConstants";
import SimStatisticsView from "@TurtleSim/SimModelWorldDock/Statistics/SimStatisticsView";


InitWorldFactory()

export default function SimWorldDock({}) {

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
                <_LayoutDock world={world}/>
            )
        } else {
            return (<div/>)
        }

    }


}

interface _WorldDockProps {
    world: World
}

function _LayoutDock({world}: _WorldDockProps) {

    const [t] = useTranslation()

    const {theme} = useTurtleTheme()

    const [activeMid, setActiveMid] = React.useState("world")

    return (
        <div>
            <WorldTopBar/>

            <Splitter style={{
                height: `calc(100vh - ${theme.topBarHeightBig} - ${theme.topBarHeightBig})`,
            }}>

                <Splitter.Panel
                    defaultSize="20%"
                    style={{
                        backgroundColor: "white"
                    }}
                >
                    <SimWorldHierarchy world={world}/>
                </Splitter.Panel>

                <Splitter.Panel
                    defaultSize="60%"
                >
                    <TopBarWrapperNoFlex>
                        <Tabs
                            defaultValue={"world"}
                            onChange={setActiveMid}
                            items={[
                                {
                                    label: t("world"),
                                    key: "world"
                                },
                                {
                                    label: t("statistics"),
                                    key: "statistics"
                                }
                            ]}
                        />
                    </TopBarWrapperNoFlex>

                    {
                        activeMid === "world" && (
                            <_WorldDock world={world}/>
                        )
                    }

                    {
                        activeMid === "statistics" && (
                            <SimStatisticsView/>
                        )
                    }


                </Splitter.Panel>

                <Splitter.Panel
                    defaultSize="20%"
                >
                    <SimWorldRightBar/>
                </Splitter.Panel>

            </Splitter>

            <TopBarWrapperNoFlex config={{isBottom: true}}>
                <div/>
            </TopBarWrapperNoFlex>

            <WorldControllers/>
        </div>

    )
}


function _WorldDock({world}: _WorldDockProps) {

    const {theme} = useTurtleTheme()

    return (
        <div
            style={{
                position: "relative",
                backgroundColor: "#212124"
            }}
        >
            <div
                style={{
                    height: `calc(100vh - ${theme.topBarHeightBig} - ${theme.topBarHeightBig} - ${theme.topBarHeightBig})`,
                }}
            >
                <WorldFiber world={world}/>
            </div>
        </div>
    )
}
