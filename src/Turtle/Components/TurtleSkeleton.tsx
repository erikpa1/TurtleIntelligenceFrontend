import React from "react"
import {Skeleton} from "antd";
import {useTurtleTheme} from "@Turtle/Theme/useTurleTheme";


export function TurtleSkeleton({paragraph = {rows: 4}}) {

    const {bigPadding} = useTurtleTheme()

    return (
        <div style={{
            padding: bigPadding
        }}>
            <Skeleton
                paragraph={paragraph}
                active
            />
        </div>
    )
}