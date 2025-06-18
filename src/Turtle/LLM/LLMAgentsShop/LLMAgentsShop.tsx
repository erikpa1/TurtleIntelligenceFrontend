import React from "react"
import {Flex, Tabs} from "antd";
import {useTranslation} from "react-i18next";

export default function LLMAgentsShop({}) {

    const [t] = useTranslation()

    const [platformAgents, setPlatformAgents] = React.useState("built-in")


    return (
        <Flex
            vertical
            style={{
                marginTop: "15px"
            }}
        >

            <Tabs
                defaultActiveKey="table"
                centered
                size={"small"}
                onChange={setPlatformAgents}
                items={[
                    {
                        label: t("built-in"),
                        key: "built-in",
                    },
                    {
                        label: t("trusted"),
                        key: "trusted",
                    },
                    {
                        label: t("community"),
                        key: "community",
                    },
                ]}
            />


            <Flex>
                <_BuiltInAgents/>
            </Flex>


        </Flex>
    )
}

function _BuiltInAgents() {

    const [t] = useTranslation()

    return (
        <Tabs
            defaultActiveKey="table"
            centered
            tabPosition={"left"}
            size={"small"}

            items={[
                {
                    label: t("email"),
                    key: "email",
                },
                {
                    label: t("users"),
                    key: "users",
                },
                {
                    label: t("docint"),
                    key: "docint",
                },
                {
                    label: t("monitoring"),
                    key: "monitoring",
                },
                {
                    label: t("DCOM"),
                    key: "DICOM",
                },
            ]}
        />

    )
}