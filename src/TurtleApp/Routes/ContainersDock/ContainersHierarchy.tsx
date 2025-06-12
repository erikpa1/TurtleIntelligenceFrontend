import React from "react"
import {Flex, Tree, TreeDataNode} from "antd";
import {ContainersApi} from "@TurtleApp/Api/ContainersApi";
import {useTranslation} from "react-i18next";
import {HierarchyAddButton} from "@Turtle/Components/HierarchyComponents";
import {useTurtleModal} from "@Turtle/Hooks/useTurtleModal";
import {HierarchyRightFlex} from "@Turtle/Components/HierarchyComponents";
import CreateContainerView from "@TurtleApp/Routes/ContainersDock/CreateContainerView";


export default function ContainersHierarchy({}) {

    const [t] = useTranslation()
    const [data, setData] = React.useState<Array<TreeDataNode>>([])

    const {activate, deactivate} = useTurtleModal()

    function createContainerPressed() {
        activate({
            title: "create.container",
            content: (
                <CreateContainerView
                    onCreated={refresh}
                />
            )
        })
    }

    async function refresh() {

        const containers = await ContainersApi.ListContainers()

        setData(
            [
                {
                    key: "containers",
                    title: (
                        <Flex align={"end"}>
                            {t("containers")}

                            <HierarchyRightFlex>
                                <HierarchyAddButton onClick={createContainerPressed}/>
                            </HierarchyRightFlex>
                        </Flex>
                    ),
                    children: containers.map((val) => {
                        return {
                            key: val.key,
                            title: val.name,
                        }
                    })
                }
            ]
        )


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