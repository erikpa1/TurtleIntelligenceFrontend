import {useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {Flex} from "antd";
import React from "react";

interface MyNavbarItemProps {
    lang?: string
    icon: any
    link?: string
    onClick?: () => void
    onRerouted?: () => void
    iconStyle?: any
}


export function NavBarIcon({icon}) {
    return React.createElement(icon, {
        width: "30px",
        height: "30px",
    })
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
                    fontSize: "12px",
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
                                width: "45px",
                                height: "45px",
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
                    fontSize: "18px",
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