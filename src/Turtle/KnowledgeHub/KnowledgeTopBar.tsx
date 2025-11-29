import {Segmented} from "antd";
import {useNavigate, useParams} from "react-router-dom";
import {HierarchyRightFlex} from "@Turtle/Components/HierarchyComponents";

export default function KnowledgeTopBar() {
    return (
        <>
            <HierarchyRightFlex>
                <_ViewMethod/>
            </HierarchyRightFlex>
        </>
    )
}

export function _ViewMethod({}) {

    const navigate = useNavigate()

    const {domainUid, knowledgeUid, viewMethod} = useParams()

    function segmentChanged(newVal: string) {
        navigate(`/kh/${domainUid}/${knowledgeUid}/${newVal}`)
    }

    return (
        <Segmented
            defaultValue={"data"}
            onChange={segmentChanged}
            options={[
                {label: "data", value: "data"},
                {label: "relations", value: "relations"},
            ]}
        />
    )
}