import ColorConstants from "@Turtle/Constants/ColorConstants";
import Icon from "@ant-design/icons"
import TurtleIcon from "@Turtle/Icons/A";
import React from "react";

export default function IconColor(props: any = {}) {

    return (
        <TurtleIcon
            {...props}
            viewBox={"0 -960 960 960"}
        >

            <path
                fill={props.color ?? "#666666"}
                d="M480-140q-124.92 0-212.46-86.35Q180-312.69 180-435.62q0-62.53 23.66-114.69 23.65-52.15 64.19-93.84L480-852.31l212.15 208.16q40.54 41.69 64.19 94.42Q780-497 780-435.62q0 122.93-87.54 209.27Q604.92-140 480-140Zm0-60v-568L310-600q-35 33-52.5 74.69T240-435.62q0 97 70 166.31T480-200Z"/>

        </TurtleIcon>
    )


}