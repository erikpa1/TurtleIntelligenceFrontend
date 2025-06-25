import React from "react"

import {Route, Routes} from "react-router-dom"

const FunctionsDock = React.lazy(() => import("@Turtle/Functions/FunctionsDock"))
const KHDock = React.lazy(() => import("@Turtle/Knowledge/KnowledgeDock"))
const DocIntDock = React.lazy(() => import("@Turtle/DocInt/Dock/DocIntDock"))
const LLMClusterDock = React.lazy(() => import("@Turtle/LLM/LLMCluster/LLMClusterDock"))
const LLMsDock = React.lazy(() => import("@Turtle/LLM/LLMsDock/LLMsDock"))
const LLMAgentsDock = React.lazy(() => import("@Turtle/LLM/LLMAgentsDock/LLMAgentsDock"))
const LLMChatDock = React.lazy(() => import("@Turtle/LLM/LLMChatDock/LLMChatDock"))
const ActorsDock = React.lazy(() => import("@TurtleApp/Routes/Actors/ActorsDock"))
const DocumentationDock = React.lazy(() => import("@TurtleApp/Routes/Documentation/DocumentationDock"))
const ContainersDock = React.lazy(() => import("@TurtleApp/Routes/ContainersDock/ContainersDock"))
const SimWorldDock = React.lazy(() => import("@TurtleApp/Routes/WorldDock/WorldDock"))
const SimModelsDock = React.lazy(() => import( "@TurtleApp/Routes/SimModelsDock/SimModelsDock"))
const NNDock = React.lazy(() => import("@TurtleApp/Routes/NN/NNDock"))


export default function AppRoutes({}) {
    return (
        <Routes>
            <Route path={"/"} element={<SimModelsDock/>}/>
            <Route path={"/model/:modelUid"} element={<SimWorldDock/>}/>
            <Route path={"/containers"} element={<ContainersDock/>}/>
            <Route path={"/nn"} element={<NNDock/>}/>
            <Route path={"/documentation"} element={<DocumentationDock/>}/>
            <Route path={"/documentation/:topic/:document"} element={<DocumentationDock/>}/>
            <Route path={"/actors"} element={<ActorsDock/>}/>
            <Route path={"/llm-chat"} element={<LLMChatDock/>}/>
            <Route path={"/llm-chat/:chatUid"} element={<LLMChatDock/>}/>
            <Route path={"/llm-clusters"} element={<LLMClusterDock/>}/>
            <Route path={"/llm-clusters/:clusterUid"} element={<LLMClusterDock/>}/>
            <Route path={"/llms"} element={<LLMsDock/>}/>
            <Route path={"/llms/:llmUid"} element={<LLMsDock/>}/>
            <Route path={"/agents"} element={<LLMAgentsDock/>}/>
            <Route path={"/agents/:agentUid"} element={<LLMAgentsDock/>}/>
            <Route path={"/doc-int"} element={<DocIntDock/>}/>
            <Route path={"/doc-int/:documentUid"} element={<DocIntDock/>}/>
            <Route path={"/knowledge-hub"} element={<KHDock/>}/>
            <Route path={"/knowledge-hub/:knowledgeUid"} element={<KHDock/>}/>
            <Route path={"/functions"} element={<FunctionsDock/>}/>
            <Route path={"/fn/:fnUid"} element={<FunctionsDock/>}/>
        </Routes>
    );
}
