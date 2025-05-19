import Entity from "../../Turtle/Data/Entity";
import aee from "@Turtle/Data/Aee";
import {CreateUid} from "@Turtle/Utils/Uid";


export default class World {

    name = ""
    uid = ""
    entities: Map<string, Entity> = new Map<string, Entity>()
    deletedEntities = new Set<string>()

    connections = new Map<string, Set<string>>()

    createdConnections = new Map<string, Set<string>>()
    deletedConnections = new Map<string, Set<string>>()

    ToJsonModified(): any {


        const createConnections = new Array<[string, string]>()


        this.createdConnections.forEach((val, key) => {
            val.forEach((val2) => {
                createConnections.push([key, val2])
            })
        })


        const deletedConnections = new Array<[string, string]>()

        this.createdConnections.forEach((val, key) => {
            val.forEach((val2) => {
                createConnections.push([key, val2])
            })
        })


        this.createdConnections.clear()
        this.deletedConnections.clear()

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
            deleted: Array.from(this.deletedEntities.values()),
            createdConnections: createConnections,
            deletedConnections: deletedConnections

        }
    }

    FromJson(jObj: any) {
        this.uid = jObj.uid ?? ""
        this.name = jObj.name ?? ""

        this.entities = new Map((jObj.entities ?? []).map((val) => {
            const tmp = new Entity()
            tmp.FromJson(val)
            return [tmp.uid, tmp]
        }))

        jObj.connections.forEach((val) => {
            const a = this.entities.get(val.a)
            const b = this.entities.get(val.b)

            if (a && b) {

                const existingConn = this.connections.get(a.uid)

                if (existingConn) {
                    existingConn.add(b.uid)
                } else {
                    this.connections.set(a.uid, new Set([b.uid]))
                }

            } else {
                console.log("Missing entity: ", val.a, val.b)
            }

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
            this.connections.set(a.uid, new Set([b.uid]))
        }


        const existsInCreated = this.createdConnections.get(a.uid)

        if (existsInCreated) {
            existsInCreated.add(b.uid)
        } else {
            this.createdConnections.set(a.uid, new Set([b.uid]))
        }

        aee.emit("WorldConnectionsChanged", null)
    }

    DeleteConnection(a: Entity, b: Entity) {
        const existingConn = this.connections.get(a.uid)

        if (existingConn) {
            existingConn.delete(b.uid)
        }

        const createdConn = this.createdConnections.get(a.uid)

        if (createdConn) {
            createdConn.delete(b.uid)
        }
    }

    DeleteEntity(entity: Entity) {

        this.deletedEntities.add(entity.uid)
        this.entities.delete(entity.uid)

        this.connections.forEach((val, key) => {
            if (val.has(entity.uid)) {
                val.delete(entity.uid)
            }
        })

        this.connections.delete(entity.uid)

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