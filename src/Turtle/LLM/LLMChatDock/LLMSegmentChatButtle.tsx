import React from "react"
import {ConversationSegment} from "@Turtle/LLM/Data/LLMChatHistory";
import {useTranslation} from "react-i18next";
import {Avatar, Button, Card, Flex} from "antd";
import {CopyOutlined, DeleteOutlined, RobotOutlined} from "@ant-design/icons";
import ErrorBoundary from "@Turtle/Components/ErrorBoundary";

interface LLMSegmentProps {
    segment: ConversationSegment
}


export default function LLMSegmentChatButtle({segment}: LLMSegmentProps) {

    const [t] = useTranslation()

    console.log(segment.smartTexts)

    return (
        <Flex justify="flex-start" style={{width: "100%"}}>
            <div style={{
                maxWidth: "80%",
                display: "flex",
                alignItems: "flex-start",
                gap: "12px",

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
                            backgroundColor: "white",
                            border: "1px solid #e8e8e8",
                            borderRadius: "4px 18px 18px 18px",
                            boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                            marginBottom: "8px"
                        }}
                        styles={{
                            body: {
                                padding: "12px 16px"
                            }
                        }}
                    >
                        <_DispatcherView segment={segment}/>
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
                            {t("copy")}
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
                            {t("delete")}
                        </Button>
                    </div>
                </div>
            </div>
        </Flex>
    );
}

function _DispatcherView({segment}: LLMSegmentProps) {
    return (
        <ErrorBoundary onError={<_EmergencyView text={segment.text}/>}>
            <_SmartTextsView segment={segment}/>
        </ErrorBoundary>
    )
}


function _SmartTextsView({segment}: LLMSegmentProps) {
    return (
        <Flex vertical>

            {
                segment.smartTexts.map((item, index) => {

                    if (item.type === "text") {
                        return (

                            <ErrorBoundary
                                key={index}
                                onError={<_EmergencyView text={segment.text}/>}>
                                <_HtmlPrettyView
                                    text={item.text}

                                />
                            </ErrorBoundary>

                        )
                    } else if (item.type === "html") {
                        return (
                            <_HtmlView
                                text={item.text}
                                key={index}
                            />
                        )
                    } else {
                        return (
                            <ErrorBoundary onError={<_EmergencyView text={segment.text}/>}>
                                <_HtmlPrettyView
                                    text={item.text}
                                    key={index}
                                />
                            </ErrorBoundary>
                        )
                    }


                })
            }


        </Flex>
    )
}

function _HtmlPrettyView({text}) {

    const converted = text
        // Convert **bold** to <b>bold</b>
        .replace(/\*\*(.*?)\*\*/g, '<b>$1</b>')
        // Convert *italic* to <i>italic</i> (optional)
        .replace(/\*(.*?)\*/g, '<i>$1</i>')
        // Convert `code` to <code>code</code> (optional)
        .replace(/`(.*?)`/g, '<code>$1</code>')
        // Replace [text](url) with <a href="url">text</a>
        .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank">$1</a>');

    return (
        <div style={{
            fontSize: "14px",
            lineHeight: "1.6",
            whiteSpace: "pre-wrap",
            color: "#333"
        }}>
            <div
                dangerouslySetInnerHTML={{__html: converted}}
            />
        </div>
    )
}


function _EmergencyView({text}) {
    return (
        <div style={{
            fontSize: "14px",
            lineHeight: "1.6",
            whiteSpace: "pre-wrap",
            color: "#333"
        }}>
            {text}
        </div>
    )
}


function _HtmlView({text}) {
    return (
        <div
            dangerouslySetInnerHTML={{__html: text}}
        />
    )
}