import {Flex} from "antd";
import React from "react";


export default function LLMChatTopBar({}) {


    return (
        <div style={{
            height: "45px",
            backgroundColor: "white",
            position: "relative",
            paddingLeft: "10px"
        }}>

            <Flex
                gap={5}
                style={{
                    paddingTop: "5px"
                }}
            >
                <div>x</div>

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
