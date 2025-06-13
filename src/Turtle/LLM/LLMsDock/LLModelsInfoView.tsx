import React from "react"
import {Col, Flex, Row, Tabs, Timeline, Typography} from "antd";
import {useTranslation} from "react-i18next";

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