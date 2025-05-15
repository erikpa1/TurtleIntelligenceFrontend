import {CreateUid} from "../Utils/Uid";

export default class Entity {

    uid = ""
    name = ""
    type = ""
    position = [0, 0, 0]

    mesh = ""
    parentWorld = ""

    modified = false
    created = false


    ToJson(): any {
        return {
            _id: this.uid,
            name: this.name,
            position: this.position,
        }
    }

    FromJson(jObj: any): any {
        this.uid = jObj._id ?? ""
        this.name = jObj.name ?? this.name
        this.position = jObj.position ?? this.position

    }

}