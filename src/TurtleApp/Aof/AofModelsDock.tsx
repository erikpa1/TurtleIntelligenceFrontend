import React from "react"
import {SplitterWithHeader} from "@Turtle/Antd/Splitter";
import {Splitter} from "antd";
import GenericHierarchy from "@Turtle/Components/GenericHierarchy";
import {useTurtleTheme} from "@Turtle/Theme/useTurleTheme";

export default function AofModelsDock() {


    const {bigPadding, theme} = useTurtleTheme()


    return (
        <SplitterWithHeader topbar={<div/>}>
            <Splitter.Panel
                defaultSize={"20%"}
                style={{
                    backgroundColor: "white",
                    padding: bigPadding,
                    height: theme.GetSplitterBigHeight(),

                }}
            >
                <GenericHierarchy
                    moduleName={"aof"}
                    listFunction={async () => []}
                    deleteFunction={async (_: string) => {
                    }}
                    createFunction={async (element) => {
                    }}
                    couComponent={_Cou}
                />
            </Splitter.Panel>

            <Splitter.Panel
                defaultSize={"80%"}
            >

            </Splitter.Panel>
        </SplitterWithHeader>
    )
}

function _Cou(props) {
    return <div>
        {props.children}
    </div>
}