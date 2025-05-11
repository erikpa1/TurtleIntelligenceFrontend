export class PropertyParent {
    key = ""
    label = ""
}

export class StringProperty extends PropertyParent {

    static New(key: string, label: string) {
        const tmp = new StringProperty()
        tmp.key = key
        tmp.label = label
        return tmp
    }


}