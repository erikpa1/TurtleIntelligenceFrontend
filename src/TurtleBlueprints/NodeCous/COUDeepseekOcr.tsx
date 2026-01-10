import NodeParent from "@TurtleBlueprints/Data/Nodes/NodeParent";
import StringAttributeView from "@Turtle/Components/Forms/StringAttributeView"
import DeepseekOcr from "@TurtleBlueprints/Data/Nodes/Ocr/DeepseekOcr"
import UnderlineButton from "@Turtle/Components/UnderlineButton"
import {Divider, Flex} from "antd"
import {useTurtleModal} from "@Turtle/Hooks/useTurtleModal"
import NodesFactory from "@TurtleBlueprints/Data/NodesFactory"

interface COUStaticMemoryProps {
    node: NodeParent
}

export default function COUDeepseekOcr({
                                           node
                                       }: COUStaticMemoryProps) {

    const {activate} = useTurtleModal()

    const data: DeepseekOcr = node.typeData

    function showExampleModal() {
        activate({
            title: "example",
            content: (
                <Flex vertical>
                    <_ExampleCommand/>
                </Flex>
            )
        })
    }

    return (
        <>

            <StringAttributeView
                entity={data}
                attribute={"model"}
                inputProps={{disabled: true}}
            />

            <StringAttributeView
                entity={data}
                attribute={"prompt"}
            />

            <UnderlineButton
                lang={"example"}
                onClick={showExampleModal}
            />


        </>
    )
}

function _ExampleCommand() {
    return (
        <>
            <h5>Deepseek DeepseekOcr examples </h5>

            <p>
                {"<|grounding|>"}Given the layout of the image.
            </p>

            <p>
                Free OCR.
            </p>

            <p>
                Parse the figure.
            </p>

            <p>
                Extract the text in the image.
            </p>
            <p>
                {"<|grounding|>"}Convert the document to markdown.
            </p>

            <p>
                For more info see <a href={"https://ollama.com/library/deepseek-ocr"} target={"_blank"}
                                     rel={"noreferrer"}>
                Ollama repositories
            </a>
            </p>


        </>
    )
}

