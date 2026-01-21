import {useTurtleTheme} from "@Turtle/Theme/useTurleTheme"

export default function NavBarBrandingIcon() {

    const {theme} = useTurtleTheme()

    return (
        <img
            src={theme.primaryLogo}
            style={{
                width: theme.primaryLogoSizeX,
                height:  theme.primaryLogoSizeY,
            }}
        />
    )
}