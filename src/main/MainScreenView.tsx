import React from "react"
import {MainScreenTopBar} from "./MainScreenTopBar";
import SimulationWorld from "../simulation/SimulationWorld";


export default function MainScreenView({}) {
    return (
        <div style={{
            position: "relative",
            height: "100vh"
        }}>
            <SimulationWorld/>
            <_Framing/>


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
