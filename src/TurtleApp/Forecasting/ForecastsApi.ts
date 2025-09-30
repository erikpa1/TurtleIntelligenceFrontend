import Turxios from "@Turtle/Api/Turxios";
import {Forecast} from "@TurtleApp/Forecasting/Forecast";
import {QueryHeader} from "@Turtle/Utils/Http";


export default class ForecastApi {

    static async ListForecasts(query: any = {}) {
        const response = (await Turxios.get<any[]>("/api/forecasts/query", {
            headers: {
                ...QueryHeader(query)
            }
        })).data

        return response.map((val) => {
            const tmp = new Forecast()
            tmp.FromJson(val)
            return tmp
        })
    }

    static async COU(forecast: Forecast) {
        const form = new FormData()
        form.set("data", JSON.stringify(forecast.ToJson()))
        await Turxios.post("/api/forecast", form)
    }


    static async ListForecastingMethods(): Promise<Array<ForecastingMethod>> {
        return (await Turxios.get<Array<ForecastingMethod>>("/api/forecast/methods")).data
    }

    static async DeleteForecast(uid: string) {
        await Turxios.delete("/api/forecast", {
            params: {
                uid: uid
            }
        })
    }
}

export interface ForecastingMethod {
    name: string
    type: number
    enabled: boolean
}