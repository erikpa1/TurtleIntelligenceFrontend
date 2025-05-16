import {CreateUid} from "../Utils/Uid";

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
            _id: this.uid,
            name: this.name,
            position: this.position,
            model: this.model,
            dependencies: this.dependencies,
            typeData: this.typeData,
        }
    }

    FromJson(jObj: any): any {
        this.uid = jObj.uid ?? ""
        this.name = jObj.name ?? this.name
        this.position = jObj.position ?? this.position
        this.model = jObj.model ?? ""
        this.dependencies = jObj.dependencies ?? {}
        this.typeData = jObj.typeData ?? {}

    }

}