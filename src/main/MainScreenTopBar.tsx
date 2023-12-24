import React from "react";


export function MainScreenTopBar({}) {
    return (
        <div className={"hstack gap-1"}>
            <TopBarButton
                icon={"/textures/goldbar.png"}
            />
            <TopBarButton
                icon={"/textures/stoneblock.png"}
            />
            <TopBarButton
                icon={"/textures/woodblock.png"}
            />
        </div>
    )
}

interface TopBarButtonProps {
    icon: string
}

export function TopBarButton({icon}) {
    return (
        <div style={{
            backgroundColor: "black",
            borderRadius: "15%",
            padding: "5px",
            minWidth: "100px"
        }}>
            <div className={"hstack gap-3"}>
                <img
                    src={icon}
                    style={{
                        width: "25px",
                        height: "25px"
                    }}
                />
                <div style={{color: "white"}}>
                    100
                </div>
            </div>
        </div>
    )
}