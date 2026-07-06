import {Route} from "react-router-dom"
import React from "react"

const InventoryDock = React.lazy(() => import("@TurtleManufacturing/Inventory/InventoryDock"))
const BomDock = React.lazy(() => import("@TurtleManufacturing/BomDock/BomDock"))
const DemandDock = React.lazy(() => import("@TurtleManufacturing/Planning/DemandDock"))
const WorkCentersDock = React.lazy(() => import("@TurtleManufacturing/Planning/WorkCentersDock"))
const RoutingsDock = React.lazy(() => import("@TurtleManufacturing/Planning/RoutingsDock"))
const MrpDock = React.lazy(() => import("@TurtleManufacturing/Planning/MrpDock"))
const ApsDock = React.lazy(() => import("@TurtleManufacturing/Planning/ApsDock"))

export default function ManufacturingRoutes() {
    return [
        <Route key={"inventory"} path={"/inventory"} element={<InventoryDock/>}/>,
        <Route key={"bom"} path={"/manufacturing/bom"} element={<BomDock/>}/>,
        <Route key={"bom-uid"} path={"/manufacturing/bom/:bomUid"} element={<BomDock/>}/>,
        <Route key={"demand"} path={"/manufacturing/demand"} element={<DemandDock/>}/>,
        <Route key={"workcenters"} path={"/manufacturing/work-centers"} element={<WorkCentersDock/>}/>,
        <Route key={"routings"} path={"/manufacturing/routings"} element={<RoutingsDock/>}/>,
        <Route key={"mrp"} path={"/manufacturing/mrp"} element={<MrpDock/>}/>,
        <Route key={"aps"} path={"/manufacturing/aps"} element={<ApsDock/>}/>,
    ]
}
