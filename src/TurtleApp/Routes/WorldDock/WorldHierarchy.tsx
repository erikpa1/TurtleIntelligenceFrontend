import React from "react"
import {useTranslation} from "react-i18next";
import {Flex, Segmented, Tree, TreeDataNode} from "antd";
import aee from "@Turtle/Data/Aee";
import {HierarchyCustomIcon} from "@Turtle/Components/HierarchyComponents";


export default function WorldHierarchy({world}) {


    const [t] = useTranslation()

    const [segment, setSegment] = React.useState("library")

    return (
        <Flex
            vertical
            gap={10}
        >

            <Segmented<string>
                value={segment}
                options={[
                    {
                        label: t("library"),
                        value: "library",
                    },
                    {
                        label: t("hierarchy"),
                        value: "hierarchy",
                    },

                ]}
                onChange={(value) => {
                    setSegment(value) // string
                }}

            />

            {
                segment === "library" && (
                    <_LibraryHierarchy/>
                )
            }

            {
                segment === "hierarchy" && (
                    <div>Here</div>
                )
            }

        </Flex>
    )

}

function _LibraryHierarchy({}) {

    const [t] = useTranslation()

    const commonEntities = getBasicElements(elementSelected)

    const [data, setData] = React.useState<Array<TreeDataNode>>([...commonEntities])


    function elementSelected(element: string) {
        aee.emit("World_PickEntity", (position) => {
            console.log("Adding element:", element, position)
        })
    }


    React.useEffect(() => {

    }, [])

    return (
        <Tree
            treeData={data}
            defaultExpandAll={true}
        />
    )

}

function getBasicElements(elementClicked: (element: string) => void): Array<TreeDataNode> {

    const [t] = useTranslation()

    const basicEntities = React.useMemo(() => {
        return [
            {title: t("spawnpoint"), key: "spawnpoint", icon: "/icons/flag_check.svg"},
            {title: t("sinkpoint"), key: "sinkpoint", icon: "/icons/flag_check.svg"},
        ]
    }, [])

    return React.useMemo(() => {
        return [
            {
                title: t("entities"),
                key: "entities",
                children: basicEntities.map((val) => ({
                    key: val.key,
                    title: (
                        <Flex
                            gap={10}
                            flex={1}
                            onClick={() => {
                                elementClicked(val.key)
                            }}
                        >
                            <HierarchyCustomIcon icon={val.icon}/>
                            {val.title}
                        </Flex>
                    ),
                }))
            }
        ]
    }, [])


}