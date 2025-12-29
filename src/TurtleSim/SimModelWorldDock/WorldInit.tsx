import SimFactory from "@TurtleSim/Factories/SimFactory"

import BufferBehProperties from "@TurtleSim/SimModelWorldDock/BehProps/BufferBehProperties"
import SpawnEntitiyProperties from "@TurtleSim/SimModelWorldDock/BehProps/SpawnBehProperties"
import ProcessBehProperties from "@TurtleSim/SimModelWorldDock/BehProps/ProcessBehProperties"
import SwitchBehProperties from "@TurtleSim/SimModelWorldDock/BehProps/SwitchBehProperties"
import SplitBehProperties from "@TurtleSim/SimModelWorldDock/BehProps/SplitBehProperties";
import MergeBehProperties from "@TurtleSim/SimModelWorldDock/BehProps/MergeBehProperties";


export default function InitWorldFactory() {
    SimFactory.RIGHT_BAR_COMPONENTS[SimFactory.TYPE_SPAWN] = SpawnEntitiyProperties
    SimFactory.RIGHT_BAR_COMPONENTS[SimFactory.TYPE_PROCESS] = ProcessBehProperties
    SimFactory.RIGHT_BAR_COMPONENTS[SimFactory.TYPE_SWITCH] = SwitchBehProperties
    SimFactory.RIGHT_BAR_COMPONENTS[SimFactory.TYPE_MERGE] = MergeBehProperties

    //This ones have the same UI (for now)
    SimFactory.RIGHT_BAR_COMPONENTS[SimFactory.TYPE_QUEUE] = BufferBehProperties
    SimFactory.RIGHT_BAR_COMPONENTS[SimFactory.TYPE_BUFFER] = BufferBehProperties
    SimFactory.RIGHT_BAR_COMPONENTS[SimFactory.TYPE_SPLIT] = SplitBehProperties
}