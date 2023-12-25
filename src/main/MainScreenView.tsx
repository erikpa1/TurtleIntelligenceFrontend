import React from "react"
import {MainScreenTopBar} from "./MainScreenTopBar";
import SimulationWorld from "../simulation/SimulationWorld";
import SimulationApi from "../api/SimulationApi";
import {AddButton} from "./AddButton";


let TIMEOUT: any = null
export default function MainScreenView({}) {

    async function loopRefresh() {
        TIMEOUT = setTimeout(loopRefresh, 1000)
        const data = await SimulationApi.GetSimulationState()
        SimulationApi.EmitAppStateData(data)

    }

    React.useEffect(() => {
        loopRefresh()

        return () => {
            if (TIMEOUT) {
                clearTimeout(TIMEOUT)
            }
        }
    }, [])

    return (
        <div style={{
            position: "relative",
            height: "100vh"
        }}>
            <SimulationWorld/>
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
