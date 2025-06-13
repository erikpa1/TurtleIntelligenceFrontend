import {useTranslation} from "react-i18next";
import {useTurtleModal} from "@Turtle/Hooks/useTurtleModal";
import {useNavigate} from "react-router-dom";
import {Flex, Tree, TreeDataNode} from "antd";
import {
    HierarchyAddButton,
    HierarchyDeleteButton,
    HierarchyFlex, HierarchyInfoButton,
    HierarchyRightFlex
} from "@Turtle/Components/HierarchyComponents"

import React from "react"
import AIChatApi from "@Turtle/LLM/Api/AIChatApi";
import {ChatHistoryLight} from "@Turtle/LLM/Data/LLMChatHistory";
import AeeWrapper from "@Turtle/Data/AeeWrapper";
import aee from "@Turtle/Data/Aee";
import TurtleApp from "@TurtleApp/TurtleApp";
import LLMApi from "@Turtle/LLM/Api/LLMApi";
import LLMModel from "@Turtle/LLM/Data/LLMModel";
import LLMCluster from "@Turtle/LLM/Data/LLMCluster";
import CreateLLMClusterModal from "@Turtle/LLM/LLMCluster/CreateLLMClusterModal";
import RegisterLLLMModel from "@Turtle/LLM/LLMsDock/RegisterLLMModel";
import LLModelsInfoView from "@Turtle/LLM/LLMsDock/LLModelsInfoView";


export default function LLMsHierarchy() {


    const [t] = useTranslation()

    const {activate, deactivate} = useTurtleModal()

    const navigate = useNavigate()

    function createHierarchy(models: Array<LLMModel>) {
        return [
            {
                key: "models",
                title: (
                    <Flex>
                        {t("llm.models")} ({models.length})

                        <HierarchyRightFlex>
                            <HierarchyInfoButton
                                onClick={showModels}
                            />
                            <HierarchyAddButton
                                onClick={createClusterPressed}
                            />
                        </HierarchyRightFlex>
                    </Flex>
                ),

                children: models.map((val) => {
                    return {
                        key: val.uid,
                        title: (
                            <HierarchyFlex>

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

    function showModels() {
        activate({
            title: t("models"),
            width: 800,
            content: (
                <div style={{
                    padding: "15px"
                }}>
                    <LLModelsInfoView/>
                </div>
            )
        })
    }

    function createClusterPressed() {
        const tmp = new LLMModel()

        activate({
            title: t("register.llmmodel"),
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