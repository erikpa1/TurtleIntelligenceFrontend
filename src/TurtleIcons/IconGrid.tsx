import {useTurtleTheme} from "@Turtle/Theme/useTurleTheme";
import TurtleIcon from "./A";

export default function IconGrid(props: any = {}) {
    const {theme} = useTurtleTheme();

    return (
        <TurtleIcon {...props} viewBox={"0 0 1024 1024"}>

            <g transform="matrix(1.066667,0,0,1.066667,0,1024)">
                <path
                    d="M230,-110L230,-230L110,-230L110,-290L230,-290L230,-450L110,-450L110,-510L230,-510L230,-670L110,-670L110,-730L230,-730L230,-850L290,-850L290,-730L450,-730L450,-850L510,-850L510,-730L670,-730L670,-850L730,-850L730,-730L850,-730L850,-670L730,-670L730,-510L850,-510L850,-450L730,-450L730,-290L850,-290L850,-230L730,-230L730,-110L670,-110L670,-230L510,-230L510,-110L450,-110L450,-230L290,-230L290,-110L230,-110ZM290,-290L450,-290L450,-450L290,-450L290,-290ZM510,-290L670,-290L670,-450L510,-450L510,-290ZM290,-510L450,-510L450,-670L290,-670L290,-510ZM510,-510L670,-510L670,-670L510,-670L510,-510Z"
                    fill={theme.iconSecondaryColor}
                />
            </g>
            <g transform="matrix(42.666667,0,0,42.666667,-8.167872,32)">
                <rect
                    fill={theme.iconPrimaryColor}
                    x="8" y="7" width="3" height="3"/>
            </g>

        </TurtleIcon>
    );
}


