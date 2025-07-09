import {Splitter} from "antd";
import FlowEditor from "@Turtle/Flows/FlowEditor/FlowEditor";
import React from "react";
import FlowRightBar from "@Turtle/Flows/FlowEditor/FlowRightBar";

import {Flow} from "@Turtle/Flows/Flow";
import FlowsApi from "@Turtle/Flows/FlowsApi";
import {CenterSpinner} from "@Turtle/Components/Loadings";
import TurtleEmpty from "@Turtle/Components/TurtleEmpty";


export default function FlowEditorSplit(flowUid: string) {

    const [isLoading, setIsLoading] = React.useState(false)
    const [flow, setFlow] = React.useState<Flow | null>(null)

    async function refresh() {
        setIsLoading(true)
        const flow = await FlowsApi.Get(flowUid)
        setFlow(flow)
        setIsLoading(false)

    }

    React.useEffect(() => {
        refresh()
    }, [flowUid])


    if (isLoading) {
        return [
            (
                <Splitter.Panel
                    defaultSize="80%"
                    style={{
                        height: "95vh",

                    }}
                >
                    <CenterSpinner/>
                </Splitter.Panel>
            ),
            (
                <Splitter.Panel
                    key={flowUid}
                    defaultSize="20%"
                    style={{
                        backgroundColor: "white",

                    }}
                >
                </Splitter.Panel>
            )
        ]
    } else {

        if (flow) {
            return [

            ]
        } else {
            return [
                (
                    <Splitter.Panel
                        key={flowUid}
                        defaultSize="80%"
                        style={{
                            height: "95vh",

                        }}
                    >
                        <TurtleEmpty/>
                    </Splitter.Panel>
                ),
                (
                    <Splitter.Panel
                        key={flowUid}
                        defaultSize="20%"
                        style={{
                            backgroundColor: "white",

                        }}
                    >
                    </Splitter.Panel>
                )
            ]
        }

    }


}