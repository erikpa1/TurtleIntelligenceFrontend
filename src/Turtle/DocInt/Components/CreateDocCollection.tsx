import React from "react"
import {Flex, Form} from "antd"
import {useTranslation} from "react-i18next"
import {DocumentsCollection} from "@Turtle/DocInt/Data/DocumentsCollection"

import {StringAreaAttributeView} from "@Turtle/Components/Forms/StringAreaPropertyView"
import {RightSubmitButton, RightSubmitHtmlButton} from "@Turtle/Components/RightSubmitButton"
import DocColApi from "@Turtle/DocInt/Api/DocColApi";
import TurtleApp from "@TurtleApp/TurtleApp";
import StringAttributeView from "@Turtle/Components/Forms/StringAttributeView";


export default function CreateDocCollection({}) {

    const [t] = useTranslation()

    const request = React.useMemo(() => {
        const tmp = new DocumentsCollection()
        tmp.name = t("docCollection.example1")
        tmp.filter = t("docCollection.example1")
        return tmp
    }, [])

    async function submit() {
        TurtleApp.Lock()
        await DocColApi.Create(request)
        TurtleApp.Unlock()
    }

    return (
        <Flex vertical>
            <Form
                initialValues={request}
                layout={"vertical"}
                onFinish={submit}
            >
                <StringAttributeView
                    entity={request}
                    attribute={"name"}
                    inputProps={{
                        placeholder: t("docCollection.example1")
                    }}
                    itemProps={{
                        required: true
                    }}
                />

                <StringAreaAttributeView
                    entity={request}
                    attribute={"filter"}
                    itemProps={{
                        required: true
                    }}
                    areaProps={{
                        placeholder: t("docCollection.example1")
                    }}
                />

                <RightSubmitButton onClick={submit}/>
            </Form>
        </Flex>
    )
}