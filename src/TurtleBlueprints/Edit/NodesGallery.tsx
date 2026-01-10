import {Col, Divider, Flex, Row} from "antd"
import React from "react"
import {useTranslation} from "react-i18next"

import {GalleryButton} from "@Turtle/Components/GaleryButton"
import {useAgentNodesZus} from "@TurtleBlueprints/Edit/agentNodeZus"
import AgentNodeParent, {CanvasStatus} from "@TurtleBlueprints/Data/Nodes/AgentNodeParent";
import TurtleApp from "@TurtleApp/TurtleApp"
import ObjectIdApi from "@Turtle/Utils/ObjectIdApi"
import NodesFactory from "@TurtleBlueprints/Data/NodesFactory"
import NodesLibrary from "@TurtleBlueprints/Data/NodesLibrary"

interface AgentNodesLibraryProps {
    agentUid: string
    onBeforeSubmit: () => void
    position: { x: number; y: number }
}


export default function NodesGallery({
                                         agentUid,
                                         onBeforeSubmit,
                                         position
                                     }: AgentNodesLibraryProps) {

    const [t] = useTranslation()

    const {nodes, setNodes} = useAgentNodesZus()


    async function addNodePressed(nodeType: string) {
        TurtleApp.Lock()

        const tmp = new AgentNodeParent()
        tmp.uid = await ObjectIdApi.GetMongoId()
        tmp.name = nodeType
        tmp.type = nodeType
        tmp.parent = agentUid
        tmp.posX = position.x
        tmp.posY = position.y
        tmp.RandomizePosition()
        tmp.canvasStatus = CanvasStatus.CREATED
        tmp.typeData = NodesFactory.GetDataByType(nodeType, {})

        TurtleApp.Unlock()

        setNodes([...nodes, tmp])

        onBeforeSubmit?.()
    }

    return (
        <Flex
            vertical
            gap={5}
        >
            {
                NodesLibrary.ListCategorized().map((val) => {
                    return (
                        <React.Fragment key={val.name}>
                            <Divider titlePlacement={"start"}>
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


function _GalleryBtn({nodeType, addNodePressed}) {


    return (
        <Col
            span={4}
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
                    width: "30px",
                    height: "30px",
                }}
            />
        )
    } else {

        return React.createElement(icon, {
            width: "30px",
            height: "30px",
        })
    }

}