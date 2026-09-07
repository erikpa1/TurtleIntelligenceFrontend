import { StrictMode, Suspense } from "react";

import "./index.css";

import { createRoot } from "react-dom/client";

import TurtleApp from "./App";

import "./i18n";
import { HashRouter } from "react-router-dom";

import { TurxiosProvider } from "@Turtle/Api/Turxios";

import { QueryClientProvider } from "react-query";
import { TurtleQueryClient } from "@Turtle/TanStack";
import TurtleThemeProvider from "../TurtleThemeProvider";

const root = createRoot(document.getElementById("root") as any);

import { App, Button } from "antd";

import IconKey from "@TurtleIcons/IconKey";
import IconSpahgetti from "@TurtleIcons/IconSpaghetti";
import IconReset from "@TurtleIcons/IconReset";
import IconPlay from "@TurtleIcons/IconPlay";
import IconDeployCodeHistory from "@TurtleIcons/IconDeployCodeHistory";
import IconMonitorHealth from "@TurtleIcons/IconMonitorHearth";
import IconImage from "@TurtleIcons/IconImage";
import IconManufacturing from "@TurtleIcons/IconManufacturing";
import IconNetworkIntelligence from "@TurtleIcons/IconNetworkIntelligence";
import IconThreatIntelligence from "@TurtleIcons/IconThreatIntelligence";
import IconBookRibbon from "@TurtleIcons/IconBookRibbon";
import IconHomeImprovement from "@TurtleIcons/IconHomeImprovement";
import IconAgvPace from "@TurtleIcons/IconAgvPace";
import IconNavigation from "@TurtleIcons/IconNavigation";
import IconStop from "@TurtleIcons/IconStop";
import IconArchitecture from "@TurtleIcons/IconArchitecture";
import IconEmergencyShare from "@TurtleIcons/IconEmergencyShare";
import IconAssistantDirection from "@TurtleIcons/IconAssistantDirection";

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
                        <TurxiosProvider />
                        <TurtleApp />
                    </HashRouter>
                </Suspense>
            </App>
        </TurtleThemeProvider>
    </QueryClientProvider>,
);

root.render(
    <>
        <IconAssistantDirection />

        <Button type="primary" icon={<IconAssistantDirection />}>
            Here
        </Button>
    </>,
);
