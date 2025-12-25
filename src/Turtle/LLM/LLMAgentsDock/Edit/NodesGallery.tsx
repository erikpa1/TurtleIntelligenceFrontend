import {Col, Divider, Flex, Row} from "antd"
import React from "react"
import {useTranslation} from "react-i18next"

import {GalleryButton} from "@Turtle/Components/GaleryButton"
import {useAgentNodesZus} from "@Turtle/LLM/LLMAgentsDock/Edit/agentNodeZus"
import AgentNodeParent, {CanvasStatus} from "@Turtle/LLM/LLMAgentsDock/Data/Nodes/AgentNodeParent";
import TurtleApp from "@TurtleApp/TurtleApp"
import MongoObjectId from "@Turtle/Utils/MongoObjectId"
import NodesFactory from "@Turtle/LLM/LLMAgentsDock/Data/NodesFactory"
import NodesLibrary from "@Turtle/LLM/LLMAgentsDock/Data/NodesLibrary"

interface AgentNodesLibraryProps {
    agentUid: string
    onBeforeSubmit: () => void
}


export default function NodesGallery({agentUid, onBeforeSubmit}: AgentNodesLibraryProps) {

    const [t] = useTranslation()

    const {nodes, setNodes} = useAgentNodesZus()


    async function addNodePressed(nodeType: string) {
        TurtleApp.Lock()

        const tmp = new AgentNodeParent()
        tmp.uid = await MongoObjectId.GetMongoId()
        tmp.name = `${nodeType}`
        tmp.type = nodeType
        tmp.parent = agentUid
        tmp.RandomizePosition()
        tmp.canvasStatus = CanvasStatus.CREATED
        tmp.typeData = NodesFactory.GetDataByType(nodeType, {})

        TurtleApp.Unlock()

        setNodes([...nodes, tmp])

        onBeforeSubmit?.()
    }

    async function addMemory() {
    }

    return (
        <Flex vertical gap={15}>
            {
                NodesLibrary.ListCategorized().map((val) => {
                    return (
                        <React.Fragment key={val.name}>
                            <Divider orientation={"left"}>
                                {t(val.name)}
                            </Divider>

                            <Row>
                                {
                                    val.nodes.map((nodeType) => {
                                        return (
                                            <_GalleryBtn nodeType={nodeType} addNodePressed={addNodePressed}/>
                                        )
                                    })
                                }
                            </Row>
                        </React.Fragment>
                    )
                })
            }
        </Flex>
    )
}





function _GalleryBtn({nodeType, addNodePressed} ) {


    return (
        <Col
            span={6}
            key={nodeType}
        >
            <GalleryButton
                lang={nodeType}
                icon={(
                    <_GalleryIcon icon={NodesFactory.GetIcon(nodeType)}/>
                )}
                onClick={() => addNodePressed(nodeType)}
            />
        </Col>
    )
}

function _GalleryIcon({icon}) {

    if (typeof icon === 'string') {
        return (
            <img
                src={icon as ""}
                alt={"icon"}
                style={{
                    width: "50px",
                    height: "50px",
                }}
            />
        )
    } else {

        return React.createElement(icon, {
            width: "50px",
            height: "50px",
        })
    }

}