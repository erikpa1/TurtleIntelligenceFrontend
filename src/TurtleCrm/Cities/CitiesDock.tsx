import {SplitterWithHeader} from "@Turtle/Antd/Splitter";
import {Splitter} from "antd";

export default function CitiesDock() {


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