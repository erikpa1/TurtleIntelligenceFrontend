import {TurtleTheme, TurtleThemeLight} from "@Turtle/Theme/theme";
import ColorConstants from "@Turtle/Constants/ColorConstants"
import Turxios, {DeleteEntity, GetEntity, PostEntity, QueryEntities} from "@Turtle/Api/Turxios"

export default class ThemeApi {

    static async DuplicateTheme(theme: TurtleTheme): Promise<TurtleTheme> {
        return new TurtleTheme()
    }

    static async COU(theme: TurtleTheme) {
        await PostEntity("/api/theme", theme)
    }

    static async Delete(uid: string) {
        DeleteEntity("/api/theme", uid)
    }

    static async Get(uid: string): Promise<null | TurtleTheme> {
        const tmp = await GetEntity("/api/theme", uid, TurtleTheme)
        console.log(tmp)
        return tmp
    }

    static async List(): Promise<Array<TurtleThemeLight>> {
        return await QueryEntities("/api/themes", {}, TurtleThemeLight)
    }

    static async GetDefaultTheme(): Promise<TurtleTheme> {

        const response = (await Turxios.get("/api/theme/default")).data

        if (response) {
            const tmp = new TurtleTheme()
            tmp.FromJson(response)
            return tmp
        } else {
            return new TurtleTheme()
        }

    }


}