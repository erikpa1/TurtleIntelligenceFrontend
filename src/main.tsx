import {StrictMode, Suspense} from 'react';

import "./index.css"

import {createRoot} from "react-dom/client";

import App from './App';


import "./i18n"
import {HashRouter} from "react-router-dom";

import {ConfigProvider} from "antd";

import {TurxiosProvider} from "@Turtle/Api/Turxios";
import {TurtleTheme} from "./mainTheme";
import {QueryClientProvider} from "react-query";
import {TurtleQueryClient} from "@Turtle/TanStack";

const root = createRoot(document.getElementById('root') as any);


root.render(
    <QueryClientProvider client={TurtleQueryClient}>
        <ConfigProvider
            theme={TurtleTheme}
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
    </QueryClientProvider>
);