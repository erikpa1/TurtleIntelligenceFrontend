import {COUEntityView} from "@Turtle/Interfaces/ICOUView";
import TurtleApp from "@TurtleApp/TurtleApp";
import {RightSubmitButton} from "@Turtle/Components/RightSubmitButton";


export async function COU(api: any, props: COUEntityView<any>) {
    props.onAfterUpdate?.()
    TurtleApp.Lock()
    await api.COU(props.entity)
    TurtleApp.Unlock()
    props.onAfterUpdate?.()
}

interface COUSubmitButtonProps {
    api: any
    props: COUEntityView<any>
    afterUpdate?: () => void
}

export function COUSubmitButton({
                                    api,
                                    props,
                                    afterUpdate
                                }: COUSubmitButtonProps) {

    async function submit() {
        props.onBeforeUpdate?.()
        await COU(api, props)
        props.onAfterUpdate?.()
        afterUpdate?.()
    }

    return (
        <RightSubmitButton onClick={submit}/>
    )
}