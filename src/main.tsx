import {StrictMode, Suspense} from 'react';

import {createRoot} from "react-dom/client";

import App from './App';

import 'bootstrap/dist/css/bootstrap.min.css';

import "./i18n"
import {HashRouter} from "react-router-dom";
import {ProSidebarProvider} from "react-pro-sidebar";


const root = createRoot(document.getElementById('root') as any);


root.render(
    <StrictMode>
        <ProSidebarProvider>
            <Suspense fallback={""}>
                <HashRouter>
                    <App/>
                </HashRouter>
            </Suspense>
        </ProSidebarProvider>

    </StrictMode>
);