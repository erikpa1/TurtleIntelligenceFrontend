import React from "react"
import LLM from "@Turtle/LLM/Data/LLM";
import {Form, Spin} from "antd";
import {BoolProperty, StringProperty} from "@Turtle/Data/Properties";

import StringPropertyView from "@Turtle/Components/Forms/StringPropertyView";
import {RightSubmitButton} from "@Turtle/Components/RightSubmitButton";

import SelectItem, {SelectItemOptions} from "@Turtle/ReflectiveUI/SelectItem";
import LLMApi from "@Turtle/LLM/Api/LLMApi";
import TurtleApp from "@TurtleApp/TurtleApp";
import BoolPropertyView, {BoolAttributeView} from "@Turtle/Components/Forms/BoolPropertyView";
import {ModelsInfoButton} from "@Turtle/LLM/LLMsDock/LLModelsInfoView";
import StringItem from "@Turtle/ReflectiveUI/StringItem";
import StringSelectPropertyView from "@Turtle/Components/Forms/StringSelectPropertyView";
import StringAreaPropertyView, {StringAreaView} from "@Turtle/Components/Forms/StringAreaPropertyView";
import {HierarchyAddButton} from "@Turtle/Components/HierarchyComponents";

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

        const models: Array<SelectItemOptions> = [
            {
                label: "",
                value: "000000000000000000000000",
            }
        ]

        clusters.forEach((val) => {
            models.push({
                label: val.name,
                value: val.uid
            })
        })

        setClusterOptions(models)

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

                <StringAreaView
                    entity={llmModel}
                    attribute={"description"}

                />

                <_SelectClustersList
                    llm={llmModel}
                    clusterOptions={clustersOptions}
                />


                <BoolAttributeView
                    entity={llmModel}
                    attribute={"isAgentic"}
                />

                <BoolAttributeView
                    entity={llmModel}
                    attribute={"isDefault"}
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


interface _SelectClustersListProps {
    llm: LLM,
    clusterOptions: Array<SelectItemOptions>,
}


function _SelectClustersList({
                                 llm,
                                 clusterOptions
                             }: _SelectClustersListProps) {


    function addClusterClicked() {
        console.log("Here")
    }

    return (
        <div>

            {
                Array.from(llm.clusters.values()).map((val) => {
                    return (
                        <div key={val}>
                            {val}

                        </div>
                    )
                })
            }


            <HierarchyAddButton
                onClick={addClusterClicked}
            />
        </div>
    )
}