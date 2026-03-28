import React from "react";
import {Route} from "react-router-dom";


const PodsDock = React.lazy(() => import("@TurtleNetess/PodsDock/PodsDock"))

export default function NetessRoutes() {

    return [
        <Route
            path={"/netess-pods"}
            element={<PodsDock/>}
        />
    ]
}