import React from "react"
import LLM from "@Turtle/LLM/Data/LLM";
import {Form, Spin} from "antd";
import {BoolProperty, StringProperty} from "@Turtle/Data/Properties";

import StringPropertyView from "@Turtle/Components/Forms/StringPropertyView";
import {RightSubmitButton} from "@Turtle/Components/RightSubmitButton";

import SelectItem, {SelectItemOptions} from "@Turtle/ReflectiveUI/SelectItem";
import LLMApi from "@Turtle/LLM/Api/LLMApi";
import TurtleApp from "@TurtleApp/TurtleApp";
import BoolPropertyView from "@Turtle/Components/Forms/BoolPropertyView";
import {ModelsInfoButton} from "@Turtle/LLM/LLMsDock/LLModelsInfoView";
import StringItem from "@Turtle/ReflectiveUI/StringItem";
import StringSelectPropertyView from "@Turtle/Components/Forms/StringSelectPropertyView";

interface RegisterLLLMModelProps {
    llmModel: LLM
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
                    attribute={"name"}
                />

                <StringPropertyView
                    entity={llmModel}
                    attribute={"modelVersion"}
                    behindLabel={<ModelsInfoButton/>}
                />


                <StringSelectPropertyView
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