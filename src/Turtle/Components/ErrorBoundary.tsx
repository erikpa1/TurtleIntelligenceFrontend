/*
Copied from:
https://github.com/erikpa1/InfinityTwinMobile/tree/main
 */

import React from "react"
import {useTranslation} from "react-i18next"

import {Button, Divider, Flex, Typography} from "antd"


interface ErrorBoundaryProps {
    children: any
    onError?: any
    onErrorCustom?: any
}

export default class ErrorBoundary extends React.Component<
    ErrorBoundaryProps,
    any
> {
    constructor(props) {
        super(props)
        this.state = {error: ""}
    }

    componentDidCatch(error) {
        this.setState({error: `${error.name}: ${error.message}`})
    }

    render(): any {
        const {error} = this.state as any

        if (error) {
            if (this.props.onError) {
                return this.props.onError
            } else if (this.props.onErrorCustom) {
                return React.createElement(this.props.onErrorCustom, {
                    error: error,
                })
            } else {
                return <_ErrorView error={error}/>
            }
        } else {
            return <>{this.props.children}</>
        }
    }
}

const STYLES: {
    [key: string]: React.CSSProperties
} = {
    FirstLevel: {
        position: "fixed",
        left: "0px",
        right: "0px",
        width: "100vw",
        height: "100vh",
        background: "white",
        padding: "8vh 12vw 4vh 4vw",
    },
    SecondLevel1Row: {height: "50%"},
    SecondLevel2Row: {
        height: "50%",
        display: "flex",
        justifyContent: "center",
        alignItems: "top",
    },
    imgOuter: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        width: "100%",
    },
    img: {
        objectFit: "scale-down",
    },
    shadBox: {
        height: "100%",
        marginTop: "4vh",
        backgroundColor: "transparent",
        boxShadow: "none",
    },
    ErrorPlace: {
        width: "85%",
        height: "100%",
    },
    ErrorType: {
        fontWeight: "900",
        fontSize: "16px",
        marginBottom: "4px",
        cursor: "default",
    },
    ErrorText: {
        fontFamily: "system-ui",
        margin: 0,
        fontWeight: "1000",
        textAlign: "center",
    },
    MainButton: {
        borderRadius: "6px",
        backgroundColor: "#e1636b",
        fontWeight: "1000",
        padding: "20px 28px",
        width: "100%",
    },
    Divider: {
        borderBlockStart: "2px",
        borderColor: "#d5d5d5",
        margin: "0px",
        padding: "0px",
    },
    ResetButton: {
        padding: "6px",
        height: "20px",
        borderRadius: "4px",
    },
    ResetButtonText: {cursor: "pointer"},
    OR: {
        fontSize: "13px",
        cursor: "default",
    },
    OuterButtons: {
        marginTop: "4%",
    },
    OuterDivider: {
        padding: "8px",
        paddingBottom: "0px",
    },
}


function _ErrorView({error = ""}): any {
    const [t] = useTranslation()

    const [isClosed, setIsClosed] = React.useState(false)

    const [errorType, errorText] = error.toString().split(":") || [
        "Error",
        error.toString(),
    ]

    if (isClosed) {
        return <></>
    } else {
        return (
            <div style={STYLES.FirstLevel}>
                <_ErrorCoreCompactErrorView
                    error={error}
                    errorType={errorType}
                    errorText={errorText}
                    setIsClosed={setIsClosed}
                />
            </div>
        )
    }
}

interface CompactErrorViewProps {
    error?: any
}

export function CompactErrorView({error = ""}: CompactErrorViewProps): any {
    return (
        <_ErrorCoreCompactErrorView
            error={error}
            errorType={""}
            errorText={error}
            setIsClosed={() => {
                //pass
            }}
        />
    )
}

export function _ErrorCoreCompactErrorView({error, errorType, errorText, setIsClosed}): any {
    const [t] = useTranslation()

    return (
        <div style={{height: "100%"}}>

            <div style={STYLES.SecondLevel1Row}>
                <div style={STYLES.imgOuter}>
                    {/*<div style={{background:"red", width:"100%", height:"100%"}}>*/}
                    {/*</div>*/}
                    <img
                        src={"/textures/error_screen.png"}
                        height={"85%"}
                        width={"85%"}
                        style={STYLES.img}
                    />
                </div>
            </div>
            <div style={STYLES.SecondLevel2Row}>
                <div style={STYLES.ErrorPlace}>

                    <Flex
                        gap={1}
                        align="center"
                        justify="center"
                        vertical={true}
                        wrap={false}
                    >
                        <Typography.Text disabled style={STYLES.ErrorType}>
                            {errorType}:
                        </Typography.Text>

                        <Typography.Title
                            level={4}
                            style={STYLES.ErrorText}
                        >
                            {errorText}
                        </Typography.Title>

                        <div style={STYLES.OuterButtons}>
                            <Button
                                type="primary"
                                style={STYLES.MainButton}
                                size="large"
                                onClick={() => {
                                    window.location.reload()
                                    setIsClosed(true)
                                }}
                            >
                                {t("CONTINUE & REPORT")}
                            </Button>
                            <div style={STYLES.OuterDivider}>
                                <Divider style={STYLES.Divider}>
                                    <Typography.Text disabled style={STYLES.OR}>
                                        OR
                                    </Typography.Text>
                                </Divider>
                            </div>

                        </div>
                    </Flex>

                </div>
            </div>
        </div>
    )

}
