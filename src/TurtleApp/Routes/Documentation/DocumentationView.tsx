import React from "react"
import axios from "axios";

export default function DocumentationView({topic, document}) {

    const [data, setData] = React.useState<string | null>(null)


    async function refresh() {


        const response = await axios.get(`/doc/${topic}/${document}.html`, {
            responseType: 'text',
            headers: {
                'Accept': 'text/html',
            }
        })

        setData(response.data)
    }

    React.useEffect(() => {
        refresh()
    }, [])

    if (data) {
        return (
            <div style={{
                padding: "15px"
            }}>
                <div
                    dangerouslySetInnerHTML={{__html: data}}
                />
            </div>
        )
    } else {
        return (
            <div>
                Loading
            </div>
        )
    }


}