import React from "react"
import LLM from "@Turtle/LLM/Data/LLM";
import {Form, Select} from "antd";
import LLMApi from "@Turtle/LLM/Api/LLMApi";


export default function LLModelSelect({defaultValue, modelChanged}) {

    const [models, setModels] = React.useState<Array<LLM>>([])

    async function refresh() {
        setModels(await LLMApi.ListLLMS())
    }

    React.useEffect(() => {
        refresh()
    }, [])


    return (
        <Form.Item label={"LLM"}>
            <Select
                defaultValue={defaultValue}
                onChange={modelChanged}
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