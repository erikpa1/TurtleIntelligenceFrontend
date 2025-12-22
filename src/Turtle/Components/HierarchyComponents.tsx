import React from "react"
import {Button, Flex, Popconfirm} from "antd";
import {
    DeleteRowOutlined,
    DeleteTwoTone, DownOutlined, EditOutlined,
    EyeOutlined, InfoOutlined,
    PauseOutlined,
    PlusOutlined, SettingOutlined,
    StepForwardOutlined,
    StopOutlined, UpOutlined, WechatWorkOutlined
} from "@ant-design/icons";


interface HierarchFlexProps {
    children?: any
    onClick?: (e) => void
}

export function HierarchyFlex({
                                  children,
                                  onClick
                              }: HierarchFlexProps) {

    return (
        <Flex
            flex={1}
            gap={5}
            onClick={onClick}
        >
            {children}
        </Flex>
    )
}


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

export function HierarchySettingsButton({onClick}) {

    return (
        <HierarchyCustomIcon
            icon={<SettingOutlined/>}
            onClick={onClick}
        />
    )
}

export function HierarchyInfoButton({onClick}) {

    return (
        <HierarchyCustomIcon
            icon={<InfoOutlined/>}
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

export function HierarchyStopButton({onClick}) {

    return (
        <HierarchyCustomIcon
            icon={<StopOutlined/>}
            onClick={onClick}
        />
    )
}

export function HierarchyPauseButton({onClick}) {

    return (
        <HierarchyCustomIcon
            icon={<PauseOutlined/>}
            onClick={onClick}
        />
    )
}

export function HierarchyPlayButton({onClick}) {

    return (
        <HierarchyCustomIcon
            icon={<StepForwardOutlined/>}
            onClick={onClick}
        />
    )
}

export function HierarchyChatButton({onClick}) {

    return (
        <HierarchyCustomIcon
            icon={<WechatWorkOutlined/>}
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

export function HierarchyEditButton({onClick}) {

    return (
        <HierarchyCustomIcon
            onClick={onClick}
            icon={<EditOutlined/>}
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

export function HierarchyDivIcon({onClick, icon}: HierarchyCustomIconProps) {


    return (
        <div
            onClick={(e) => {
                e.stopPropagation()
                onClick && onClick(e)
            }}
        >
            {
                (typeof icon === "string") ? <img
                    src={icon}
                    style={{
                        width: "24px",
                        height: "24px",
                        verticalAlign: 'middle'
                    }}
                /> : icon
            }
        </div>
    )
}


export function HierarchyUpButton({onClick}) {

    return (
        <HierarchyCustomIcon
            onClick={onClick}
            icon={<UpOutlined/>}
        />
    )
}

export function HierarchyDownButton({onClick}) {

    return (
        <HierarchyCustomIcon
            onClick={onClick}
            icon={<DownOutlined/>}
        />
    )
}