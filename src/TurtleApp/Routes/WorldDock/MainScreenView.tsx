import React from "react"

import {Button} from "antd";
import TopBarControlView from "../../Ui/TopBarControlView";
import WorldDock from "./WorldDock";
import {AddButton} from "../../../main/AddButton";
import {MainScreenTopBar} from "../../../main/MainScreenTopBar";


export default function MainScreenView({}) {


    return (
        <div style={{
            position: "relative",
            height: "100vh"
        }}>
            <WorldDock/>
            <_Framing/>
            <AddButton/>
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

