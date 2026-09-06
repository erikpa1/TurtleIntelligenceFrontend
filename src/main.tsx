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
import IconFolderOpen from "@TurtleIcons/IconFolderOpen";
import IconCamping from "@TurtleIcons/IconCamping";
import IconCategory from "@TurtleIcons/IconCategory";
import IconSearch from "@TurtleIcons/IconSearch";
import IconStream from "@TurtleIcons/IconStream";
import IconCalendar from "@TurtleIcons/IconCalendar";
import IconScene from "@TurtleIcons/IconScene";

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
        <IconScene />

        <Button type="primary" icon={<IconScene />}>
            Here
        </Button>
    </>,
);
