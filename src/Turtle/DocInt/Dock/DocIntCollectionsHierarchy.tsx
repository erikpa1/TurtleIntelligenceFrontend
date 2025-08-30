import React from "react"
import {useTranslation} from "react-i18next";
import {useTurtleModal} from "@Turtle/Hooks/useTurtleModal";
import {useNavigate} from "react-router-dom";
import {Flex, Tree, TreeDataNode} from "antd";
import {FileDocument} from "@Turtle/DocInt/Data/Document";
import {
    HierarchyAddButton, HierarchyChatButton, HierarchyDeleteButton,
    HierarchyEditButton,
    HierarchyFlex,
    HierarchyRightFlex
} from "@Turtle/Components/HierarchyComponents";
import CreateDocumentView, {EditDocumentView} from "@Turtle/DocInt/Dock/CreateDocumentView";
import AskInDocumentView from "@Turtle/DocInt/Components/AskInDocumentView";
import TurtleApp from "@TurtleApp/TurtleApp";
import DocumentsApi from "@Turtle/DocInt/Api/DocumentsApi";
import {DocumentsCollection} from "@Turtle/DocInt/Data/DocumentsCollection";
import DocColApi from "@Turtle/DocInt/Api/DocColApi";

export default function DockDocIntCollectionsHierarchy({}) {

    const [t] = useTranslation()

    const {activate, deactivate} = useTurtleModal()

    const navigate = useNavigate()

    const [data, setData] = React.useState<Array<TreeDataNode>>(createHierarchy([]))


    function createHierarchy(collections: Array<DocumentsCollection>) {

        return collections.map((val) => {
            return {
                key: val.uid,
                title: (
                    <HierarchyFlex>

                        {val.name}

                        <HierarchyRightFlex>

                            <HierarchyEditButton
                                onClick={() => {
                                    editCollection(val)
                                }}
                            />

                            <HierarchyDeleteButton
                                onClick={() => {
                                    deleteCollection(val.uid)
                                }}
                            />
                        </HierarchyRightFlex>
                    </HierarchyFlex>
                ),
            }
        })
    }


    function editCollection(col: DocumentsCollection) {
        activate({
            title: t("edit.document"),
            closable: true,
            content: (
                <div>

                </div>
            )
        })
    }

    async function deleteCollection(docCol: string) {
        TurtleApp.Lock()
        await DocColApi.Delete(docCol)
        TurtleApp.Unlock()
        refresh()
    }

    async function refresh() {
        setData(createHierarchy(await DocColApi.ListCollections()))
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