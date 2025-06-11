import React from "react"
import {Form} from "antd";
import {ColorProperty, PropertyParent, StringProperty} from "@Turtle/Data/Properties";
import StringPropertyView from "@Turtle/Components/Forms/StringPropertyView";
import {RightSubmitButton} from "@Turtle/Components/RightSubmitButton";
import TurtleApp from "@TurtleApp/TurtleApp";
import ColorPropertyView from "@Turtle/Components/Forms/ColorPropertyView";


interface EntityFormProps {
    entity: any
    properties: Promise<PropertyParent[]>
    submitFunction: any
    dontUseCopy?: boolean
    onBeforeSubmit?: () => void
    onAfterSubmit?: () => void
}

export default function EntityForm({
                                       entity,
                                       properties,
                                       submitFunction,
                                       dontUseCopy,
                                       onBeforeSubmit,
                                       onAfterSubmit,
                                   }: EntityFormProps) {

    const [tmpOne, setTmpOne] = React.useState(entity)
    const [_props, setProperties] = React.useState<PropertyParent[]>([])

    async function refresh() {
        setProperties(await properties)
    }

    async function autoSubmit() {
        onBeforeSubmit && onBeforeSubmit()
        TurtleApp.Lock()
        await submitFunction(tmpOne)
        TurtleApp.Unlock()
        onAfterSubmit && onAfterSubmit()
    }

    React.useEffect(() => {

        if (dontUseCopy) {
            //Do nothing
        } else {
            const tmp = new entity.constructor
            tmp.FromJson(entity.ToJson())
            setTmpOne(tmp)
        }

        refresh()

    }, [entity, properties])


    return (
        <Form
            layout={"vertical"}
        >
            {
                _props.map((property) => {
                    return (
                        <_ViewDispatcher
                            key={property.key}
                            entity={tmpOne}
                            property={property}
                        />
                    )
                })
            }

            <RightSubmitButton
                onClick={autoSubmit}
            />
        </Form>
    )
}


interface _ViewDispatcherProps {
    entity: any
    property: PropertyParent
}


function _ViewDispatcher({
                             entity,
                             property
                         }: _ViewDispatcherProps) {

    if (property instanceof StringProperty) {
        return (
            <StringPropertyView entity={entity} property={property}/>
        )
    } else if (property instanceof ColorProperty) {
        return (
            <ColorPropertyView entity={entity} property={property}/>
        )
    } else {
        return (
            <div>
                Undefined property
            </div>
        )
    }
}

