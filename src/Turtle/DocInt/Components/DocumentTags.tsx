import React from "react"
import {Button, Flex, Form, Tree} from "antd";
import {useTurtleModal} from "@Turtle/Hooks/useTurtleModal";
import {RightSubmitButton, RightSubmitHtmlButton} from "@Turtle/Components/RightSubmitButton";
import StringAttributeView from "@Turtle/Components/Forms/StringAttributeView";
import {useTranslation} from "react-i18next";
import TagsList from "@Turtle/Tags/TagsList";
import {PlusOutlined} from "@ant-design/icons";

export default function DocumentTags() {

    const [t] = useTranslation()
    const {activate, deactivate} = useTurtleModal()

    function createCategoryPressed() {
        activate({
            title: `${t("create.category")}:`,
            closable: true,
            content: (
                <CreateCategoryView/>
            )
        })
    }

    return (
        <Flex vertical gap={15}>


            <Flex justify={"center"}>
                <Button
                    type={"primary"}
                    onClick={createCategoryPressed}
                    icon={<PlusOutlined/>}
                >

                    {t("create.tag")}
                </Button>

            </Flex>


        </Flex>
    )
}

export function CreateCategoryView({}) {

    const category = {name: "Faktura"}

    return (
        <Form layout={"vertical"}>
            <Flex vertical gap={15}>
                <StringAttributeView
                    entity={category}
                    attribute={"name"}
                />

                <RightSubmitHtmlButton
                    onClick={() => {

                    }}
                />
            </Flex>
        </Form>
    )
}

