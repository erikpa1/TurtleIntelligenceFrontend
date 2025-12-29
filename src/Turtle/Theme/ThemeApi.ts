import {TurtleTheme, TurtleThemeLight} from "@Turtle/Theme/theme";
import ColorConstants from "@Turtle/Constants/ColorConstants"

export default class ThemeApi {

    static async DuplicateTheme(theme: ThemeApi): Promise<TurtleTheme> {
        return new TurtleTheme()
    }

    static async Delete(uid: string) {

    }

    static async List(): Promise<Array<TurtleThemeLight>> {
        return []
    }

    static async GetDefaultTheme(): Promise<TurtleTheme> {
        const tmp = new TurtleTheme()
        console.log(JSON.stringify(tmp, null, 4))
        return tmp
    }


}