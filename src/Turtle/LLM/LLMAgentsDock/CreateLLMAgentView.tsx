import React from "react"
import {Form, Select} from "antd";
import {StringProperty} from "@Turtle/Data/Properties";
import StringPropertyView from "@Turtle/Components/Forms/StringPropertyView";
import {RightSubmitButton} from "@Turtle/Components/RightSubmitButton";
import TurtleApp from "@TurtleApp/TurtleApp";
import LLMApi from "@Turtle/LLM/Api/LLMApi";
import {LLMAgent} from "@Turtle/LLM/Data/LLMAgent";
import LLMAgentApi from "@Turtle/LLM/Api/LLMAgentApi";
import {ListUserTypes} from "@Turtle/Users/User";
import {useTranslation} from "react-i18next";
import XApiKeySelect from "@Turtle/XApiKey/XApiKeySelect";
import StringAreaPropertyView from "@Turtle/Components/Forms/StringAreaPropertyView";

interface CreateLLMClusterModalProps {
    agent: LLMAgent
    beforeSubmit: () => void
    afterSubmit: () => void
}


export default function CreateLLMAgentModal({
                                                agent,
                                                beforeSubmit,
                                                afterSubmit
                                            }: CreateLLMClusterModalProps) {

    const [t] = useTranslation()

    const nameField = React.useMemo(() => {
        return StringProperty.NewName()
    }, [agent])


    const descriptionField = React.useMemo(() => {
        return StringProperty.New("description", "description")
    }, [agent])


    const commandExampleField = React.useMemo(() => {
        return StringProperty.New("commandExample", "commandExample")
    }, [agent])

    const specializationField = React.useMemo(() => {
        return StringProperty.New("specialization", "specialization")
    }, [agent])


    async function onSubmit() {
        beforeSubmit()
        TurtleApp.Lock()
        await LLMAgentApi.COUAgent(agent)
        TurtleApp.Unlock()
        afterSubmit()
    }


    return (
        <Form layout={"vertical"}>
            <StringPropertyView
                entity={agent}
                property={nameField}
            />

            {/*TODO user level*/}


            <StringAreaPropertyView
                entity={agent}
                property={descriptionField}
            />

            <StringPropertyView
                entity={agent}
                property={specializationField}
            />


            <Form.Item
                label={`${t("user.level")}:`}
            >
                <Select
                    defaultValue={0}
                    onChange={(value) => {
                        agent.userLevel = value
                    }}
                >
                    {
                        ListUserTypes().map((entity) => {
                            return (
                                <Select.Option
                                    key={entity.lang}
                                    value={entity.value}
                                >
                                    {t(entity.lang)}
                                </Select.Option>
                            )
                        })
                    }

                </Select>
            </Form.Item>

            <XApiKeySelect
                entity={agent}
                itemKey={"xApiKey"}
            />

            <StringAreaPropertyView
                entity={agent}
                property={commandExampleField}
            />

            <RightSubmitButton
                onClick={onSubmit}
            />

        </Form>
    )
}