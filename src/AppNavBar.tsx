import {Flex, Layout, Modal,} from "antd";

import {useNavigate} from "react-router-dom"
import {useTranslation} from "react-i18next"
import {IconSimulation, IconWidgets} from "@Turtle/Icons"

import React from "react"

import "./AppNavBar.css"
import {MyNavbarItem, NavBarIcon,} from "@Turtle/Components/NavBar"
import TurtleAppsGallery, {ICON_STYLE} from "@TurtleApp/TurtleAppsGallery"
import IconChat from "@Turtle/Icons/IconChat";
import IconSupportAgent from "@Turtle/Icons/IconSupportAgent"
import IconArticlePerson from "@Turtle/Icons/IconArticlePerson"
import IconHub from "@Turtle/Icons/IconHub"
import {useTurtleTheme} from "@Turtle/Theme/useTurleTheme";

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


                    <div style={{
                        width: "100%",
                        marginBottom: "10px",
                        marginTop: "10px"
                    }}>

                        <MyNavbarItem
                            icon={<NavBarIcon icon={IconWidgets}/>}
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
                            icon={<NavBarIcon icon={IconSimulation}/>}
                            link={"/sim-models"}
                            lang={"simulations"}
                            iconStyle={ICON_STYLE}
                        />

                        <MyNavbarItem
                            icon={<NavBarIcon icon={IconChat}/>}
                            link={"/llm-chat"}
                            lang={"aichat"}
                            iconStyle={ICON_STYLE}
                        />

                        <MyNavbarItem
                            icon={<NavBarIcon icon={IconSupportAgent}/>}
                            link={"/llm-agent-chat"}
                            lang={"agent.chat"}
                            iconStyle={ICON_STYLE}
                        />

                        <MyNavbarItem
                            icon={<NavBarIcon icon={IconArticlePerson}/>}
                            link={"/doc-int"}
                            lang={"document.intelligence"}
                            iconStyle={ICON_STYLE}
                        />

                        <MyNavbarItem
                            icon={<NavBarIcon icon={IconHub}/>}
                            lang={"knowledgehub"}
                            link={"/kh"}
                            iconStyle={ICON_STYLE}
                        />

                        <MyNavbarItem
                            lang={"login"}
                            link={"/login"}
                            icon={<NavBarIcon icon={IconArticlePerson}/>}
                            iconStyle={ICON_STYLE}
                        />

                    </div>


                    <button onClick={() => {
                        useTurtleTheme.getState().swapTheme()
                    }}>
                        Theme
                    </button>

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

function _WidgetsView({onRereoute}) {

    const [t] = useTranslation()

    return (
        <Modal
            title={t("widgets")}
            closable={true}
            onCancel={onRereoute}
            open={true}
            width={800}
            footer={<></>}
        >
            <TurtleAppsGallery onRereoute={onRereoute}/>
        </Modal>
    )
}