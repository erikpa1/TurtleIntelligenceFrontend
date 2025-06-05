import {useTranslation} from "react-i18next";
import {useTurtleModal} from "@Turtle/Hooks/useTurtleModal";
import {useNavigate} from "react-router-dom";
import {Flex, Tree, TreeDataNode} from "antd";
import {
    HierarchyAddButton,
    HierarchyDeleteButton,
    HierarchyFlex,
    HierarchyRightFlex
} from "@Turtle/Components/HierarchyComponents"

import React from "react"
import AIChatApi from "@Turtle/LLM/Api/AIChatApi";
import {ChatHistoryLight} from "@Turtle/LLM/Data/LLMChatHistory";
import AeeWrapper from "@Turtle/Data/AeeWrapper";
import aee from "@Turtle/Data/Aee";
import TurtleApp from "@TurtleApp/TurtleApp";


export default function LLMChatHierarchy() {


    const [t] = useTranslation()

    const {activate, deactivate} = useTurtleModal()

    const navigate = useNavigate()

    function createHierarchy(chatHistory: Array<ChatHistoryLight>) {
        return [
            {
                key: "chats",
                title: (
                    <Flex>
                        {t("chats")} ({chatHistory.length})

                        <HierarchyRightFlex>
                            <HierarchyAddButton
                                onClick={() => {
                                    navigate("/llm-chat/new")
                                }}
                            />
                        </HierarchyRightFlex>
                    </Flex>
                ),

                children: chatHistory.map((val) => {
                    return {
                        key: val.uid,
                        title: (
                            <HierarchyFlex onClick={() => {
                                navigate(`/llm-chat/${val.uid}`)
                            }}>

                                {val.name}

                                <HierarchyRightFlex>
                                    <HierarchyDeleteButton
                                        onClick={() => {
                                            deleteModel(val.uid)
                                        }}
                                    />
                                </HierarchyRightFlex>
                            </HierarchyFlex>
                        ),
                    }
                })
            }
        ]
    }


    function createChatTopicPressed() {

    }


    async function deleteModel(chatUid: string) {

        TurtleApp.Lock()
        await AIChatApi.DeleteChat(chatUid)
        TurtleApp.Unlock()

        refresh()
    }

    const [data, setData] = React.useState<Array<TreeDataNode>>(createHierarchy([]))

    async function refresh() {
        setData(createHierarchy(await AIChatApi.GetMyChatHistory()))

    }

    React.useEffect(() => {
        refresh()
    }, [])


    return (
        <AeeWrapper
            aee={aee}
            ChatsChange={refresh}
        >
            <Tree
                key={data[0]?.children?.length}
                blockNode
                virtual
                showLine
                treeData={data}
                defaultExpandAll={true}
            />
        </AeeWrapper>
    )
}