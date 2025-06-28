import React from "react"
import {Knowledge} from "@Turtle/Knowledge/Data/Knowledge";
import {Flex, Tree, TreeDataNode} from "antd";
import {useTurtleModal} from "@Turtle/Hooks/useTurtleModal";
import {useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {HierarchyAddButton, HierarchyRightFlex} from "@Turtle/Components/HierarchyComponents";
import {GuidanceStep} from "@Turtle/Knowledge/Data/Guidance";
import COUGuidanceStepView from "@Turtle/Guidance/COUGuidanceStepView";

interface GuidanceHierarchyProps {
    knowledge: Knowledge
}

export default function GuidanceHierarchy({knowledge}: GuidanceHierarchyProps) {

    const [t] = useTranslation()

    const {activate, deactivate} = useTurtleModal()

    const navigate = useNavigate()

    const [data, setData] = React.useState<Array<TreeDataNode>>(createHierarchy([]))

    const [steps, setSteps] = React.useState<Array<GuidanceStep>>([])

    function createHierarchy(steps: Array<GuidanceStep>) {
        return [
            {
                key: "steps",
                title: (
                    <Flex>
                        {t("steps")} ({steps.length})

                        <HierarchyRightFlex>
                            <HierarchyAddButton
                                onClick={addGuidanceStep}
                            />
                        </HierarchyRightFlex>
                    </Flex>
                ),
            }
        ]
    }

    function addGuidanceStep() {

        const step = new GuidanceStep()

        activate({
            title: t("create.step"),
            closable: true,
            content: (
                <COUGuidanceStepView
                    step={step}
                    onBeforeSubmit={deactivate}
                    onAfterSubmit={refresh}
                />
            )
        })

    }


    async function refresh() {
        setData(createHierarchy(steps))
    }


    React.useEffect(() => {
        refresh()
    }, [knowledge])


    return (
        <Tree
            key={data[0]?.children?.length}
            blockNode
            virtual
            showLine
            treeData={data}
            defaultExpandAll={true}
        />
    )
}