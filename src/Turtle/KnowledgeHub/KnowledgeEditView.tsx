import React from "react"
import {Card, Flex} from "antd";
import {Knowledge, KnowledgeType} from "@Turtle/KnowledgeHub/Data/Knowledge";
import KnowledgeApi from "@Turtle/KnowledgeHub/Api/KnowledgeApi";
import {CenterSpinner} from "@Turtle/Components/Loadings";
import TurtleEmpty from "@Turtle/Components/TurtleEmpty";
import {useTurtleTheme} from "@Turtle/Theme/useTurleTheme";
import {MarkdownParser} from "@Turtle/KnowledgeHub/KHMarkDown";
import {useParams} from "react-router-dom";
import KnowledgeRelationsView from "@Turtle/KnowledgeHub/KHRelations/KnowledgeRelationsView";

export default function KnowledgeEditView({knUid}) {

    const {viewMethod} = useParams()

    const {bigPadding} = useTurtleTheme()

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
            if (Boolean(viewMethod) === false || viewMethod === "data") {
                return (
                    <Flex
                        vertical
                        gap={15}
                    >
                        <_KnowledgeTypeDispatcher
                            knowledge={knowledge}
                        />
                    </Flex>
                )
            } else {
                return (
                    <Flex
                        vertical
                        gap={15}
                    >
                        <KnowledgeRelationsView
                            knowledge={knowledge}
                        />
                    </Flex>
                )
            }
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
            <Card
                title={(
                    <h3>{knowledge.name}</h3>
                )}
                style={{
                    margin: bigPadding
                }}
            >
                <Flex
                    vertical
                    style={{
                        padding: bigPadding
                    }}
                >

                    <h4>{knowledge.description}</h4>

                    <div
                        dangerouslySetInnerHTML={{__html: toSee}}
                    />
                    <div>{}</div>
                </Flex>
            </Card>
        )
    }

    return (
        <div>
            Unsupported type
        </div>
    )
}










