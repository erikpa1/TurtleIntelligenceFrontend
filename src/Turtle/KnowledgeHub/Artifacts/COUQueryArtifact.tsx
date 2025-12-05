import {COUEntityView} from "@Turtle/Interfaces/ICOUView";
import Artifact from "@Turtle/KnowledgeHub/Artifacts/Artifact";
import {Flex, Form} from "antd";
import StringAttributeView from "@Turtle/Components/Forms/StringAttributeView";


export default function COUQueryArtifact(props: COUEntityView<Artifact>) {

    return (
        <Form layout={"vertical"}>
            <Flex vertical gap={15}>
                <StringAttributeView entity={props.entity} attribute={"name"}/>

                <StringAttributeView
                    entity={props.entity.typeData}
                    attribute={"container"}
                />

                <StringAttributeView
                    entity={props.entity.typeData}
                    attribute={"query"}
                />
            </Flex>
        </Form>
    )

}