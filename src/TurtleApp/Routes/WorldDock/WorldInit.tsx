import EntitiesFactory from "@TurtleApp/Factories/EntitiesFactory"

import BufferBehProperties from "@TurtleApp/Routes/WorldDock/BehProps/BufferBehProperties"
import SpawnEntitiyProperties from "@TurtleApp/Routes/WorldDock/BehProps/SpawnBehProperties"
import ProcessBehProperties from "@TurtleApp/Routes/WorldDock/BehProps/ProcessBehProperties"
import SwitchBehProperties from "@TurtleApp/Routes/WorldDock/BehProps/SwitchBehProperties"
import SplitBehProperties from "@TurtleApp/Routes/WorldDock/BehProps/SplitBehProperties";


export default function InitWorldFactory() {
    EntitiesFactory.RIGHT_BAR_COMPONENTS[EntitiesFactory.TYPE_SPAWN] = SpawnEntitiyProperties
    EntitiesFactory.RIGHT_BAR_COMPONENTS[EntitiesFactory.TYPE_PROCESS] = ProcessBehProperties
    EntitiesFactory.RIGHT_BAR_COMPONENTS[EntitiesFactory.TYPE_SWITCH] = SwitchBehProperties

    //This ones have the same UI (for now)
    EntitiesFactory.RIGHT_BAR_COMPONENTS[EntitiesFactory.TYPE_QUEUE] = BufferBehProperties
    EntitiesFactory.RIGHT_BAR_COMPONENTS[EntitiesFactory.TYPE_BUFFER] = BufferBehProperties
    EntitiesFactory.RIGHT_BAR_COMPONENTS[EntitiesFactory.TYPE_SPLIT] = SplitBehProperties
}