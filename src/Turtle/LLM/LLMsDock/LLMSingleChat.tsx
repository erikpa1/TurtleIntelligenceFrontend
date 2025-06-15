import React from "react"
import {Button, Flex, Spin} from "antd";
import TextArea from "antd/es/input/TextArea";
import {RightSubmitButton} from "@Turtle/Components/RightSubmitButton";
import AIChatApi from "@Turtle/LLM/Api/AIChatApi";
import {useTranslation} from "react-i18next";

export default function LLMSingleChat({modelUid}) {

    const [t] = useTranslation()

    const [isAsked, setIsAsked] = React.useState(false)

    const [response, setResponse] = React.useState("")

    const [isLoading, setIsLoading] = React.useState(false)

    const [messageToAsk, setMessageToAsk] = React.useState(t("llm.defaultquestion") as string)

    async function ask() {
        setIsLoading(true)
        setResponse(await AIChatApi.AskModel(modelUid, messageToAsk))
        setIsLoading(false)
    }


    async function testEmbeding() {
        setIsLoading(true)
        setResponse(await AIChatApi.TestEmbeding(modelUid))
        setIsLoading(false)
    }

    return (
        <Flex
            vertical
            gap={10}
        >
            <TextArea
                value={messageToAsk}
                onChange={(e) => setMessageToAsk(e.target.value)}
            />


            {
                response !== "" && (
                    <TextArea
                        value={response}
                        onChange={(e) => {
                            //pass
                        }}
                    />


                )
            }

            {
                isLoading && (
                    <Spin/>
                )
            }

            <RightSubmitButton
                onClick={ask}
            />

            <Button onClick={testEmbeding}>
                Test embeding
            </Button>
        </Flex>
    )
}