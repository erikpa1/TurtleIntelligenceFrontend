import SimModelsApi from "@TurtleSim/Api/SimModelsApi"
import {HierarchyRightFlex} from "@Turtle/Components/HierarchyComponents"
import {RbacButton} from "@Turtle/Rbac/RbacButton";



export default function SimModelsTopBar({}) {
    return (
        <>
            <HierarchyRightFlex>
                <RbacButton
                    modulesRoute={SimModelsApi.RBAC}
                />
            </HierarchyRightFlex>
        </>
    )
}