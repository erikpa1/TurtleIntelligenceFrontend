import {Button, Flex} from "antd";
import TopBarWrapper from "@Turtle/Components/TopBarWrapper";
import {useTranslation} from "react-i18next";
import {useTurtleModal} from "@Turtle/Hooks/useTurtleModal";
import TurtleApp from "@TurtleApp/TurtleApp";
import OllamaApi from "@Turtle/LLM/Api/OllamaApi";


export function LLMTopBar() {
    return (
        <TopBarWrapper>
            <Flex>
                <_StartOllama/>
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