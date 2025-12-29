import ColorConstants from "@Turtle/Constants/ColorConstants";

export enum SimUpcomingEventType {
    UPC_EVNT_SPAWN = 0,
    UPC_EVENT_UNSPAWN = 1,
    UPC_EVENT_START = 2,
    UPC_EVENT_FINISH = 3
}


export class SimUpcomingEvent {
    id = 0
    type: SimUpcomingEventType = 0
    second = 0


    FromJson(jObj: any) {
        this.id = jObj.id
        this.second = jObj.second
        this.type = jObj.type
    }

    GetTypeName() {
        if (this.type === SimUpcomingEventType.UPC_EVNT_SPAWN) {
            return "spawn"
        } else if (this.type === SimUpcomingEventType.UPC_EVENT_UNSPAWN) {
            return "unspawn"
        } else if (this.type === SimUpcomingEventType.UPC_EVENT_START) {
            return "start"
        } else if (this.type === SimUpcomingEventType.UPC_EVENT_FINISH) {
            return "finish"
        } else {
            return "undefined"
        }
    }

    GetTypeColor() {
        if (this.type === SimUpcomingEventType.UPC_EVNT_SPAWN) {
            return ColorConstants.AZURE_BLUE
        } else if (this.type === SimUpcomingEventType.UPC_EVENT_UNSPAWN) {
            return ColorConstants.GRAY
        } else if (this.type === SimUpcomingEventType.UPC_EVENT_START) {
            return ColorConstants.ORANGE
        } else if (this.type === SimUpcomingEventType.UPC_EVENT_FINISH) {
            return ColorConstants.GREEN
        } else {
            return ColorConstants.BLACK
        }
    }

}

