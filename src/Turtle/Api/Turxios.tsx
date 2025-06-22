import React from "react";
import axios, {Axios, Axios as BigAxios, AxiosError, AxiosRequestConfig, AxiosResponse} from "axios";
import {useTranslation} from "react-i18next";
import {App} from "antd";
import TurtleApp from "@TurtleApp/TurtleApp";

// Create a default instance
const turxios = axios.create();


export function TurxiosProvider() {

    const {message} = App.useApp()

    const [t] = useTranslation()

    function responseInterceptor(response) {
        return response;
    }

    function errorInterceptor(error: AxiosError) {

        console.log(error)

        if (error.response && error.response.status === 401) {
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
    }

    React.useEffect(() => {


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


export async function getWithAbort<T = any>(
    controller: AbortController,
    url: string,
    config?: AxiosRequestConfig<any>
): Promise<AxiosResponse<T>> {
    return await axios.get<T>(url, {
        ...config,
        signal: controller.signal
    }).catch((error) => {
        if (error.name === 'AbortError') {
            return {data: []} as any
        }
    })
}

export default turxios;
