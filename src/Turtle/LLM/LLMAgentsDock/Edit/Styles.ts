import ColorConstants from "@Turtle/Constants/ColorConstants";
import React from "react";


const INPUT_SIZE = 8


export const OUTPUT_HANDLE_STYLE: React.CSSProperties = {
    right: -3,
    width: INPUT_SIZE,
    height: INPUT_SIZE,
    backgroundColor: ColorConstants.WHITE,
    borderColor: ColorConstants.GRAY,
    borderRadius: 0,
    borderBottomLeftRadius: "50%",
    borderTopLeftRadius: "50%",
}

export const INPUT_HANDLE_STYLE: React.CSSProperties = {
    left: -3,
    width: INPUT_SIZE,
    height: INPUT_SIZE,
    backgroundColor: ColorConstants.WHITE,
    borderColor: ColorConstants.GRAY,
    borderRadius: 0,
    borderBottomRightRadius: "50%",
    borderTopRightRadius: "50%",
}


export const SUBNODE_HANDLE_STYLE: React.CSSProperties = {
    bottom: -INPUT_SIZE / 2,
    width: INPUT_SIZE,
    height: INPUT_SIZE,
    backgroundColor: ColorConstants.WHITE,
    borderColor: ColorConstants.GRAY,
    transform: `translateX(-50%) rotate(45deg)`,
    borderRadius: 0
}