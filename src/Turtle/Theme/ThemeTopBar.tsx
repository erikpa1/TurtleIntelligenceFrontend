import {HierarchyRightFlex} from "@Turtle/Components/HierarchyComponents"
import {SaveButton} from "@Turtle/Components/SaveButton"
import {CopilotButton} from "@Turtle/Copilot/CopilotButton"


export default function ThemeTopBar() {
    return (
        <>
            <HierarchyRightFlex>
                <_SaveButton/>
                <_CopilotButton/>
            </HierarchyRightFlex>
        </>
    )
}

function _SaveButton({}) {

    function savePressed() {

    }

    return (
        <SaveButton onClick={savePressed}/>
    )
}

function _CopilotButton({}) {
    return (
        <CopilotButton context={"themes"}/>
    )
}