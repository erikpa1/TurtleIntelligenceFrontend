import React from "react"

import {Route, Routes} from "react-router-dom"
import SceneEditDock from "@Turtle/Scene/SceneEditDock";
import ForecastingDock from "@TurtleApp/Forecasting/ForecastingDock";
import LoginForm from "@Turtle/Login/MainLoginForm";
import RegisterForm from "@Turtle/Login/CreateAccountForm";
import TablesDataDock from "@Turtle/TablesData/TablesDataDock";

import TurtleAppsGallery from "@TurtleApp/TurtleAppsGallery";
import {Card} from "antd"

import GetOcrRoutes from "@TurtleCrm/Ocr/OcrRoutes"
import CrmRoutes from "@TurtleCrm/CrmRoutes"

const AofModelsDock = React.lazy(() => import("@TurtleApp/Aof/AofModelsDock"))
const AofEditModelDock = React.lazy(() => import("@TurtleApp/Aof/AofEditModelDock"))

const ResourcesDock = React.lazy(() => import("@TurtleApp/Resources/ResourcesDock"))

const TablesDock = React.lazy(() => import("@Turtle/Tables/TablesDock"))
const ScenesDock = React.lazy(() => import("@Turtle/Scenes/ScenesDock"))
const ThemeDock = React.lazy(() => import("@Turtle/Theme/ThemeDock"))
const FlowsDock = React.lazy(() => import("@Turtle/Flows/FlowsDock"))
const LLMAgentChatDock = React.lazy(() => import("@Turtle/LLM/LLMChatDock/LLMAgentChatDock"))
const AgentIncidentsDock = React.lazy(() => import("@Turtle/AgentIncidents/AgentIncidentsDock"))
const KnowledgeGuidanceDock = React.lazy(() => import("@Turtle/Guidance/GuidanceDock"))
const AgentToolsDock = React.lazy(() => import("@Turtle/AgentTools/AgentToolsDock"))
const FunctionsDock = React.lazy(() => import("@Turtle/Functions/FunctionsDock"))
const KHDock = React.lazy(() => import("@Turtle/KnowledgeHub/KnowledgeDock"))
const DocIntDock = React.lazy(() => import("@Turtle/DocInt/Dock/DocIntDock"))
const LLMClusterDock = React.lazy(() => import("@Turtle/LLM/LLMCluster/LLMClusterDock"))
const LLMsDock = React.lazy(() => import("@Turtle/LLM/LLMsDock/LLMsDock"))
const LLMAgentsDock = React.lazy(() => import("@Turtle/LLM/LLMAgentsDock/LLMAgentsDock"))
const LLMChatDock = React.lazy(() => import("@Turtle/LLM/LLMChatDock/LLMChatDock"))
const ActorsDock = React.lazy(() => import("@TurtleApp/Routes/Actors/ActorsDock"))
const DocumentationDock = React.lazy(() => import("@TurtleApp/Routes/Documentation/DocumentationDock"))
const ContainersDock = React.lazy(() => import("@TurtleApp/Routes/ContainersDock/ContainersDock"))
const SimWorldDock = React.lazy(() => import("@TurtleApp/Routes/SimModelWorldDock/SimModelWorldDock"))
const SimModelsDock = React.lazy(() => import( "@TurtleApp/Routes/SimModelsDock/SimModelsDock"))
const NNDock = React.lazy(() => import("@TurtleApp/Routes/NN/NNDock"))


