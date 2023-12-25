import React from "react";
import axios from "axios";
import AnyEventEmmiter from "./AnyEventEmmiter";
import anyEventEmmiter from "./AnyEventEmmiter";
import {join} from "@tauri-apps/api/path";


export default class SimulationApi {

    static async GetSimulationState(): Promise<AppStateResponse> {
        const data = (await axios.get("/api/simulation/state")).data

        const response = new AppStateResponse()
        response.FromJson(data)

        return response

    }

    static EmitAppStateData(data: AppStateResponse) {

        anyEventEmmiter.emit("speed", data.speed)
        anyEventEmmiter.emit("time_step", data.time_step)
        anyEventEmmiter.emit("warehouse", data.warehouse)


    }

}


export class AppStateResponse {

    speed = 1
    time_step = 1
    warehouse = new Warehouse()

    FromJson(obj: any) {
        this.speed = obj.speed ?? 1
        this.time_step = obj.time_step ?? 1


        this.warehouse.FromJson(obj.warehouse ?? {resources: {}})

    }

}

export class Warehouse {

    resources = new Map<string, number>()

    FromJson(obj: any) {

        this.resources.clear()

        const _resources = obj.resources ?? {}

        Object.keys(_resources).forEach((key) => {
            this.resources.set(key, _resources[key])
        })

    }

    GetResource(data: string) {
        const tmp = this.resources.get(data)
        if (tmp) {
            return tmp
        } else {
            return 0
        }
    }

}


