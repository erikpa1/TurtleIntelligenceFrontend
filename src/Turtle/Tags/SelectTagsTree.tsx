import {Flex, Space, Tree} from "antd";
import React from "react";
import Tag from "@Turtle/Tags/Tag";
import {useTranslation} from "react-i18next";
import {RightSubmitButton} from "@Turtle/Components/RightSubmitButton";


interface SelectDocumentSearchTagListProps {
    avlTags: Array<Tag>
    tags: Set<string>
}

export function SelectTagsTree({
                                   avlTags,
                                   tags
                               }: SelectDocumentSearchTagListProps) {

    const [t] = useTranslation()

    return (
        <Flex vertical gap={15}>
            <Tree
                blockNode
                defaultExpandAll={true}
                virtual
                checkable
                showLine
                treeData={[
                    {
                        key: "tags",
                        title: t("tags"),
                        children: avlTags.map((val) => {
                            return {
                                key: val.id,
                                title: (
                                    <Space>
                                        {val.color}
                                        {t(val.name)}
                                    </Space>
                                )
                            }
                        })
                    }
                ]}

            />

        </Flex>
    )
}