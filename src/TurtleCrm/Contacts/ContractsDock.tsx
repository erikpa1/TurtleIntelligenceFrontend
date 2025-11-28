import {Splitter} from "antd";

import {SplitterWithHeader} from "@Turtle/Antd/Splitter";

export default function ContractsDock() {


    return (
        <SplitterWithHeader topbar={<div/>}>
            <Splitter.Panel
                defaultSize={"20%"}
            >

            </Splitter.Panel>

            <Splitter.Panel>

            </Splitter.Panel>
        </SplitterWithHeader>
    )
}