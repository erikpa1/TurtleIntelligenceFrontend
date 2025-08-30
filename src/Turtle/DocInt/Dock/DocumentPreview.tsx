import React from "react"
import TurtleEmpty from "@Turtle/Components/TurtleEmpty"
import DocumentsApi from "@Turtle/DocInt/Api/DocumentsApi"
import {FileDocument} from "@Turtle/DocInt/Data/Document"
import {CenterSpinner} from "@Turtle/Components/Loadings"
import {Flex, Space} from "antd";
import TopBarWrapper from "@Turtle/Components/TopBarWrapper";
import DocPreviewTopBar from "@Turtle/DocInt/Dock/DocPreviewTopBar";
import {useTurtleTheme} from "@Turtle/Theme/useTurleTheme";


export default function DocumentPreview({documentUid}) {

    const {theme} = useTurtleTheme()

    const [isLoading, setIsLoading] = React.useState(true)

    const [doc, setDoc] = React.useState<FileDocument | null>(null)

    async function refresh() {
        setIsLoading(true)

        const tmpDoc = await DocumentsApi.Get(documentUid)
        setDoc(tmpDoc)
        setIsLoading(false)
    }

    React.useEffect(() => {
        refresh()
    }, [documentUid])


    if (isLoading) {
        return (
            <CenterSpinner/>
        )
    } else {

        if (doc) {

            if (doc.extension == "pdf") {
                return (
                    <div style={{
                        width: "100%",
                        height: "100%"
                    }}>
                        <DocPreviewTopBar doc={doc}/>
                        <embed
                            src={DocumentsApi.DocFilePath(doc.uid)}
                            style={{
                                width: "100%",
                                height: `calc(100% - ${theme.topBarHeightBig} - 7px)`
                            }}
                            type="application/pdf"
                        />
                    </div>
                )
            } else {
                return (
                    <div>
                        Unsupported format
                    </div>
                )
            }
        } else {
            return (
                <TurtleEmpty/>
            )
        }


    }


}