import Entity from "../../Turtle/Data/Entity";
import aee from "@Turtle/Data/Aee";
import {CreateUid} from "@Turtle/Utils/Uid";


export default class World {

    name = ""
    uid = ""
    entities: Map<string, Entity> = new Map<string, Entity>()
    deletedEntities = new Set<string>()

    connections = new Map<string, Set<string>>()

    deletedConnections = new Map<string, Set<string>>()

    ToJsonModified(): any {
        return {
            uid: this.uid,
            modified: Array.from(this.entities.values()).filter((val) => {
                const modified = val.modified
                val.modified = false
                return modified
            }).map((val) => (val.ToJson())),
            created: Array.from(this.entities.values()).filter((val) => {
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

        this.entities.set(entity.uid, entity)
        this.EmitEntitiesChanged()

    }

    AddConnection(a: Entity, b: Entity) {

        const existingConn = this.connections.get(a.uid)

        if (existingConn) {
            existingConn.add(b.uid)
        } else {
            this.connections.set(a.uid, new Set[b.uid])
        }

        aee.emit("WorldConnectionsChanged", null)
    }

    DeleteConnection(a: Entity, b: Entity) {
        const existingConn = this.connections.get(a.uid)

        if (existingConn) {
            existingConn.delete(b.uid)
        }
    }

    DeleteEntity(entity: Entity) {

        this.deletedEntities.add(entity.uid)

        this.entities.delete(entity.uid)
        this.EmitEntitiesChanged()
    }

    EmitEntitiesChanged() {
        aee.emit("WorldEntitiesChanged", null)
    }

    EmitConnectionsChanged() {
        aee.emit("WorldConnectionsChanged", null)
    }


}

export class WorldSingleton {
    static I = new World()
}