import TurtleTheme, {TurtleThemeLight} from "@Turtle/Theme/theme";

export default class ThemeApi {

    static async DuplicateTheme(theme: ThemeApi): Promise<TurtleTheme> {
        return new TurtleTheme()
    }

    static async Delete(uid: string) {

    }

    static async List(): Promise<Array<TurtleThemeLight>> {
        return []
    }



}