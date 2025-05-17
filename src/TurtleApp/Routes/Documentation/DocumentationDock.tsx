import {Splitter} from "antd";
import React from "react";
import DocumentationHierarchy from "@TurtleApp/Routes/Documentation/DocumentationHierarchy";
import {useParams} from "react-router-dom";
import DocumentationView from "@TurtleApp/Routes/Documentation/DocumentationView";


export default function DocumentationDock() {

    const {topic, document} = useParams()


    return (
        <Splitter style={{
            height: "100vh"
        }}>

            <Splitter.Panel
                defaultSize={"20%"}
                style={{
                    backgroundColor: "white",
                    padding: "15px"
                }}
            >
                <DocumentationHierarchy/>
            </Splitter.Panel>

            <Splitter.Panel>

                {
                    (topic && document) && (
                        <DocumentationView topic={topic} document={document}/>
                    )
                }

            </Splitter.Panel>

        </Splitter>
    )
}