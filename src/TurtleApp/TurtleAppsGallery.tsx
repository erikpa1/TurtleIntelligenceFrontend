import {Col, Divider, Flex, Modal, Row, Tabs} from "antd";
import {useTranslation} from "react-i18next";
import React from "react";
import Search from "antd/es/input/Search";
import {BASIC_CATEGORIES} from "@NavBar/NavBarModules_Basic";
import {CRM_CATEGORIES} from "@TurtleCrm/NavBarModules_CRM";
import {MyNavbarItemBigger} from "@Turtle/Components/NavBar";


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
                    if (activeTab === "basic") {
                        return BASIC_CATEGORIES
                    } else if (activeTab === "crm") {
                        return CRM_CATEGORIES
                    } else {
                        return []
                    }
                })().map((category) => {
                    return (
                        <React.Fragment key={category.titleKey}>
                            <Divider orientation={"left"}>
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
        </Flex>

    )
}
