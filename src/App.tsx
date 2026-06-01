import React from "react";

import "./App.css"

import AppRoutes from "./AppRoutes";
import {Alert, Layout} from "antd";
import AppNavBar from "./AppNavBar";
import Sider from "antd/es/layout/Sider";
import {GlobalLock} from "@Turtle/Components/GlobalLock";
import {useThemeInit} from "@Turtle/Theme/useTurleTheme";
import IconHub from "@TurtleIcons/IconHub";
import IconMonitor from "@TurtleIcons/IconMonitor";
import IconFactory from "@TurtleIcons/IconFactory";
import IconQueryStats from "@TurtleIcons/IconQueryStats";
import IconModeling from "@TurtleIcons/IconModeling";
import IconCampaign from "@TurtleIcons/IconCampaign";
import IconGroup from "@TurtleIcons/IconGroup";
import IconCrown from "@TurtleIcons/IconCrown";


export default function TurtleApp() {

    const [isLoading, setIsLoading] = React.useState(true)


    async function refresh() {
        setIsLoading(true)
        //Nothing to do yet
        setIsLoading(false)
    }

    React.useEffect(() => {
        refresh()
    }, [])

    // return (
    //     <IconCrown width={"100"} height={"100"}/>
    // )

    if (isLoading) {
        return (
            <>

            </>
        )
    } else {

        return (
            <div>
                <Layout hasSider>
                    <Sider width={80}>
                        <AppNavBar/>
                    </Sider>

                    <Layout.Content style={{flexGrow: 1}}>
                        <Main/>
                    </Layout.Content>
                </Layout>

                <GlobalLock/>
            </div>
        )
    }


}


function Main({}) {

    return (
        <main style={{
            overflowY: "hidden",
            overflowX: "hidden",
            // position: "absolute",
            // left: "200px"
        }}>
            <Alert.ErrorBoundary>
                <AppRoutes/>
            </Alert.ErrorBoundary>
        </main>
    )
}



