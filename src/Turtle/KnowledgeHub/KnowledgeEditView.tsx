import React from "react"
import {Flex} from "antd";
import {Knowledge, KnowledgeType} from "@Turtle/KnowledgeHub/Data/Knowledge";
import KnowledgeApi from "@Turtle/KnowledgeHub/Api/KnowledgeApi";
import {CenterSpinner} from "@Turtle/Components/Loadings";
import TurtleEmpty from "@Turtle/Components/TurtleEmpty";
import {useTurtleTheme} from "@Turtle/Theme/useTurleTheme";
import {MarkdownParser} from "@Turtle/KnowledgeHub/KHMarkDown";

export default function KnowledgeEditView({knUid}) {

    const [isLoading, setIsLoading] = React.useState(false)


    const [knowledge, setKnowledge] = React.useState<Knowledge | null>(null)


    async function refresh() {
        setIsLoading(true)
        const tmp = await KnowledgeApi.Get(knUid)
        setKnowledge(tmp)
        setIsLoading(false)
    }

    React.useEffect(() => {
        refresh()
    }, [knUid])

    if (isLoading) {
        return (
            <CenterSpinner/>
        )
    } else {
        if (knowledge) {
            return (
                <_KnowledgeTypeDispatcher knowledge={knowledge}/>
            )
        } else {
            return (
                <TurtleEmpty/>
            )
        }
    }

}


interface _KnowledgeTypeDispatcherProps {
    knowledge: Knowledge
}

function _KnowledgeTypeDispatcher({knowledge}: _KnowledgeTypeDispatcherProps) {

    const {bigPadding} = useTurtleTheme()


    const toSee = React.useMemo(() => {
        const parser = new MarkdownParser()
        const text = knowledge.typeData["text"] ?? ""
        const parsed = parser.parseMarkdown(text)
        const htmlOutput = parser.toHtml(parsed)
        return htmlOutput
    }, [knowledge])


    if (knowledge.type === KnowledgeType.PLAIN_TEXT) {
        return (
            <Flex
                vertical
                style={{
                    padding: bigPadding
                }}
            >
                <h3>{knowledge.name}</h3>

                <h4>{knowledge.description}</h4>


                <div
                    dangerouslySetInnerHTML={{__html: toSee}}
                />
                <div>{}</div>
            </Flex>
        )
    }

    return (
        <div>
            Unsupported type
        </div>
    )
}










