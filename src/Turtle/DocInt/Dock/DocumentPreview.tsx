import React from "react"
import TurtleEmpty from "@Turtle/Components/TurtleEmpty"
import DocumentsApi from "@Turtle/DocInt/Api/DocumentsApi"
import {FileDocument} from "@Turtle/DocInt/Data/Document"
import {CenterSpinner} from "@Turtle/Components/Loadings"


export default function DocumentPreview({documentUid}) {

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
                    <embed
                        src={DocumentsApi.DocFilePath(doc.uid)}
                        style={{
                            width: "100%",
                            height: "100%"
                        }}
                        type="application/pdf"
                    />
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