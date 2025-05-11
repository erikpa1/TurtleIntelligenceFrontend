import {useGlobalLock} from "@Turtle/Components/GlobalLock";
import {useTranslation} from "react-i18next";


export default class TurtleApp {

    static Lock() {
        useGlobalLock.getState().lock()
    }

    static Unlock() {
        useGlobalLock.getState().unlock()
    }

    static T(text: string): string {
        return text
    }

}