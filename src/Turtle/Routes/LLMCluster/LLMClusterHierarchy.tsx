import React from "react"

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
import Model from "@TurtleApp/Data/Model"
import EntityForm from "@Turtle/Components/Forms/EntityForm"
import ModelProperties from "@TurtleApp/Data/Model_Properties"
import ModelsApi from "@TurtleApp/Api/ModelsApi"


export default function LLMClusterHierarchy() {

    const [t] = useTranslation()

    const {activate, deactivate} = useTurtleModal()

    const navigate = useNavigate()


    function createHierarchy(nnModels: Array<any>) {
        return [
            {
                key: "nnmodels",
                title: (
                    <Flex>
                        {t("nn.models")} ({nnModels.length})
                        <HierarchyRightFlex>
                            <HierarchyAddButton onClick={createModelPressed}/>
                        </HierarchyRightFlex>
                    </Flex>
                ),

                children: nnModels.map((val) => {
                    return {
                        key: val.uid,
                        title: (
                            <HierarchyFlex onClick={modelClicked}>

                                <HierarchyRightFlex>
                                    <HierarchyDeleteButton
                                        onClick={() => {

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

    function createModelPressed() {
        const tmp = new Model()

        activate({
            title: t("create.nnmodel"),
            content: (
                <EntityForm
                    entity={tmp}
                    properties={ModelProperties.Get()}
                    submitFunction={ModelsApi.COU}
                    onBeforeSubmit={deactivate}
                    onAfterSubmit={refresh}
                />
            )
        })
    }


    function modelClicked(nnModel: any) {

    }

    function deleteModel(nnModel: string) {

        refresh()
    }

    const [data, setData] = React.useState<Array<TreeDataNode>>(createHierarchy([]))

    async function refresh() {

    }

    React.useEffect(() => {
        refresh()
    }, [])


    return (
        <Tree
            key={data[0]?.children?.length}
            blockNode
            virtual
            showLine
            treeData={data}
            defaultExpandAll={true}
        />
    )
}