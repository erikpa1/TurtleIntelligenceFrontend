import React from "react"
import {Col, Flex, Row, Tabs, Timeline, Typography} from "antd";
import {useTranslation} from "react-i18next";
import {HierarchyInfoButton} from "@Turtle/Components/HierarchyComponents";
import {useTurtleModal} from "@Turtle/Hooks/useTurtleModal";

export default function LLModelsInfoView() {

    const [t] = useTranslation()

    const modelsMemory = React.useMemo(() => {
        return {
            generic: [
                {name: "deepseek-r1:7b"},
                {name: "deepseek-r1:14b"},
                {name: "deepseek-r1:70b"},
            ],
            agentic: [
                {name: "mistral:7b"}
            ],
            healthcare: [
                {name: "medllama2:7b"}
            ],
            visionencoder: [
                {name: "llava:7b"},
                {name: "llava:13b"},
                {name: "llava:34b"},
            ],

        }
    }, [])

    const [activeKey, setActiveKey] = React.useState("generic")

    return (
        <Row>
            <Col span={6}>
                <Tabs
                    defaultActiveKey="activeKey"

                    size={"small"}
                    tabPosition={"left"}
                    onChange={setActiveKey}
                    items={[
                        {
                            label: t("generic"),
                            key: "generic",
                        },
                        {
                            label: t("agentic"),
                            key: "agentic",
                        },
                        {
                            label: t("healthcare"),
                            key: "healthcare",
                        },
                        {
                            label: t("visionencoder"),
                            key: "visionencoder",
                        }
                    ]}
                />
            </Col>
            <Col span={16}>
                <Timeline
                    items={modelsMemory[activeKey].map((val) => {
                        return {
                            color: "gray",
                            children: (
                                <Flex vertical>
                                    <Typography.Text>{val.name}</Typography.Text>
                                </Flex>
                            )

                        }
                    })}
                    style={{
                        paddingBottom: 0
                    }}
                />
            </Col>
        </Row>
    )
}

export function ModelsInfoButton({}) {


    const [t] = useTranslation()

    const {activate, deactivate} = useTurtleModal()

    function showModels() {
        activate({
            title: t("models"),
            width: 800,
            content: (
                <div style={{
                    padding: "15px"
                }}>
                    <LLModelsInfoView/>
                </div>
            )
        })
    }

    return (
        <HierarchyInfoButton
            onClick={showModels}
        />
    )
}