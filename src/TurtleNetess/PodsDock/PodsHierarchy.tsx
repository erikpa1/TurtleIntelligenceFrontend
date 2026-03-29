import React from "react"
import {useTranslation} from "react-i18next";
import {useTurtleModal} from "@Turtle/Hooks/useTurtleModal";
import {Flex, Tree, TreeDataNode} from "antd";
import {
    HierarchyAddButton,
    HierarchyDeleteButton,
    HierarchyEditButton,
    HierarchyRightFlex
} from "@Turtle/Components/HierarchyComponents";
import TurtleApp from "@TurtleApp/TurtleApp";
import NetessPod from "@TurtleNetess/Data/NetessPod";
import NetessApi from "@TurtleNetess/Api/NetessApi";
import COUPod from "@TurtleNetess/PodsDock/COUPod";


export default function PodsHierarchy() {

    const [t] = useTranslation()

    const [key, setKey] = React.useState("")
    const {activate, deactivate} = useTurtleModal()
    const [data, setData] = React.useState<TreeDataNode[]>(createHierarchy([]))

    function createHierarchy(entities: NetessPod[]): TreeDataNode[] {
        return [
            {
                key: `pods`,
                title: (
                    <Flex gap={15}>

                        <div>{t("pods")} ({entities.length})</div>

                        <HierarchyRightFlex>
                            <HierarchyAddButton
                                onClick={createEntity}
                            />
                        </HierarchyRightFlex>
                    </Flex>
                ),

                children: entities.map((val: any) => {
                    return {
                        key: val.name,
                        title: (
                            <Flex>
                                {val.name}

                                <HierarchyRightFlex>

                                    <HierarchyEditButton
                                        onClick={() => {
                                            editEntity(val)
                                        }}
                                    />

                                    <HierarchyDeleteButton onClick={() => {
                                        deleteEntity(val.uid)
                                    }}/>
                                </HierarchyRightFlex>
                            </Flex>
                        ),

                    }
                })
            }
        ]
    }


    async function deleteEntity(subjectUid: string) {
        TurtleApp.Lock()
        await NetessApi.DeletePod(subjectUid)
        TurtleApp.Unlock()
        refresh()
    }

    function editEntity(entity: NetessPod) {

        activate({
            title: t("edit.pod"),
            content: (
                <COUPod
                    entity={entity}
                    onBeforeUpdate={deactivate}
                    onAfterUpdate={refresh}
                />
            )
        })
    }

    function createEntity() {

        const entity = new NetessPod()
        entity.name = "Pod"

        activate({
            title: t(`create.pod`),
            content: (
                <COUPod
                    entity={entity}
                    onBeforeUpdate={deactivate}
                    onAfterUpdate={refresh}
                />
            )
        })

    }

    async function refresh() {

        const data = await NetessApi.ListPods()
        setData(createHierarchy(data))
        setKey(crypto.randomUUID())
    }

    React.useEffect(() => {
        refresh()
    }, [])


    return (
        <Tree
            key={key}
            blockNode
            virtual
            showLine
            treeData={data}
            defaultExpandAll={true}
        />
    )
}