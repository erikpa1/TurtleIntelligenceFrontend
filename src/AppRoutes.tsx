import React from "react"

import {Route, Routes} from "react-router-dom"
import NNDock from "@TurtleApp/Routes/NN/NNDock";


const ContainersDock = React.lazy(() => import("@TurtleApp/Routes/ContainersDock/ContainersDock"))
const WorldDock = React.lazy(() => import("@TurtleApp/Routes/WorldDock/WorldDock"))
const ModelsDock = React.lazy(() => import( "@TurtleApp/Routes/ModelsDock/ModelsDock"))

export default function AppRoutes({}) {
    return (
        <Routes>
            <Route path={"/"} element={<ModelsDock/>}/>
            <Route path={"/model/:modelUid"} element={<WorldDock/>}/>
            <Route path={"/containers"} element={<ContainersDock/>}/>
            <Route path={"/nn"} element={<NNDock/>}/>
        </Routes>
    );
}
