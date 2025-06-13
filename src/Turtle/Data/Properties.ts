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

export class ColorProperty extends PropertyParent {

    static New(key: string, label: string): StringProperty {
        const tmp = new StringProperty()
        tmp.key = key
        tmp.label = label
        return tmp
    }

    static NewColor(): ColorProperty {
        const tmp = new ColorProperty()
        tmp.key = "color"
        tmp.label = "color"
        return tmp
    }


}

export class IntProperty extends PropertyParent {

    static New(key: string, label: string): StringProperty {
        const tmp = new StringProperty()
        tmp.key = key
        tmp.label = label
        return tmp
    }


}

export class BoolProperty extends PropertyParent {


    static New(key: string, label: string): BoolProperty {
        const tmp = new BoolProperty()
        tmp.key = key
        tmp.label = label
        return tmp
    }


}