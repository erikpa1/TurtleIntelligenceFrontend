import React from 'react'
import {Splitter} from "antd"
import ActorsHierarchy from "@TurtleApp/Routes/Actors/ActorsHierarchy";

export default function ActorsDock() {
    return (
        <Splitter style={{
            height: "100vh",

        }}>

            <Splitter.Panel
                defaultSize={"20%"}
                style={{
                    backgroundColor: "white",
                    padding: "15px",
                }}
            >
                <ActorsHierarchy/>
            </Splitter.Panel>

            <Splitter.Panel>

            </Splitter.Panel>

        </Splitter>
    )
}