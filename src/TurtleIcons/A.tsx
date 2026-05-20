import React from "react"
import {useTurtleTheme} from "@Turtle/Theme/useTurleTheme";


export default function TurtleIcon(props) {

    return (
        <span
            role={"img"}
            className={`anticon`}
            style={{
                // transform: "translateX(-50%) translateY(50%)",
            }}
        >
            <svg
                viewBox={props.viewBox ?? "0 0 24 24"}
                width={props.width ?? "24px"}
                height={props.height ?? "24px"}
                focusable={false}
                data-icon={"container"}
                aria-hidden={true}
            >
                {
                    React.Children.toArray(props.children)
                }
            </svg>
        </span>
    )

}

interface TurtleExperimentalIconProps {
    dPrimary?: string
    dSecondary?: string
}


export function TurtleExperimentalIcon(props: TurtleExperimentalIconProps | any) {


    const {theme} = useTurtleTheme()

    return (
        <span
            role={"img"}
            className={`anticon`}
            style={{
                // transform: "translateX(-50%) translateY(50%)",
            }}
        >
            <svg
                viewBox={props.viewBox ?? "0 0 24 24"}
                width={props.width ?? "24px"}
                height={props.height ?? "24px"}
                focusable={false}
                data-icon={"container"}
                aria-hidden={true}
            >
                {
                    props.dPrimary && (
                        <path
                            d={props.dPrimary}
                            fill={theme.iconPrimaryColor}/>
                    )
                }

                {
                    props.dSecondary && (
                        <path
                            d={props.dSecondary}
                            fill={theme.iconSecondaryColor}/>

                    )
                }


            </svg>
        </span>
    )

}
