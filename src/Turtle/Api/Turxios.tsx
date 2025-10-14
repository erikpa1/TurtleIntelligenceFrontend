import React from "react";
import axios, {Axios, Axios as BigAxios, AxiosError, AxiosRequestConfig, AxiosResponse} from "axios";
import {useTranslation} from "react-i18next";
import {App} from "antd";
import TurtleApp from "@TurtleApp/TurtleApp";

import {QueryHeader} from "@Turtle/Utils/Http";

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
            console.error(error)
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


export async function PostEntity(route: string, data: any, config?: AxiosRequestConfig<any>) {
    const form = new FormData()
    form.set("data", JSON.stringify(data.ToJson()))
    return await turxios.post(route, form, config)
}

export async function QueryEntities(route: string, query: any, clazz, config?: AxiosRequestConfig<any>): Promise<Array<any>> {
    const data = (await turxios.get<Array<any>>(route, {
        headers: {
            ...QueryHeader(query)
        }
    })).data

    return data.map((val) => {
        const tmp = new clazz()
        tmp.FromJson(val)
        return tmp
    })
}


export async function DeleteEntity(route: string, uid: string, config?: AxiosRequestConfig<any>) {
    return await turxios.delete(route, {
        ...config,
        params: {
            uid: uid
        }
    })
}


export default turxios;
