import React from "react"
import {Card, Flex, Progress, Tag, Typography} from "antd"
import {FileTextOutlined} from "@ant-design/icons"
import {HierarchyRightFlex, HierarchyViewButton} from "@Turtle/Components/HierarchyComponents"
import AgentTool from "@Turtle/AgentTools/AgentTool"


interface ToolCardProps {
    tool: AgentTool
}

export default function ToolCard({tool}: ToolCardProps) {


    return (
        <Card
            hoverable
            className="mb-4"
            styles={{
                body: {
                    padding: '16px'
                }
            }}
        >
            <Flex vertical>
                <Flex gap={15}>

                    <div>
                        <FileTextOutlined style={{fontSize: '20px', color: '#f5222d'}}/>
                    </div>

                    <Flex vertical>

                        <Flex>
                            <Typography.Title level={5}>
                                {tool.name}
                            </Typography.Title>

                            <HierarchyRightFlex>
                                <HierarchyViewButton
                                    onClick={() => {
                                        console.log("Here")
                                    }}
                                />

                            </HierarchyRightFlex>

                        </Flex>

                        <Tag>
                            {"File operator"}
                        </Tag>


                        <Typography.Paragraph
                            type="secondary"
                            style={{fontSize: '14px', marginBottom: '12px'}}
                            ellipsis={{rows: 2}}
                        >
                            {tool.description}
                        </Typography.Paragraph>

                    </Flex>
                </Flex>
            </Flex>
        </Card>
    )
}
