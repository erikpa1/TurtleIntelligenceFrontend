import React from "react"

import {Button, Divider, Flex, Spin, Splitter} from "antd";
import TopBarControlView from "../../Ui/TopBarControlView";
import WorldFiber from "./WorldFiber";
import {AddButton} from "../../../main/AddButton";
import {MainScreenTopBar} from "../../../main/MainScreenTopBar";
import WorldHierarchy from "@TurtleApp/Routes/WorldDock/WorldHierarchy";
import {useParams} from "react-router-dom";
import {RightSubmitButton} from "@Turtle/Components/RightSubmitButton";
import {SaveOutlined} from "@ant-design/icons";
import {useTranslation} from "react-i18next";
import aee from "@Turtle/Data/Aee";
import WorldControllers from "@TurtleApp/Routes/WorldDock/WorldControllers";
import WorldApi from "@TurtleApp/Api/WorldApi";
import {WorldSingleton} from "@TurtleApp/Data/World";
import WorldTopBar from "@TurtleApp/Routes/WorldDock/WorldTopBar";


export default function WorldDock({}) {

    const {modelUid} = useParams()

    const [isLoading, setIsLoading] = React.useState(false)

    async function refresh() {
        setIsLoading(true)
        const world = await WorldApi.GetWorld(modelUid as any)
        WorldSingleton.I = world

        document.title = `Model - ${world.name}`

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
        return (
            <_WorldDock/>
        )
    }


}

function _WorldDock({}) {



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
                        <WorldHierarchy world={null}/>
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
                            <WorldFiber/>
                        </div>
                        <_Framing/>
                        <AddButton/>
                    </div>
                </Splitter.Panel>

                <Splitter.Panel
                    defaultSize="20%"
                    style={{
                        padding: "15px"

                    }}
                >

                </Splitter.Panel>

            </Splitter>

            <WorldControllers/>
        </div>

    )
}

function _Framing({}) {
    return (
        <div>
            <div style={{
                position: "absolute",
                top: "0px",
                left: "0px",
            }}>
                <div className={"hstack"}>
                    <img
                        src={"/textures/frame-top.png"}
                        style={{
                            width: "95vh",
                            height: "40px",

                        }}
                    />
                    <div style={{
                        position: "absolute",
                        left: "55px",
                        top: "2.5px",
                        zIndex: 4,
                    }}>
                        <TopBarControlView/>

                    </div>

                </div>
                <div style={{
                    marginLeft: "50px",

                }}>
                    <MainScreenTopBar/>
                </div>
            </div>


            <img
                src={"/textures/frame-left.png"}
                style={{
                    height: "95vh",
                    width: "50px",
                    position: "absolute",
                    top: "0px",
                    left: "0px",
                }}
            />
        </div>
    )
}

