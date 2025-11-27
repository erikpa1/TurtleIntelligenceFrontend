import {SplitterWithHeader} from "@Turtle/Antd/Splitter";
import {Splitter} from "antd";
import {useTurtleTheme} from "@Turtle/Theme/useTurleTheme";
import InvoicesTopBar from "@TurtleCrm/Invoices/InvoicesTopBar";


export default function InvoicesDock() {

    const {bigPadding} = useTurtleTheme()

    return (
        <SplitterWithHeader topbar={<InvoicesTopBar/>}>

            <Splitter.Panel
                defaultSize={"20%"}
                style={{
                    backgroundColor: "white",
                    padding: bigPadding
                }}
            >


            </Splitter.Panel>

            <Splitter.Panel>

            </Splitter.Panel>
        </SplitterWithHeader>
    )
}