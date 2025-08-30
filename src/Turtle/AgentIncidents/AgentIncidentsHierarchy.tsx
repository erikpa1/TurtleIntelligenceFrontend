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
import CreateDocumentView from "@Turtle/DocInt/Dock/CreateDocumentView"
import TurtleApp from "@TurtleApp/TurtleApp"
import AgentIncident from "@Turtle/AgentIncidents/AgentIncident";
import AgentIncidentsApi from "@Turtle/AgentIncidents/AgentIncidentsApi";


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
                    </Flex>
                ),

                children: incidents.map((val) => {
                    return {
                        key: val.uid,
                        title: (
                            <HierarchyFlex onClick={() => {
                                navigate(`/agents-incidents/${val.uid}`)
                            }}>

                                {val.at}

                                <HierarchyRightFlex>

                                    <HierarchyEditButton
                                        onClick={() => {
                                            editIncident(val)
                                        }}
                                    />

                                    <HierarchyDeleteButton
                                        onClick={() => {
                                            deleteIncindent(val.uid)
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

    function editIncident(inc: AgentIncident) {
        activate({
            title: t("edit.incident"),
            closable: true,
            content: (
                <div>
                    TODO
                </div>
            )
        })
    }


    async function deleteIncindent(incUid: string) {
        TurtleApp.Lock()
        await AgentIncidentsApi.Delete(incUid)
        TurtleApp.Unlock()
        refresh()
    }

    async function refresh() {
        setData(createHierarchy(await AgentIncidentsApi.List()))
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