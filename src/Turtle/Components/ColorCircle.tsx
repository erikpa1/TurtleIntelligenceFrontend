import React from "react"

interface ColorCircleProps {
    color: string
    size?: string
}

export default function ColorCircle({
                                        color,
                                        size = "12px"
                                    }: ColorCircleProps) {
    return (
        <div
            style={{
                width: size,
                height: size,
                borderRadius: "50%",
                backgroundColor: color,
                border: "1px solid rgba(100, 100, 100, 2)",
                boxShadow: "inset 0 0px 2px rgba(0, 0, 0, 0.5)",
                verticalAlign: 'middle'
            }}
        />
    )
}