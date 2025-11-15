import React from "react"
import {useTurtleTheme} from "@Turtle/Theme/useTurleTheme";
import DocIntTopBar from "@Turtle/DocInt/Dock/DocIntTopBar";
import {Splitter} from "antd";
import KnowledgeHierarchy from "@Turtle/Knowledge/KnowledgeHierarchy";
import {useParams} from "react-router-dom";
import KnowledgeEditView from "@Turtle/Knowledge/KnowledgeEditView";
import DomainsHierarchy from "@Turtle/Knowledge/DomainsHierarchy";
import {SplitterWithHeader} from "@Turtle/Antd/Splitter";


export default function KnowledgeDock() {


    const {bigPadding} = useTurtleTheme()
    const {knowledgeUid} = useParams()

    return (
        <SplitterWithHeader topbar={<DocIntTopBar/>}>
            <Splitter.Panel
                defaultSize="20%"
                style={{
                    backgroundColor: "white",
                    padding: bigPadding
                }}
            >
                <DomainsHierarchy/>
            </Splitter.Panel>


            <Splitter.Panel
                defaultSize="20%"
                style={{
                    backgroundColor: "white",
                    padding: bigPadding
                }}
            >
                <KnowledgeHierarchy/>
            </Splitter.Panel>

            <Splitter.Panel
                style={{
                    height: "95vh",

                }}
            >


                {
                    knowledgeUid && (
                        <KnowledgeEditView knUid={knowledgeUid}/>
                    )
                }
            </Splitter.Panel>

        </SplitterWithHeader>
    )


}