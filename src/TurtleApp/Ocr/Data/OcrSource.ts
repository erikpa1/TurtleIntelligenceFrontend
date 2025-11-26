export enum OCR_SOURCE_TYPE {
    FILE_SYSTEM = 0,
    API = 1,
    API_SERVER = 2
}

export default class OcrSource {
    uid = ""
    name = ""
    type: OCR_SOURCE_TYPE = OCR_SOURCE_TYPE.FILE_SYSTEM
    typeData = {}
}