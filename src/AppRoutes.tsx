import React from "react";

import {Route, Routes} from "react-router-dom";

const MainScreenView = React.lazy(() => import("./main/MainScreenView"))

export default function AppRoutes({}) {
    return (
        <Routes>
            <Route path={"/"} element={<MainScreenView/>}/>

        </Routes>
    );
}
