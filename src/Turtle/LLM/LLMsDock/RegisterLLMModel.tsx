import React from "react"
import LLMModel from "@Turtle/LLM/Data/LLMModel";
import {Form, Spin} from "antd";
import {BoolProperty, StringProperty} from "@Turtle/Data/Properties";

import StringPropertyView from "@Turtle/Components/Forms/StringPropertyView";
import {RightSubmitButton} from "@Turtle/Components/RightSubmitButton";

import SelectItem, {SelectItemOptions} from "@Turtle/ReflectiveUI/SelectItem";
import LLMApi from "@Turtle/LLM/Api/LLMApi";
import TurtleApp from "@TurtleApp/TurtleApp";
import BoolPropertyView from "@Turtle/Components/Forms/BoolPropertyView";

interface RegisterLLLMModelProps {
    llmModel: LLMModel
    beforeSubmit: () => void
    afterSubmit: () => void
}

export default function RegisterLLLMModel({
                                              llmModel,
                                              beforeSubmit,
                                              afterSubmit

                                          }: RegisterLLLMModelProps) {

    const [isLoading, setIsLoading] = React.useState(false)

    const [clustersOptions, setClusterOptions] = React.useState<Array<SelectItemOptions>>([])


    const fields = React.useMemo(() => {
        return {
            name: StringProperty.NewName(),
            modelVersion: StringProperty.New("modelVersion", "modelVersion"),
            isAgentic: BoolProperty.New("isAgentic", "isAgentic")
        }
    }, [llmModel])


    const isAgenticField = React.useMemo(() => {
        return
    }, [llmModel])

    async function onSubmit() {
        beforeSubmit()
        TurtleApp.Lock()
        await LLMApi.COUModel(llmModel)
        TurtleApp.Unlock()

        afterSubmit()
    }

    async function refresh() {
        setIsLoading(true)

        const clusters = await LLMApi.ListClusters()

        setClusterOptions(clusters.map((val) => {
            return {
                label: val.name,
                value: val.uid
            }
        }))

        setIsLoading(false)
    }

    React.useEffect(() => {
        refresh()
    }, [])

    if (isLoading) {
        return (
            <Spin size="large"/>
        )
    } else {

        return (
            <Form layout={"vertical"}>

                <StringPropertyView
                    entity={llmModel}
                    property={fields.name}
                />

                <StringPropertyView
                    entity={llmModel}
                    property={fields.modelVersion}
                />

                <SelectItem
                    entity={llmModel}
                    attribute={"cluster"}
                    options={clustersOptions}
                    useEmpty={true}
                    size={"middle"}
                />

                <BoolPropertyView
                    entity={llmModel}
                    property={fields.isAgentic}
                />


                <div style={{
                    marginTop: "15px"
                }}>
                    <RightSubmitButton
                        onClick={onSubmit}
                    />
                </div>

            </Form>
        )
    }

}