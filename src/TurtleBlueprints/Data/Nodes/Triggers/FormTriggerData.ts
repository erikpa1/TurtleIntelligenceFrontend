import NodeTypeData from "@TurtleBlueprints/Data/Nodes/NodeTypeData";

export class FormTriggerData extends NodeTypeData {

    entities: FormEntity[] = []

    FromJson(jObj: any) {

        for (const entity of jObj.entities) {
            const tmp = new FormEntity()
            tmp.FromJson(entity)
            this.entities.push(tmp)
        }

        this.entities = jObj.entities ?? this.entities
    }

    ToJson(): any {
        return {
            entities: this.entities
        }
    }

}

export class FormEntity {
    name = ""
    type = ""
    condition = {}

    FromJson(jObj: any) {

    }

    ToJson(): any {
        return {
            name: this.name,
            type: this.type,
            condition: this.condition
        }
    }
}