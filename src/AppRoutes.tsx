import React from "react";

import {Route, Routes} from "react-router-dom";

const ContainersDock = React.lazy(() => import("@TurtleApp/Routes/ContainersDock/ContainersDock"))
const MainScreenDock = React.lazy(() => import("@TurtleApp/Routes/WorldDock/MainScreenDock"))

export default function AppRoutes({}) {
    return (
        <Routes>
            <Route path={"/"} element={<MainScreenDock/>}/>
            <Route path={"/containers"} element={<ContainersDock/>}/>
        </Routes>
    );
}
