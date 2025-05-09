import {Form, Input} from "antd";
import EntityForm from "@Turtle/Components/Forms/EntityForm";
import {RightSubmitButton} from "@Turtle/Components/RightSubmitButton";
import {ContainersApi} from "@TurtleApp/Api/ContainersApi";
import Container from "@TurtleApp/Data/Container";


export default function CreateContainerView({
                                                onCreated
                                            }) {

    async function createPressed() {
        await ContainersApi.CreateContainer(new Container())
    }

    return (
        <Form layout={'vertical'}>
            <Form.Item
                label={"name"}
            >
                <Input/>
            </Form.Item>

            <Form.Item
                label={"dimX"}
            >
                <Input/>
            </Form.Item>

            <Form.Item
                label={"dimY"}
            >
                <Input/>
            </Form.Item>


            <Form.Item
                label={"dimZ"}
            >
                <Input/>
            </Form.Item>

            <RightSubmitButton
                onClick={createPressed}
            />

        </Form>
    )
}