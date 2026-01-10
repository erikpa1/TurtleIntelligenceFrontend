import NodeParent from "@TurtleBlueprints/Data/Nodes/NodeParent"

import StringAttributeView from "@Turtle/Components/Forms/StringAttributeView"
import SqliteNode from "@TurtleBlueprints/Data/Nodes/Databases/Sqllite/SqliteNode"
import {BoolAttributeView} from "@Turtle/Components/Forms/BoolPropertyView"

interface COUSqliteProps {
    node: NodeParent
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