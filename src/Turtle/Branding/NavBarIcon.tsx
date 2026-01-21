import {useTurtleTheme} from "@Turtle/Theme/useTurleTheme"

export default function NavBarBrandingIcon() {

    const {theme} = useTurtleTheme()

    return (
        <img
            src={"/icons/pointe.png"}
            style={{
                width: "40px",
                height: "40px",
            }}
        />
    )
}