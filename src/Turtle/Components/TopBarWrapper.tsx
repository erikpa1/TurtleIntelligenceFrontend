//https://claude.ai/chat/80ae40b6-c4c0-47ea-af53-27aec63b45a4

import React from "react"
import {Flex} from "antd";

export default function TopBarWrapper({children}) {
    return (
        <div style={{
            height: "45px",
            backgroundColor: "white",
            position: "relative",
            paddingLeft: "15px",
            paddingRight: "15px",
        }}>

            <Flex
                gap={5}
                style={{
                    paddingTop: "5px",
                }}
            >
                {children}
            </Flex>

            <div
                style={{
                    backgroundColor: "rgb(230, 230, 230)",
                    height: "2px",
                    width: "100%",
                    position: "absolute",
                    bottom: 0,
                    left: 0
                }}
            />
        </div>
    )
}