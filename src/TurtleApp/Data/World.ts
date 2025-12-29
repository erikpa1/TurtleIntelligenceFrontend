
import aee from "@Turtle/Data/Aee";
import {CreateUid} from "@Turtle/Utils/Uid";
import SimEntity from "@TurtleSim/SimModelWorldDock/Data/SimEntity"


export default class World {

    name = ""
    uid = ""
    entities: Map<string, SimEntity> = new Map<string, SimEntity>()
    entitiesById: Map<number, SimEntity> = new Map<number, SimEntity>()
    deletedEntities = new Set<string>()

    connections = new Map<string, Set<string>>()

    createdConnections = new Map<string, Set<string>>()
    deletedConnections = new Map<string, Set<string>>()

    activeSecond = 0

    ToJsonModified(): any {


        const createConnections = new Array<[string, string]>()


        this.createdConnections.forEach((val, key) => {
            val.forEach((val2) => {
                createConnections.push([key, val2])
            })
        })

        const deletedConnections = new Array<[string, string]>()

        this.deletedConnections.forEach((val, key) => {
            val.forEach((val2) => {
                deletedConnections.push([key, val2])
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
            const tmp = new SimEntity()
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

    AddEntity(entity: SimEntity) {
        entity.model = this.uid
        entity.created = true

        //Appka nefunguje bez tohto logu
        console.log("Adding to: ", this.uid)

        this.entities.set(entity.uid, entity)
        this.EmitEntitiesChanged()

    }

    AddConnection(a: SimEntity, b: SimEntity) {

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

        this.EmitConnectionsChanged()
    }

    DeleteConnection(a: SimEntity, b: SimEntity) {
        const existingConn = this.connections.get(a.uid)

        if (existingConn) {
            existingConn.delete(b.uid)
        } else {
            console.log("Trying to delete non existing connection: ", a, b)
        }

        const createdConn = this.createdConnections.get(a.uid)

        if (createdConn) {
            createdConn.delete(b.uid)
        } else {
            const existingConn = this.deletedConnections.get(a.uid)
            if (existingConn) {
                existingConn.add(b.uid)
            } else {
                this.deletedConnections.set(a.uid, new Set([b.uid]))
            }
        }


        this.EmitConnectionsChanged()
    }

    DeleteEntity(entity: SimEntity) {

        this.deletedEntities.add(entity.uid)
        this.entities.delete(entity.uid)

        this.connections.forEach((val, key) => {
            if (val.has(entity.uid)) {
                val.delete(entity.uid)
            }
        })

        this.connections.delete(entity.uid)

        this.EmitEntitiesChanged()
        this.EmitConnectionsChanged()
    }

    EmitEntitiesChanged() {
        aee.emit("WorldEntitiesChanged", null)
    }

    EmitConnectionsChanged() {
        aee.emit("WorldConnectionsChanged", null)
    }

    SimStarted() {
        WorldSingleton.I.entitiesById.clear()
        WorldSingleton.I.activeSecond = 0
    }


}

export class WorldSingleton {
    static I = new World()
}