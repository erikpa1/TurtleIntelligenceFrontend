import React from "react";

import "./App.css"


import {useTranslation} from "react-i18next";

import AppRoutes from "./AppRoutes";
import {Layout} from "antd";
import AppNavBar from "./AppNavBar";
import Sider from "antd/es/layout/Sider";
import {GlobalLock} from "@Turtle/Components/GlobalLock";


function App() {

    const [isLoading, setIsLoading] = React.useState(true)

    React.useEffect(() => {
        setIsLoading(true)
        setIsLoading(false)

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
                    <Sider width={65}>
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
            <AppRoutes/>
        </main>
    )
}


export default App;
