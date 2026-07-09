import React from "react";
import {Button, Col, Divider, Flex, Modal, Row, Tabs} from "antd";
import Search from "antd/es/input/Search";
import {useTranslation} from "react-i18next";

import IconWidgets from "@TurtleIcons/IconWidgets";
import {INavBarItem, MyNavbarItemBigger} from "@Turtle/Components/NavBar";
import {IWidgetCategory} from "@NavBar/NavBarInterface";
import {BASIC_CATEGORIES, NETESS_CATEGORIES} from "@NavBar/NavBarModules_Basic";
import {CRM_CATEGORIES} from "@TurtleCrm/NavBarModules_CRM";
import {SECURITY_CATEGORIES} from "@TurtleSecurity/NavBarModules_Security";
import {MANUFACTURING_CATEGORIES} from "@TurtleManufacturing/NavBarModules_Manufacturing";
import {ICON_STYLE} from "@TurtleApp/TurtleAppsGallery";
import ActorsDock from "@TurtleApp/Routes/Actors/ActorsDock";

interface ISimWidgetItem extends INavBarItem {
    popup?: boolean
}

const SIM_CATEGORIES: IWidgetCategory[] = [
    {
        titleKey: "simulation",
        items: [
            {
                lang: "actors",
                icon: "/icons/support_agent.svg",
                popup: true,
            } as ISimWidgetItem,
        ]
    },
]

export default function SimWorldWidgetsGallery() {

    const [t] = useTranslation()

    const [galleryVisible, setGalleryVisible] = React.useState(false)

    const [popupItem, setPopupItem] = React.useState<ISimWidgetItem | null>(null)

    function galleryPressed() {
        setGalleryVisible(true)
    }

    function itemSelected(item: ISimWidgetItem) {
        if (item.popup) {
            setGalleryVisible(false)
            setPopupItem(item)
        } else if (item.link) {
            window.open(`${window.origin}/#${item.link}`, "_blank")
        }
    }

    return (
        <>
            <Button
                onClick={galleryPressed}
                type={"text"}
            >
                <IconWidgets/>
            </Button>

            {
                galleryVisible && (
                    <Modal
                        title={t("widgets")}
                        closable={true}
                        onCancel={() => setGalleryVisible(false)}
                        open={true}
                        width={800}
                        footer={<></>}
                    >
                        <_SimWidgetsGalleryContent onItemSelected={itemSelected}/>
                    </Modal>
                )
            }

            {
                popupItem && (
                    <Modal
                        title={t(popupItem.lang ?? "")}
                        closable={true}
                        onCancel={() => setPopupItem(null)}
                        open={true}
                        width={1000}
                        footer={<></>}
                        styles={{body: {height: "80vh", padding: 0, overflow: "auto"}}}
                    >
                        {popupItem.lang === "actors" && <ActorsDock/>}
                    </Modal>
                )
            }
        </>
    )
}

interface _SimWidgetsGalleryContentProps {
    onItemSelected: (item: ISimWidgetItem) => void
}

function _SimWidgetsGalleryContent({onItemSelected}: _SimWidgetsGalleryContentProps) {

    const [t] = useTranslation()

    const [activeTab, setActiveTab] = React.useState("simulation")

    const [searchText, setSearchText] = React.useState("")

    const categories = React.useMemo(() => {
        if (activeTab === "simulation") {
            return SIM_CATEGORIES
        } else if (activeTab === "basic") {
            return BASIC_CATEGORIES
        } else if (activeTab === "crm") {
            return CRM_CATEGORIES
        } else if (activeTab === "turtlenetess") {
            return NETESS_CATEGORIES
        } else if (activeTab === "security") {
            return SECURITY_CATEGORIES
        } else if (activeTab === "manufacturing") {
            return MANUFACTURING_CATEGORIES
        }
        return []
    }, [activeTab])

    const filteredCategories = React.useMemo(() => {
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
    }, [categories, searchText, t])

    return (
        <Flex vertical>

            <Tabs
                activeKey={activeTab}
                onChange={setActiveTab}
                centered
                items={[
                    {
                        key: "simulation",
                        label: t("simulation"),
                    },
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
                        setSearchText(e.target.value)
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
                filteredCategories.map((category) => {
                    return (
                        <React.Fragment key={category.titleKey}>
                            <Divider titlePlacement={"start"}>
                                {t(category.titleKey)}:
                            </Divider>

                            <Row gutter={[16, 16]}>
                                {
                                    category.items.map((item) => {
                                        return (
                                            <Col key={item.link ?? item.lang} span={6}>
                                                <MyNavbarItemBigger
                                                    lang={item.lang}
                                                    icon={item.icon}
                                                    link={item.link}
                                                    onClick={() => onItemSelected(item as ISimWidgetItem)}
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
