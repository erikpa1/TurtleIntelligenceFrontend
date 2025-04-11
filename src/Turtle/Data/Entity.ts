import {CreateUid} from "../Utils/Uid";

export default class Entity {

    uid = CreateUid()
    name = ""
    position = [0, 0, 0]
    mesh = ""


    modified = false


    ToJson(): any {
        return {
            uid: this.uid,
            name: this.name,
            position: this.position,
        }
    }

    FromJson(jObj: any): any {
        this.uid = jObj.uid ?? this.uid
        this.name = jObj.name ?? this.name
        this.position = jObj.position ?? this.position

    }

}