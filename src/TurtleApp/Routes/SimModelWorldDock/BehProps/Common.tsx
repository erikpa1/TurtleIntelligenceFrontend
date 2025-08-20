import StringItem from "@Turtle/ReflectiveUI/StringItem";


export function EntityNameProperty({entity}) {
    return (
        <StringItem
            entity={entity}
            attribute={"name"}
        />
    )
}

export function EntityTypeProperty({entity}) {
    return (
        <StringItem
            entity={entity}
            attribute={"type"}
            disabled={true}
        />
    )
}