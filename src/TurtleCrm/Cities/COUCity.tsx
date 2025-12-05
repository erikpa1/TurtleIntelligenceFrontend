import {Flex, Form} from "antd";
import City from "@TurtleCrm/Cities/City"
import {COUSubmitButton} from "@Turtle/Utils/Cou"
import CitiesApi from "@TurtleCrm/Cities/CitiesApi"
import {COUEntityView} from "@Turtle/Interfaces/ICOUView"
import StringAttributeView from "@Turtle/Components/Forms/StringAttributeView";


export default function COUCity(props: COUEntityView<City>) {
    return (
        <Form layout={"vertical"}>
            <Flex vertical gap={15}>
                <StringAttributeView
                    entity={props.entity}
                    attribute={"name"}
                />

                <StringAttributeView
                    entity={props.entity}
                    attribute={"abbreviation"}
                />


                <COUSubmitButton api={CitiesApi} props={props}/>
            </Flex>

        </Form>
    )
}