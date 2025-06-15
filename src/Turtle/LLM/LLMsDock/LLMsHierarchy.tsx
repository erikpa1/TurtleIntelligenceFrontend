import {useTranslation} from "react-i18next";
import {useTurtleModal} from "@Turtle/Hooks/useTurtleModal";
import {useNavigate} from "react-router-dom";
import {Flex, Tree, TreeDataNode} from "antd";
import {
    HierarchyAddButton, HierarchyChatButton,
    HierarchyDeleteButton, HierarchyEditButton,
    HierarchyFlex, HierarchyInfoButton, HierarchyPlayButton,
    HierarchyRightFlex
} from "@Turtle/Components/HierarchyComponents"

import React from "react"
import AIChatApi from "@Turtle/LLM/Api/AIChatApi";
import {ChatHistoryLight} from "@Turtle/LLM/Data/LLMChatHistory";
import AeeWrapper from "@Turtle/Data/AeeWrapper";
import aee from "@Turtle/Data/Aee";
import TurtleApp from "@TurtleApp/TurtleApp";
import LLMApi from "@Turtle/LLM/Api/LLMApi";
import LLM from "@Turtle/LLM/Data/LLM";
import LLMCluster from "@Turtle/LLM/Data/LLMCluster";
import CreateLLMClusterModal from "@Turtle/LLM/LLMCluster/CreateLLMClusterModal";
import RegisterLLLMModel from "@Turtle/LLM/LLMsDock/RegisterLLMModel";
import LLModelsInfoView, {ModelsInfoButton} from "@Turtle/LLM/LLMsDock/LLModelsInfoView";
import LLMSingleChat from "@Turtle/LLM/LLMsDock/LLMSingleChat";


export default function LLMsHierarchy() {


    const [t] = useTranslation()

    const {activate, deactivate} = useTurtleModal()

    const navigate = useNavigate()

    function createHierarchy(models: Array<LLM>) {
        return [
            {
                key: "models",
                title: (
                    <Flex>
                        {t("llm.models")} ({models.length})

                        <HierarchyRightFlex>
                            <ModelsInfoButton/>
                            <HierarchyAddButton
                                onClick={createModelPressed}
                            />
                        </HierarchyRightFlex>
                    </Flex>
                ),

                children: models.map((val) => {
                    return {
                        key: val.uid,
                        title: (
                            <HierarchyFlex
                                onClick={() => {
                                    modelClicked(val)
                                }}
                            >

                                {val.name}

                                <HierarchyRightFlex>
                                    <HierarchyChatButton
                                        onClick={() => {
                                            chatModelPressed(val)
                                        }}
                                    />
                                    <HierarchyEditButton
                                        onClick={() => {
                                            editModelPressed(val)
                                        }}
                                    />

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

    function modelClicked(model: LLM) {
        navigate(`/llms/${model.uid}`)
    }

    function chatModelPressed(model: LLM) {

        activate({
            title: t("chat"),
            content: (
                <LLMSingleChat
                    modelUid={model.uid}
                />
            )
        })
    }

    function editModelPressed(model: LLM) {
        activate({
            title: t("edit.llmodel"),
            content: (
                <RegisterLLLMModel
                    llmModel={model}
                    beforeSubmit={deactivate}
                    afterSubmit={refresh}
                />
            )
        })
    }

    function createModelPressed() {

        const tmp = new LLM()

        activate({
            title: t("register.llmodel"),
            content: (
                <RegisterLLLMModel
                    llmModel={tmp}
                    beforeSubmit={deactivate}
                    afterSubmit={refresh}
                />
            )
        })
    }


    async function deleteModel(modelUid: string) {
        TurtleApp.Lock()
        await LLMApi.DeleteModel(modelUid)
        TurtleApp.Unlock()

        refresh()
    }

    const [data, setData] = React.useState<Array<TreeDataNode>>(createHierarchy([]))

    async function refresh() {
        setData(createHierarchy(await LLMApi.ListLLMS()))

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