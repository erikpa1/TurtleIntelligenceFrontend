import {Col, Divider, Flex, Layout, Modal, Row, Input, Badge, Tooltip} from "antd";
import {useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {IconSimulation} from "@Turtle/Icons";
import React from "react";
import "./AppNavBar.css";
import {EnhancedWidgetCard, INavBarItem, MyNavbarItem} from "@Turtle/Components/NavBar";

const {Search} = Input;

export default function AppNavBar() {
    const [t] = useTranslation();
    const navigate = useNavigate();
    const [modalVisible, setModalVisible] = React.useState(false);

    function showWidgets() {
        setModalVisible(true);
    }

    return (
        <div>
            <Layout.Sider
                collapsed={true}
                collapsedWidth={80}
                width={80}
                style={{
                    background: "linear-gradient(180deg, #01579b 0%, #0288d1 30%, #4fc3f7 65%, #81d4fa 85%, #b3e5fc 100%)",
                    height: "100dvh",
                    position: "fixed",
                    borderRight: "none",
                    boxShadow: "4px 0 24px rgba(102, 126, 234, 0.2)",
                    overflowY: "auto",
                    overflowX: "hidden",
                    insetInlineStart: 0,
                    top: 0,
                    bottom: 0,
                    scrollbarWidth: "thin",
                    scrollbarColor: "rgba(255,255,255,0.3) transparent",
                    zIndex: 1000,
                }}
            >
                <Flex
                    vertical
                    align="center"
                    style={{height: "100%", padding: "16px 8px"}}
                    justify="space-between"

                >
                    <div style={{width: "100%", display: "flex", flexDirection: "column"}}>
                        {/* Logo Area */}


                        {/* Widgets Button */}
                        <EnhancedNavbarItem
                            icon={"/icons/widgets.svg"}
                            iconStyle={{width: "28px", height: "28px"}}
                            onClick={showWidgets}
                            lang={"widgets"}
                            badge={12}
                        />

                        <div style={{margin: "12px 0"}}>
                            <Divider style={{margin: 0, borderColor: "rgba(255,255,255,0.2)"}}/>
                        </div>

                        {/* Main Navigation Items */}
                        <EnhancedNavbarItem
                            // icon={<IconSimulation width={"28px"} height={"28px"}/>}
                            link={"/"}
                            icon={"/icons/simulation.svg"}
                            lang={"simulations"}
                        />

                        <EnhancedNavbarItem
                            icon={"/icons/chat.svg"}
                            link={"/llm-chat"}
                            lang={"aichat"}
                            badge={3}
                        />

                        <EnhancedNavbarItem
                            icon={"/icons/chat.svg"}
                            link={"/llm-agent-chat"}
                            lang={"agent.chat"}
                        />

                        <EnhancedNavbarItem
                            icon={"/icons/article_person.svg"}
                            link={"/doc-int"}
                            lang={"document.intelligence"}
                        />

                        <EnhancedNavbarItem
                            lang={"knowledgehub"}
                            link={"/knowledge-hub"}
                            icon={"/icons/article_person.svg"}
                        />

                        <div style={{margin: "12px 0"}}>
                            <Divider style={{margin: 0, borderColor: "rgba(255,255,255,0.2)"}}/>
                        </div>

                        <EnhancedNavbarItem
                            lang={"login"}
                            link={"/login"}
                            icon={"/icons/article_person.svg"}
                        />
                    </div>
                </Flex>
            </Layout.Sider>

            {modalVisible && <_WidgetsView onRereoute={() => setModalVisible(false)}/>}

        </div>
    );
}

// Enhanced Navbar Item Component
interface EnhancedNavbarItemProps {
    lang?: string;
    icon: any;
    link?: string;
    onClick?: () => void;
    iconStyle?: any;
    badge?: number;
}

function EnhancedNavbarItem({
                                lang,
                                icon,
                                link,
                                onClick,
                                iconStyle,
                                badge,
                            }: EnhancedNavbarItemProps) {
    const navigate = useNavigate();
    const [t] = useTranslation();

    const content = (
        <div
            className="enhanced-navbar-item"
            onMouseDown={(e) => {
                if (e.button === 1 && link) {
                    window.open(`${window.origin}/#${link}`, "_blank");
                }
            }}
            onClick={() => {
                if (onClick) {
                    onClick();
                } else if (link) {
                    navigate(link);
                }
            }}
        >
            <Badge count={badge} size="small" offset={[-4, 4]}>
                <div className="icon-wrapper">
                    {typeof icon === "string" ? (
                        <img
                            src={icon}
                            style={{
                                width: "24px",
                                height: "24px",
                                ...iconStyle,
                            }}
                            alt="icon"
                        />
                    ) : (
                        <div style={{color: "white"}}>{icon}</div>
                    )}
                </div>
            </Badge>

            {lang && (
                <div
                    className="label"
                    dangerouslySetInnerHTML={{__html: t(lang).split(" ").join("<br>")}}
                />
            )}
        </div>
    );

    return lang ? (
        <Tooltip title={t(lang)} placement="right" color="#667eea">
            {content}
        </Tooltip>
    ) : (
        content
    );
}

// Widget Categories Data
const AI_WIDGETS: INavBarItem[] = [
    {lang: "neuralnetworks", icon: "/icons/network_intel_node.svg", link: "/nn"},
    {lang: "llm.models", icon: "/icons/ollama.svg", link: "/llms"},
    {lang: "agents", icon: "/icons/robot_2.svg", link: "/agents"},
    {lang: "agents-tools", icon: "/icons/robot_2.svg", link: "/agents-tools"},
];

const DATA_WIDGETS: INavBarItem[] = [
    {lang: "functions", icon: "/icons/function.svg", link: "/functions"},
    {lang: "containers", icon: "/icons/inventory_2.svg", link: "/containers"},
    {lang: "actors", icon: "/icons/support_agent.svg", link: "/actors"},
    {lang: "resources", icon: "/icons/support_agent.svg", link: "/resources"},
    {lang: "flows", icon: "/icons/flowsheet.svg", link: "/flows"},
    {lang: "tables", icon: "/icons/flowsheet.svg", link: "/tables"},
    {lang: "table.data", icon: "/icons/flowsheet.svg", link: "/table-data"},
    {lang: "forecasting", icon: "/icons/flowsheet.svg", link: "/forecasting"},
];

const THREED_WIDGETS: INavBarItem[] = [
    {lang: "scenes", icon: "/icons/article.svg", link: "/scenes"},
];

const OTHER_WIDGETS: INavBarItem[] = [
    {lang: "documentation", icon: "/icons/article.svg", link: "/documentation"},
    {lang: "llm.clusters", icon: "/icons/graph_3.svg", link: "/llm-clusters"},
    {lang: "agents.incidents", icon: "/icons/graph_3.svg", link: "/agents-incidents"},
    {lang: "themes", icon: "/icons/graph_3.svg", link: "/themes"},
];

interface IWidgetCategory {
    titleKey: string;
    items: INavBarItem[];
}

const WIDGET_CATEGORIES: IWidgetCategory[] = [
    {titleKey: "AI", items: AI_WIDGETS},
    {titleKey: "data", items: DATA_WIDGETS},
    {titleKey: "3D", items: THREED_WIDGETS},
    {titleKey: "other", items: OTHER_WIDGETS},
];

// Enhanced Widgets Modal
function _WidgetsView({onRereoute}) {
    const [t] = useTranslation();
    const [searchText, setSearchText] = React.useState("");

    const filteredCategories = React.useMemo(() => {
        if (!searchText) return WIDGET_CATEGORIES;

        return WIDGET_CATEGORIES.map((category) => ({
            ...category,
            items: category.items.filter((item) =>
                t(item.lang ?? "")
                    .toLowerCase()
                    .includes(searchText.toLowerCase())
            ),
        })).filter((category) => category.items.length > 0);
    }, [searchText, t]);

    return (
        <Modal
            title={
                <div style={{fontSize: "20px", fontWeight: 600, color: "#667eea"}}>
                    {t("widgets")}
                </div>
            }
            closable={true}
            onCancel={onRereoute}
            open={true}
            width={900}
            footer={null}
            styles={{
                body: {padding: "24px"},
            }}
        >
            <Flex vertical gap={24}>
                <div style={{display: "flex", justifyContent: "center"}}>
                    <Search
                        placeholder={t("search") || "Search widgets..."}
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        style={{
                            width: "400px",
                            borderRadius: "8px",
                        }}
                        size="large"
                        allowClear

                    />
                </div>

                {filteredCategories.map((category) => (
                    <React.Fragment key={category.titleKey}>
                        <Divider
                            orientation="left"
                            style={{
                                fontSize: "16px",
                                fontWeight: 600,
                                color: "#667eea",
                                borderColor: "#e8e8e8",
                            }}
                        >
                            {category.titleKey === "3D" ? category.titleKey : t(category.titleKey)}
                        </Divider>

                        <Row gutter={[16, 64]}>
                            {category.items.map((item) => (
                                <Col key={item.link} span={6}>
                                    <EnhancedWidgetCard item={item} onRerouted={onRereoute}/>
                                </Col>
                            ))}
                        </Row>
                    </React.Fragment>
                ))}

                {filteredCategories.length === 0 && (
                    <div
                        style={{
                            textAlign: "center",
                            padding: "48px 0",
                            color: "#999",
                            fontSize: "14px",
                        }}
                    >
                        No widgets found matching "{searchText}"
                    </div>
                )}
            </Flex>
        </Modal>
    );
}
