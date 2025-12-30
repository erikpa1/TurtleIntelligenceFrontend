import {COUEntityView} from "@Turtle/Interfaces/ICOUView";
import AgentNodeParent from "@Turtle/LLM/LLMAgentsDock/Data/Nodes/AgentNodeParent";

import NodesFactory from "@Turtle/LLM/LLMAgentsDock/Data/NodesFactory"
import React from "react";
import {VerticalForm} from "@Turtle/Antd/Formular";
import StringAttributeView from "@Turtle/Components/Forms/StringAttributeView";
import ColorAttributeView from "@Turtle/Components/Forms/ColorAttributeView"


export default function COUNodeView(props: COUEntityView<AgentNodeParent>) {

    const viewComponent = React.useMemo(() => {
        const tmp = React.createElement(NodesFactory.GetCOUView(props.entity.type) as any, {node: props.entity})
        return tmp
    }, [props.entity])

    return (
        <VerticalForm>

            <StringAttributeView
                entity={props.entity}
                attribute={"name"}
            />

            <StringAttributeView
                entity={props.entity}
                attribute={"type"}
                inputProps={{disabled: true}}
            />


            <ColorAttributeView
                entity={props.entity}
                attribute={"color"}
            />

            {viewComponent}
        </VerticalForm>
    )

}