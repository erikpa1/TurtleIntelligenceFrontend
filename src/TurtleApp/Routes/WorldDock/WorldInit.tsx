import EntitiesFactory from "@TurtleApp/Factories/EntitiesFactory";

import BufferEntitiyProperties from "@TurtleApp/Routes/WorldDock/EntitiesProps/BufferEntitiyProperties";
import SpawnEntitiyProperties from "@TurtleApp/Routes/WorldDock/EntitiesProps/SpawnEntityProperties";
import ProcessEntityProperties from "@TurtleApp/Routes/WorldDock/EntitiesProps/ProcessEntityProperties";


export default function InitWorldFactory() {
    EntitiesFactory.RIGHT_BAR_COMPONENTS[EntitiesFactory.TYPE_BUFFER] = BufferEntitiyProperties
    EntitiesFactory.RIGHT_BAR_COMPONENTS[EntitiesFactory.TYPE_SPAWN] = SpawnEntitiyProperties
    EntitiesFactory.RIGHT_BAR_COMPONENTS[EntitiesFactory.TYPE_PROCESS] = ProcessEntityProperties
}