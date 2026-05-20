import React from "react"
import {ConfigProvider, theme as antdTheme} from "antd";

import TurtleColors from "./src/Turtle/Constants/TurtleColors";
import {useThemeInit, useTurtleTheme} from "@Turtle/Theme/useTurleTheme";


export default function TurtleThemeProvider({
                                                children
                                            }) {


    const {theme, isLight} = useTurtleTheme()

    const {darkAlgorithm, defaultAlgorithm} = antdTheme

    const initTheme = useThemeInit()

    React.useEffect(() => {
        console.log("this should work")
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
                    Form: {
                        itemMarginBottom: 8,
                    },
                    Modal: {
                        borderRadius: 0,
                        borderRadiusLG: 0,
                        borderRadiusSM: 0,
                        titleColor: theme.primaryColor,
                        headerBg: TurtleColors.MUI_BACKGROUND,
                        contentBg: TurtleColors.MUI_BACKGROUND,
                        footerBg: TurtleColors.MUI_BACKGROUND,
                    }
                    // Add other input components as needed
                },
            }}
        >
            {React.Children.only(children)}
        </ConfigProvider>

    )
}

