import {Col, Divider, Flex, Layout, Menu, Modal, Row} from "antd";

import {useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {IconSimulation, IconWidgets} from "@Turtle/Icons";
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

                <Divider orientation={"left"}>
                    {t("AI")}:
                </Divider>

                <Row gutter={16}>

                    <Col className="gutter-row" span={6}>
                        <MyNavbarItem
                            icon={"/icons/network_intel_node.svg"}
                            link={"/nn"}
                            lang={"neuralnetworks"}
                            onRerouted={onRereoute}
                            iconStyle={ICON_STYLE}
                        />
                    </Col>


                    <Col className="gutter-row" span={6}>

                        <MyNavbarItem
                            lang={"llm.models"}
                            link={"/llms"}
                            icon={"/icons/ollama.svg"}
                            onRerouted={onRereoute}
                            iconStyle={ICON_STYLE}
                        />
                    </Col>

                    <Col className="gutter-row" span={6}>
                        <MyNavbarItem
                            lang={"agents"}
                            link={"/agents"}
                            icon={"/icons/robot_2.svg"}
                            onRerouted={onRereoute}
                            iconStyle={ICON_STYLE}
                        />
                    </Col>

                    <Col className="gutter-row" span={6}>
                        <MyNavbarItem
                            lang={"agents-tools"}
                            link={"/agents-tools"}
                            icon={"/icons/robot_2.svg"}
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
                            icon={"/icons/function.svg"}
                            onRerouted={onRereoute}
                            iconStyle={ICON_STYLE}
                        />
                    </Col>


                    <Col className="gutter-row" span={6}>
                        <MyNavbarItem
                            lang={"containers"}
                            link={"/containers"}
                            icon={"/icons/inventory_2.svg"}
                            onRerouted={onRereoute}
                            iconStyle={ICON_STYLE}
                        />
                    </Col>

                    <Col className="gutter-row" span={6}>
                        <MyNavbarItem
                            lang={"actors"}
                            link={"/actors"}
                            icon={"/icons/support_agent.svg"}
                            onRerouted={onRereoute}
                            iconStyle={ICON_STYLE}
                        />
                    </Col>

                    <Col className="gutter-row" span={6}>
                        <MyNavbarItem
                            lang={"flows"}
                            link={"/flows"}
                            icon={"/icons/flowsheet.svg"}
                            onRerouted={onRereoute}
                            iconStyle={ICON_STYLE}
                        />
                    </Col>
                </Row>


                <Divider orientation={"left"}>
                    3D:
                </Divider>

                <Row gutter={16}>
                    <Col className="gutter-row" span={6}>
                        <MyNavbarItem
                            lang={"scenes"}
                            link={"/scenes"}
                            icon={"/icons/article.svg"}
                            onRerouted={onRereoute}
                            iconStyle={ICON_STYLE}
                        />
                    </Col>
                </Row>

                <Divider orientation={"left"}>
                    {t("other")}:
                </Divider>

                <Row gutter={16}>
                    <Col className="gutter-row" span={6}>
                        <MyNavbarItem
                            lang={"documentation"}
                            link={"/documentation"}
                            icon={"/icons/article.svg"}
                            onRerouted={onRereoute}
                            iconStyle={ICON_STYLE}
                        />
                    </Col>

                    <Col className="gutter-row" span={6}>
                        <MyNavbarItem
                            lang={"llm.clusters"}
                            link={"/llm-clusters"}
                            icon={"/icons/graph_3.svg"}
                            onRerouted={onRereoute}
                            iconStyle={ICON_STYLE}
                        />
                    </Col>

                    <Col className="gutter-row" span={6}>
                        <MyNavbarItem
                            lang={"agents.incidents"}
                            link={"/agents-incidents"}
                            icon={"/icons/graph_3.svg"}
                            onRerouted={onRereoute}
                            iconStyle={ICON_STYLE}
                        />
                    </Col>


                    <Col className="gutter-row" span={6}>
                        <MyNavbarItem
                            lang={"themes"}
                            link={"/themes"}
                            icon={"/icons/graph_3.svg"}
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
    icon: any
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
                paddingTop: "5px",
                paddingBottom: "2.5px",
            }}
        >
            <div>

                {(typeof icon === "string") ? (
                    <Flex
                        justify="center"
                        align="center"
                    >
                        <img
                            src={icon}
                            style={{
                                width: "25px",
                                height: "25px",
                                ...(iconStyle ?? {})
                            }}
                            alt="icon"
                        />
                    </Flex>
                ) : (
                    <Flex
                        justify="center"
                        align="center"
                    >
                        {icon}
                    </Flex>
                )}

                <div style={{
                    textAlign: "center",
                    fontSize: "8px",
                    display: "block",
                    whiteSpace: "pre-wrap"
                }}>
                    <p dangerouslySetInnerHTML={{__html: t(lang ?? "").split(" ").join("<br>")}}/>
                </div>
            </div>
        </div>


    );
}