import {useTranslation} from "react-i18next";
import {
    HierarchyFlex,
    HierarchyAddButton,
    HierarchyDeleteButton,
    HierarchyRightFlex, HierarchyEditButton
} from "@Turtle/Components/HierarchyComponents";
import React from "react";
import {Tree, TreeDataNode} from "antd";
import ActorsApi from "@TurtleApp/Api/ActorsApi";
import TurtleApp from "@TurtleApp/TurtleApp";
import Actor from "@TurtleApp/Data/Actor";
import {useTurtleModal} from "@Turtle/Hooks/useTurtleModal";
import IconFolderIcon from "@Turtle/Icons/IconFolder";
import SimModel from "@TurtleApp/Data/SimModel";
import EntityForm from "@Turtle/Components/Forms/EntityForm";
import ModelProperties from "@TurtleApp/Data/Model_Properties";
import SimModelsApi from "@TurtleApp/Api/SimModelsApi";
import ActorProperties from "@TurtleApp/Data/Actor_Properties";
import {BgColorsOutlined} from "@ant-design/icons";
import IconColor from "@Turtle/Icons/IconColor";

export default function ActorsHierarchy() {

    const [t] = useTranslation()

    const {activate, deactivate} = useTurtleModal()

    function editActor(actor: Actor) {

        activate({
            title: t("edit.actor"),
            content: (
                <EntityForm
                    entity={actor}
                    properties={ActorProperties.Get()}
                    onBeforeSubmit={deactivate}
                    onAfterSubmit={refresh}
                    submitFunction={ActorsApi.SaveActor}
                />
            )
        })
    }


    function createActor() {

        const actor = new Actor()

        activate({
            title: t("create.actor"),
            content: (
                <EntityForm
                    entity={actor}
                    properties={ActorProperties.Get()}
                    onBeforeSubmit={deactivate}
                    onAfterSubmit={refresh}
                    submitFunction={ActorsApi.CreateActor}
                />
            )
        })
    }

    function createHierarchy(actors: Array<Actor>) {
        return [
            {
                key: "actors",
                title: (
                    <HierarchyFlex>
                        {t("actors")} ({actors.length})


                        <HierarchyRightFlex>
                            <HierarchyAddButton
                                onClick={createActor}
                            />

                        </HierarchyRightFlex>
                    </HierarchyFlex>
                ),

                children: actors.map((val) => {
                    return {
                        key: val.uid,
                        title: (
                            <HierarchyFlex>

                                <IconColor
                                    color={val.color}
                                    width="20px"
                                />

                                {val.name}

                                <HierarchyRightFlex>

                                    <HierarchyEditButton
                                        onClick={() => {
                                            editActor(val)
                                        }}
                                    />
                                    <HierarchyDeleteButton
                                        onClick={() => {
                                            deleteActor(val.uid)
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

    function createActorPressed() {
        const tmp = new SimModel()

        activate({
            title: t("create.model"),
            content: (
                <EntityForm
                    entity={tmp}
                    properties={ModelProperties.Get()}
                    submitFunction={SimModelsApi.COU}
                    onBeforeSubmit={deactivate}
                    onAfterSubmit={refresh}
                />
            )
        })
    }


    async function deleteActor(nnModel: string) {
        TurtleApp.Lock()
        await ActorsApi.DeleteActor(nnModel)
        TurtleApp.Unlock()
        refresh()
    }


    const [data, setData] = React.useState<Array<TreeDataNode>>(createHierarchy([]))


    async function refresh() {
        const actors = await ActorsApi.QueryActors({})
        setData(createHierarchy(actors))
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