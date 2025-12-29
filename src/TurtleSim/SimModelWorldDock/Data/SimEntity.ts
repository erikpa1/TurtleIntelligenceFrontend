
import SimDiagram from "@TurtleSim/SimModelWorldDock/Data/SimDiagram"
import {fetchMongoUid} from "@Turtle/Utils/Uid"


export type TypeData = {}


export default class SimEntity {

    uid = ""
    name = ""
    type = ""
    position = [0, 0, 0]
    dependencies = {}

    mesh = ""
    model = ""

    aiDescription = ""

    modified = false
    created = false

    typeData: TypeData = {}

    runtimeId = 0

    diagram: SimDiagram | null = null

    ToJson(): any {
        return {
            uid: this.uid,
            name: this.name,
            type: this.type,
            aiDescription: this.aiDescription,
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
        this.aiDescription = jObj.aiDescription ?? this.aiDescription
        this.position = jObj.position ?? this.position
        this.model = jObj.model ?? ""
        this.dependencies = jObj.dependencies ?? {}
        this.typeData = jObj.typeData ?? {}

    }

    async Duplicate() {
        const tmp = JSON.stringify(this.ToJson())
        const newOne = new SimEntity()
        newOne.FromJson(JSON.parse(tmp))
        newOne.uid = await fetchMongoUid()
        return newOne
    }

}