import {Route} from "react-router-dom"
import React from "react"

const InventoryDock = React.lazy(() => import("@TurtleManufacturing/Inventory/InventoryDock"))
const BomDock = React.lazy(() => import("@TurtleManufacturing/BomDock/BomDock"))

export default function ManufacturingRoutes() {
    return [
        <Route key={"inventory"} path={"/inventory"} element={<InventoryDock/>}/>,
        <Route key={"bom"} path={"/manufacturing/bom"} element={<BomDock/>}/>,
        <Route key={"bom-uid"} path={"/manufacturing/bom/:bomUid"} element={<BomDock/>}/>,
    ]
}
