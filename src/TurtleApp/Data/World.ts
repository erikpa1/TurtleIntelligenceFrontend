import Entity from "../../Turtle/Data/Entity";
import aee from "@Turtle/Data/Aee";
import {CreateUid} from "@Turtle/Utils/Uid";


export default class World {

    name = ""
    uid = CreateUid()
    entities: Array<Entity> = []
    deletedEntities = new Set<string>()

    ToJsonModified(): any {
        return {
            uid: this.uid,
            modified: this.entities.filter((val) => {
                val.modified = false
                return val.modified
            }),
            deleted: Array.from(this.deletedEntities.values())
        }
    }

    FromJson(jObj: any) {
        this.uid = jObj.uid ?? ""
        this.entities = (jObj.entities ?? []).map((val) => {
            const tmp = new Entity()
            tmp.FromJson(val)
            return tmp
        })

    }

    AddEntity(entity: Entity) {
        entity.parentWorld = this.uid
        entity.modified = true
        this.entities.push(entity)
        this.EmitEntitiesChanged()
    }

    DeleteEntity(entity: Entity) {
        this.entities = this.entities.filter((val) => {
            return val !== entity
        })
        this.EmitEntitiesChanged()
    }

    EmitEntitiesChanged() {
        aee.emit("WorldEntitiesChanged", null)
    }


}

export class WorldSingleton {
    static I = new World()
}