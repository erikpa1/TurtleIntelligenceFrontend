import React from "react"
import {Button, Flex, Popconfirm} from "antd";
import {DeleteRowOutlined, DeleteTwoTone, EyeOutlined, PlusOutlined} from "@ant-design/icons";


export function HierarchyRightFlex({children}) {

    return (
        <Flex
            align={"center"}
            justify="end"  // In Ant Design, "end" is an alias for "flex-end"
            flex={1}
            gap={5}
        >
            {children}
        </Flex>
    )
}

export function HierarchyAddButton({onClick}) {

    return (
        <HierarchyCustomIcon
            icon={<PlusOutlined/>}
            onClick={onClick}
        />
    )
}

export function HierarchyViewButton({onClick}) {

    return (
        <HierarchyCustomIcon
            icon={<EyeOutlined/>}
            onClick={onClick}
        />
    )
}

export function HierarchyDeleteButton({onClick}) {

    return (
        <Popconfirm
            title={"are.you.sure"}
            onConfirm={(e) => {
                e?.preventDefault()
                onClick(e)
            }}
        >
            <HierarchyCustomIcon
                icon={
                    <DeleteTwoTone
                        twoToneColor={["red", "white"]}
                    />
                }
            />
        </Popconfirm>

    )
}


interface HierarchyCustomIconProps {
    icon: any
    onClick?: (e) => void

}

export function HierarchyCustomIcon({onClick, icon}: HierarchyCustomIconProps) {


    return (
        <Button
            type="text"
            size="small"
            onClick={(e) => {
                e.stopPropagation()
                onClick && onClick(e)
            }}
            icon={
                (typeof icon === "string") ? <img
                    src={icon}
                    style={{
                        width: "20px",
                        height: "20px",
                        verticalAlign: 'middle'
                    }}
                /> : icon
            }
        />
    )
}
