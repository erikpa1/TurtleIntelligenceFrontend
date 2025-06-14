import React from "react"
import {Form} from "antd";
import LLMCluster from "@Turtle/LLM/Data/LLMCluster";
import {StringProperty} from "@Turtle/Data/Properties";
import StringItem from "@Turtle/ReflectiveUI/StringItem";
import StringPropertyView from "@Turtle/Components/Forms/StringPropertyView";
import {RightSubmitButton} from "@Turtle/Components/RightSubmitButton";
import TurtleApp from "@TurtleApp/TurtleApp";
import LLMApi from "@Turtle/LLM/Api/LLMApi";

interface CreateLLMClusterModalProps {
    cluster: LLMCluster
    beforeSubmit: () => void
    afterSubmit: () => void
}


export default function CreateLLMClusterModal({
                                                  cluster,
                                                  beforeSubmit,
                                                  afterSubmit
                                              }: CreateLLMClusterModalProps) {


    const nameField = React.useMemo(() => {
        return StringProperty.NewName()
    }, [cluster])


    const urlField = React.useMemo(() => {
        const tmp = new StringProperty()
        tmp.key = "url"
        tmp.label = "URL"
        return tmp
    }, [cluster])


    async function onSubmit() {
        beforeSubmit()
        TurtleApp.Lock()
        await LLMApi.COUCluster(cluster)
        TurtleApp.Unlock()
        afterSubmit()
    }

    ``
    return (
        <Form layout={"vertical"}>

            <StringPropertyView
                entity={cluster}
                attribute={"name"}
            />

            <StringPropertyView
                entity={cluster}
                attribute={"url"}
            />

            <RightSubmitButton
                onClick={onSubmit}
            />

        </Form>
    )
}