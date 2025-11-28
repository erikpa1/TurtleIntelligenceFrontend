import {COUView} from "@Turtle/Interfaces/ICOUView";
import BusinessSubject from "@TurtleCrm/BusinessSubjects/BusinessSubject";
import {Flex, Form} from "antd";
import StringAttributeView from "@Turtle/Components/Forms/StringAttributeView";
import UidAttributeView from "@Turtle/Components/Forms/UidAttributeView";
import {RightSubmitButton} from "@Turtle/Components/RightSubmitButton";
import TurtleApp from "@TurtleApp/TurtleApp";
import BusinessSubjectsApi from "@TurtleCrm/BusinessSubjects/BusinessSubjectsApi";


interface _COUBusinessSubjectProps extends COUView {
    subject: BusinessSubject
}

export default function COUBusinessSubject({
                                               onAfterUpdate,
                                               onBeforeUpdate,
                                               subject
                                           }: _COUBusinessSubjectProps) {

    async function submit() {
        onAfterUpdate?.()
        TurtleApp.Lock()
        await BusinessSubjectsApi.COU(subject)
        TurtleApp.Unlock()
        onBeforeUpdate?.()
    }

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




                <RightSubmitButton onClick={submit}/>
            </Flex>
        </Form>
    )
}