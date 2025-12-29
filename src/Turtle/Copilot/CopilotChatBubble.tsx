import {Flex} from "antd"
import {StringAreaAttributeView} from "@Turtle/Components/Forms/StringAreaPropertyView"
import React from "react"
import {RightSubmitButton} from "@Turtle/Components/RightSubmitButton"
import TurtleApp from "@TurtleApp/TurtleApp"
import CopilotApi from "@Turtle/Copilot/CopilotApi"


export default function CopilotChatBubble({context}) {


    const askContext = React.useMemo(() => {
        return {
            question: ""
        }
    }, [])

    async function execute() {
        TurtleApp.Lock()
        await CopilotApi.ChatCopilotContext(context, askContext.question)
        TurtleApp.Unlock()
    }

    return (
        <Flex vertical>
            <StringAreaAttributeView
                entity={askContext}
                attribute={"question"}
            />

            <RightSubmitButton onClick={execute}/>
        </Flex>
    )
}