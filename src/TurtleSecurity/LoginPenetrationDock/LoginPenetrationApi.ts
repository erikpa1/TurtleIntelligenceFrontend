import DynamicApi from "@Turtle/DynamicModules/DynamicApi";
import LoginPenetration from "@TurtleSecurity/LoginPenetrationDock/LoginPenetration";


export default class LoginPenetrationApi extends DynamicApi<LoginPenetration> {
    static bucket = "login_penetration"
    static nameSpaceAndBucket = `crm/${LoginPenetrationApi.bucket}`
    static TConstructor = LoginPenetration
}