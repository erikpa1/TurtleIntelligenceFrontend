import {SplitterWithHeader} from "@Turtle/Antd/Splitter";
import {Splitter} from "antd";
import {useTurtleTheme} from "@Turtle/Theme/useTurleTheme";
import {useParams} from "react-router-dom";

import React from "react";
import UsersHierarchy from "@Turtle/Users/UsersHierarchy";

export  default function UsersDock(){


    const {userUid} = useParams()

    const {bigPadding} = useTurtleTheme()

    return (
        <SplitterWithHeader topbar={<div/>}>
            <Splitter.Panel
                defaultSize="20%"
                style={{
                    backgroundColor: "white",
                    padding: bigPadding
                }}
            >
                <UsersHierarchy/>
            </Splitter.Panel>

            <Splitter.Panel
                style={{
                    padding: bigPadding
                }}
            >

            </Splitter.Panel>
        </SplitterWithHeader>
    )
}