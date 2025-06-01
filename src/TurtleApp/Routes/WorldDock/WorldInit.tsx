import EntitiesFactory from "@TurtleApp/Factories/EntitiesFactory"

import BufferEntitiyProperties from "@TurtleApp/Routes/WorldDock/EntitiesProps/BufferEntitiyProperties"
import SpawnEntitiyProperties from "@TurtleApp/Routes/WorldDock/EntitiesProps/SpawnEntityProperties"
import ProcessEntityProperties from "@TurtleApp/Routes/WorldDock/EntitiesProps/ProcessEntityProperties"
import SwitchEntityProperties from "@TurtleApp/Routes/WorldDock/EntitiesProps/SwitchEntityProperties"


export default function InitWorldFactory() {
    EntitiesFactory.RIGHT_BAR_COMPONENTS[EntitiesFactory.TYPE_SPAWN] = SpawnEntitiyProperties
    EntitiesFactory.RIGHT_BAR_COMPONENTS[EntitiesFactory.TYPE_PROCESS] = ProcessEntityProperties
    EntitiesFactory.RIGHT_BAR_COMPONENTS[EntitiesFactory.TYPE_SWITCH] = SwitchEntityProperties

    //This ones have the same UI (for now)
    EntitiesFactory.RIGHT_BAR_COMPONENTS[EntitiesFactory.TYPE_QUEUE] = BufferEntitiyProperties
    EntitiesFactory.RIGHT_BAR_COMPONENTS[EntitiesFactory.TYPE_BUFFER] = BufferEntitiyProperties
}