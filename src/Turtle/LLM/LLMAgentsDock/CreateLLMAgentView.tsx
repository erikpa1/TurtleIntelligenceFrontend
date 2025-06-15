import React from "react"
import {Checkbox, Col, Flex, Form, Row, Select, Switch, Tabs, Timeline} from "antd";
import {StringProperty} from "@Turtle/Data/Properties";
import StringPropertyView from "@Turtle/Components/Forms/StringPropertyView";
import {RightSubmitButton} from "@Turtle/Components/RightSubmitButton";
import TurtleApp from "@TurtleApp/TurtleApp";

import {LLMAgent} from "@Turtle/LLM/Data/LLMAgent";
import LLMAgentApi from "@Turtle/LLM/Api/LLMAgentApi";
import {ListUserTypes} from "@Turtle/Users/User";
import {useTranslation} from "react-i18next";
import XApiKeySelect from "@Turtle/XApiKey/XApiKeySelect";
import StringAreaPropertyView from "@Turtle/Components/Forms/StringAreaPropertyView";


interface CreateLLMClusterModalProps {
    agent: LLMAgent
    beforeSubmit: () => void
    afterSubmit: () => void
}


export default function CreateLLMAgentModal({
                                                agent,
                                                beforeSubmit,
                                                afterSubmit
                                            }: CreateLLMClusterModalProps) {

    const [t] = useTranslation()

    const nameField = React.useMemo(() => {
        return StringProperty.NewName()
    }, [agent])


    const descriptionField = React.useMemo(() => {
        return StringProperty.New("description", "description")
    }, [agent])


    const commandExampleField = React.useMemo(() => {
        return StringProperty.New("commandExample", "commandExample")
    }, [agent])

    const specializationField = React.useMemo(() => {
        return StringProperty.New("specialization", "specialization")
    }, [agent])


    async function onSubmit() {
        beforeSubmit()
        TurtleApp.Lock()
        await LLMAgentApi.COUAgent(agent)
        TurtleApp.Unlock()
        afterSubmit()
    }

    const [activeTimeLine, setActiveTimeLine] = React.useState("basicInfo")


    return (
        <Form
            layout={"vertical"}
            style={{
                paddingTop: "30px"
            }}
        >

            <Row gutter={2}>
                <Col span={8}>
                    <Timeline
                        items={[
                            {
                                color: activeTimeLine == "basicInfo" ? "green" : "gray",
                                children: (
                                    <Flex
                                        onClick={() => {
                                            setActiveTimeLine("basicInfo")
                                        }}
                                        style={{
                                            cursor: "pointer"
                                        }}
                                    >
                                        {t("basicInfo")}
                                    </Flex>
                                )
                            },
                            {
                                color: activeTimeLine == "agentType" ? "green" : "gray",
                                children: (
                                    <Flex
                                        onClick={() => {
                                            setActiveTimeLine("agentType")

                                        }}
                                        style={{
                                            cursor: "pointer"
                                        }}
                                    >
                                        {t("agentType")}
                                    </Flex>
                                )
                            }
                        ]}
                    />

                </Col>

                <Col span={16}>

                    {
                        activeTimeLine === "basicInfo" && (
                            <React.Fragment>
                                <StringPropertyView
                                    entity={agent}
                                    attribute={"name"}
                                />

                                {/*TODO user level*/}


                                <StringAreaPropertyView
                                    entity={agent}
                                    property={descriptionField}
                                />


                                <StringPropertyView
                                    entity={agent}
                                    attribute={"specialization"}
                                />


                                <Form.Item
                                    label={`${t("user.level")}:`}
                                >
                                    <Select
                                        defaultValue={0}
                                        onChange={(value) => {
                                            agent.userLevel = value
                                        }}
                                    >
                                        {
                                            ListUserTypes().map((entity) => {
                                                return (
                                                    <Select.Option
                                                        key={entity.lang}
                                                        value={entity.value}
                                                    >
                                                        {t(entity.lang)}
                                                    </Select.Option>
                                                )
                                            })
                                        }

                                    </Select>
                                </Form.Item>

                                <XApiKeySelect
                                    entity={agent}
                                    itemKey={"xApiKey"}
                                />

                                <StringAreaPropertyView
                                    entity={agent}
                                    property={commandExampleField}
                                />

                            </React.Fragment>
                        )
                    }

                    {
                        activeTimeLine === "agentType" && (
                            <_LLMAgentEditType agent={agent}/>
                        )
                    }

                </Col>
            </Row>


            <RightSubmitButton
                onClick={onSubmit}
            />

        </Form>
    )
}


function _LLMAgentEditType({agent}: { agent: LLMAgent }) {


    const [t] = useTranslation()

    const [agentType, setAgentType] = React.useState("url")

    return (
        <React.Fragment>


            <Tabs
                defaultActiveKey="url"
                centered
                size={"small"}
                onChange={(newType) => {
                    setAgentType(newType)
                }}
                items={[
                    {
                        label: "URL",
                        key: "url",
                    },
                    {
                        label: t("database"),
                        key: "database",
                    },
                    {
                        label: t("code"),
                        key: "code",
                    },
                    {
                        label: t("exe"),
                        key: "exe",
                    },
                ]}
            />
        </React.Fragment>
    )
}
