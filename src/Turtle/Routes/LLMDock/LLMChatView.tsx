//Source https://claude.ai/chat/4392e5b8-b4fb-4f7c-924b-d40024277678
//Update https://claude.ai/chat/539ba06f-9df6-428a-819a-c08a4d48a170
//update 1 https://claude.ai/chat/539ba06f-9df6-428a-819a-c08a4d48a170

import TopBarWrapper from "@Turtle/Components/TopBarWrapper";
import {Flex, Select, Button, Avatar, Card} from "antd";
import {UserOutlined, RobotOutlined, EditOutlined, DeleteOutlined, CopyOutlined} from '@ant-design/icons';
import TextArea from "antd/es/input/TextArea";

import {PaperClipOutlined, SettingOutlined} from '@ant-design/icons';
import React from "react";
import LLMChatContext from "@Turtle/Routes/LLMDock/LLMChatContext";
import LLMChatInput from "@Turtle/Routes/LLMDock/LLMChatInput";
import AIChatApi from "@Turtle/Api/AIChatApi";
import {useNavigate} from "react-router-dom";

interface LLMChatViewProps {
    chatUid: string
}


export default function LLMChatView({chatUid}) {

    const navigate = useNavigate()

    const context = React.useMemo(() => new LLMChatContext(), [])

    const [isProcessing, setIsProcessing] = React.useState(false)

    const [chatHistory, setChatHistory] = React.useState<Array<string>>([])


    async function onChatResponse(chatText: string) {
        setIsProcessing(true)

        if (chatUid === "new") {
            const chatUid = await AIChatApi.CreateNewChat()
            navigate(chatUid)
            await AIChatApi.Chat(chatUid, chatText)
        } else {
            await AIChatApi.Chat(chatUid, chatText)
        }

        setIsProcessing(false)
    }


    return (
        <Flex vertical style={{
            height: "100%",
            justifyContent: "space-between"
        }}>
            <TopBarWrapper>
                <Select defaultValue={"llama"} style={{minWidth: 200}}>
                    <Select.Option value={"llama"}>
                        🦙 Llama
                    </Select.Option>
                    <Select.Option value={"deepseek-coder-v2:latest"}>
                        🤖 DeepSeek Coder V2
                    </Select.Option>
                </Select>
            </TopBarWrapper>

            <div style={{flex: 1, overflow: "hidden"}}>
                <QuestionsAnswerHistory/>
            </div>

            <LLMChatInput
                onChat={onChatResponse}
                isBlocked={isProcessing}
            />

        </Flex>
    );
}


function QuestionsAnswerHistory({}) {
    return (
        <div style={{
            padding: "20px 30px",
            height: "100%",
            overflowY: "auto",
        }}>
            <Flex gap={16} vertical>
                <UserSegment message="Hello! Can you help me understand how React hooks work?"/>
                <LLMSegment
                    message="Of course! React hooks are functions that let you use state and other React features in functional components. The most common ones are useState for managing state and useEffect for side effects. Would you like me to show you some examples?"/>
                <UserSegment message="Yes, please show me a simple example with useState"/>
                <LLMSegment
                    message="Here's a simple counter example using useState:\n\n```jsx\nimport { useState } from 'react';\n\nfunction Counter() {\n  const [count, setCount] = useState(0);\n\n  return (\n    <div>\n      <p>Count: {count}</p>\n      <button onClick={() => setCount(count + 1)}>\n        Increment\n      </button>\n    </div>\n  );\n}\n```\n\nThe useState hook returns an array with the current state value and a function to update it."/>
            </Flex>
        </div>
    );
}

function UserSegment({message = "Sample user message"}) {
    return (

        <Flex vertical gap={10}>
            <Flex justify="flex-end" style={{width: "100%"}}>
                <div style={{
                    maxWidth: "70%",
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "12px",
                    flexDirection: "row-reverse"
                }}>
                    <Avatar
                        icon={<UserOutlined/>}
                        style={{
                            backgroundColor: "#1890ff",
                            flexShrink: 0,
                            marginTop: "4px"
                        }}
                    />
                    <Card
                        size="small"
                        style={{
                            backgroundColor: "#1890ff",
                            border: "none",
                            borderRadius: "18px 18px 4px 18px",
                            boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
                        }}
                        bodyStyle={{
                            padding: "12px 16px",
                            color: "white"
                        }}
                    >
                        <div style={{
                            fontSize: "14px",
                            lineHeight: "1.5",
                            whiteSpace: "pre-wrap",
                            color: "white"
                        }}>
                            {message}
                        </div>

                    </Card>


                </div>


            </Flex>

            {/* Action buttons */}
            <Flex
                justify={"end"}
            >
                <Button
                    type="text"
                    size="small"
                    icon={<EditOutlined/>}
                    style={{
                        color: "#8c8c8c",
                        fontSize: "12px",
                        height: "auto",
                        padding: "4px 8px"
                    }}
                >
                    Edit
                </Button>
                <Button
                    type="text"
                    size="small"
                    icon={<CopyOutlined/>}
                    style={{
                        color: "#8c8c8c",
                        fontSize: "12px",
                        height: "auto",
                        padding: "4px 8px"
                    }}
                >
                    Copy
                </Button>
                <Button
                    type="text"
                    size="small"
                    icon={<DeleteOutlined/>}
                    style={{
                        color: "#ff4d4f",
                        fontSize: "12px",
                        height: "auto",
                        padding: "4px 8px"
                    }}
                >
                    Delete
                </Button>
            </Flex>
        </Flex>

    );
}

function LLMSegment({message = "Sample LLM response"}) {
    return (
        <Flex justify="flex-start" style={{width: "100%"}}>
            <div style={{
                maxWidth: "80%",
                display: "flex",
                alignItems: "flex-start",
                gap: "12px"
            }}>
                <Avatar
                    icon={<RobotOutlined/>}
                    style={{
                        backgroundColor: "#52c41a",
                        flexShrink: 0,
                        marginTop: "4px"
                    }}
                />
                <div>
                    <Card
                        size="small"
                        style={{
                            backgroundColor: "#f6f6f6",
                            border: "1px solid #e8e8e8",
                            borderRadius: "4px 18px 18px 18px",
                            boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                            marginBottom: "8px"
                        }}
                        bodyStyle={{
                            padding: "12px 16px"
                        }}
                    >
                        <div style={{
                            fontSize: "14px",
                            lineHeight: "1.6",
                            whiteSpace: "pre-wrap",
                            color: "#333"
                        }}>
                            {message}
                        </div>
                    </Card>

                    {/* Action buttons */}
                    <div style={{
                        display: "flex",
                        gap: "8px",
                        paddingLeft: "4px"
                    }}>
                        <Button
                            type="text"
                            size="small"
                            icon={<CopyOutlined/>}
                            style={{
                                color: "#8c8c8c",
                                fontSize: "12px",
                                height: "auto",
                                padding: "4px 8px"
                            }}
                        >
                            Copy
                        </Button>
                        <Button
                            type="text"
                            size="small"
                            icon={<DeleteOutlined/>}
                            style={{
                                color: "#ff4d4f",
                                fontSize: "12px",
                                height: "auto",
                                padding: "4px 8px"
                            }}
                        >
                            Delete
                        </Button>
                    </div>
                </div>
            </div>
        </Flex>
    );
}