import React from "react"
import {Button, Flex, Space} from "antd";
import {DisconnectOutlined, MergeOutlined, PlayCircleOutlined, SaveOutlined, SettingOutlined} from "@ant-design/icons";
import {RightSubmitButton} from "@Turtle/Components/RightSubmitButton";
import {useTranslation} from "react-i18next";
import aee from "@Turtle/Data/Aee";
import WorldApi from "@TurtleApp/Api/WorldApi";
import {WorldSingleton} from "@TurtleApp/Data/World";
import {
    HierarchyDeleteButton,
    HierarchyPauseButton,
    HierarchyPlayButton,
    HierarchyStopButton
} from "@Turtle/Components/HierarchyComponents";
import {useTurtleModal} from "@Turtle/Hooks/useTurtleModal";
import Myio from "@Turtle/Data/myio";
import {useWorldConnection} from "@TurtleApp/Data/WorldZuses";
import {useActiveSimulation} from "@TurtleApp/Routes/WorldDock/Controllers/RunningSimulationController";
import TurtleApp from "@TurtleApp/TurtleApp";
import SimConfigSettingsButton from "@TurtleApp/Routes/WorldDock/Components/SimConfig";


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
                <_DisconnectButton/>


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

function _DisconnectButton() {

    const {phase, setPhase} = useWorldConnection()


    return (
        <Button
            type={"text"}
            style={{
                opacity: phase == -1 ? 0.5 : 1,
                paddingLeft: "2px",
                paddingRight: "2px",
            }}
            onClick={() => {

                if (phase == -1) {
                    setPhase(0)
                } else {
                    setPhase(-1)
                }
            }}
        >
            <DisconnectOutlined/>
        </Button>
    )
}

function _SimulationSection({}) {

    const [t] = useTranslation()

    const {
        isRunning,
        isPaused,
        setIsRunning,
        setIsPaused,
        second,
        endSecond,
    } = useActiveSimulation()


    async function simulatePressed() {
        TurtleApp.Lock()
        const simUid = await WorldApi.Simulate(WorldSingleton.I.uid)
        setIsRunning(simUid)
        TurtleApp.Unlock()
    }


    async function pausePressed() {
        if (isPaused) {
            setIsPaused(false)
            await WorldApi.PauseSimulation(isRunning)
        } else {
            setIsPaused(true)
            await WorldApi.ResumeSimulation(isRunning)
        }
    }

    async function stopPressed() {
        setIsRunning("")
        await WorldApi.StopSimulation(isRunning)
    }


    if (isRunning !== "") {
        return (
            <Flex gap={5}>

                <span>{second} (s) / 100 (s)</span>

                {
                    isPaused ? (
                        <HierarchyPlayButton onClick={pausePressed}/>
                    ) : (
                        <HierarchyPauseButton onClick={pausePressed}/>
                    )
                }

                <HierarchyStopButton onClick={stopPressed}/>
            </Flex>
        )
    } else {
        return (

            <Flex>
                <SimConfigSettingsButton/>

                <Button
                    onClick={simulatePressed}
                    type={"primary"}

                >


                    {t("simulate")}
                    <PlayCircleOutlined/>
                </Button>
            </Flex>
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