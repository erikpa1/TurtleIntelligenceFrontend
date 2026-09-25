import {Suspense} from 'react';

import "./index.css"

import {createRoot} from "react-dom/client";

import TurtleApp from './App';


import "./i18n"
import {HashRouter} from "react-router-dom";

import {TurxiosProvider} from "@Turtle/Api/Turxios";

import {QueryClientProvider} from "react-query";
import {TurtleQueryClient} from "@Turtle/TanStack";
import TurtleThemeProvider from "../TurtleThemeProvider";
import {App} from "antd";

const root = createRoot(document.getElementById('root') as any);



root.render(
    <QueryClientProvider client={TurtleQueryClient}>
        <TurtleThemeProvider>
            <App>
                <Suspense fallback={""}>
                    <HashRouter
                        future={{
                            v7_relativeSplatPath: true,
                            v7_startTransition: true,
                        }}
                    >
                        <TurxiosProvider/>
                        <TurtleApp/>

                    </HashRouter>
                </Suspense>
            </App>
        </TurtleThemeProvider>


    </QueryClientProvider>
);


// root.render(<>
//         <IconLockOpen/>
//     </>
// )
