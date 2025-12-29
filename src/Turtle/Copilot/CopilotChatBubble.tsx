import {Flex} from "antd"
import {StringAreaAttributeView} from "@Turtle/Components/Forms/StringAreaPropertyView"
import React from "react"
import {RightSubmitButton} from "@Turtle/Components/RightSubmitButton"
import TurtleApp from "@TurtleApp/TurtleApp"
import CopilotApi from "@Turtle/Copilot/CopilotApi"
import UnderlineButton from "@Turtle/Components/UnderlineButton"
import {useTurtleModal} from "@Turtle/Hooks/useTurtleModal"
import {Example} from "@react-three/drei"
import {TurtleSkeleton} from "@Turtle/Components/TurtleSkeleton"


export default function CopilotChatBubble({context}) {


    const {activate, deactivate} = useTurtleModal()

    const askContext = React.useMemo(() => {
        return {
            question: ""
        }
    }, [])

    function showExamples() {
        activate({
            title: "examples",
            content: (
                <_Examples context={context}/>
            )
        })
    }


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

            <UnderlineButton
                lang={"examples"}
                onClick={showExamples}
            />

            <RightSubmitButton onClick={execute}/>
        </Flex>
    )
}

function _Examples({context}) {

    const [isLoading, setIsLoading] = React.useState(true)

    const [htmlStr, setHtmlStr] = React.useState("")

    async function refresh() {
        setIsLoading(true)
        setHtmlStr(await CopilotApi.GetCopilotExample(context))
        setIsLoading(false)
    }

    React.useEffect(() => {
        refresh()
    }, [context])

    if (isLoading) {
        return (
            <TurtleSkeleton/>
        )
    } else {
        return (
            <div dangerouslySetInnerHTML={{__html: htmlStr}}/>
        )
    }



}