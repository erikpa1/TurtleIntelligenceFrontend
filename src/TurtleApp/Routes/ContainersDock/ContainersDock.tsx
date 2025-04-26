import {Splitter} from "antd";


export default function ContainersDock() {
    return (
        <Splitter style={{
            height: "100vh"
        }}>

            <Splitter.Panel
                defaultSize={"20%"}
                style={{
                    backgroundColor: "white"
                }}
            >

            </Splitter.Panel>

            <Splitter.Panel>

            </Splitter.Panel>

        </Splitter>
    )
}