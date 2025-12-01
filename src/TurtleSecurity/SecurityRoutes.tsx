import React from "react"
import {Route} from "react-router-dom"

import LoginPenetrationDock from "@TurtleSecurity/LoginPenetrationDock/LoginPenetrationDock";


export default function SecurityRoutes() {
    return [
        <Route
            path={"/pentesting-login"}
            element={<LoginPenetrationDock/>}
        />
    ]
}