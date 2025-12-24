import React from "react"
import TurtleCrypto from "@Turtle/Utils/TurtleCrypto";

export function useRefreshKey(): [string, () => void] {

    const [key, setKey] = React.useState("")

    function refresh() {
        setKey(TurtleCrypto.UUID4())
    }

    return [key, refresh]

}