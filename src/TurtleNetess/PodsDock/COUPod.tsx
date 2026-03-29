import {COUEntityView} from "@Turtle/Interfaces/ICOUView";
import NetessPod, {PodRestConfig} from "@TurtleNetess/Data/NetessPod";
import {VerticalForm} from "@Turtle/Antd/Formular";
import StringAttributeView from "@Turtle/Components/Forms/StringAttributeView";
import UidAttributeView from "@Turtle/Components/Forms/UidAttributeView";
import {COUSubmitButton} from "@Turtle/Utils/Cou";
import UsersApi from "@Turtle/Users/UsersApi";
import {RightSubmitButton} from "@Turtle/Components/RightSubmitButton";
import TurtleApp from "@TurtleApp/TurtleApp";
import NetessApi from "@TurtleNetess/Api/NetessApi";
import NumberPropertyView from "@Turtle/Components/Forms/IntPropertyView";
import {IntegerAttributeView} from "@Turtle/Components/Forms/NumberAttributeView";
import {Divider} from "antd";


export default function COUPod(props: COUEntityView<NetessPod>) {
    const entity = props.entity

    async function submitPressed() {
        props.onBeforeUpdate?.()
        TurtleApp.Lock()
        await NetessApi.COUPod(entity)
        TurtleApp.Unlock()
        props.onAfterUpdate?.()
    }

    return (
        <VerticalForm>

            <StringAttributeView
                entity={entity}
                attribute={"name"}
            />

            <UidAttributeView
                entity={entity}
                attribute={"uid"}
            />

            <Divider titlePlacement={"start"}>
                REST:
            </Divider>

            <_RestConfig config={entity.restConfig}/>


            <RightSubmitButton
                onClick={submitPressed}
            />
        </VerticalForm>
    )
}

interface _RestConfigProps {
    config: PodRestConfig
}

function _RestConfig({config}: _RestConfigProps) {

    return (
        <>
            <StringAttributeView
                entity={config}
                attribute={"ip"}
            />

            <IntegerAttributeView
                entity={config}
                attribute={"port"}
            />

            <StringAttributeView
                entity={config}
                attribute={"apiKey"}
            />


        </>
    )

}