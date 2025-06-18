import React from "react"
import {Select, Space} from "antd";
import LLM from "@Turtle/LLM/Data/LLM";
import LLMApi from "@Turtle/LLM/Api/LLMApi";


export default function LLLMSelectDropdown({
                                               modelSelected,
                                               setSelectedModel
                                           }) {

    const [models, setModels] = React.useState<Map<string, LLM>>(new Map())

    async function refresh() {

        const models = await LLMApi.ListLLMSMap()

        console.log(models)

        if (modelSelected === "" || models.has(modelSelected) == false) {
            for (const [key, value] of models) {
                if (value.isDefault) {
                    setSelectedModel(key)
                    break
                }
            }
        }

        setModels(models)
    }

    React.useEffect(() => {
        refresh()
    }, [])


    return (
        <Select
            value={modelSelected}
            style={{minWidth: 200}}
            onChange={setSelectedModel}
        >
            {
                Array.from(models.values()).map((model, index) => {
                    return (
                        <Select.Option
                            key={model.uid}
                            value={model.uid}
                        >
                            <Space>
                                {iconsDispatcher("llama")} {`${model.name} (${model.modelVersion})`}
                            </Space>
                        </Select.Option>
                    )
                })
            }
        </Select>
    )
}

function iconsDispatcher(modelName: string): string | any {

    if (modelName.toLowerCase().search("llama") !== -1) {
        return "🦙"
    } else if (modelName.toLowerCase().search("deepseek") !== -1) {
        return "🤖"
    } else {
        return ""
    }

}