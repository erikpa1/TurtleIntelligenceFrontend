import React from "react"

import {Button, Flex, Splitter} from "antd";
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


export default function WorldDock({}) {

    const {modelUid} = useParams()

    const [t] = useTranslation()

    function savePressed() {
        aee.emit("SaveWorld", null)
    }


    return (
        <div>
            <div style={{
                height: "5vh",
                backgroundColor: "white",
                position: "relative",
                paddingLeft: "10px"
            }}>

                <Flex
                    gap={10}
                >
                    <Button
                        onClick={savePressed}
                        type={"primary"}
                    >
                        <SaveOutlined/>
                        {t("save")}
                    </Button>


                    <RightSubmitButton
                        onClick={() => {
                            //Do nothing
                        }}
                    />
                </Flex>

                <div
                    style={{
                        backgroundColor: "rgb(230, 230, 230)",
                        height: "2px",
                        width: "100%",
                        position: "absolute",
                        bottom: 0,
                        left: 0
                    }}
                />
            </div>
            <Splitter style={{
                height: "95vh",
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

