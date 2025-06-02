import TopBarWrapper from "@Turtle/Components/TopBarWrapper";
import {Select} from "antd";


export default function LLMChatView({}) {

    return (
        <TopBarWrapper>
            <Select
                defaultValue={"llama"}
            >
                <Select.Option
                    value={"llama"}>
                    llama
                </Select.Option>
                <Select.Option
                    value={"deepseek-coder-v2:latest"}>
                    deepseek-coder-v2:latest
                </Select.Option>
            </Select>
        </TopBarWrapper>
    )
}

