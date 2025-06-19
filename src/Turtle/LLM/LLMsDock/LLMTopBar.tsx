import {Button, Flex} from "antd";
import TopBarWrapper from "@Turtle/Components/TopBarWrapper";
import {useTranslation} from "react-i18next";
import {useTurtleModal} from "@Turtle/Hooks/useTurtleModal";
import TurtleApp from "@TurtleApp/TurtleApp";
import OllamaApi from "@Turtle/LLM/Api/OllamaApi";
import StringAttributeView from "@Turtle/Components/Forms/StringAttributeView";
import {RightSubmitButton} from "@Turtle/Components/RightSubmitButton";
import * as stream from "stream";


export function LLMTopBar() {
    return (
        <TopBarWrapper>
            <Flex>
                <_StartOllama/>
                <_InstallOllamaButton/>
            </Flex>
        </TopBarWrapper>
    )
}

function _StartOllama({}) {

    const [t] = useTranslation()

    const {activate, deactivate} = useTurtleModal()


    function showResponseWindow(response: string) {
        activate({
            title: t("response"),
            closable: true,
            width: 600,
            content: (
                <Flex align={"center"}>
                    <div
                        dangerouslySetInnerHTML={{__html: response}}
                    />
                </Flex>
            )
        })
    }

    async function startPressed() {
        TurtleApp.Lock()
        showResponseWindow(await OllamaApi.List())
        TurtleApp.Unlock()
    }

    return (
        <Button
            type={"text"}
            onClick={startPressed}
        >
            🦙 Start Ollama
        </Button>
    )
}

function _InstallOllamaButton() {
    const [t] = useTranslation()

    const {activate, deactivate} = useTurtleModal()


    function showResponseWindow(response: string) {
        activate({
            title: t("response"),
            closable: true,
            width: 600,
            content: (
                <Flex align={"center"}>
                    <div
                        dangerouslySetInnerHTML={{__html: response}}
                    />
                </Flex>
            )
        })
    }

    async function installPressed(model: string) {
        TurtleApp.Lock()
        showResponseWindow(await OllamaApi.Install("", model))
        TurtleApp.Unlock()
    }

    function startPressed() {
        const attribute = {
            model: "deepseek-r1:7b"
        }

        activate({
            title: `${t("model")}:`,
            closable: true,
            width: 600,
            content: (
                <Flex
                    vertical={true}
                    style={{
                        marginTop: "15px"
                    }}
                >
                    <StringAttributeView
                        entity={attribute}
                        attribute={"model"}
                    />
                    <RightSubmitButton onClick={() => {
                        installPressed(attribute.model)
                    }}/>
                </Flex>
            )
        })

    }

    return (
        <Button
            type={"text"}
            onClick={startPressed}
        >
            🦙 Install LLM
        </Button>
    )
}