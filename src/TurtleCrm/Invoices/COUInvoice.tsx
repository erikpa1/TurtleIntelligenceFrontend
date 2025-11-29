import Invoice from "@TurtleCrm/Invoices/Invoice"
import {COUEntityView} from "@Turtle/Interfaces/ICOUView"
import {Flex, Form} from "antd";
import {COUSubmitButton} from "@Turtle/Utils/Cou";
import InvoicesApi from "@TurtleCrm/Invoices/InvoicesApi";
import StringAttributeView from "@Turtle/Components/Forms/StringAttributeView";


export default function COUInvoice(props: COUEntityView<Invoice>) {

    const entity = props.entity
    
    return (
        <Form layout={"vertical"}>

            <Flex vertical gap={15}>
                <StringAttributeView
                    entity={entity}
                    attribute={"name"}
                />

                <COUSubmitButton api={InvoicesApi} props={props}/>
            </Flex>
        </Form>
    )

}