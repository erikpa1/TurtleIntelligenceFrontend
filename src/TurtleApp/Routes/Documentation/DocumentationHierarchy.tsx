import React from "react"
import {Tree, TreeDataNode} from "antd";
import {HierarchFlex, HierarchyDeleteButton, HierarchyRightFlex} from "@Turtle/Components/HierarchyComponents";
import {useTranslation} from "react-i18next";
import {useNavigate} from "react-router-dom";


export default function DocumentationHierarchy({}) {

    const [t] = useTranslation()

    const navigate = useNavigate()

    const [data, setData] = React.useState<Array<TreeDataNode>>([
        {
            title: `${t("simulation")} (${1})`,
            key: "simulation",
            children: [
                {
                    key: "buffer",
                    title: (
                        <HierarchFlex onClick={elementClicked}>
                            {t("buffer")}

                        </HierarchFlex>
                    ),
                }
            ]
        }
    ])

    function elementClicked() {
        navigate("/documentation/sim/buffer")
    }

    return (
        <Tree
            treeData={data}
            virtual={true}
        />
    )

}