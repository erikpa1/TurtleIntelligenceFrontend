import TurtleIcon from "@Turtle/Icons/A";
import {useTurtleTheme} from "@Turtle/Theme/useTurleTheme";

export default function IconRepeat(props: any = {}) {

    const {theme} = useTurtleTheme()

    return (
        <TurtleIcon
            {...props}
            viewBox="0 0 1024 1024"
        >
            <path d="M305.227,917.333L149.333,761.44L305.227,605.536L350.197,651.819L272.576,729.44L731.893,729.44L731.893,558.773L795.893,558.773L795.893,793.429L272.576,793.429L350.197,871.051L305.227,917.333Z"
                  fill={theme.iconPrimaryColor}
            />
            <path d="M228.107,465.227L228.107,230.571L751.424,230.571L673.803,152.949L718.773,106.667L874.667,262.56L718.773,418.464L673.803,372.181L751.424,294.56L292.107,294.56L292.107,465.227L228.107,465.227Z"
                  fill={theme.iconSecondaryColor}
            />
        </TurtleIcon>
    )


}

