import React from "react"

export function ImageTileButton({icon, onClick, text}) {
    return (
        <div
            style={{
                backgroundImage: "url('/textures/wheat-field.png')",
                cursor: "pointer",
            }}
            onClick={onClick}
        >
            <img
                src={icon}
                style={{
                    width: "100px",
                    height: "100px",
                }}
            />
            <div style={{color: "white"}}>

            </div>
        </div>
    )
}