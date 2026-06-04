import React from "react";

import "./App.css"

import AppRoutes from "./AppRoutes";
import {Alert, Layout} from "antd";
import AppNavBar from "./AppNavBar";
import Sider from "antd/es/layout/Sider";
import {GlobalLock} from "@Turtle/Components/GlobalLock";
import IconDetectionAndZone from "@TurtleIcons/IconDetectionAndZone";
import IconAnalytics from "@TurtleIcons/IconAnalytics";
import IconForklift from "@TurtleIcons/IconForklift";
import IconRouter from "@TurtleIcons/IconRouter";
import IconRoute from "@TurtleIcons/IconRoute";

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

    return (
        <IconRoute width={"100"} height={"100"}/>
    )

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



