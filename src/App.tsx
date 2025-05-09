import React from "react";

import "./App.css"


import {useTranslation} from "react-i18next";

import AppRoutes from "./AppRoutes";
import {Layout} from "antd";
import AppNavBar from "./AppNavBar";
import Sider from "antd/es/layout/Sider";


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
            //Toto nemoze ist do ccska lebo z nejakeho kktskeho dovodu to nefunguje
            <Layout hasSider>
                <Sider width={72}>
                    <AppNavBar/>
                </Sider>

                <Layout.Content>
                    <div style={{flexGrow: 1}}>
                        <Main/>
                    </div>
                </Layout.Content>
            </Layout>
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
