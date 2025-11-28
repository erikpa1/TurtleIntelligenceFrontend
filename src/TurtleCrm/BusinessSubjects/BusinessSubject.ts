export enum BusinessSubjectType {
    ALL = 0,
    CUSTOMER = 1,
    SUPPLIER = 2
}

export enum BusinessSubjectLegalType {
    COMPANY = 0,
    PERSON = 1,
}


export default class BusinessSubject {
    uid = ""
    name = ""
    type: BusinessSubjectType = BusinessSubjectType.ALL
    legalType: BusinessSubjectLegalType = BusinessSubjectLegalType.COMPANY
    

    ToJson(): any {
        return {
            uid: this.uid,
            name: this.name,
            type: this.type,
        }
    }

    FromJson(jObj: any) {
        this.uid = jObj.uid ?? ""
        this.name = jObj.name ?? ""
        this.type = jObj.type ?? BusinessSubjectType.ALL
    }
}