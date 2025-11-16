import React from "react"
import {useTurtleTheme} from "@Turtle/Theme/useTurleTheme";
import {useParams} from "react-router-dom";
import DocIntTopBar from "@Turtle/DocInt/Dock/DocIntTopBar";
import {Splitter} from "antd";
import KnowledgeHierarchy from "@Turtle/KnowledgeHub/KnowledgeHierarchy";
import KnowledgeEditView from "@Turtle/KnowledgeHub/KnowledgeEditView";
import {Knowledge} from "@Turtle/KnowledgeHub/Data/Knowledge";
import {CenterSpinner} from "@Turtle/Components/Loadings";
import TurtleEmpty from "@Turtle/Components/TurtleEmpty";
import KnowledgeApi from "@Turtle/KnowledgeHub/Api/KnowledgeApi";
import GuidanceTopBar from "@Turtle/Guidance/GuidanceTopBar";
import GuidanceHierarchy from "@Turtle/Guidance/GuidanceHierarchy";

export default function GuidanceDock() {


    const {knUid} = useParams()

    const [kn, setKn] = React.useState<Knowledge | null>(null)

    const [isLoading, setIsLoading] = React.useState(false)


    async function refresh() {
        setIsLoading(true)

        const response = await KnowledgeApi.Get(knUid as any)
        setKn(response)
        setIsLoading(false)

    }

    React.useEffect(() => {
        refresh()
    }, [])


    if (isLoading) {
        return (
            <CenterSpinner/>
        )
    } else {

        if (kn) {
            return (
                <_AfterLoadView knowledge={kn}/>
            )
        } else {
            return (
                <TurtleEmpty/>
            )
        }


    }
}

interface _AfterLoadViewProps {
    knowledge: Knowledge
}

function _AfterLoadView({knowledge}: _AfterLoadViewProps) {

    const {bigPadding} = useTurtleTheme()

    return (
        <div>

            <GuidanceTopBar/>

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
                    <GuidanceHierarchy knowledge={knowledge}/>
                </Splitter.Panel>

                <Splitter.Panel
                    defaultSize="80%"
                    style={{
                        height: "95vh",

                    }}
                >

                </Splitter.Panel>

            </Splitter>

        </div>
    )
}