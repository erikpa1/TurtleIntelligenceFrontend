import React from "react"
import {MainScreenTopBar} from "./MainScreenTopBar";

import {AddButton} from "./AddButton";
import WorldDock from "../TurtleApp/Routes/WorldDock/WorldDock";


let TIMEOUT: any = null
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
