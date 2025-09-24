import EntitiesFactory from "@TurtleApp/Factories/EntitiesFactory"

import BufferBehProperties from "@TurtleApp/Routes/SimModelWorldDock/BehProps/BufferBehProperties"
import SpawnEntitiyProperties from "@TurtleApp/Routes/SimModelWorldDock/BehProps/SpawnBehProperties"
import ProcessBehProperties from "@TurtleApp/Routes/SimModelWorldDock/BehProps/ProcessBehProperties"
import SwitchBehProperties from "@TurtleApp/Routes/SimModelWorldDock/BehProps/SwitchBehProperties"
import SplitBehProperties from "@TurtleApp/Routes/SimModelWorldDock/BehProps/SplitBehProperties";
import MergeBehProperties from "@TurtleApp/Routes/SimModelWorldDock/BehProps/MergeBehProperties";


export default function InitWorldFactory() {
    EntitiesFactory.RIGHT_BAR_COMPONENTS[EntitiesFactory.TYPE_SPAWN] = SpawnEntitiyProperties
    EntitiesFactory.RIGHT_BAR_COMPONENTS[EntitiesFactory.TYPE_PROCESS] = ProcessBehProperties
    EntitiesFactory.RIGHT_BAR_COMPONENTS[EntitiesFactory.TYPE_SWITCH] = SwitchBehProperties
    EntitiesFactory.RIGHT_BAR_COMPONENTS[EntitiesFactory.TYPE_MERGE] = MergeBehProperties

    //This ones have the same UI (for now)
    EntitiesFactory.RIGHT_BAR_COMPONENTS[EntitiesFactory.TYPE_QUEUE] = BufferBehProperties
    EntitiesFactory.RIGHT_BAR_COMPONENTS[EntitiesFactory.TYPE_BUFFER] = BufferBehProperties
    EntitiesFactory.RIGHT_BAR_COMPONENTS[EntitiesFactory.TYPE_SPLIT] = SplitBehProperties
}