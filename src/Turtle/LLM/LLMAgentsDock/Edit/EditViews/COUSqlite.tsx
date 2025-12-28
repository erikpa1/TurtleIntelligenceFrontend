import AgentNodeParent from "@Turtle/LLM/LLMAgentsDock/Data/Nodes/AgentNodeParent"

import StringAttributeView from "@Turtle/Components/Forms/StringAttributeView"
import SqliteNode from "@Turtle/LLM/LLMAgentsDock/Data/Nodes/Databases/Sqllite/SqliteNode"
import {BoolAttributeView} from "@Turtle/Components/Forms/BoolPropertyView"

interface COUSqliteProps {
    node: AgentNodeParent
}

export default function COUSqlite({
                                           node
                                       }: COUSqliteProps) {

    const data: SqliteNode = node.typeData

    return (
        <>
            <StringAttributeView
                entity={data}
                attribute={"path"}
            />

            <BoolAttributeView
                entity={data}
                attribute={"preload"}
            />

        </>
    )
}