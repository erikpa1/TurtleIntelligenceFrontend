import React from "react";

import "./App.css"


import useCookie from "react-use-cookie";

import {useTranslation} from "react-i18next";

import AppRoutes from "./AppRoutes";


function App() {

    const [isLoading, setIsLoading] = React.useState(true)

    const [_, tInstance] = useTranslation()

    const [userLanguage, setUserLanguage] = useCookie("language", "en")

    React.useEffect(() => {

        setIsLoading(true)
        tInstance.changeLanguage(userLanguage)
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
            <>

                <div style={{
                    // height: "100%",
                }}>

                    <div className="app_background"/>

                    <div style={{}}>


                        <div style={{flexGrow: 1}}>
                            <Main/>
                        </div>
                    </div>
                </div>

            </>

        );
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
