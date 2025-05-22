import React from "react";
import axios, {Axios, Axios as BigAxios, AxiosError} from "axios";
import {useTranslation} from "react-i18next";
import {App} from "antd";
import TurtleApp from "@TurtleApp/TurtleApp";

// Create a default instance
const turxios = axios.create();


export function TurxiosProvider() {

    const {message} = App.useApp()
    const [t] = useTranslation()

    React.useEffect(() => {


        const responseInterceptor = (response) => {
            return response;
        };

        const errorInterceptor = (error: AxiosError) => {
            if (error.response && error.response.status === 401) {
                console.log(message.error)
                message.error(t("Unauthorized"))
                // setActiveUser(null)
            } else if (error.response && error.response.status === 404) {
                message.error(t("404 - not found"))
            } else {
                message.error({
                    content: `${error.name}: ${error.message}`,
                })
            }

            TurtleApp.Unlock()
            return Promise.reject()
        };

        // const interceptorRequest =
        //     Axios.interceptors.request.use(requestInterceptor);

        const interceptorResponse = turxios.interceptors.response.use(
            responseInterceptor,
            errorInterceptor
        );

        return () => {
            // Axios.interceptors.request.eject(interceptorRequest);
            turxios.interceptors.response.eject(interceptorResponse);
        };
    }, []);

    return <></>;
};


export default turxios;
