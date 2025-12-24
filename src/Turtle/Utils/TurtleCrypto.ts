import {MathUtils} from "three";


export default class TurtleCrypto {

    static  UUID4(): string {
        return MathUtils.generateUUID()
    }

}
