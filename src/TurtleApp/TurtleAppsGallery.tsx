import {Col, Divider, Flex, Row, Tabs} from "antd";
import {useTranslation} from "react-i18next";
import React from "react";
import Search from "antd/es/input/Search";
import {BASIC_CATEGORIES, NETESS_CATEGORIES} from "@NavBar/NavBarModules_Basic";
import {CRM_CATEGORIES} from "@TurtleCrm/NavBarModules_CRM";
import {SECURITY_CATEGORIES} from "@TurtleSecurity/NavBarModules_Security";
import {MANUFACTURING_CATEGORIES} from "@TurtleManufacturing/NavBarModules_Manufacturing";

import {MyNavbarItemBigger} from "@Turtle/Components/NavBar";
import IconTortoise from "../TurtleIcons/IconTortoise"


export const ICON_STYLE = {
    width: "25px",
    height: "25px",
    marginTop: "1px",
    marginBottom: "1px"
}

interface TurtleAppsGalleryProps {
    onRereoute?: (link: string) => void
}


export default function TurtleAppsGallery({onRereoute}: TurtleAppsGalleryProps) {

    const [t] = useTranslation()

    const [activeTab, setActiveTab] = React.useState("basic")

    const [searchText, setSearchText] = React.useState("")

    function searchTyping(text: string) {
        setSearchText(text)
    }

    return (

        <Flex vertical>


            <Tabs
                activeKey={activeTab}
                onChange={setActiveTab}
                centered
                items={[
                    {
                        key: "basic",
                        label: t("basic"),
                    },
                    {
                        key: "crm",
                        label: "CRM",
                    },
                    {
                        key: "turtlenetess",
                        label: "turtle.netess",
                    },
                    {
                        key: "security",
                        label: t("security"),
                    },
                    {
                        key: "manufacturing",
                        label: t("manufacturing"),
                    },
                ]}
            />

            <Flex justify="center" style={{marginTop: "10px"}}>
                <Search
                    defaultValue={searchText}
                    onChange={(e) => {
                        searchTyping(e.target.value)
                    }}
                    variant="borderless"
                    style={{
                        width: '200px',
                        flex: 'none',
                        borderBottom: '1px solid #d9d9d9',
                        borderRadius: 0
                    }}
                />
            </Flex>

            {
                (() => {
                    let categories
                    if (activeTab === "basic") {
                        categories = BASIC_CATEGORIES
                    } else if (activeTab === "crm") {
                        categories = CRM_CATEGORIES
                    } else if (activeTab === "turtlenetess") {
                        categories = NETESS_CATEGORIES
                    } else if (activeTab === "security") {
                        categories = SECURITY_CATEGORIES
                    } else if (activeTab === "manufacturing") {
                        categories = MANUFACTURING_CATEGORIES
                    } else {
                        categories = []
                    }

                    const search = searchText.trim().toLowerCase()
                    if (!search) {
                        return categories
                    }

                    return categories
                        .map((category) => ({
                            ...category,
                            items: category.items.filter((item) =>
                                t(item.lang ?? "").toLowerCase().includes(search)
                            )
                        }))
                        .filter((category) => category.items.length > 0)
                })().map((category) => {
                    return (
                        <React.Fragment key={category.titleKey}>
                            <Divider titlePlacement={"start"}>
                                {category.titleKey === "3D" ? category.titleKey : t(category.titleKey)}:
                            </Divider>

                            <Row gutter={[16, 16]}>
                                {
                                    category.items.map((item) => {
                                        return (
                                            <Col key={item.link} span={6}>
                                                <MyNavbarItemBigger
                                                    lang={item.lang}
                                                    icon={item.icon}
                                                    link={item.link}
                                                    onRerouted={onRereoute as any}
                                                    iconStyle={ICON_STYLE}
                                                />
                                            </Col>
                                        )
                                    })
                                }
                            </Row>
                        </React.Fragment>
                    )
                })
            }
            <_PoweredByTurtle/>
        </Flex>

    )
}

function _PoweredByTurtle() {
    return (
        <Flex justify={"center"}>
            <Flex vertical>
                <IconTortoise/>
                <div>Powered by</div>
                <div>Turtle Intelligence</div>
            </Flex>
        </Flex>
    )
}