import React from "react"
import LLM from "@Turtle/LLM/Data/LLM";
import {Form, Select} from "antd";
import LLMApi from "@Turtle/LLM/Api/LLMApi";


export default function LLModelSelect({defaultValue, modelChanged}) {


    const [selectedOne, setSelectedOne] = React.useState(defaultValue)

    const [models, setModels] = React.useState<Array<LLM>>([])


    function changed(modelUid: string) {
        setSelectedOne(modelUid)
        modelChanged(modelUid)
    }

    async function refresh() {

        const tmp = await LLMApi.ListLLMS()

        if (selectedOne === "") {
            const agentic = tmp.filter((item) => item.isAgentic)
            if (agentic.length > 0) {
                setSelectedOne(agentic[0].uid)
                console.log("Choosing default agentic model")
            } else {
                if (tmp.length > 0) {
                    setSelectedOne(tmp[0].uid)
                }
            }
        }


        setModels(tmp)
    }

    React.useEffect(() => {
        refresh()
    }, [])


    return (
        <Form.Item label={"LLM"}>
            <Select
                value={selectedOne}
                onChange={changed}
            >
                <Select.Option
                    key={""}
                    value={""}
                >
                    {""}
                </Select.Option>
                {
                    models.map((model) => {
                        return (
                            <Select.Option
                                key={model.uid}
                                value={model.uid}
                            >
                                {model.name} ({model.modelVersion})
                            </Select.Option>
                        )
                    })
                }
            </Select>
        </Form.Item>
    )

}