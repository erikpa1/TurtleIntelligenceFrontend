import React from 'react'
import {Splitter} from "antd"
import ActorsHierarchy from "@TurtleApp/Routes/Actors/ActorsHierarchy";
import { SplitterWithHeader } from '@Turtle/Antd/Splitter';

export default function ActorsDock() {
    return (
        <SplitterWithHeader topbar={<></>}>

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

        </SplitterWithHeader>
    )
}
