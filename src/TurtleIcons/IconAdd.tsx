import { useTurtleTheme } from "@Turtle/Theme/useTurleTheme";
import TurtleIcon from "./A";

export default function IconAdd(props: any = {}) {
    const { theme } = useTurtleTheme();

    return (
        <TurtleIcon {...props} viewBox={"0 0 1024 1024"}>
            <g transform="matrix(42.666667,0,0,42.666667,0,0)">
                <path
                    d="M20,11.25L12.75,11.25L12.75,4C12.75,3.586 12.414,3.25 12,3.25C11.586,3.25 11.25,3.586 11.25,4L11.25,11.25L4,11.25C3.586,11.25 3.25,11.586 3.25,12C3.25,12.414 3.586,12.75 4,12.75L11.25,12.75L11.25,20C11.25,20.414 11.586,20.75 12,20.75C12.414,20.75 12.75,20.414 12.75,20L12.75,12.75L20,12.75C20.414,12.75 20.75,12.414 20.75,12C20.75,11.586 20.414,11.25 20,11.25Z"
                    fill={theme.iconSecondaryColor}
                />
            </g>
        </TurtleIcon>
    );
}
