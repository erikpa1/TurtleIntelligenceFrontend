import {Flex, Layout, Menu} from "antd";
import {ContainerOutlined, HomeOutlined, LinkOutlined} from "@ant-design/icons";
import {useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";

export default function AppNavBar() {

    const [t] = useTranslation()

    const navigate = useNavigate()

    return (
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
                    <Menu
                        style={{
                            border: "0px",
                            height: "100%",
                            display: "flex",
                            flexDirection: "column",
                        }}
                        items={[
                            {
                                key: "home",
                                icon: <HomeOutlined/>,
                                label: t("home"),
                                onClick: () => {
                                    navigate("/")
                                }
                            },
                            {
                                key: "containers",
                                icon: <ContainerOutlined/>,
                                label: t("containers"),
                                onClick: () => {
                                    navigate("/containers")
                                }
                            }
                        ]}
                    />
                </div>

            </Flex>
        </Layout.Sider>
    )
}