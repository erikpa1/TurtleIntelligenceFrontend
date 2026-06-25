import TurtleIcon, {TurtleIconProps} from "./A";
import {useTurtleTheme} from "@Turtle/Theme/useTurleTheme";

export default function IconBookmarkRemove(props: TurtleIconProps = {}) {

    const {theme} = useTurtleTheme()

    return (
        <TurtleIcon
            {...props}
            viewBox="0 0 1024 1024"
        >
            <path
                d="M234.667,864L234.667,226.464C234.667,204.91 242.133,186.667 257.067,171.733C272,156.8 290.244,149.333 311.797,149.333L554.667,149.333L554.667,213.333L311.797,213.333C308.512,213.333 305.504,214.702 302.773,217.44C300.036,220.171 298.667,223.179 298.667,226.464L298.667,765.867L512,674.133L725.333,765.867L725.333,469.333L789.333,469.333L789.333,864L512,745.024L234.667,864Z"
                fill={theme.iconSecondaryColor}
            />

            <rect
                x="640"
                y="234.667"
                width="234.667"
                height="64"
                fill={theme.iconPrimaryColor}
            />
        </TurtleIcon>
    )


}

