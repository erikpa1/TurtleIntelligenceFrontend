import React from "react"
import TextArea from "antd/es/input/TextArea";
import {Button} from "antd";
import {PaperClipOutlined, SettingOutlined} from "@ant-design/icons";
import {useTranslation} from "react-i18next";


interface LLMChatInputProps {
    isBlocked: boolean
    onChat: (newChat: string) => void;
}

export default function LLMChatInput({isBlocked, onChat}: LLMChatInputProps) {

    const [t] = useTranslation()

    const inputRef = React.useRef<HTMLInputElement>()

    const [activeText, setActiveText] = React.useState("")

    function submitPressed() {
        onChat(activeText)

        const curr = inputRef.current

        if (curr) {
            curr.value = ""
            setActiveText("")
        }

    }

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
                    ref={inputRef as any}
                    placeholder="Type your message here..."
                    onChange={(e) => {
                        setActiveText(e.target.value)
                    }}
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

                    } as any}
                />
                <Button
                    type="primary"
                    size="large"
                    disabled={activeText === "" || isBlocked}
                    style={{
                        position: "absolute",
                        right: "10px",
                        bottom: "50px",
                        height: "36px",
                        borderRadius: "8px",
                        fontWeight: 500,
                        padding: "0 16px",
                        zIndex: 1
                    }}

                    onClick={submitPressed}
                >
                    {t("send")}
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
                        {t("add.file")}
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
                        {t("settings")}
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