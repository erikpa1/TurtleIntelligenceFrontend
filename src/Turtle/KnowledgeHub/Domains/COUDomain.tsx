import React from "react"
import {Flex, Form, Select, Timeline, Typography} from "antd"

import StringAttributeView from "@Turtle/Components/Forms/StringAttributeView";
import {useTranslation} from "react-i18next";
import {RightSubmitButton} from "@Turtle/Components/RightSubmitButton";
import TurtleApp from "@TurtleApp/TurtleApp";

import {StringAreaAttributeView} from "@Turtle/Components/Forms/StringAreaPropertyView";
import KhDomain from "@Turtle/KnowledgeHub/Data/Domains";
import KhDomainApi from "@Turtle/KnowledgeHub/Api/KhDomainApi";

interface COUDomainViewProps {
    domain: KhDomain
    onBeforeSubmit: any
    onAfterSubmit: any

}

export default function COUDomainView({
                                          domain,
                                          onBeforeSubmit,
                                          onAfterSubmit
                                      }: COUDomainViewProps) {

    const [t] = useTranslation()


    async function submitPressed() {
        onBeforeSubmit()
        TurtleApp.Lock()

        await KhDomainApi.COU(domain)
        TurtleApp.Unlock()
        onAfterSubmit()
    }

    return (
        <Form layout={"vertical"}>

            <Flex vertical>
                <StringAttributeView
                    entity={domain}
                    attribute={"name"}
                />

                <StringAreaAttributeView
                    entity={domain}
                    attribute={"description"}
                />

                <RightSubmitButton onClick={submitPressed}/>
            </Flex>
        </Form>
    )
}