import ColorConstants from "@Turtle/Constants/ColorConstants";
import {useTurtleTheme} from "@Turtle/Theme/useTurleTheme";
import TurtleIcon from "@Turtle/Icons/A";


export default function IconWidgets(props: any = {}) {


        const {theme} = useTurtleTheme()

    return (
        <TurtleIcon
            {...props}

        >
            <path
                d="M16.477,12.481L11.539,7.542L16.477,2.604L21.415,7.542L16.477,12.481ZM16.502,10.392L19.327,7.567L16.502,4.742L13.677,7.567L16.502,10.392Z"
                fill={theme.iconPrimaryColor}/>
            <path
                d="M13.192,20.192L13.192,13.192L20.192,13.192L20.192,20.192L13.192,20.192ZM3.808,20.192L3.808,13.192L10.808,13.192L10.808,20.192L3.808,20.192ZM14.692,18.692L18.692,18.692L18.692,14.692L14.692,14.692L14.692,18.692ZM5.308,18.692L9.308,18.692L9.308,14.692L5.308,14.692L5.308,18.692ZM3.808,10.808L3.808,3.808L10.808,3.808L10.808,10.808L3.808,10.808ZM5.308,9.308L9.308,9.308L9.308,5.308L5.308,5.308L5.308,9.308Z"
                fill={theme.iconSecondaryColor}/>
        </TurtleIcon>
    )


}

