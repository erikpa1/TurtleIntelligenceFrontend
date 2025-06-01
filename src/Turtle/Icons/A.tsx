import React from "react"

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
                width={props.width ?? "1m"}
                height={props.height ?? "1m"}
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