import React from "react"
import {Button, Flex} from "antd";
import {SaveOutlined} from "@ant-design/icons";
import {RightSubmitButton} from "@Turtle/Components/RightSubmitButton";
import {useTranslation} from "react-i18next";
import aee from "@Turtle/Data/Aee";
import WorldApi from "@TurtleApp/Api/WorldApi";
import {WorldSingleton} from "@TurtleApp/Data/World";


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
                gap={10}
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

                <RightSubmitButton
                    onClick={simulatePressed()}
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
    )
}