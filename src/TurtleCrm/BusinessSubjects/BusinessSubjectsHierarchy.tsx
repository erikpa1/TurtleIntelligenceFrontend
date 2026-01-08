import {useTranslation} from "react-i18next";
import React from "react";
import {useTurtleModal} from "@Turtle/Hooks/useTurtleModal";
import {Flex, Tree, TreeDataNode} from "antd";
import {Forecast} from "@TurtleApp/Forecasting/Forecast";
import {
    HierarchyAddButton,
    HierarchyCustomIcon,
    HierarchyDeleteButton,
    HierarchyEditButton,
    HierarchyRightFlex
} from "@Turtle/Components/HierarchyComponents";
import {IconSimulation} from "@Turtle/Icons";
import TurtleApp from "@TurtleApp/TurtleApp";
import ForecastApi from "@TurtleApp/Forecasting/ForecastsApi";
import BusinessSubject from "@TurtleCrm/BusinessSubjects/BusinessSubject";
import COUBusinessSubject from "@TurtleCrm/BusinessSubjects/COUBusinessSubject";
import BusinessSubjectsApi from "@TurtleCrm/BusinessSubjects/BusinessSubjectsApi";

export default function BusinessSubjectsHierarchy() {


    const [t] = useTranslation()

    const [key, setKey] = React.useState("")
    const {activate, deactivate} = useTurtleModal()
    const [data, setData] = React.useState<TreeDataNode[]>(createHierarchy([]))

    function createHierarchy(subjects: BusinessSubject[]): TreeDataNode[] {
        return [
            {
                key: "subjects",
                title: (
                    <Flex gap={15}>
                        <HierarchyCustomIcon icon={<IconSimulation/>}/>

                        <div>{t("subjects")} ({subjects.length})</div>

                        <HierarchyRightFlex>
                            <HierarchyAddButton
                                onClick={createBusinessSubject}
                            />
                        </HierarchyRightFlex>
                    </Flex>
                ),

                children: subjects.map((val) => {
                    return {
                        key: val.name,
                        title: (
                            <Flex>
                                {val.name}

                                <HierarchyRightFlex>

                                    <HierarchyEditButton
                                        onClick={() => {
                                            editSubject(val)
                                        }}
                                    />

                                    <HierarchyDeleteButton onClick={() => {
                                        deleteSubject(val.uid)
                                    }}/>
                                </HierarchyRightFlex>
                            </Flex>
                        ),

                    }
                })
            }
        ]
    }


    async function deleteSubject(subjectUid: string) {
        TurtleApp.Lock()
        await BusinessSubjectsApi.Delete(subjectUid)
        TurtleApp.Unlock()
    }

    function editSubject(subject: BusinessSubject) {
        activate({
            title: `${t("edit.business.subject")}:`,
            content: (
                <COUBusinessSubject
                    entity={subject}
                    onBeforeUpdate={deactivate}
                    onAfterUpdate={refresh}
                />
            )
        })

    }

    function createBusinessSubject() {
        const subject = new BusinessSubject()
        subject.name = `Customer`

        activate({
            title: `${t("create.business.subject")}:`,
            content: (
                <COUBusinessSubject
                    entity={subject}
                    onBeforeUpdate={deactivate}
                    onAfterUpdate={refresh}
                />
            )
        })

    }

    async function refresh() {

        // const data = await ForecastApi.ListForecasts()
        setData(createHierarchy([]))
        setKey(crypto.randomUUID())
    }

    React.useEffect(() => {
        refresh()
    }, [])


    return (
        <Tree
            key={key}
            blockNode
            virtual
            showLine
            treeData={data}
            defaultExpandAll={true}
        />
    )
}