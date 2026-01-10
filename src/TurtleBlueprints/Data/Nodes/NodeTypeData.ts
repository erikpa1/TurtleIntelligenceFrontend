import ColorConstants from "@Turtle/Constants/ColorConstants";


export default class NodeTypeData {

    GetConnectionColor(conn: string): string | undefined {
        return undefined
    }

    ToJson(): any {
        return {}
    }

    FromJson(jObj: any) {

    }
}

export class EmptyTypeData extends NodeTypeData {
    ToJson(): any {
        return {}
    }

    FromJson(jObj: any) {

    }
}