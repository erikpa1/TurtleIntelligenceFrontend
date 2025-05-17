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


export default function WorldTopBar({}) {


    const [t] = useTranslation()

    function savePressed() {
        aee.emit("SaveWorld", null)
    }

    async function simulatePressed() {
        await WorldApi.Simulate(WorldSingleton.I.uid)
    }

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
                <Button
                    onClick={savePressed}
                    type={"text"}

                >
                    <SaveOutlined/>
                    {t("save")}
                </Button>

                <Button
                    onClick={savePressed}
                    type={"text"}
                >
                    <MergeOutlined/>
                    {t("connect")}
                </Button>

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

function _SimulationSection({}) {

    const [t] = useTranslation()


    const [isSimulating, setIsSimulating] = React.useState(false)


    async function simulatePressed() {
        setIsSimulating(true)
        await WorldApi.Simulate(WorldSingleton.I.uid)

    }

    async function pausePressed() {
        setIsSimulating(false)
    }

    async function stopPressed() {
        setIsSimulating(false)
    }


    if (isSimulating) {
        return (
            <Flex gap={5}>
                <div>1 (s)</div>
                <div>/</div>
                <div>10000 (s)</div>

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