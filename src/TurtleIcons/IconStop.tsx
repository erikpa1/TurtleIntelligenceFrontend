import TurtleIcon from "./A";
import { useTurtleTheme } from "@Turtle/Theme/useTurleTheme";

export default function IconStop(props: any = {}) {
    const { theme } = useTurtleTheme();

    return (
        <TurtleIcon {...props} viewBox={"0 0 1024 1024"}>
            <g transform="matrix(42.666667,0,0,42.666667,0,0)">
                <path
                    d="M8,8L8,16L8,8ZM6.5,17.5L6.5,6.5L17.5,6.5L17.5,17.5L6.5,17.5ZM8,16L16,16L16,8L8,8L8,16Z"
                    fill={theme.iconPrimaryColor}
                />
            </g>
        </TurtleIcon>
    );
}
