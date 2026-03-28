//https://claude.ai/chat/80ae40b6-c4c0-47ea-af53-27aec63b45a4

import React from "react"
import {Flex} from "antd";
import {useTurtleTheme} from "@Turtle/Theme/useTurleTheme"


import {theme as antdTheme} from 'antd';

interface TopBarWrapperConfig {
    isBottom?: boolean;
}

interface TopBarWrapperProps extends React.PropsWithChildren {
    config?: TopBarWrapperConfig
}

export default function TopBarWrapper({children, config}: TopBarWrapperProps) {

    return (
        <TopBarWrapperNoFlex config={config}>
            <Flex
                gap={5}
                style={{
                    paddingTop: "5px",
                }}
            >
                {children}
            </Flex>
        </TopBarWrapperNoFlex>
    )

}

export function TopBarWrapperNoFlex({children, config}: TopBarWrapperProps) {

    const {theme} = useTurtleTheme();

    const {token} = antdTheme.useToken()

    return (
        <div style={{
            height: theme.topBarHeightBig,
            backgroundColor: token.colorBgContainer,
            position: "relative",
            paddingLeft: "15px",
            paddingRight: "15px",
            width: "100%",
        }}>

            {children}

            <div
                style={{
                    backgroundColor: "rgb(230, 230, 230)",
                    height: "2px",
                    width: "100%",
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    ...(config?.isBottom ? {top: 0} : {bottom: 0})
                }}
            />
        </div>
    )
}