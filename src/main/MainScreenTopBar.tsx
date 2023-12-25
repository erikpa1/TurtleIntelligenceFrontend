import React from "react";
import anyEventEmmiter from "../api/AnyEventEmmiter";
import {Warehouse} from "../api/SimulationApi";


export function MainScreenTopBar({}) {
    return (
        <div>
            <div className={"hstack gap-1"}>
                <TopBarWarehouseButton
                    icon={"/textures/peasant.png"}
                    resource_key={"peasant"}
                />
                <TopBarWarehouseButton
                    icon={"/textures/goldbar.png"}
                    resource_key={"gold"}
                />
                <TopBarWarehouseButton
                    icon={"/textures/stoneblock.png"}
                    resource_key={"stone"}
                />
                <TopBarWarehouseButton
                    icon={"/textures/food.png"}
                    resource_key={"food"}
                />
                <TopBarWarehouseButton
                    icon={"/textures/woodlog.png"}
                    resource_key={"woodlogs"}
                />
                <TopBarWarehouseButton
                    icon={"/textures/woodblock.png"}
                    resource_key={"wood"}
                />
            </div>

        </div>
    )
}

interface TopBarButtonProps {
    icon: string
}

interface TopBarWarehouseButtonProps {
    icon: string
    resource_key: string
}

function TopBarWarehouseButton({icon, resource_key}: TopBarWarehouseButtonProps) {

    const [state, setState] = React.useState(0)


    React.useEffect(() => {

        const refreshVal = (warehouse: Warehouse) => {
            setState(warehouse.GetResource(resource_key))

        }

        anyEventEmmiter.on("warehouse", refreshVal)

        return () => {
            anyEventEmmiter.off("warehouse", refreshVal)
        }

    }, [])

    return (
        <TopBarButton
            icon={icon}
            value={state}
        />
    )
}

export function TopBarButton({icon, value}) {
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
                    {value}
                </div>
            </div>
        </div>
    )
}

