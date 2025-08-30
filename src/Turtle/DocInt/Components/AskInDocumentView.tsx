import React from "react"
import {FileDocument} from "@Turtle/DocInt/Data/Document";
import {Flex} from "antd";
import LLMChatInput from "@Turtle/LLM/LLMChatDock/LLMChatInput";

interface AskInDocumentViewProps {
    doc: FileDocument
}

export default function AskInDocumentView({doc}: AskInDocumentViewProps) {


    return (
        <Flex vertical>
            {doc.name}

            <LLMChatInput
                onChat={(chat) => {
                    console.log(chat)
                }}
                isBlocked={false}
            />


        </Flex>
    )
}