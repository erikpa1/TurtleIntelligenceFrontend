import {Flex, Tree, TreeDataNode} from "antd";
import React from "react";
import {
    HierarchyFlex,
    HierarchyDeleteButton,
    HierarchyRightFlex,
    HierarchyAddButton
} from "@Turtle/Components/HierarchyComponents";
import {useTranslation} from "react-i18next";
import {useTurtleModal} from "@Turtle/Hooks/useTurtleModal";
import {useNavigate} from "react-router-dom";

import SimModelsApi from "@TurtleApp/Api/SimModelsApi";
import CreateNNView from "@TurtleApp/Routes/NN/CreateNNView";
import {NeuralNetwork} from "@TurtleApp/Data/NN";
import TurtleApp from "@TurtleApp/TurtleApp";

export default function NNHierarchy() {

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
        const tmp = new NeuralNetwork()

        activate({
            title: `${t("create.nnmodel")}:`,
            content: (
                <CreateNNView
                    nn={tmp}
                    onBeforeSubmit={deactivate}
                    onAfterSubmit={refresh}
                />
            )
        })
    }


    function modelClicked(nnModel: any) {

    }

    async function deleteModel(nnModel: string) {
        TurtleApp.Lock()
        await SimModelsApi.DeleteModel(nnModel)
        TurtleApp.Unlock()
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