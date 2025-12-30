import React from "react"
import {ConfigProvider} from "antd";

import ColorConstants from "@Turtle/Constants/ColorConstants";
import {useThemeInit, useTurtleTheme} from "@Turtle/Theme/useTurleTheme";


export default function TurtleThemeProvider({
                                                children
                                            }) {


    const {theme} = useTurtleTheme()

    const initTheme = useThemeInit()

    React.useEffect(() => {
        initTheme()
    }, [])

    return (
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: theme.primaryColor,
                    borderRadius: 0,
                },
                components: {
                    Button: {
                        defaultBorderColor: theme.borderColor,
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
                    }
                    // Add other input components as needed
                },
            }}
        >
            {React.Children.only(children)}
        </ConfigProvider>

    )
}