import {StrictMode} from "react";
import {createRoot} from "react-dom/client";
import {App} from "antd";

import "./index.css";
import "./i18n";
import TurtleThemeProvider from "../TurtleThemeProvider";

import SimEntity from "@TurtleSim/SimModelWorldDock/Data/SimEntity";
import TableBehProperties from "@TurtleSim/SimModelWorldDock/BehProps/TableBehProperties";
import LogisticsControlBehProperties from "@TurtleSim/SimModelWorldDock/BehProps/LogisticsControlBehProperties";

const tableEntity = new SimEntity();
tableEntity.name = "Table1";
tableEntity.typeData = {
    columns: [
        {key: "source", title: "source", type: "string"},
        {key: "destination", title: "destination", type: "string"},
        {key: "actorType", title: "actor.type", type: "string"},
        {key: "pool", title: "worker.pool", type: "string"},
        {key: "priority", title: "priority", type: "int"},
        {key: "extra", title: "extra", type: "string"},
    ],
    rows: [
        ["A", "B", "human", "Pool1", "1", "x"],
        ["C", "D", "agv", "Pool2", "2", "y"],
    ],
};

const logisticsEntity = new SimEntity();
logisticsEntity.name = "Logistics1";
logisticsEntity.typeData = {
    tableMode: "embedded",
    controlTable: [
        ["src1", "dst1", "human", "pool1", "1"],
        ["src2", "dst2", "agv", "pool2", "2"],
        ["src3", "dst3", "forklift", "pool3", "3"],
    ],
};

const root = createRoot(document.getElementById("root") as any);

root.render(
    <StrictMode>
        <TurtleThemeProvider>
            <App>
                <div style={{width: 340, padding: 16, display: "flex", flexDirection: "column", gap: 24}}>
                    <div>
                        <h4>TableBehProperties</h4>
                        <TableBehProperties entity={tableEntity} />
                    </div>
                    <div>
                        <h4>LogisticsControlBehProperties</h4>
                        <LogisticsControlBehProperties entity={logisticsEntity} />
                    </div>
                </div>
            </App>
        </TurtleThemeProvider>
    </StrictMode>
);
