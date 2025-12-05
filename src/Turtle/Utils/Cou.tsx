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
}

export function COUSubmitButton({
                                    api,
                                    props
                                }: COUSubmitButtonProps) {

    async function submit() {
        await COU(api, props)
    }

    return (
        <RightSubmitButton onClick={submit}/>
    )
}