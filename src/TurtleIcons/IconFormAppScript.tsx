import {useTurtleTheme} from "@Turtle/Theme/useTurleTheme";
import TurtleIcon from "./A";

export default function IconFormAppScript(props: any = {}) {
    const {theme} = useTurtleTheme();

    return (
        <TurtleIcon {...props} viewBox={"0 0 1024 1024"}>


            <g transform="matrix(42.666667,0,0,42.666667,0,0)">
                <path
                    fill={theme.iconPrimaryColor}
                    d="M13,20C13,20 12,20 12,19L17,19L14,17L14,15L15,15L18,18L16,14L17,13C18,13 18,13 18,14L19,17L20,14L20,13L21,13L22,14L20,20L13,20ZM2,17L2,16L4,16L4,17L2,17ZM2,13L2,12L4,12L4,13L2,13ZM2,9L2,8L4,8L4,9L2,9ZM2,5L2,4L4,4L4,5L2,5Z"
                   />
            </g>
            <g transform="matrix(42.666667,0,0,42.666667,0,0)">
                <path
                    fill={theme.iconSecondaryColor}
                    d="M6,17L6,16L11,16C10,16 10,16 10,17L11,17L6,17ZM6,13L6,12L13,12L12,12L12,13L6,13ZM6,9L6,8L18,8L18,9L6,9ZM6,5L6,4L18,4L18,5L6,5Z"
                    />
            </g>

        </TurtleIcon>
    );
}
