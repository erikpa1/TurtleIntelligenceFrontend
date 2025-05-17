import React from "react"

import {Route, Routes} from "react-router-dom"


const DocumentationDock = React.lazy(() => import("@TurtleApp/Routes/Documentation/DocumentationDock"))
const ContainersDock = React.lazy(() => import("@TurtleApp/Routes/ContainersDock/ContainersDock"))
const WorldDock = React.lazy(() => import("@TurtleApp/Routes/WorldDock/WorldDock"))
const ModelsDock = React.lazy(() => import( "@TurtleApp/Routes/ModelsDock/ModelsDock"))
const NNDock = React.lazy(() => import("@TurtleApp/Routes/NN/NNDock"))

export default function AppRoutes({}) {
    return (
        <Routes>
            <Route path={"/"} element={<ModelsDock/>}/>
            <Route path={"/model/:modelUid"} element={<WorldDock/>}/>
            <Route path={"/containers"} element={<ContainersDock/>}/>
            <Route path={"/nn"} element={<NNDock/>}/>
            <Route path={"/documentation"} element={<DocumentationDock/>}/>
            <Route path={"/documentation/:topic/:document"} element={<DocumentationDock/>}/>
        </Routes>
    );
}
