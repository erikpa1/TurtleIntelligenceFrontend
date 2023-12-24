import React from "react";

import {Route, Routes} from "react-router-dom";


export default function AppRoutes({}) {
    return (
        <Routes>
            <Route path={"/"} element={<div>Here</div>}/>

        </Routes>
    );
}
