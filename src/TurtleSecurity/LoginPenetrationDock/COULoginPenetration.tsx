import {Flex, Form} from "antd";
import {COUEntityView} from "@Turtle/Interfaces/ICOUView";

import StringAttributeView from "@Turtle/Components/Forms/StringAttributeView";
import LoginPenetration from "@TurtleSecurity/LoginPenetrationDock/LoginPenetration";
import UidAttributeView from "@Turtle/Components/Forms/UidAttributeView";
import {COUSubmitButton} from "@Turtle/Utils/Cou";
import LoginPenetrationApi from "@TurtleSecurity/LoginPenetrationDock/LoginPenetrationApi";


export default function COULoginPenetration(props: COUEntityView<LoginPenetration>) {


    return (
        <Form layout={"vertical"}>
            <Flex vertical gap={15}>

                <StringAttributeView
                    entity={props.entity}
                    attribute={"name"}
                />

                <UidAttributeView
                    entity={props.entity}
                    attribute={"uid"}
                />

                <StringAttributeView
                    entity={props.entity}
                    attribute={"url"}
                />

                <StringAttributeView
                    entity={props.entity}
                    attribute={"email"}
                />
                

                <COUSubmitButton api={LoginPenetrationApi} props={props}/>

            </Flex>
        </Form>
    )

}