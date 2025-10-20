import React from "react"
import {SplitterWithHeader} from "@Turtle/Antd/Splitter";
import {Splitter} from "antd";
import GenericHierarchy from "@Turtle/Components/GenericHierarchy";

export default function AofModelsDock() {
    return (
        <SplitterWithHeader topbar={<div/>}>
            <Splitter.Panel>
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

            <Splitter.Panel>

            </Splitter.Panel>
        </SplitterWithHeader>
    )
}

function _Cou(props) {
    return <div>
        {props.children}
    </div>
}