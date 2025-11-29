import {useTranslation} from "react-i18next";
import React from "react";
import {useTurtleModal} from "@Turtle/Hooks/useTurtleModal";
import {Flex, Tree, TreeDataNode} from "antd";
import {
    HierarchyAddButton,
    HierarchyDeleteButton,
    HierarchyEditButton,
    HierarchyRightFlex
} from "@Turtle/Components/HierarchyComponents";
import TurtleApp from "@TurtleApp/TurtleApp";

interface DynamicHierarchyProps {
    api: any
    cou: any
}

export default function DynamicHierarchy<T extends any>({
                                                            api,
                                                            cou
                                                        }: DynamicHierarchyProps) {


    const [t] = useTranslation()

    const [key, setKey] = React.useState("")
    const {activate, deactivate} = useTurtleModal()
    const [data, setData] = React.useState<TreeDataNode[]>(createHierarchy([]))

    function createHierarchy(entities: T[]): TreeDataNode[] {
        return [
            {
                key: `${api.bucket}s`,
                title: (
                    <Flex gap={15}>

                        <div>{t(`${api.bucket}s`)} ({entities.length})</div>

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
        await api.Delete(subjectUid)
        TurtleApp.Unlock()
    }

    function editEntity(entity: T) {

        const tmp = React.createElement(cou, {
            entity: entity,
            onBeforeUpdate: deactivate,
            onAfterUpdate: refresh,
        })

        activate({
            title: `${t("edit.business.subject")}:`,
            content: (tmp)
        })
    }

    function createEntity() {
        const entity = new api.TConstructor()
        entity.name = api.bucket

        const tmp = React.createElement(cou, {
            entity: entity,
            onBeforeUpdate: deactivate,
            onAfterUpdate: refresh,
        })

        activate({
            title: `${t("create.business.subject")}:`,
            content: (tmp)
        })

    }

    async function refresh() {

        const data = await api.List()
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