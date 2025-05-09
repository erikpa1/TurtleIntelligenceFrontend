import React from "react";

import {ImageTileButton} from "../ui/ImageTileButton";


export function AddButton({}) {

    const [popupVisible, setPopupVisible] = React.useState(false)


    return (
        <div style={{
            position: "absolute",
            left: "50px",
            bottom: "25px"
        }}>
            <img
                style={{
                    width: "100px",
                    height: "100px",
                    cursor: "pointer"
                }}
                src={"/textures/add.png"}
                onClick={() => {
                    setPopupVisible(true)
                }}
            />

        </div>
    )
}

