import {SplitterWithHeader} from "@Turtle/Antd/Splitter";
import {Splitter} from "antd";
import ChatHierarchy from "@TurtleChat/UsersChat/ChatHierarchy";
import {useTurtleTheme} from "@Turtle/Theme/useTurleTheme";
import TopBarWrapper from "@Turtle/Components/TopBarWrapper";

export default function UsersChatDock() {

    const {theme, bigPadding} = useTurtleTheme()

    return (
        <SplitterWithHeader topbar={<div/>}>

            <Splitter.Panel
                style={{
                    backgroundColor: "white",
                    padding: bigPadding,
                }}
                defaultSize={"20%"}
            >
                <ChatHierarchy/>
            </Splitter.Panel>

            <Splitter.Panel>
                <TopBarWrapper>
                    XX
                </TopBarWrapper>
            </Splitter.Panel>
        </SplitterWithHeader>
    )
}