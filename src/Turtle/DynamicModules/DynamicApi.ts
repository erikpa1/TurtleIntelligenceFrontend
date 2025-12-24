import {DeleteEntity, PostEntity, PostEntityV1, QueryEntities} from "@Turtle/Api/Turxios";

class Empty {

}

export default class DynamicApi<T> {
    static bucket = ""
    static nameSpaceAndBucket = ""
    static TConstructor: any = Empty

    static async COU<T>(entity: T) {
        await PostEntity(`/api/${this.nameSpaceAndBucket}`, entity)
    }

    static async List<T>(): Promise<Array<T>> {
        return await this.Query({})
    }

    static async ListAsMap<T>(): Promise<Map<string, T>> {
        return new Map((await this.Query({})).map((val: any) => ([val.uid, val])))
    }

    static async Query<T>(query = {}): Promise<Array<T>> {
        return await QueryEntities(`/api/${this.nameSpaceAndBucket}s`, query, this.TConstructor) as any
    }

    static async Delete(uid: string) {
        await DeleteEntity(`/api/${this.nameSpaceAndBucket}`, uid)
    }

}

export class DynamicApiInstance<T> {
     bucket = ""
     nameSpaceAndBucket = ""
     TConstructor: any = Empty

    async COU<T>(entity: T) {
        await PostEntityV1(`/api/${this.nameSpaceAndBucket}`, entity)
    }

    async List<T>(): Promise<Array<T>> {
        return await this.Query({})
    }

     async ListAsMap<T>(): Promise<Map<string, T>> {
        return new Map((await this.Query({})).map((val: any) => ([val.uid, val])))
    }

     async Query<T>(query = {}): Promise<Array<T>> {
        return await QueryEntities(`/api/${this.nameSpaceAndBucket}s`, query, this.TConstructor) as any
    }

     async Delete(uid: string) {
        await DeleteEntity(`/api/${this.nameSpaceAndBucket}`, uid)
    }

}