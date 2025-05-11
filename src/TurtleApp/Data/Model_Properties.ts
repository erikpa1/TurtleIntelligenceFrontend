import {PropertyParent, StringProperty} from "@Turtle/Data/Properties";


export default class ModelProperties {

    static async Get(): Promise<PropertyParent[]> {
        return [
            StringProperty.New("name", "name")
        ]
    }

}