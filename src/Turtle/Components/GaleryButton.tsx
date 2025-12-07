import {useTranslation} from "react-i18next"
import {Flex} from "antd"
import React from "react"


interface GalleryButtonProps {
    lang?: string
    icon: any
    onClick?: () => void
}

export function GalleryButton({lang, icon, onClick}: GalleryButtonProps) {

    const [t] = useTranslation();

    return (
        <div
            onClick={onClick}
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
                                width: "55px",
                                height: "55px",
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
                    fontSize: "15px",
                    display: "block",
                    whiteSpace: "pre-wrap"
                }}>
                    <p dangerouslySetInnerHTML={{__html: t(lang ?? "").split(" ").join("<br>")}}/>
                </div>
            </div>
        </div>


    );
}
