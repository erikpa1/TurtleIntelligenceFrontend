import React from "react"
import {useTurtleTheme} from "@Turtle/Theme/useTurleTheme"

import {Splitter} from "antd"
import FlowsTopBar from "@Turtle/Flows/FlowsTopBar"
import FlowsHierarchy from "@Turtle/Flows/FlowsHierarchy"
import FlowEditor from "@Turtle/Flows/FlowEditor/FlowEditor"
import {useParams} from "react-router-dom"
import {Flow} from "@Turtle/Flows/Flow"
import FlowsApi from "@Turtle/Flows/FlowsApi"
import FlowRightBar from "@Turtle/Flows/FlowEditor/FlowRightBar"
import {CenterSpinner} from "@Turtle/Components/Loadings"


export default function FlowsDock({}: any) {

    const {bigPadding} = useTurtleTheme()

    const {flowUid} = useParams()

    const [isLoading, setIsLoading] = React.useState(false)
    const [flow, setFlow] = React.useState<Flow | null>(null)


    async function refresh() {
        if (flowUid) {
            setIsLoading(true)
            const flow = await FlowsApi.Get(flowUid)
            setFlow(flow)
            setIsLoading(false)
        } else {
            setFlow(null)
        }
    }

    React.useEffect(() => {
        refresh()
    }, [flowUid])


    return (
        <div>

            <FlowsTopBar flow={flow}/>

            <Splitter style={{
                height: "100%",
                // backgroundColor: "#212124"
            }}>

                <Splitter.Panel
                    defaultSize="20%"
                    style={{
                        height: "95vh",
                        backgroundColor: "white",
                        padding: bigPadding
                    }}
                >
                    <FlowsHierarchy/>
                </Splitter.Panel>


                <Splitter.Panel
                    key={flowUid}
                    defaultSize="60%"
                    style={{
                        height: "95vh",

                    }}
                >
                    {
                        isLoading && (
                            <CenterSpinner/>
                        )
                    }

                    {
                        flow && (
                            <FlowEditor flow={flow}/>
                        )
                    }

                </Splitter.Panel>


                <Splitter.Panel
                    key={flowUid}
                    defaultSize="20%"
                    style={{
                        backgroundColor: "white",

                    }}
                >


                    {
                        flow && (
                            <FlowRightBar flow={flow}/>
                        )
                    }
                </Splitter.Panel>


            </Splitter>

        </div>

    )
}

