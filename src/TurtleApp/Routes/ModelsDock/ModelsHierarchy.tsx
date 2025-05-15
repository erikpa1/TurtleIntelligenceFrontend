import {useTranslation} from "react-i18next";
import React from "react";
import {Flex, Tree, TreeDataNode} from "antd";
import aee from "@Turtle/Data/Aee";
import {
    HierarchyAddButton,
    HierarchyDeleteButton,
    HierarchyRightFlex,
    HierarchyViewButton
} from "@Turtle/Components/HierarchyComponents";
import {useTurtleModal} from "@Turtle/Hooks/useTurtleModal";
import ModelsApi from "@TurtleApp/Api/ModelsApi";
import {useNavigate} from "react-router-dom";
import TurtleApp from "@TurtleApp/TurtleApp";
import EntityForm from "@Turtle/Components/Forms/EntityForm";
import Model from "@TurtleApp/Data/Model";
import ModelProperties from "@TurtleApp/Data/Model_Properties";


export default function ModelsHierarchy({}) {
    const [t] = useTranslation()

    const {activate, deactivate} = useTurtleModal()

    const navigate = useNavigate()

    const modelsNode: TreeDataNode = React.useMemo(() => ({
        key: "models",
        title: (
            <Flex>
                {t("models")} (0)
                <HierarchyRightFlex>
                    <HierarchyAddButton onClick={createModelPressed}/>
                </HierarchyRightFlex>
            </Flex>
        )
    }), [])

    const [data, setData] = React.useState<Array<TreeDataNode>>([
        modelsNode
    ])


    function createModelPressed() {
        const tmp = new Model()

        activate({
            title: t("create.model"),
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

    async function deleteModel(uid: string) {
        TurtleApp.Lock()
        await ModelsApi.DeleteModel(uid)
        TurtleApp.Unlock()
    }

    async function refresh() {

        const models = await ModelsApi.ListModels()

        modelsNode.title = (
            <Flex>
                {t("models")} ({models.length})
                <HierarchyRightFlex>
                    <HierarchyAddButton onClick={createModelPressed}/>
                </HierarchyRightFlex>
            </Flex>
        )
        modelsNode.children = models.map((val) => {
            return {
                key: val.uid,
                title: (
                    <Flex
                        gap={10}
                        flex={1}
                    >
                        {val.name}

                        <HierarchyRightFlex>

                            <HierarchyViewButton onClick={() => {
                                navigate(`/model/${val.uid}`)
                            }}/>

                            <HierarchyDeleteButton onClick={() => {
                                deleteModel(val.uid)
                            }}/>
                        </HierarchyRightFlex>
                    </Flex>
                ),
            }
        })

        setData([
            modelsNode
        ])
    }


    React.useEffect(() => {
        refresh()
    }, [])

    return (
        <Tree
            treeData={data}
            defaultExpandAll={true}
        />
    )
}