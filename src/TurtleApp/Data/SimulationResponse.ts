import {SimUpcomingEvent} from "@TurtleApp/Routes/SimModelWorldDock/Data/SimUpcomingEvent";

export class SimSecondUpdate {
    second = 0
    spawned: Object = {}
    unspawned: Array<number> = []
    states: Object = {}
    events: SimUpcomingEvent[] = []

}