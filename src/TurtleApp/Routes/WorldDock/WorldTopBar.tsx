import React from "react"
import {Button, Flex} from "antd";
import {MergeOutlined, PlayCircleOutlined, SaveOutlined} from "@ant-design/icons";
import {RightSubmitButton} from "@Turtle/Components/RightSubmitButton";
import {useTranslation} from "react-i18next";
import aee from "@Turtle/Data/Aee";
import WorldApi from "@TurtleApp/Api/WorldApi";
import {WorldSingleton} from "@TurtleApp/Data/World";
import {HierarchyDeleteButton, HierarchyPauseButton, HierarchyStopButton} from "@Turtle/Components/HierarchyComponents";
import {useTurtleModal} from "@Turtle/Hooks/useTurtleModal";
import Myio from "@Turtle/Data/myio";
import {useWorldConnection} from "@TurtleApp/Data/WorldZuses";
import {useActiveSimulation} from "@TurtleApp/Routes/WorldDock/Controllers/RunningSimulationController";


export default function WorldTopBar({}) {


    return (
        <div style={{
            height: "45px",
            backgroundColor: "white",
            position: "relative",
            paddingLeft: "10px"
        }}>

            <Flex
                gap={5}
                style={{
                    paddingTop: "5px"
                }}
            >

                <_SaveButton/>
                <_ConnectButton/>


                <Flex
                    justify={"end"}
                    flex={1}
                >
                    <_SimulationSection/>
                </Flex>


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
    )
}

function _SaveButton() {


    const [t] = useTranslation()


    function savePressed() {
        aee.emit("SaveWorld", null)
    }


    return (
        <Button
            onClick={savePressed}
            type={"text"}

        >
            <SaveOutlined/>
            {t("save")}
        </Button>
    )
}


function _ConnectButton() {

    const [t] = useTranslation()


    const {phase, setPhase} = useWorldConnection()

    function startConnecting() {
        setPhase(1)
        aee.emit("ConnectFirstOne", null)
    }

    function stopConnecting() {
        setPhase(0)
        aee.emit("ConnectStop", null)
    }

    if (phase > 0) {
        return (
            <Button
                onClick={stopConnecting}
                type={"primary"}
            >
                <MergeOutlined/>
                {t("stop.connecting")}
            </Button>
        )
    } else {
        return (
            <Button
                onClick={startConnecting}
                type={"text"}
            >
                <MergeOutlined/>
                {t("connect")}
            </Button>
        )
    }

}


function _SimulationSection({}) {

    const [t] = useTranslation()


    const {isRunning, setIsRunning, second, endSecond} = useActiveSimulation()


    async function simulatePressed() {
        setIsRunning(true)
        await WorldApi.Simulate(WorldSingleton.I.uid)

    }

    async function pausePressed() {
        setIsRunning(false)
    }

    async function stopPressed() {
        setIsRunning(false)
    }


    if (isRunning) {
        return (
            <Flex gap={5}>
                <div>{second} (s)</div>
                <div>/</div>
                <div>100 (s)</div>

                <HierarchyPauseButton onClick={pausePressed}/>

                <HierarchyStopButton onClick={stopPressed}/>
            </Flex>
        )
    } else {
        return (
            <Button
                onClick={simulatePressed}
                type={"primary"}
            >
                {t("simulate")}
                <PlayCircleOutlined/>
            </Button>
        )
    }


}


function _SimHudEditView({}) {

    const [t] = useTranslation()

    const {activate, deactivate} = useTurtleModal()

    function editHudPressed() {
        activate({
            title: `${t("edit.hud")}:`,
            content: (
                <div>
                    Here
                </div>
            )
        })
    }

    return (
        <Button
            onClick={editHudPressed}
            type={"text"}

        >
            <SaveOutlined/>
            HUD
        </Button>
    )
}