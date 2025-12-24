import {COUEntityView} from "@Turtle/Interfaces/ICOUView"
import {User} from "@Turtle/Users/User"
import {HorizontalForm, VerticalForm} from "@Turtle/Antd/Formular"
import {Flex} from "antd";
import StringAttributeView from "@Turtle/Components/Forms/StringAttributeView";
import UidAttributeView from "@Turtle/Components/Forms/UidAttributeView";
import {COUSubmitButton} from "@Turtle/Utils/Cou";
import UsersApi from "@Turtle/Users/UsersApi";


export default function COUUser(props: COUEntityView<User>) {
    const entity = props.entity

    return (
        <VerticalForm>
            <StringAttributeView entity={entity} attribute={"firstname"}/>
            <StringAttributeView entity={entity} attribute={"surname"}/>
            <UidAttributeView entity={entity} attribute={"uid"}/>
            <StringAttributeView entity={entity} attribute={"email"}/>
            <StringAttributeView entity={entity} attribute={"password"}/>
            <UidAttributeView entity={entity} attribute={"org"}/>

            <COUSubmitButton api={UsersApi} props={props}/>
        </VerticalForm>
    )
}