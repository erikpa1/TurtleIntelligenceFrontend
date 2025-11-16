export enum GuidanceContentType {
    Image = 1,
    Video = 2,
    SimpleModel3d = 3,
    ModelAnimated = 4,
    Component = 5
}


export class Guidance {
    uid = ""
    name = ""
}


export class GuidanceStep {
    uid = ""
    name = ""
    description = ""

    subContents: Array<GuidanceStepSubContent> = []


    ToJson() {
        return {}
    }

    FromJson(jObj: any) {
        this.uid = jObj.uid ?? ""
        this.name = jObj.name ?? ""
        this.description = jObj.description ?? ""
    }

}


export class GuidanceStepSubContent {
    contentType = GuidanceContentType.Image
    contentUid = ""

    ToJson(): any {
        return {
            contentUid: this.contentUid,
            contentType: this.contentType,
        }
    }

    FromJson(jObj: any) {
        this.contentType = jObj.contentType ?? GuidanceContentType.Image
        this.contentUid = jObj.contentUid ?? ""
    }

}