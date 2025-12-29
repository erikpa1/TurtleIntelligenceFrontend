import React from "react"
import {Button, Flex, Space} from "antd"
import TopBarWrapper from "@Turtle/Components/TopBarWrapper"

import {ContainerOutlined, SearchOutlined, TagOutlined} from "@ant-design/icons"
import {useTranslation} from "react-i18next"
import {useTurtleModal} from "@Turtle/Hooks/useTurtleModal"
import VSearchView from "@Turtle/DocInt/Components/VSearchView"
import {CopilotButton, CopilotPlusVSearch} from "@Turtle/Copilot/CopilotButton"
import IconSearchInsight from "@Turtle/Icons/IconSearchInsight"
import DocumentTags from "@Turtle/DocInt/Components/DocumentTags"
import {SelectTagsTree} from "@Turtle/Tags/SelectTagsTree"
import Tag from "@Turtle/Tags/Tag"
import CreateDocCollection from "@Turtle/DocInt/Components/CreateDocCollection"

export default function DocIntTopBar() {
    return (
        <>

            <_FilterDocumentsButton/>
            <_EditFilters/>
            <_CreateCollection/>
            <_TagDocuments/>

            <Flex
                style={{
                    marginLeft: "auto"
                }}
            >
                <_SearchAll/>
                <CopilotPlusVSearch/>
            </Flex>
        </>
    )
}

function _SearchAll({}) {

    const [t] = useTranslation()

    const {activate} = useTurtleModal()

    function activateSearch({}) {
        activate({
            title: "VSearch",
            closable: true,
            width: 800,
            content: (
                <VSearchView/>
            )
        })
    }

    return (
        <Button
            type={"text"}
            onClick={activateSearch}
            icon={<SearchOutlined/>}
        >
            {t("vsearch")}
        </Button>
    )
}

function _FilterDocumentsButton({}) {

    const [t] = useTranslation()

    const {activate} = useTurtleModal()

    const [selectedFilters, setSelectedFilters] = React.useState<Set<string>>(new Set())

    function filterPressed() {


        const tags: Array<Tag> = []

        const tmp1 = new Tag()
        tmp1.id = "1"
        tmp1.uid = "1"
        tmp1.name = "faktury"

        const tmp2 = new Tag()
        tmp2.id = "2"
        tmp2.uid = "2"
        tmp2.name = "smernice"

        const tmp3 = new Tag()
        tmp3.id = "3"
        tmp3.uid = "3"
        tmp3.name = "smernice"


        tags.push(tmp1)
        tags.push(tmp2)
        tags.push(tmp3)

        activate({
            title: `${t("document.tags")}:`,
            closable: true,
            content: (
                <SelectTagsTree
                    avlTags={tags}
                    tags={new Set()}
                />
            )
        })

    }

    return (
        <Button
            type={"text"}
            onClick={filterPressed}
            icon={<IconSearchInsight/>}
        >
            {t("filter")}
        </Button>
    )
}


function _EditFilters({}) {

    const [t] = useTranslation()

    const {activate} = useTurtleModal()

    const [selectedFilters, setSelectedFilters] = React.useState<Set<string>>(new Set())

    function filterPressed() {

        activate({
            title: `${t("edit.tags")}:`,
            closable: true,
            width: "80%",
            content: (
                <DocumentTags/>
            )
        })
    }

    return (
        <Button
            type={"text"}
            onClick={filterPressed}
            icon={<TagOutlined/>}
        >
            {t("edit.tags")}
        </Button>
    )
}

function _CreateCollection({}) {

    const [t] = useTranslation()

    const {activate} = useTurtleModal()

    const [selectedFilters, setSelectedFilters] = React.useState<Set<string>>(new Set())

    function filterPressed() {
        activate({
            title: `${t("create.collection")}:`,
            closable: true,
            content: (
                <CreateDocCollection/>
            )
        })
    }

    return (
        <Button
            type={"text"}
            onClick={filterPressed}
            icon={<ContainerOutlined/>}
        >
            {t("create.collection")}
        </Button>
    )
}


function _TagDocuments({}) {

    const [t] = useTranslation()

    const {activate} = useTurtleModal()

    const [selectedFilters, setSelectedFilters] = React.useState<Set<string>>(new Set())

    function filterPressed() {
        activate({
            title: `${t("tag.documents")}:`,
            closable: true,
            content: (
                <CreateDocCollection/>
            )
        })
    }

    return (
        <Button
            type={"text"}
            onClick={filterPressed}
            icon={<ContainerOutlined/>}
        >
            {t("tag.documents")}
        </Button>
    )
}