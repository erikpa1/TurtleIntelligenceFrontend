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

export default function LLMChatView({}) {


    const context = React.useMemo(() => new LLMChatContext(), [])


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

            <AskWindow/>
        </Flex>
    );
}

function AskWindow({}) {
    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            alignItems: "center",
            padding: "20px 30px 30px 30px",
            borderTop: "1px solid #f0f0f0",
        }}>
            <div style={{
                width: "100%",
                maxWidth: 800,
                position: "relative"
            }}>
                <TextArea
                    placeholder="Type your message here..."
                    autoSize={{
                        minRows: 4,
                        maxRows: 6
                    }}
                    style={{
                        width: "100%",
                        borderRadius: "12px",
                        fontSize: "14px",
                        resize: "none",
                        paddingRight: "80px", // Add space for the button
                        // Custom scrollbar styles
                        scrollbarWidth: "thin",
                        scrollbarColor: "#d9d9d9 transparent",
                        // Webkit scrollbar styles
                        "&::-webkit-scrollbar": {
                            width: "6px"
                        },
                        "&::-webkit-scrollbar-track": {
                            background: "transparent"
                        },
                        "&::-webkit-scrollbar-thumb": {
                            background: "#d9d9d9",
                            borderRadius: "3px"
                        },
                        "&::-webkit-scrollbar-thumb:hover": {
                            background: "#bfbfbf"
                        }
                    } as any}
                />
                <Button
                    type="primary"
                    size="large"
                    style={{
                        position: "absolute",
                        right: "30px",
                        bottom: "50px",
                        height: "36px",
                        borderRadius: "8px",
                        fontWeight: 500,
                        padding: "0 16px",
                        zIndex: 1
                    }}
                >
                    Send
                </Button>

                {/* Icon buttons below textarea */}
                <div style={{
                    display: "flex",
                    gap: "8px",
                    marginTop: "8px",
                    justifyContent: "flex-start"
                }}>
                    <Button
                        type="text"
                        size="small"
                        icon={<PaperClipOutlined/>}
                        style={{
                            color: "#8c8c8c",
                            fontSize: "14px",
                            height: "32px",
                            padding: "0 8px",
                            display: "flex",
                            alignItems: "center",
                            borderRadius: "6px"
                        }}
                        onClick={() => {
                            // Handle file upload
                            console.log('Add file clicked');
                        }}
                    >
                        Add file
                    </Button>
                    <Button
                        type="text"
                        size="small"
                        icon={<SettingOutlined/>}
                        style={{
                            color: "#8c8c8c",
                            fontSize: "14px",
                            height: "32px",
                            padding: "0 8px",
                            display: "flex",
                            alignItems: "center",
                            borderRadius: "6px"
                        }}
                        onClick={() => {
                            // Handle settings
                            console.log('Settings clicked');
                        }}
                    >
                        Settings
                    </Button>
                </div>

                {/* Custom scrollbar styles as CSS */}
                <style>{`
                    .ant-input::-webkit-scrollbar {
                        width: 6px;
                    }

                    .ant-input::-webkit-scrollbar-track {
                        background: transparent;
                    }

                    .ant-input::-webkit-scrollbar-thumb {
                        background: #d9d9d9;
                        border-radius: 3px;
                    }

                    .ant-input::-webkit-scrollbar-thumb:hover {
                        background: #bfbfbf;
                    }
                `}</style>
            </div>
        </div>
    )
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
                    </div>
                </div>
            </div>
        </Flex>
    );
}