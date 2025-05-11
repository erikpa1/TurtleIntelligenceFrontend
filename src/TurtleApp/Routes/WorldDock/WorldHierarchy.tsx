import React from "react"
import {useTranslation} from "react-i18next";
import {Tree, TreeDataNode} from "antd";
import aee from "@Turtle/Data/Aee";


export default function WorldHierarchy({}) {

    const [t] = useTranslation()

    const [data, setData] = React.useState<Array<TreeDataNode>>([])

    function elementSelected(element: string) {
        aee.emit("World_PickEntity", element)
    }

    function elementClicked(keys: string[]) {
        if (keys.length > 1) {
            elementSelected(keys[0])
        }
    }

    async function refresh() {
        setData([
            {
                title: t("entities"),
                key: "entities",
                children: [
                    {
                        title: t("spawnpoint"),
                        key: "spawnpoint",
                    },
                    {
                        title: t("sinkpoint"),
                        key: "sinkpoint",
                    }
                ]
            }
        ])

    }

    React.useEffect(() => {
        refresh()
    }, [])

    return (
        <Tree
            treeData={data}
            onSelect={elementClicked as any}
            defaultExpandAll={true}
        />
    )

}