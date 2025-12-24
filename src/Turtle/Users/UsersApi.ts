import  {DynamicApiInstance} from "@Turtle/DynamicModules/DynamicApi";
import {User} from "@Turtle/Users/User";

class _UsersApi extends DynamicApiInstance<User>{
    bucket = "user"
    nameSpaceAndBucket = "user"
    TConstructor: any = User


}


const UsersApi = new _UsersApi()

export default UsersApi