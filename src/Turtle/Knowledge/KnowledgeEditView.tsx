import React from "react"
import {Flex} from "antd";
import {Knowledge, KnowledgeType} from "@Turtle/Knowledge/Data/Knowledge";
import KnowledgeApi from "@Turtle/Knowledge/Api/KnowledgeApi";
import {CenterSpinner} from "@Turtle/Components/Loadings";
import TurtleEmpty from "@Turtle/Components/TurtleEmpty";
import {useTurtleTheme} from "@Turtle/Zuses/useTurleTheme";

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

                <div>{knowledge.typeData["text"]}</div>
            </Flex>
        )
    }

    return (
        <div>
            Unsupported type
        </div>
    )
}










