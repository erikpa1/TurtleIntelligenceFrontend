import {useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {Divider, Flex} from "antd";
import React from "react";

import "./NavBar.css"

interface MyNavbarItemProps {
    lang?: string
    icon: any
    link?: string
    onClick?: () => void
    onRerouted?: () => void
    iconStyle?: any
}


export function MyNavbarItem({lang, icon, link, onClick, onRerouted, iconStyle}: MyNavbarItemProps) {
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


export function MyNavbarItemBigger({lang, icon, link, onClick, onRerouted, iconStyle}: MyNavbarItemProps) {
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
                paddingTop: "8px",
                paddingBottom: "5px",
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
                                width: "32px",
                                height: "32px",
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


export interface INavBarItem {
    lang?: string
    icon: any
    link?: string

}


// Enhanced Widget Card
export function EnhancedWidgetCard({item, onRerouted}: { item: INavBarItem; onRerouted: () => void }) {
    const navigate = useNavigate();
    const [t] = useTranslation();

    return (
        <div
            onClick={() => {
                if (item.link) {
                    navigate(item.link);
                    onRerouted();
                }
            }}
            style={{
                padding: "16px",
                borderRadius: "12px",
                border: "1px solid #e8e8e8",
                cursor: "pointer",
                transition: "all 0.3s ease",
                background: "#fff",
                textAlign: "center",
                height: "100%",
            }}
            className="widget-card"
        >
            <Flex vertical align="center" gap={12}>
                <div
                    style={{
                        width: "48px",
                        height: "48px",
                        borderRadius: "10px",
                        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        transition: "all 0.3s ease",
                    }}
                    className="widget-icon"
                >
                    {typeof item.icon === "string" ? (
                        <img
                            src={item.icon}
                            style={{width: "28px", height: "28px", filter: "brightness(0) invert(1)"}}
                            alt="icon"
                        />
                    ) : (
                        <div style={{color: "white"}}>{item.icon}</div>
                    )}
                </div>

                <div
                    style={{
                        fontSize: "13px",
                        fontWeight: 500,
                        color: "#333",
                        lineHeight: 1.4,
                    }}
                >
                    {t(item.lang ?? "")}
                </div>
            </Flex>


        </div>
    );
}


export function LogoComponent({}) {
    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                marginBottom: "24px",
                paddingTop: "8px",
            }}
        >
            <div
                style={{
                    width: "48px",
                    height: "48px",
                    borderRadius: "12px",
                    background: "rgba(255, 255, 255, 0.95)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                }}
                className="navbar-logo"
            >
                {/* Logo icon placeholder */}
            </div>
        </div>
    )
}