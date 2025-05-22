import {StrictMode, Suspense} from 'react';

import "./index.css"

import {createRoot} from "react-dom/client";

import App from './App';


import "./i18n"
import {HashRouter} from "react-router-dom";

import {ConfigProvider} from "antd";
import ColorConstants from "@Turtle/Constants/ColorConstants";
import {TurxiosProvider} from "@Turtle/Api/Turxios";

const root = createRoot(document.getElementById('root') as any);


root.render(
    <ConfigProvider
        theme={{
            token: {
                colorPrimary: ColorConstants.AZURE_BLUE,
                borderRadius: 0,
            },
        }}
    >


        <Suspense fallback={""}>
            <HashRouter
                future={{
                    v7_relativeSplatPath: true,
                    v7_startTransition: true,
                }}
            >
                <TurxiosProvider/>
                <App/>
            </HashRouter>
        </Suspense>

    </ConfigProvider>
);