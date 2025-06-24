//https://claude.ai/chat/9669054e-1d62-4e1e-af33-41402225e578

import React from "react"
import {Flex, Spin} from "antd";


export function CenterSpinner() {
    return (
        <Flex
            justify="center"
            align="center"
            style={{height: '400px'}}>
            <Spin size="large"/>
        </Flex>
    )
}