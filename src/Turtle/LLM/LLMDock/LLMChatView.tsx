//Source https://claude.ai/chat/4392e5b8-b4fb-4f7c-924b-d40024277678
//Update https://claude.ai/chat/539ba06f-9df6-428a-819a-c08a4d48a170
//update 1 https://claude.ai/chat/539ba06f-9df6-428a-819a-c08a4d48a170

import TopBarWrapper from "@Turtle/Components/TopBarWrapper";
import {Flex, Select, Button, Avatar, Card, Skeleton} from "antd";
import {UserOutlined, RobotOutlined, EditOutlined, DeleteOutlined, CopyOutlined} from '@ant-design/icons';

import React from "react";

import {useNavigate} from "react-router-dom";
import AIChatApi from "@Turtle/LLM/Api/AIChatApi";
import LLMChatContext from "@Turtle/LLM/Data/LLMChatContext";
import LLMChatInput from "@Turtle/LLM/LLMDock/LLMChatInput";
import aee from "@Turtle/Data/Aee";
import {ConversationSegment} from "@Turtle/LLM/Data/ChatHistory";
import {useTranslation} from "react-i18next";
import LLMSegmentChatButtle from "@Turtle/LLM/LLMDock/LLMSegmentChatButtle";

interface LLMChatViewProps {
    chatUid: string
}


export default function LLMChatView({chatUid}) {

    const navigate = useNavigate()

    const [isLoading, setIsLoading] = React.useState(false)

    const [isAnswerLoading, setIsAnswerLoading] = React.useState(false)


    const context = React.useMemo(() => new LLMChatContext(), [])

    const [isProcessing, setIsProcessing] = React.useState(false)

    const [chatHistory, setChatHistory] = React.useState<Array<ConversationSegment>>([])


    async function onChatResponse(chatText: string) {
        setIsProcessing(true)

        if (chatUid === "new") {
            const chatUid = await AIChatApi.CreateNewChat(chatText)
            navigate(`/llm-chat/${chatUid}`)

            setIsAnswerLoading(true)
            await AIChatApi.Ask(chatUid, chatText)
            setIsAnswerLoading(false)
            aee.emit("ChatsChange", null)
            refresh()
        } else {
            setIsAnswerLoading(true)
            await AIChatApi.Ask(chatUid, chatText)
            setIsAnswerLoading(false)
            refresh()
        }

        setIsProcessing(false)
    }

    async function refresh() {
        if (chatUid === "new") {
            setChatHistory([])
            setIsLoading(false)
            setIsAnswerLoading(false)
        } else {
            setIsLoading(true)
            const history = await AIChatApi.GetChat(chatUid)
            setChatHistory(history.conversation)
            setIsLoading(false)
        }
    }

    React.useEffect(() => {
        refresh()
        setIsProcessing(false)
    }, [chatUid])


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

                {
                    isLoading ? (
                        <div style={{
                            padding: "15px"
                        }}>
                            <Skeleton
                                style={{height: "100%", width: "100%"}}/>
                            <Skeleton
                                style={{height: "100%", width: "100%"}}/>
                        </div>
                    ) : <React.Fragment>
                        {
                            chatHistory.length > 0 && (
                                <QuestionsAnswerHistory
                                    chatHistory={chatHistory}
                                />
                            )
                        }

                        {
                            isAnswerLoading && (
                                <Skeleton
                                    style={{height: "100%", width: "100%"}}/>
                            )
                        }
                    </React.Fragment>
                }
            </div>

            <LLMChatInput
                onChat={onChatResponse}
                isBlocked={isProcessing}
            />

        </Flex>
    );
}

interface QuestionsAnswerHistoryProps {
    chatHistory: Array<ConversationSegment>
}

function QuestionsAnswerHistory({chatHistory}: QuestionsAnswerHistoryProps) {

    return (
        <div style={{
            padding: "20px 30px",
            height: "100%",
            overflowY: "auto",

        }}>
            <Flex gap={16} vertical>

                {
                    chatHistory.map((val, index) => {

                        if (index % 2 == 0) {
                            return (
                                <UserSegment
                                    key={index}
                                    message={val.text}
                                />
                            )
                        } else {
                            return (
                                <LLMSegmentChatButtle
                                    key={index}
                                    segment={val}
                                />
                            )
                        }


                    })
                }

            </Flex>
        </div>
    );
}

function UserSegment({message}) {
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
                            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                        }}

                        styles={{
                            body: {
                                padding: "12px 16px",
                                color: "white"
                            }
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
