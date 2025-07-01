import React from "react"
import {useTurtleTheme} from "@Turtle/Theme/useTurleTheme";
import DocIntTopBar from "@Turtle/DocInt/Dock/DocIntTopBar";
import {Splitter} from "antd";
import KnowledgeHierarchy from "@Turtle/Knowledge/KnowledgeHierarchy";
import {useParams} from "react-router-dom";
import KnowledgeEditView from "@Turtle/Knowledge/KnowledgeEditView";


export default function KnowledgeDock() {


    const {bigPadding} = useTurtleTheme()
    const {knowledgeUid} = useParams()


    return (
        <div>

            <DocIntTopBar/>

            <Splitter style={{
                height: "100%",
                // backgroundColor: "#212124"
            }}>

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
                    defaultSize="80%"
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

            </Splitter>

        </div>
    )

}