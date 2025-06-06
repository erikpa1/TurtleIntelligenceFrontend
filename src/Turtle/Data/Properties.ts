export class PropertyParent {
    key = ""
    label = ""
}

export class StringProperty extends PropertyParent {

    static New(key: string, label: string): StringProperty {
        const tmp = new StringProperty()
        tmp.key = key
        tmp.label = label
        return tmp
    }

    static NewName(): StringProperty {
        const tmp = new StringProperty()
        tmp.key = "name"
        tmp.label = "name"
        return tmp
    }


}