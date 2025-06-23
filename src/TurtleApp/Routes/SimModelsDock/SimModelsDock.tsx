import {Splitter} from "antd";
import SimModelsHierarchy from "@TurtleApp/Routes/SimModelsDock/SimModelsHierarchy";


export default function SimModelsDock({}) {



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
                <SimModelsHierarchy/>
            </Splitter.Panel>

            <Splitter.Panel>

            </Splitter.Panel>

        </Splitter>
    )
}