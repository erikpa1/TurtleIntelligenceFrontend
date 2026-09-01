import {useTurtleTheme} from "@Turtle/Theme/useTurleTheme";
import TurtleIcon from "./A";

export default function IconAccountBalance(props: any = {}) {
    const {theme} = useTurtleTheme();

    return (
        <TurtleIcon {...props} viewBox={"0 0 1024 1024"}>

            <g transform="matrix(42.666667,0,0,42.666667,0,0)">
                <path
                    d="M5.75,17L5.75,9.5L7.25,9.5L7.25,17L5.75,17ZM11.25,17L11.25,9.5L12.75,9.5L12.75,17L11.25,17ZM16.75,17L16.75,9.5L18.25,9.5L18.25,17L16.75,17Z"
                    fill={theme.iconPrimaryColor}
                />
            </g>

            <g transform="matrix(42.666667,0,0,42.666667,0,0)">
                <path
                    d="M2.769,20.5L2.769,19L21.231,19L21.231,20.5L2.769,20.5ZM2.769,7.5L2.769,6.077L12,1.558L21.231,6.077L21.231,7.5L2.769,7.5ZM6.315,6L17.685,6L12,3.25L6.315,6Z"
                    fill={theme.iconSecondaryColor}
                />
            </g>

        </TurtleIcon>
    );
}


