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
import IconPause from "@TurtleIcons/IconPause";
import IconCalendarClock from "@TurtleIcons/IconCalendarClock";
import IconOrderApprove from "@TurtleIcons/IconOrderApprove";
import IconBallot from "@TurtleIcons/IconBallot";
import IconPrecisionManufacturing from "@TurtleIcons/IconPrecisionManufacturing";
import IconEngineering from "@TurtleIcons/IconEngineering";
import IconChronic from "@TurtleIcons/IconChronic";
import IconFormAppScript from "@TurtleIcons/IconFormAppScript";
import IconCalendarMonth from "@TurtleIcons/IconCalendarMonth";
import IconDatabase from "@TurtleIcons/IconDatabase";
import IconAccountBalance from "@TurtleIcons/IconAccountBalance";
import IconRoutine from "@TurtleIcons/IconRoutine";
import IconPriceChange from "@TurtleIcons/IconPriceChange";
import IconGrid from "@TurtleIcons/IconGrid";
import IconElevator from "@TurtleIcons/IconElevator";
import IconLock from "@TurtleIcons/IconLock";
import IconLockOpenRight from "@TurtleIcons/IconLockOpenRight";
import IconLockOpen from "@TurtleIcons/IconLockOpen";

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
