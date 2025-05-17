import {Tree, TreeDataNode} from "antd";
import React from "react";
import {HierarchFlex, HierarchyDeleteButton, HierarchyRightFlex} from "@Turtle/Components/HierarchyComponents";
import {useTranslation} from "react-i18next";

export default function NNHierarchy() {

    const [t] = useTranslation()

    function createHierarchy(nnModels: Array<any>) {
        return [
            {
                title: "nn.models",
                key: "nnmodels",
                children: nnModels.map((val) => {
                    return {
                        key: val.uid,
                        title: (
                            <HierarchFlex onClick={modelClicked}>

                                <HierarchyRightFlex>
                                    <HierarchyDeleteButton
                                        onClick={() => {

                                        }}
                                    />
                                </HierarchyRightFlex>
                            </HierarchFlex>
                        ),
                    }
                })
            }
        ]
    }

    function modelClicked(nnModel: any) {

    }

    function deleteModel(nnModel: string) {

        refresh()
    }

    const [data, setData] = React.useState<Array<TreeDataNode>>(createHierarchy([]))

    async function refresh() {

    }

    React.useEffect(() => {
        refresh()
    }, [])


    return (
        <Tree
            virtual={true}
            defaultExpandAll={true}
            treeData={data}
        />
    )

}