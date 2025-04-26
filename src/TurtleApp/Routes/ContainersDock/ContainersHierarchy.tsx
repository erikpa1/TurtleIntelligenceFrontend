import React from "react"
import {Tree, TreeDataNode} from "antd";


export default function ContainersHierarchy({}) {

    const [data, setData] = React.useState<Array<TreeDataNode>>([])

    async function refresh() {

    }


    React.useEffect(() => {
        refresh()
    }, [])


    return (
        <Tree
            treeData={data}
        />
    )

}