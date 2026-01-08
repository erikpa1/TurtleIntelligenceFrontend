import {COUEntityView, COUView} from "@Turtle/Interfaces/ICOUView";
import BusinessSubject from "@TurtleCrm/BusinessSubjects/BusinessSubject";
import {Flex, Form} from "antd";
import StringAttributeView from "@Turtle/Components/Forms/StringAttributeView";
import UidAttributeView from "@Turtle/Components/Forms/UidAttributeView";
import {RightSubmitButton} from "@Turtle/Components/RightSubmitButton";
import TurtleApp from "@TurtleApp/TurtleApp";
import BusinessSubjectsApi from "@TurtleCrm/BusinessSubjects/BusinessSubjectsApi";
import {COUSubmitButton} from "@Turtle/Utils/Cou";



export default function COUBusinessSubject(props: COUEntityView<BusinessSubject>) {


    const subject = props.entity

    return (
        <Form layout={"vertical"}>
            <Flex vertical>

                <StringAttributeView
                    entity={subject}
                    attribute={"name"}
                />

                <UidAttributeView
                    entity={subject}
                    attribute={"uid"}
                />

                <COUSubmitButton api={BusinessSubjectsApi} props={props}/>

            </Flex>
        </Form>
    )
}