export class Forecast {
    uid = ""
    name = ""
    type = 0


    FromJson(data: any) {
        this.name = data.name ?? ""
        this.uid = data.uid ?? ""
        this.type = data.type ?? ""
    }


    ToJson(): any {
        return {
            uid: this.uid,
            name: this.name,
            type: this.type,
        }
    }
}

export class ExponentionalSmoothingForecast {
    index = 0
}