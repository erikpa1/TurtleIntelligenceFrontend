import {Col, Divider, Flex, Layout, Menu, Modal, Row} from "antd";

import {useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {IconSimulation, IconWidgets} from "@Turtle/Icons";
import Search from "antd/es/input/Search";
import React from "react";

import "./AppNavBar.css"
import {INavBarItem, MyNavbarItem, MyNavbarItemBigger} from "@Turtle/Components/NavBar";

export default function AppNavBar() {

    const [t] = useTranslation()

    const navigate = useNavigate()

    const [modalVisible, setModalVisible] = React.useState(false)

    function showWidgets() {
        setModalVisible(true)
    }



    return (
        <div>
            <Layout.Sider
                collapsed={true}
                collapsedWidth={70}
                width={70}
                style={{
                    backgroundColor: "#FFFFFF",
                    height: "100dvh",
                    position: "fixed",
                    // overflow: 'auto',
                    borderRight: "2px solid #ebebeb",
                    overflowY: "auto",
                    overflowX: "hidden",
                    insetInlineStart: 0,
                    top: 0,
                    bottom: 0,
                    scrollbarWidth: "thin",
                    scrollbarGutter: "stable",
                    zIndex: 1,
                }}
            >
                <Flex
                    vertical
                    align="center"
                    style={{height: "100%", paddingLeft: "8px"}}
                    justify="space-between"
                >


                    <div style={{
                        width: "100%",
                        marginBottom: "10px",
                        marginTop: "10px"
                    }}>

                        <MyNavbarItem
                            icon={"/icons/widgets.svg"}
                            iconStyle={{
                                ...ICON_STYLE,
                                width: "35px",
                                height: "35px",
                            }}
                            onClick={showWidgets}
                            lang={"widgets"}
                        />

                        <hr style={{
                            width: "10px"
                        }}/>

                        <MyNavbarItem
                            icon={<IconSimulation width={"30px"} height={"30px"}/>}
                            link={"/"}
                            lang={"simulations"}
                            iconStyle={ICON_STYLE}
                        />

                        <MyNavbarItem
                            icon={"/icons/chat.svg"}
                            link={"/llm-chat"}
                            lang={"aichat"}
                            iconStyle={ICON_STYLE}
                        />

                        <MyNavbarItem
                            icon={"/icons/chat.svg"}
                            link={"/llm-agent-chat"}
                            lang={"agent.chat"}
                            iconStyle={ICON_STYLE}
                        />

                        <MyNavbarItem
                            icon={"/icons/article_person.svg"}
                            link={"/doc-int"}
                            lang={"document.intelligence"}
                            iconStyle={ICON_STYLE}
                        />

                        <MyNavbarItem
                            lang={"knowledgehub"}
                            link={"/knowledge-hub"}
                            icon={"/icons/article_person.svg"}
                            iconStyle={ICON_STYLE}
                        />

                        <MyNavbarItem
                            lang={"login"}
                            link={"/login"}
                            icon={"/icons/article_person.svg"}
                            iconStyle={ICON_STYLE}
                        />

                    </div>
                </Flex>

            </Layout.Sider>

            {
                modalVisible && (
                    <_WidgetsView onRereoute={() => setModalVisible(false)}/>
                )
            }
        </div>
    )
}
const ICON_STYLE = {
    width: "25px",
    height: "25px",
    marginTop: "1px",
    marginBottom: "1px"
}


const AI_WIDGETS: INavBarItem[] = [
    {
        lang: "neuralnetworks",
        icon: "/icons/network_intel_node.svg",
        link: "/nn"
    },
    {
        lang: "llm.models",
        icon: "/icons/ollama.svg",
        link: "/llms"
    },
    {
        lang: "agents",
        icon: "/icons/robot_2.svg",
        link: "/agents"
    },
    {
        lang: "agents-tools",
        icon: "/icons/robot_2.svg",
        link: "/agents-tools"
    }
]

const DATA_WIDGETS: INavBarItem[] = [
    {
        lang: "functions",
        icon: "/icons/function.svg",
        link: "/functions"
    },
    {
        lang: "containers",
        icon: "/icons/inventory_2.svg",
        link: "/containers"
    },
    {
        lang: "actors",
        icon: "/icons/support_agent.svg",
        link: "/actors"
    },
    {
        lang: "resources",
        icon: "/icons/support_agent.svg",
        link: "/resources"
    },
    {
        lang: "flows",
        icon: "/icons/flowsheet.svg",
        link: "/flows"
    },
    {
        lang: "tables",
        icon: "/icons/flowsheet.svg",
        link: "/tables"
    },
    {
        lang: "table.data",
        icon: "/icons/flowsheet.svg",
        link: "/table-data"
    },
    {
        lang: "forecasting",
        icon: "/icons/flowsheet.svg",
        link: "/forecasting"
    }
]

const THREED_WIDGETS: INavBarItem[] = [
    {
        lang: "scenes",
        icon: "/icons/article.svg",
        link: "/scenes"
    }
]

const OTHER_WIDGETS: INavBarItem[] = [
    {
        lang: "documentation",
        icon: "/icons/article.svg",
        link: "/documentation"
    },
    {
        lang: "llm.clusters",
        icon: "/icons/graph_3.svg",
        link: "/llm-clusters"
    },
    {
        lang: "agents.incidents",
        icon: "/icons/graph_3.svg",
        link: "/agents-incidents"
    },
    {
        lang: "themes",
        icon: "/icons/graph_3.svg",
        link: "/themes"
    }
]

interface IWidgetCategory {
    titleKey: string
    items: INavBarItem[]
}

const WIDGET_CATEGORIES: IWidgetCategory[] = [
    {
        titleKey: "AI",
        items: AI_WIDGETS
    },
    {
        titleKey: "data",
        items: DATA_WIDGETS
    },
    {
        titleKey: "3D",
        items: THREED_WIDGETS
    },
    {
        titleKey: "other",
        items: OTHER_WIDGETS
    }
]

function _WidgetsView({onRereoute}) {

    const [t] = useTranslation()

    const [searchText, setSearchText] = React.useState("")

    function searchTyping(text: string) {
        setSearchText(text)
    }

    return (
        <Modal
            title={t("widgets")}
            closable={true}
            onCancel={onRereoute}
            open={true}
            width={800}
            footer={<></>}
        >
            <Flex vertical>

                <div style={{display: 'flex', justifyContent: 'center'}}>
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
                </div>

                {
                    WIDGET_CATEGORIES.map((category) => {
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
                                                    <MyNavbarItem
                                                        lang={item.lang}
                                                        icon={item.icon}
                                                        link={item.link}
                                                        onRerouted={onRereoute}
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
        </Modal>
    )
}
