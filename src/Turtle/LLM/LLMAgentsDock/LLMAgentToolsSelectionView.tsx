import {Flex} from "antd";
import {useTranslation} from "react-i18next";
import React from "react";
import Search from "antd/es/input/Search";
import ToolCard from "@Turtle/AgentTools/ToolCard";
import AgentTool from "@Turtle/AgentTools/AgentTool";
import AgentToolsApi from "@Turtle/AgentTools/AgentToolsApi";
import {useQuery} from "react-query";
import {CenterSpinner} from "@Turtle/Components/Loadings";


export default function LLMAgentToolsSelectionView({}) {


    const [t] = useTranslation()

    // const {isPending, error, data} = useQuery({
    //     queryKey: ['agentTools'],
    //     queryFn: AgentToolsApi.ListAllAvailableTools
    // })


    const [searchText, setSearchText] = React.useState("")

    function searchTyping(text: string) {
        setSearchText(text)
    }

    if (isPending) {
        return (
            <CenterSpinner/>
        )
    } else {

        return (
            <Flex
                vertical
                gap={15}

            >

                <div style={{display: 'flex', justifyContent: 'center'}}>
                    <Search
                        defaultValue={searchText}
                        onChange={(e) => {
                            searchTyping(e.target.value)
                        }}
                        variant="borderless"
                        style={{
                            width: '200px',
                            flex: 'none',
                            borderBottom: '1px solid #d9d9d9',
                            borderRadius: 0
                        }}
                    />
                </div>


            </Flex>
        )
    }

}