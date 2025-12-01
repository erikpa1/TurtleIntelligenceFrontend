import {Splitter} from "antd"
import {SplitterWithHeader} from "@Turtle/Antd/Splitter"
import LoginPenetrationHierarchy from "@TurtleSecurity/LoginPenetrationDock/LoginPenetrationHierarchy"
import {useTurtleTheme} from "@Turtle/Theme/useTurleTheme";

export default function LoginPenetrationDock({}) {

    const {bigPadding} = useTurtleTheme()

    return (
        <SplitterWithHeader topbar={<div/>}>
            <Splitter.Panel
                defaultSize={"20%"}
                style={{
                    padding: bigPadding,
                    backgroundColor: "white",
                }}
            >
                <LoginPenetrationHierarchy/>
            </Splitter.Panel>

            <Splitter.Panel>

            </Splitter.Panel>

        </SplitterWithHeader>
    )

}
