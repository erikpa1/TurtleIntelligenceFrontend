import SimFactory from "@TurtleSim/Factories/SimFactory";

import BufferBehProperties from "@TurtleSim/SimModelWorldDock/BehProps/BufferBehProperties";
import SpawnBehProperties from "@TurtleSim/SimModelWorldDock/BehProps/SpawnBehProperties";
import ProcessBehProperties from "@TurtleSim/SimModelWorldDock/BehProps/ProcessBehProperties";
import SwitchBehProperties from "@TurtleSim/SimModelWorldDock/BehProps/SwitchBehProperties";
import SplitBehProperties from "@TurtleSim/SimModelWorldDock/BehProps/SplitBehProperties";
import MergeBehProperties from "@TurtleSim/SimModelWorldDock/BehProps/MergeBehProperties";
import HumanBehProperties from "@TurtleSim/SimModelWorldDock/BehProps/HumanBehProperties";
import DelayBehProperties from "@TurtleSim/SimModelWorldDock/BehProps/DelayBehProperties";

import SimBufferFiber from "@TurtleSim/SimModelWorldDock/Fibers/EntityModifiers/SimBufferFiber";
import SimSinkFiber from "@TurtleSim/SimModelWorldDock/Fibers/EntityModifiers/SimSinkFiber";
import SimStationFiber from "@TurtleSim/SimModelWorldDock/Fibers/EntityModifiers/SimStationFiber";
import SimSpawnFiber from "@TurtleSim/SimModelWorldDock/Fibers/EntityModifiers/SimSpawnFiber";
import EnterStatisticsBehProperties
    from "@TurtleSim/SimModelWorldDock/BehProps/StatisticsBehaviours/EnterStatisticsBehProperties";

export default function InitWorldFactory() {
    _InitProperties();
    _InitFibers();
}

function _InitProperties() {
    SimFactory.RIGHT_BAR_COMPONENTS[SimFactory.TYPE_SPAWN] = SpawnBehProperties;
    SimFactory.RIGHT_BAR_COMPONENTS[SimFactory.TYPE_PROCESS] =
        ProcessBehProperties;
    SimFactory.RIGHT_BAR_COMPONENTS[SimFactory.TYPE_SWITCH] =
        SwitchBehProperties;
    SimFactory.RIGHT_BAR_COMPONENTS[SimFactory.TYPE_MERGE] = MergeBehProperties;
    SimFactory.RIGHT_BAR_COMPONENTS[SimFactory.TYPE_DELAY] = DelayBehProperties;

    //This ones have the same UI (for now)
    SimFactory.RIGHT_BAR_COMPONENTS[SimFactory.TYPE_QUEUE] =
        BufferBehProperties;
    SimFactory.RIGHT_BAR_COMPONENTS[SimFactory.TYPE_BUFFER] =
        BufferBehProperties;
    SimFactory.RIGHT_BAR_COMPONENTS[SimFactory.TYPE_SPLIT] = SplitBehProperties;

    //Actor properties
    SimFactory.RIGHT_BAR_COMPONENTS[SimFactory.TYPE_HUMAN] = HumanBehProperties;

    //Statistics
    SimFactory.RIGHT_BAR_COMPONENTS[SimFactory.TYPE_ENTRY_STATISTICS] = EnterStatisticsBehProperties;
}

function _InitFibers() {
    SimFactory.FIBER_HANDLERS[SimFactory.TYPE_BUFFER] = SimBufferFiber;
    SimFactory.FIBER_HANDLERS[SimFactory.TYPE_SINK] = SimSinkFiber;
    SimFactory.FIBER_HANDLERS[SimFactory.TYPE_PROCESS] = SimStationFiber;
    SimFactory.FIBER_HANDLERS[SimFactory.TYPE_SPAWN] = SimSpawnFiber;
}
