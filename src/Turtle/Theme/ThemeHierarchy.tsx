import React from "react"
import {useTranslation} from "react-i18next"
import {useNavigate} from "react-router-dom"
import {useTurtleModal} from "@Turtle/Hooks/useTurtleModal"

import {Flex, Space, Tree, TreeDataNode} from "antd"
import {
    HierarchyAddButton, HierarchyDeleteButton,
    HierarchyEditButton,
    HierarchyFlex,
    HierarchyRightFlex
} from "@Turtle/Components/HierarchyComponents";

import TurtleApp from "@TurtleApp/TurtleApp"
import {TurtleTheme, TurtleThemeLight} from "@Turtle/Theme/theme";
import ThemeApi from "@Turtle/Theme/ThemeApi";
import COUTheme from "@Turtle/Theme/COUTheme"
import ColorCircle from "@Turtle/Components/ColorCircle"

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
                            <HierarchyFlex
                                onClick={() => {
                                    navigate(`/themes/${val.uid}`)
                                }}
                            >

                                <Space>
                                    <ColorCircle color={val.color}/>
                                    {val.name}
                                </Space>

                                <HierarchyRightFlex>

                                    <HierarchyEditButton
                                        onClick={() => {
                                            editTheme(val)
                                        }}
                                    />
                                    <HierarchyDeleteButton
                                        onClick={() => {
                                            deleteTheme(val.uid)
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
                <COUTheme
                    entity={theme}
                    onAfterUpdate={refresh}
                    onBeforeUpdate={deactivate}
                />
            )
        })
    }

    async function editTheme(lightTheme: TurtleThemeLight) {
        TurtleApp.Lock()
        const theme = await ThemeApi.Get(lightTheme.uid)
        TurtleApp.Unlock()

        if (theme) {
            activate({
                title: t("edit.theme"),
                closable: true,
                content: (
                    <COUTheme
                        entity={theme}
                        onAfterUpdate={refresh}
                        onBeforeUpdate={deactivate}
                    />
                )
            })
        } else {
            //TOOD send local notification
        }

    }

    async function deleteTheme(knowledgeUid: string) {
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