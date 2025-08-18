import React from "react"
import {useTranslation} from "react-i18next";
import {useTurtleModal} from "@Turtle/Hooks/useTurtleModal";
import {useNavigate} from "react-router-dom";
import {Flex, Tree, TreeDataNode} from "antd";
import {Knowledge, KnowledgeType} from "@Turtle/Knowledge/Data/Knowledge";
import {
    HierarchyAddButton, HierarchyDeleteButton,
    HierarchyEditButton,
    HierarchyFlex,
    HierarchyRightFlex
} from "@Turtle/Components/HierarchyComponents";

import TurtleApp from "@TurtleApp/TurtleApp"
import TurtleTheme, {TurtleThemeLight} from "@Turtle/Theme/theme";
import ThemeApi from "@Turtle/Theme/ThemeApi";

export default function ThemeHierarchy() {

    const [t] = useTranslation()

    const {activate, deactivate} = useTurtleModal()

    const navigate = useNavigate()


    const [data, setData] = React.useState<Array<TreeDataNode>>(createHierarchy([]))


    function createHierarchy(themes: Array<TurtleThemeLight>) {
        return [
            {
                key: "themes",
                title: (
                    <Flex>
                        {t("themes")} ({themes.length})

                        <HierarchyRightFlex>
                            <HierarchyAddButton
                                onClick={createTheme}
                            />
                        </HierarchyRightFlex>
                    </Flex>
                ),

                children: themes.map((val) => {
                    return {
                        key: val.uid,
                        title: (
                            <HierarchyFlex onClick={() => {
                                navigate(`/knowledge-hub/${val.uid}`)
                            }}>

                                {val.name}

                                <HierarchyRightFlex>
                                    <HierarchyDeleteButton
                                        onClick={() => {
                                            deleteKnowledge(val.uid)
                                        }}
                                    />
                                </HierarchyRightFlex>
                            </HierarchyFlex>
                        ),
                    }
                })
            }
        ]
    }


    function createTheme() {

        const theme = new TurtleTheme()

        activate({
            title: t("create.theme"),
            closable: true,
            content: (
                <div>

                </div>
            )
        })
    }

    async function deleteKnowledge(knowledgeUid: string) {

        TurtleApp.Lock()
        await ThemeApi.Delete(knowledgeUid)
        TurtleApp.Unlock()
        refresh()

    }

    async function refresh() {
        const themes = await ThemeApi.List()
        setData(createHierarchy(themes))
    }


    React.useEffect(() => {
        refresh()
    }, [])

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