import React from "react"
import {Splitter, Tabs} from "antd"

import {useTurtleTheme} from "@Turtle/Theme/useTurleTheme"
import DocIntTopBar from "@Turtle/DocInt/Dock/DocIntTopBar";
import {DocIntHierarchy} from "@Turtle/DocInt/Dock/DocIntHierarchy";
import {useParams} from "react-router-dom";
import DocumentPreview from "@Turtle/DocInt/Dock/DocumentPreview";
import DockDocIntCollectionsHierarchy from "@Turtle/DocInt/Dock/DocIntCollectionsHierarchy";
import {useTranslation} from "react-i18next";


export default function DocIntDock({}) {

    const [t] = useTranslation()

    const {bigPadding, theme} = useTurtleTheme()

    const {documentUid} = useParams()

    const [leftSwitch, setLeftSwitch] = React.useState("documents")


    return (
        <div>

            <DocIntTopBar/>

            <Splitter style={{
                height: "100%",
                // backgroundColor: "#212124"
            }}>

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
                    {
                        documentUid && (
                            <DocumentPreview documentUid={documentUid}/>
                        )
                    }
                </Splitter.Panel>

            </Splitter>

        </div>
    )

}