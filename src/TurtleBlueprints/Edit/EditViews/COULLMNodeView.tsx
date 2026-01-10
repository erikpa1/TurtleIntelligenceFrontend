import NodeParent from "@TurtleBlueprints/Data/Nodes/NodeParent";
import {Divider, Flex, Form} from "antd";
import SelectHttpMethod from "@TurtlePostman/Components/SelectHttpMethod";
import {HttpTriggerData} from "@TurtleBlueprints/Data/Nodes/Triggers/HttpTriggerData";
import {WriteToFileNode} from "@TurtleBlueprints/Data/Nodes/WriteToFileNode";
import StringAttributeView from "@Turtle/Components/Forms/StringAttributeView";
import LLMAgentData from "@TurtleBlueprints/Data/Nodes/LLMAgentData";
import {StringAreaAttributeView} from "@Turtle/Components/Forms/StringAreaPropertyView";
import UnderlineButton from "@Turtle/Components/UnderlineButton"
import {useTurtleModal} from "@Turtle/Hooks/useTurtleModal"

interface COULLMNodeViewProps {
    node: NodeParent
}

export default function COULLMNodeView({
                                           node
                                       }: COULLMNodeViewProps) {

    const {activate} = useTurtleModal()

    const data: LLMAgentData = node.typeData

    function showExampleModal() {
        activate({
            title: "example",
            content: (
                <Flex vertical>
                    <_SystemPromptExample/>
                </Flex>
            )
        })
    }

    return (
        <>

            <div>
                <StringAreaAttributeView
                    entity={data}
                    attribute={"systemPrompt"}
                    areaProps={{
                        style: {
                            minHeight: 100
                        }
                    }}
                />
                <UnderlineButton
                    lang={"example"}
                    onClick={showExampleModal}
                />

            </div>

        </>
    )
}

function _SystemPromptExample({}) {
    return (
        <>
            <h5>Chat GTP example</h5>
            <b>## Role</b>
            <p>
                You are a helpful assistant that provides concise ranking lists to the user in response to user
                questions.
            </p>
            <b>## Instructions</b>
            <p>
                Each item in the ranking list should be on a new line. A list item must only inlcude the name of the
                item. No chit chat or other explanatory text is allowed.
            </p>
            <b>## Examples</b>
            <p>
                A list of books would look like this:
            </p>
            <ol>
                <li>{"<book1>"}</li>
                <li>{"<book2>"}</li>
                <li>{"<book3>"}</li>
            </ol>

            <Divider/>

            <b>** USER QUESTIONS **</b>
            <p>Please create list of best books ever written</p>
        </>
    )
}