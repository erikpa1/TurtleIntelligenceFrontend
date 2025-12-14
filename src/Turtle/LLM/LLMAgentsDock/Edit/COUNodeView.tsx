import {COUEntityView} from "@Turtle/Interfaces/ICOUView";
import AgentNodeParent from "@Turtle/LLM/LLMAgentsDock/Data/Nodes/AgentNodeParent";
import {Flex, Form} from "antd";


export default function COUNodeView(props: COUEntityView<AgentNodeParent>) {

    return (
        <Form>
            <Flex vertical>
                <div>
                    Here
                </div>
            </Flex>
        </Form>
    )

}