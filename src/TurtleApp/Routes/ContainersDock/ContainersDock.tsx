import {Splitter} from "antd";
import ContainersHierarchy from "./ContainersHierarchy";


export default function ContainersDock() {
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
                <ContainersHierarchy/>
            </Splitter.Panel>

            <Splitter.Panel>

            </Splitter.Panel>

        </Splitter>
    )
}