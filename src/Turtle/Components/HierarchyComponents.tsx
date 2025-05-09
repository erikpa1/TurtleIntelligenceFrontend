import React from "react"
import {Button, Flex} from "antd";
import {PlusOutlined} from "@ant-design/icons";


export function HierarchyRightFlex({children}) {

    return (
        <Flex
            align={"center"}
            justify={"end"}
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
