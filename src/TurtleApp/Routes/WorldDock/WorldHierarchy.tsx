import React from "react"
import {useTranslation} from "react-i18next";
import {Tree, TreeDataNode} from "antd";


export default function WorldHierarchy({}) {

    const [t] = useTranslation()

    const [data, setData] = React.useState<Array<TreeDataNode>>([])


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
            defaultExpandAll={true}
        />
    )

}