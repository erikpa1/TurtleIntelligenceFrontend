import React from "react"
import {useTurtleTheme} from "@Turtle/Theme/useTurleTheme";
import {Alert, Splitter} from "antd";
import KnowledgeHierarchy from "@Turtle/KnowledgeHub/KnowledgeHierarchy";
import {useParams} from "react-router-dom";
import KnowledgeEditView from "@Turtle/KnowledgeHub/KnowledgeEditView";

import {SplitterWithHeader} from "@Turtle/Antd/Splitter";
import DomainsHierarchy from "@Turtle/KnowledgeHub/Domains/DomainsHierarchy";
import KnowledgeTopBar from "@Turtle/KnowledgeHub/KnowledgeTopBar";


export default function KnowledgeDock() {


    const {bigPadding} = useTurtleTheme()
    const {domainUid, knowledgeUid} = useParams()

    return (
        <SplitterWithHeader topbar={<KnowledgeTopBar/>}>
            <Splitter.Panel
                defaultSize="20%"
                style={{
                    backgroundColor: "white",
                    padding: bigPadding
                }}
            >
                <DomainsHierarchy activeKey={domainUid}/>
            </Splitter.Panel>


            <Splitter.Panel
                defaultSize="20%"
                style={{
                    backgroundColor: "white",
                    padding: bigPadding
                }}
            >

                {
                    domainUid && (
                        <KnowledgeHierarchy domain={domainUid}/>
                    )
                }


            </Splitter.Panel>

            <Splitter.Panel>
                <Alert.ErrorBoundary>
                    {
                        knowledgeUid && (
                            <KnowledgeEditView knUid={knowledgeUid}/>
                        )
                    }
                </Alert.ErrorBoundary>
            </Splitter.Panel>

        </SplitterWithHeader>
    )


}