import React from "react"
import {Flex, Form, Select, Timeline, Typography} from "antd"
import {Knowledge, KnowledgeType} from "@Turtle/Knowledge/Data/Knowledge";
import StringAttributeView from "@Turtle/Components/Forms/StringAttributeView";
import {useTranslation} from "react-i18next";
import {RightSubmitButton} from "@Turtle/Components/RightSubmitButton";
import TurtleApp from "@TurtleApp/TurtleApp";
import KnowledgeApi from "@Turtle/Knowledge/Api/KnowledgeApi";
import {StringAreaAttributeView} from "@Turtle/Components/Forms/StringAreaPropertyView";

interface COUKnowledgeViewProps {
    knowledge: Knowledge
    onBeforeSubmit: any
    onAfterSubmit: any

}

export default function COUKnowledgeView({
                                             knowledge,
                                             onBeforeSubmit,
                                             onAfterSubmit
                                         }: COUKnowledgeViewProps) {

    const [t] = useTranslation()

    const [kType, setKType] = React.useState(knowledge.type)


    async function submitPressed() {
        onBeforeSubmit()
        TurtleApp.Lock()

        await KnowledgeApi.COU(knowledge)
        TurtleApp.Unlock()
        onAfterSubmit()
    }

    return (
        <Form layout={"vertical"}>

            <Flex vertical>

                <StringAttributeView
                    entity={knowledge}
                    attribute={"name"}
                />

                <StringAreaAttributeView
                    entity={knowledge}
                    attribute={"description"}
                />

                {
                    knowledge.uid === "" && (
                        <Form.Item label={`${t("type")}:`}>
                            <Select
                                defaultValue={`${knowledge.type}`}
                                onChange={(val) => {
                                    knowledge.type = Number(val)
                                    setKType(knowledge.type)
                                }}
                            >
                                <Select.Option value={"0"}>
                                    {t("plain.text")}
                                </Select.Option>

                                <Select.Option value={"1"}>
                                    {t("document")}
                                </Select.Option>

                                <Select.Option value={"4"}>
                                    {t("guidance")}
                                </Select.Option>

                            </Select>
                        </Form.Item>
                    )
                }

                {
                    kType === KnowledgeType.PLAIN_TEXT && (
                        <StringAreaAttributeView
                            entity={knowledge.typeData}
                            attribute={"text"}
                        />
                    )
                }

                <RightSubmitButton onClick={submitPressed}/>

            </Flex>

        </Form>
    )
}