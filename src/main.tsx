import {StrictMode, Suspense} from 'react';

import {createRoot} from "react-dom/client";

import App from './App';


import "./i18n"
import {HashRouter} from "react-router-dom";
import {configureAxios} from "./Turtle/Components/TurxiosConfig";
import {ConfigProvider} from "antd";


configureAxios()

const root = createRoot(document.getElementById('root') as any);


root.render(
    <ConfigProvider
        theme={{
            token: {
                // Seed Token
                colorPrimary: '#00b96b',
                borderRadius: 2,
                // Alias Token
                colorBgContainer: '#f6ffed',
            },
        }}
    >
        <Suspense fallback={""}>
            <HashRouter>
                <App/>
            </HashRouter>
        </Suspense>
    </ConfigProvider>
);