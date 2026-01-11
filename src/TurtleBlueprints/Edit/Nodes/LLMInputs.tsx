
import {Flex, Tooltip} from "antd";
import {Handle, Position} from "reactflow"
import {SUBNODE_HANDLE_STYLE} from "@TurtleBlueprints/Edit/Styles"

export function ListLLMInputHandles() {
    return (
        <>
            <Tooltip title={"llm"}>
                <Handle
                    id={"llm"}
                    position={Position.Bottom}
                    type="source"
                    style={{
                        ...SUBNODE_HANDLE_STYLE,
                    }}
                />
            </Tooltip>

            <Tooltip title={"memory"}>
                <Handle
                    id={"memory"}
                    position={Position.Bottom}
                    type="source"
                    style={{
                        ...SUBNODE_HANDLE_STYLE,
                        left: "25%"
                    }}
                />
            </Tooltip>

            <Tooltip title={"tools"}>
                <Handle
                    id={"tools"}
                    position={Position.Bottom}
                    type="source"
                    style={{
                        ...SUBNODE_HANDLE_STYLE,
                        left: "75%"
                    }}
                />
            </Tooltip>

        </>
    )
}