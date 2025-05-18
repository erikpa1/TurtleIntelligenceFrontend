import {CreateUid, fetchMongoUid} from "../Utils/Uid";

export default class Entity {

    uid = ""
    name = ""
    type = ""
    position = [0, 0, 0]
    dependencies = {}

    mesh = ""
    model = ""

    modified = false
    created = false

    typeData = {}

    ToJson(): any {
        return {
            uid: this.uid,
            name: this.name,
            type: this.type,
            position: this.position,
            model: this.model,
            dependencies: this.dependencies,
            typeData: this.typeData,
        }
    }

    FromJson(jObj: any): any {
        this.uid = jObj.uid ?? ""
        this.type = jObj.type ?? this.type
        this.name = jObj.name ?? this.name
        this.position = jObj.position ?? this.position
        this.model = jObj.model ?? ""
        this.dependencies = jObj.dependencies ?? {}
        this.typeData = jObj.typeData ?? {}
    }

    async Duplicate() {
        const tmp = JSON.stringify(this.ToJson())
        const newOne = new Entity()
        newOne.FromJson(JSON.parse(tmp))
        newOne.uid = await fetchMongoUid()
        return newOne
    }

}