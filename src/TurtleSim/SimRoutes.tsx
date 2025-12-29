import React from "react"
import {Route} from "react-router-dom"

const SimModelsDock = React.lazy(() => import("@TurtleSim/SimModelsDock/SimModelsDock"))

const SimModelWorldDock = React.lazy(() => import("@TurtleSim/SimModelWorldDock/SimModelWorldDock"))


export default function SimRoutes() {

    return [
        <Route path={"/sim-models"} element={<SimModelsDock/>}/>,
        <Route path={"/sim-models/:modelUid"} element={<SimModelWorldDock/>}/>
    ]
}
