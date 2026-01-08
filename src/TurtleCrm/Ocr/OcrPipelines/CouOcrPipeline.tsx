
import {Card, Flex, Form} from "antd";
import {RightSubmitButton} from "@Turtle/Components/RightSubmitButton";
import TurtleApp from "@TurtleApp/TurtleApp";
import StringAttributeView from "@Turtle/Components/Forms/StringAttributeView";
import UidAttributeView from "@Turtle/Components/Forms/UidAttributeView";
import {useTranslation} from "react-i18next";
import OcrPipeline from "@TurtleCrm/Ocr/Data/OcrPipeline";


interface COUOcrPipelineProps {
    pipeline: OcrPipeline
    onBeforeUpdate?: () => void
    onAfterUpdate?: () => void
}

export default function COUOcrPipeline({
                                           pipeline
                                       }: COUOcrPipelineProps) {

    const [t] = useTranslation()

    async function submit() {
        TurtleApp.Lock()

        TurtleApp.Unlock()
    }


    return (
        <Form layout={"vertical"}>
            <Flex vertical gap={15}>

                <Card
                    title={`${t("basics")}:`}

                >
                    <StringAttributeView entity={pipeline} attribute={"name"}/>
                    <UidAttributeView entity={pipeline} attribute={"uid"}/>
                </Card>

                <Card title={`${t("source")}:`}>

                </Card>

                <Card title={`${t("tool")}:`}>

                </Card>

                <Card title={`${t("target")}:`}>

                </Card>

                <RightSubmitButton onClick={submit}/>

            </Flex>
        </Form>
    )

}