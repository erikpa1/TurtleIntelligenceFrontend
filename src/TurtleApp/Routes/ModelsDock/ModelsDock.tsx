import {Splitter} from "antd";
import ModelsHierarchy from "@TurtleApp/Routes/ModelsDock/ModelsHierarchy";


export default function ModelsDock({}) {
    return (
        <Splitter style={{
            height: "100vh"
        }}>

            <Splitter.Panel
                defaultSize={"20%"}
                style={{
                    backgroundColor: "white",
                    padding: "15px"
                }}
            >
                <ModelsHierarchy/>
            </Splitter.Panel>

            <Splitter.Panel>

            </Splitter.Panel>

        </Splitter>
    )
}