export default function AppRoutes({}) {

    console.log(GetOcrRoutes())

    return (
        <Routes>

            {/* User management and login */}
            <Route path={"/"} element={(
                <div
                    style={{
                        padding: 100,
                        paddingLeft: 300,
                        paddingRight: 300,
                    }}
                >
                    <Card>
                        <TurtleAppsGallery/>
                    </Card>
                </div>

            )}/>

            <Route path={"/login"} element={<LoginForm/>}/>
            <Route path={"/register"} element={<RegisterForm/>}/>


            <Route path={"/models"} element={<SimModelsDock/>}/>
            <Route path={"/model/:modelUid"} element={<SimWorldDock/>}/>
            <Route path={"/containers"} element={<ContainersDock/>}/>
            <Route path={"/nn"} element={<NNDock/>}/>
            <Route path={"/documentation"} element={<DocumentationDock/>}/>
            <Route path={"/documentation/:topic/:document"} element={<DocumentationDock/>}/>
            <Route path={"/actors"} element={<ActorsDock/>}/>
            <Route path={"/llm-chat"} element={<LLMChatDock/>}/>
            <Route path={"/llm-agent-chat/:chatUid"} element={<LLMAgentChatDock/>}/>
            <Route path={"/llm-chat/:chatUid"} element={<LLMChatDock/>}/>
            <Route path={"/llm-clusters"} element={<LLMClusterDock/>}/>
            <Route path={"/llm-clusters/:clusterUid"} element={<LLMClusterDock/>}/>
            <Route path={"/llms"} element={<LLMsDock/>}/>
            <Route path={"/llms/:llmUid"} element={<LLMsDock/>}/>
            <Route path={"/agents"} element={<LLMAgentsDock/>}/>
            <Route path={"/agents/:agentUid"} element={<LLMAgentsDock/>}/>
            <Route path={"/doc-int"} element={<DocIntDock/>}/>
            <Route path={"/doc-int/:viewMethod"} element={<DocIntDock/>}/>
            <Route path={"/doc-int/:viewMethod/:documentUid"} element={<DocIntDock/>}/>

            {/*Knowledge Hub*/}
            <Route path={"/kh"} element={<KHDock/>}/>
            <Route path={"/kh/:domainUid"} element={<KHDock/>}/>
            <Route path={"/kh/:domainUid/:knowledgeUid"} element={<KHDock/>}/>


            <Route path={"/guidance-edit/:knUid"} element={<KnowledgeGuidanceDock/>}/>

            <Route path={"/functions"} element={<FunctionsDock/>}/>
            <Route path={"/fn/:fnUid"} element={<FunctionsDock/>}/>
            <Route path={"/agents-tools"} element={<AgentToolsDock/>}/>
            <Route path={"/agents-tools/:toolUid"} element={<AgentToolsDock/>}/>
            <Route path={"/agents-incidents"} element={<AgentIncidentsDock/>}/>
            <Route path={"/agents-incidents/:incUid"} element={<AgentIncidentsDock/>}/>

            <Route path={"/flows"} element={<FlowsDock/>}/>

            <Route path={"/flows/:flowUid"} element={<FlowsDock/>}/>

            <Route path={"/themes"} element={<ThemeDock/>}/>
            <Route path={"/themes/:themeUid"} element={<ThemeDock/>}/>

            <Route path={"/scenes"} element={<ScenesDock/>}/>
            <Route path={"/scenes/:sceneUid"} element={<ScenesDock/>}/>

            <Route path={"/scene"} element={<SceneEditDock/>}/>
            <Route path={"/scene/:sceneUid"} element={<SceneEditDock/>}/>

            <Route path={"/forecasting"} element={<ForecastingDock/>}/>
            <Route path={"/forecasting/:forecast"} element={<ForecastingDock/>}/>

            <Route path={"/tables"} element={<TablesDock/>}/>
            <Route path={"/tables/:tableUid"} element={<TablesDock/>}/>

            <Route path={"/table-data"} element={<TablesDataDock/>}/>
            <Route path={"/table-data/:tableUid"} element={<TablesDataDock/>}/>

            <Route path={"/resources"} element={<ResourcesDock/>}/>
            <Route path={"/resources/:resourceUid"} element={<ResourcesDock/>}/>


            {/*   AOF */}
            <Route path={"/aof-factories"} element={<AofModelsDock/>}/>
            <Route path={"/aof-factories/:aofUid"} element={<AofEditModelDock/>}/>


            {...GetOcrRoutes()}
            {...CrmRoutes()}
        </Routes>

    );
}
