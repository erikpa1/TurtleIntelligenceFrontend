import React from "react"
import {Splitter, Tabs} from "antd"

import {useTurtleTheme} from "@Turtle/Theme/useTurleTheme"
import DocIntTopBar from "@Turtle/DocInt/Dock/DocIntTopBar";
import {DocIntHierarchy} from "@Turtle/DocInt/Dock/DocIntHierarchy";
import {useParams} from "react-router-dom";
import DocumentPreview from "@Turtle/DocInt/Dock/DocumentPreview";
import DockDocIntCollectionsHierarchy from "@Turtle/DocInt/Dock/DocIntCollectionsHierarchy";
import {useTranslation} from "react-i18next";
import TurtleEmpty from "@Turtle/Components/TurtleEmpty";
import {CollectionDocumentsList} from "@Turtle/DocInt/Dock/CollectionDocumentsList";
import {SplitterWithHeader} from "@Turtle/Antd/Splitter";


export default function DocIntDock({}) {

    const [t] = useTranslation()

    const {bigPadding, theme} = useTurtleTheme()

    const {viewMethod, documentUid} = useParams()

    const [leftSwitch, setLeftSwitch] = React.useState("documents")

    return (
        <SplitterWithHeader topbar={<DocIntTopBar/>}>
            <Splitter.Panel
                defaultSize="25%"
                style={{
                    backgroundColor: "white",
                }}
            >

                <Tabs
                    defaultActiveKey={leftSwitch}
                    centered
                    onChange={setLeftSwitch}
                    size={"small"}
                    items={[
                        {
                            label: t("documents"),
                            key: "documents",
                        },
                        {
                            label: t("collections"),
                            key: "collections",
                        }
                    ]}


                />

                <div style={{
                    padding: bigPadding
                }}>
                    {
                        leftSwitch === "documents" && (
                            <DocIntHierarchy/>
                        )
                    }

                    {
                        leftSwitch === "collections" && (
                            <DockDocIntCollectionsHierarchy/>
                        )
                    }
                </div>

            </Splitter.Panel>

            <Splitter.Panel
                defaultSize="75%"
                style={{
                    height: theme.GetSplitterBigHeight(),
                }}
            >
                <_ViewDispatcher
                    viewMethod={viewMethod}
                    documentUid={documentUid}
                />
            </Splitter.Panel>

        </SplitterWithHeader>
    )


}

interface _ViewDispatcherProps {
    viewMethod?: string
    documentUid?: string
}

function _ViewDispatcher({viewMethod, documentUid}: _ViewDispatcherProps) {

    if (viewMethod === "col" && documentUid) {
        return (
            <CollectionDocumentsList colUid={documentUid}/>
        )
    } else if (viewMethod === "doc" && documentUid) {
        return (
            <DocumentPreview documentUid={documentUid}/>
        )
    } else {
        return (
            <TurtleEmpty/>
        )
    }


}