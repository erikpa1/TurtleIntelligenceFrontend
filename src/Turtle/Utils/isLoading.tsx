import React from "react"
import {TurtleSkeleton} from "@Turtle/Components/TurtleSkeleton";

export class LoadingStatus {

    isLoading = true

    IsLoading(): boolean {
        return this.isLoading
    }

    IsError(): boolean {
        return false
    }

    IsDoingSomething(): boolean {
        return this.IsLoading() || this.IsError()
    }
}

export function useIsLoading(): [LoadingStatus, (execute: () => void) => void] {
    const [isLoading, setIsLoading] = React.useState<LoadingStatus>(new LoadingStatus())

    async function exec(execute: () => void) {
        setIsLoading(new LoadingStatus())
        await execute()

        const tmp = new LoadingStatus()
        tmp.isLoading = false
        setIsLoading(tmp)
    }

    return [isLoading, exec]

}

interface LoadingOrErrorProps {
    status: LoadingStatus
}

export function LoadingOrError({status}: LoadingOrErrorProps) {

    if (status.IsLoading()) {
        return (
            <TurtleSkeleton paragraph={{rows: 15}}/>
        )
    }

    if (status.IsError()) {
        return (
            <div>Erro</div>
        )
    }

    return (
        <>---this is wrong---</>
    )

}