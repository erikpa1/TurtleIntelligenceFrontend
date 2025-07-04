import React from "react"
import {useTranslation} from "react-i18next"
import {useTurtleModal} from "@Turtle/Hooks/useTurtleModal"
import {useNavigate} from "react-router-dom"
import {Flex, Tree, TreeDataNode} from "antd"
import {FileDocument} from "@Turtle/DocInt/Data/Document"
import {
    HierarchyAddButton, HierarchyChatButton, HierarchyDeleteButton,
    HierarchyEditButton,
    HierarchyFlex,
    HierarchyRightFlex
} from "@Turtle/Components/HierarchyComponents"
import CreateDocumentView, {EditDocumentView} from "@Turtle/DocInt/Dock/CreateDocumentView"
import AskInDocumentView from "@Turtle/DocInt/Dock/AskInDocumentView"
import TurtleApp from "@TurtleApp/TurtleApp"
import DocumentsApi from "@Turtle/DocInt/Api/DocumentsApi"
import AgentIncident from "@Turtle/AgentIncidents/AgentIncident";


export default function AgentIncidentsHierarchy(props: any) {

    const [t] = useTranslation()

    const {activate, deactivate} = useTurtleModal()

    const navigate = useNavigate()

    const [data, setData] = React.useState<Array<TreeDataNode>>(createHierarchy([]))


    function createHierarchy(incidents: Array<AgentIncident>) {


        return [
            {
                key: "incidents",
                title: (
                    <Flex>
                        {t("incidents")} ({incidents.length})

                        <HierarchyRightFlex>
                            <HierarchyAddButton
                                onClick={createDocument}
                            />
                        </HierarchyRightFlex>
                    </Flex>
                ),

                children: incidents.map((val) => {
                    return {
                        key: val.uid,
                        title: (
                            <HierarchyFlex onClick={() => {
                                navigate(`/doc-int/${val.uid}`)
                            }}>

                                {val.name}

                                <HierarchyRightFlex>

                                    <HierarchyEditButton
                                        onClick={() => {
                                            editDocument(val)
                                        }}
                                    />

                                    <HierarchyChatButton
                                        onClick={() => {
                                            askInDocument(val)
                                        }}
                                    />

                                    <HierarchyDeleteButton
                                        onClick={() => {
                                            deleteDocument(val.uid)
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

    function createDocument() {
        activate({
            title: t("create.document"),
            closable: true,
            content: (
                <CreateDocumentView
                    beforeUpdate={deactivate}
                    afterUpdate={refresh}
                />
            )
        })
    }

    function editDocument(doc: FileDocument) {
        activate({
            title: t("edit.document"),
            closable: true,
            content: (
                <EditDocumentView
                    doc={doc}
                    beforeUpdate={deactivate}
                    afterUpdate={refresh}
                />
            )
        })
    }

    function askInDocument(doc: FileDocument) {
        activate({
            title: t("ask.in.document"),
            closable: true,
            content: (
                <AskInDocumentView
                    doc={doc}
                />
            )
        })
    }


    async function deleteDocument(documentUid: string) {
        TurtleApp.Lock()
        await DocumentsApi.Delete(documentUid)
        TurtleApp.Unlock()
        refresh()
    }

    async function refresh() {
        setData(createHierarchy(await DocumentsApi.ListDocuments()))
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