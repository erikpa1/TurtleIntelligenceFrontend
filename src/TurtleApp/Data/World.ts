import Entity from "../../Turtle/Data/Entity";
import aee from "@Turtle/Data/Aee";
import {CreateUid} from "@Turtle/Utils/Uid";


export default class World {

    name = ""
    uid = ""
    entities: Array<Entity> = []
    deletedEntities = new Set<string>()


    ToJsonModified(): any {
        return {
            uid: this.uid,
            modified: this.entities.filter((val) => {
                const modified = val.modified
                val.modified = false
                return modified
            }).map((val) => (val.ToJson())),
            created: this.entities.filter((val) => {
                const created = val.created
                val.created = false
                return created
            }).map((val) => (val.ToJson())),
            deleted: Array.from(this.deletedEntities.values())
        }
    }

    FromJson(jObj: any) {
        this.uid = jObj.uid ?? ""
        this.name = jObj.name ?? ""

        this.entities = (jObj.entities ?? []).map((val) => {
            const tmp = new Entity()
            tmp.FromJson(val)
            return tmp
        })

    }

    AddEntity(entity: Entity) {
        entity.model = this.uid
        entity.created = true

        //Appka nefunguje bez tohto logu
        console.log("Adding to: ", this.uid)

        this.entities.push(entity)
        this.EmitEntitiesChanged()

        console.log(this.entities)
    }

    DeleteEntity(entity: Entity) {

        this.deletedEntities.add(entity.uid)

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