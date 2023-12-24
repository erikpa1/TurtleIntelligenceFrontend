import React from "react";

import {useTranslation} from "react-i18next";

import {useNavigate} from "react-router-dom";

import {Image} from "react-bootstrap";


import "./AppNavBar.css";


export default function AppNavbarNew() {
    const [t] = useTranslation();


    const WIDTH = "50px"

    return (
        <div
            className={"navbarbody"}
            id="navbar"
            style={{
                width: WIDTH,
                height: "100vh",
                float: "left",
            }}
        >
            <div

                style={{
                    // boxShadow: "rgba(0, 0, 0, 0.15) 0px 5px 15px",
                    touchAction: "none",
                    position: "fixed",
                    left: "0px",
                    height: "100vh",
                    width: WIDTH,
                    zIndex: 1,
                    backgroundColor: "#212124",
                }}
            >

                <div className="vstack gap-3">

                    <div style={{
                        marginTop: "15px"
                    }}/>

                    <MyNavbarItem
                        lang={"Monitor"}
                        link={"/monitoring"}
                        icon={"/icons/dtword.svg"}
                    />

                    <MyNavbarItem
                        lang={"Analysis"}
                        link={"/analysis"}
                        icon={"/icons/chart.svg"}
                    />

                    <MyNavbarItem
                        lang={"Twins"}
                        link={"/twins"}
                        icon={"/icons/spot.svg"}
                    />

                    <MyNavbarItem
                        lang={"I/O"}
                        link={"/io"}
                        icon={"/icons/spot.svg"}
                    />

                    <MyNavbarItem
                        lang={"Sewio"}
                        link={"/sewio"}
                        icon={"/icons/companies/sewio-short.svg"}
                    />

                    <hr style={{color: "lightgray"}}/>

                    <_Version/>

                </div>


            </div>
        </div>
    );
}


interface MyNavbarItemProps {
    lang: string;
    icon: string;
    link?: string;
    onClick?: () => void;
}

function MyNavbarItem({lang, icon, link, onClick}: MyNavbarItemProps) {
    const navigate = useNavigate();

    const [t] = useTranslation();

    const iconComponent = (
        <Image
            src={icon}
            style={{
                margin: "auto",
                width: "20px",
                height: "20px",
            }}
        />
    );

    return (
        <div
            className={"navbaritem"}
            onClick={() => {
                if (onClick) {
                    onClick();
                } else if (link) {
                    navigate(link);
                }
            }}
            style={{
                paddingTop: "2.5px",
                paddingBottom: "2.5px",
            }}
        >
            <div className="vstack">
                {iconComponent}
                <div style={{
                    color: "#888888",
                    textAlign: "center",
                    fontSize: "10px"
                }}>
                    {t(lang)}
                </div>
            </div>
        </div>
    );
}


function _SettingsNavItem({}) {
    const [show, setShow] = React.useState(false);

    return (
        <>
            <MyNavbarItem
                icon={"/icons/settings.svg"}
                lang={"settings"}
                onClick={() => {
                    setShow(true);
                }}
            />

        </>
    )
}


function _Version({}) {
    return (
        <div style={{
            position: "absolute",
            bottom: "0px",
            left: "50%",
            transform: "translate(-50%, 0)",
            color: "lightgray"
        }}>
            v0.1.1
        </div>
    )
}