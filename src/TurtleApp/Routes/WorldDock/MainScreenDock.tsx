import React from "react"

import {Button, Splitter} from "antd";
import TopBarControlView from "../../Ui/TopBarControlView";
import WorldDock from "./WorldDock";
import {AddButton} from "../../../main/AddButton";
import {MainScreenTopBar} from "../../../main/MainScreenTopBar";
import WorldHierarchy from "@TurtleApp/Routes/WorldDock/WorldHierarchy";


export default function MainScreenDock({}) {


    return (
        <Splitter style={{
            height: "100vh",
            // backgroundColor: "#212124"
        }}>
            <Splitter.Panel
                defaultSize="20%"
                style={{
                    backgroundColor: "white"
                }}
            >
                <div style={{
                    padding: "15px"
                }}>
                    <WorldHierarchy/>
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
                        height: "100vh",
                    }}>
                        <WorldDock/>
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
                            width: "100vh",
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
                    height: "100vh",
                    width: "50px",
                    position: "absolute",
                    top: "0px",
                    left: "0px",
                }}
            />
        </div>
    )
}

