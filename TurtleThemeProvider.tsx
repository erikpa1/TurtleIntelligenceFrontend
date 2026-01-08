import React from "react"
import {ConfigProvider, theme as antdTheme} from "antd";

import ColorConstants from "@Turtle/Constants/ColorConstants";
import {useThemeInit, useTurtleTheme} from "@Turtle/Theme/useTurleTheme";


export default function TurtleThemeProvider({
                                                children
                                            }) {


    const {theme, isLight} = useTurtleTheme()

    const {darkAlgorithm, defaultAlgorithm} = antdTheme

    const initTheme = useThemeInit()

    React.useEffect(() => {
        initTheme()
    }, [])

    return (
        <ConfigProvider
            theme={{
                algorithm: isLight ? defaultAlgorithm : darkAlgorithm,
                token: {
                    colorPrimary: theme.primaryColor,
                    borderRadius: 0,
                },
                components: {
                    Button: {
                        defaultBorderColor: theme.primaryColor,
                        defaultHoverBorderColor: theme.borderHoverColor
                    },
                    Input: {
                        borderRadius: 0, // Makes inputs square
                    },
                    // Also apply to other input components if needed
                    InputNumber: {
                        borderRadius: 0,

                    },
                    Select: {
                        borderRadius: 0,
                    },
                    DatePicker: {
                        borderRadius: 0,
                    },
                    Modal: {
                        borderRadius: 0,
                        borderRadiusLG: 0,
                        borderRadiusSM: 0,
                        titleColor: theme.primaryColor,
                        headerBg: ColorConstants.MUI_BACKGROUND,
                        contentBg: ColorConstants.MUI_BACKGROUND,
                        footerBg: ColorConstants.MUI_BACKGROUND,
                    }
                    // Add other input components as needed
                },
            }}
        >
            {React.Children.only(children)}
        </ConfigProvider>

    )
}

