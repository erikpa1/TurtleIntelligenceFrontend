import {StrictMode, Suspense} from 'react';

import {createRoot} from "react-dom/client";

import App from './App';

import 'bootstrap/dist/css/bootstrap.min.css';

import "./i18n"
import {HashRouter} from "react-router-dom";
import {configureAxios} from "./Turtle/Components/TurxiosConfig";
import {ConfigProvider, unstableSetRender} from "antd";


configureAxios()

const root = createRoot(document.getElementById('root') as any);




root.render(
    <ConfigProvider>
        <Suspense fallback={""}>
            <HashRouter>
                <App/>
            </HashRouter>
        </Suspense>
    </ConfigProvider>
);