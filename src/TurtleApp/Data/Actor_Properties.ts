import {ColorProperty, PropertyParent, StringProperty} from "@Turtle/Data/Properties";


export default class ActorProperties {

    static async Get(): Promise<PropertyParent[]> {
        return [
            StringProperty.New("name", "name"),
            ColorProperty.NewColor()
        ]
    }

}