import {Col, Divider, Flex, Layout, Menu, Modal, Row} from "antd";
import {
    BookOutlined,
    ContainerOutlined, FilePdfOutlined,
    MessageOutlined,
    OpenAIOutlined,
    UserOutlined
} from "@ant-design/icons";
import {useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {IconSimulation, IconWidgets} from "@Turtle/Icons";
import IconNetworkIntelNode from "@Turtle/Icons/IconNetworkIntelNode";
import Search from "antd/es/input/Search";
import React from "react";

import "./AppNavBar.css"

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
                collapsedWidth={80}
                width={80}
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


                    <div style={{width: "100%", marginBottom: "10px"}}>

                        <MyNavbarItem
                            icon={"/icons/widgets.svg"}
                            iconStyle={ICON_STYLE}
                            onClick={showWidgets}
                        />

                        <Menu
                            style={{
                                border: "0px",
                                height: "100%",
                                display: "flex",
                                flexDirection: "column",
                            }}
                            items={[
                                {
                                    key: "widgets",
                                    icon: (<IconSimulation/>),
                                    label: t("widgets"),
                                    onClick: showWidgets
                                },
                                {
                                    key: "home",
                                    icon: (
                                        <IconSimulation/>
                                    ),
                                    label: t("home"),
                                    onClick: () => {
                                        navigate("/")
                                    }
                                },
                                {
                                    key: "neuralnetworks",
                                    icon: <IconNetworkIntelNode/>,
                                    label: t("neuralnetworks"),
                                    onClick: () => {
                                        navigate("/nn")
                                    }
                                },
                                {
                                    key: "containers",
                                    icon: <ContainerOutlined/>,
                                    label: t("containers"),
                                    onClick: () => {
                                        navigate("/containers")
                                    }
                                },
                                {
                                    key: "documentation",
                                    icon: <FilePdfOutlined/>,
                                    label: t("documentation"),
                                    onClick: () => {
                                        navigate("/documentation")
                                    }
                                },
                                {
                                    key: "actors",
                                    icon: <UserOutlined/>,
                                    label: t("actors"),
                                    onClick: () => {
                                        navigate("/actors")
                                    }
                                },
                                {
                                    key: "aichat",
                                    icon: <MessageOutlined/>,
                                    label: t("aichat"),
                                    onClick: () => {
                                        navigate("/llm-chat/new")
                                    }
                                },
                                {
                                    key: "clustrers",
                                    icon: <BookOutlined/>,
                                    label: t("llm.clusters"),
                                    onClick: () => {
                                        navigate("/llm-clusters")
                                    }
                                },
                                {
                                    key: "llmmodels",
                                    icon: <BookOutlined/>,
                                    label: t("llm.models"),
                                    onClick: () => {
                                        navigate("/llms")
                                    }
                                },

                                {
                                    key: "docint",
                                    icon: <OpenAIOutlined/>,
                                    label: t("document.intelligence"),
                                    onClick: () => {
                                        navigate("/doc-int")
                                    }
                                },

                            ]}
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
    width: "35px",
    height: "35px",
    marginTop: "5px",
    marginBottom: "5px"
}


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

                <Divider orientation={"left"}>
                    {t("AI")}:
                </Divider>

                <Row gutter={16}>

                    <Col className="gutter-row" span={6}>
                        <MyNavbarItem
                            lang={"knowledgehub"}
                            link={"/knowledge-hub"}
                            icon={"/icons/article_person.svg"}
                            onRerouted={onRereoute}
                            iconStyle={ICON_STYLE}
                        />
                    </Col>

                    <Col className="gutter-row" span={6}>
                        <MyNavbarItem
                            lang={"agents"}
                            link={"/agents"}
                            icon={"/icons/support_agent.svg"}
                            onRerouted={onRereoute}
                            iconStyle={ICON_STYLE}
                        />
                    </Col>


                </Row>


                <Divider orientation={"left"}>
                    {t("data")}:
                </Divider>

                <Row gutter={16}>
                    <Col className="gutter-row" span={6}>
                        <MyNavbarItem
                            lang={"functions"}
                            link={"/functions"}
                            icon={"/icons/widgets.svg"}
                            onRerouted={onRereoute}
                            iconStyle={ICON_STYLE}
                        />
                    </Col>
                </Row>


            </Flex>
        </Modal>
    )
}

interface MyNavbarItemProps {
    lang?: string
    icon: string
    link?: string
    onClick?: () => void
    onRerouted?: () => void
    iconStyle?: any
}


function MyNavbarItem({lang, icon, link, onClick, onRerouted, iconStyle}: MyNavbarItemProps) {
    const navigate = useNavigate();

    const [t] = useTranslation();

    return (
        <div
            className={"navbaritem"}
            onMouseDown={(e) => {
                if (e.button === 1) {
                    window.open(`${window.origin}/#${link}`, "_blank")
                }
            }}
            onClick={() => {
                if (onClick) {
                    onClick();
                } else if (link) {
                    navigate(link);
                    onRerouted && onRerouted()
                }
            }}
            style={{
                paddingTop: "2.5px",
                paddingBottom: "2.5px",
            }}
        >
            <div className={"vstack"}>
                <img
                    src={icon}
                    style={{
                        margin: "auto",
                        width: "30px",
                        height: "30px",
                        ...(iconStyle ?? {})
                    }}
                />
                <div style={{
                    textAlign: "center",
                    fontSize: "10px",
                    display: "block",
                    whiteSpace: "pre-wrap"
                }}>
                    <p dangerouslySetInnerHTML={{__html: t(lang ?? "").split(" ").join("<br>")}}/>
                </div>
            </div>
        </div>


    );
}