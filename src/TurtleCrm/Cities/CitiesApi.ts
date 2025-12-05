import DynamicApi from "@Turtle/DynamicModules/DynamicApi"
import City from "@TurtleCrm/Cities/City"

export default class CitiesApi extends DynamicApi<City> {
    static bucket = "city"
    static nameSpaceAndBucket = `crm/${CitiesApi.bucket}`
    static TConstructor = City
}

