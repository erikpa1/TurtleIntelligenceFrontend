export enum GuidanceContentType {
    PlainText = 0,
    Image = 1,
    SimpleModel3d = 2,
    ModelAnimated = 3,
    Component = 4
}


export class Guidance {
    uid = ""
    name = ""
}


export class GuidanceStep {
    uid = ""
    name = ""
    description = ""
    contentType = GuidanceContentType.PlainText

}