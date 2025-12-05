
import {Splitter} from "antd";
import TopBarWrapper from "@Turtle/Components/TopBarWrapper";


export default function AgentExecDock() {
    return (
        <Splitter>

            <Splitter.Panel
                defaultSize={"30%"}
            >
                <TopBarWrapper>
                    X
                </TopBarWrapper>
            </Splitter.Panel>

            <Splitter.Panel
                defaultSize={"30%"}
            >
                <TopBarWrapper>
                    Y
                </TopBarWrapper>
            </Splitter.Panel>

        </Splitter>
    )
}