import React from "react";

import "./App.css"

import AppRoutes from "./AppRoutes";
import {Alert, Layout} from "antd";
import AppNavBar from "./AppNavBar";
import Sider from "antd/es/layout/Sider";
import {GlobalLock} from "@Turtle/Components/GlobalLock";
import {useThemeInit} from "@Turtle/Theme/useTurleTheme";


function App() {

    const [isLoading, setIsLoading] = React.useState(true)

    const initTheme = useThemeInit()


    React.useEffect(() => {
        setIsLoading(true)
        setIsLoading(false)
        initTheme()

    }, [])


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


export default App;
