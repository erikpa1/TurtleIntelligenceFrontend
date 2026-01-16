import {HierarchyRightFlex} from "@Turtle/Components/HierarchyComponents"
import {SaveButton} from "@Turtle/Components/SaveButton"
import {CopilotButton} from "@Turtle/Copilot/CopilotButton"


export default function ThemeTopBar() {
    return (
        <>
            <HierarchyRightFlex>
                <_CopilotButton/>
            </HierarchyRightFlex>
        </>
    )
}

function _CopilotButton({}) {
    return (
        <CopilotButton context={"themes"}/>
    )
}