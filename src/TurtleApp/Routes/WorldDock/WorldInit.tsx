import EntitiesFactory from "@TurtleApp/Factories/EntitiesFactory";

import BufferEntitiyProperties from "@TurtleApp/Routes/WorldDock/EntitiesProps/BufferEntitiyProperties";
import SpawnEntitiyProperties from "@TurtleApp/Routes/WorldDock/EntitiesProps/SpawnEntityProperties";


export default function InitWorldFactory() {
    EntitiesFactory.RIGHT_BAR_COMPONENTS["buffer"] = BufferEntitiyProperties
    EntitiesFactory.RIGHT_BAR_COMPONENTS["spawn"] = SpawnEntitiyProperties

}