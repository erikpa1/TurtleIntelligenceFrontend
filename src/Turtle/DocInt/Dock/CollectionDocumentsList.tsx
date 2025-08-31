import React from "react"
import {Button, Space, Table, TableProps} from "antd"

import {
    HierarchyDeleteButton, HierarchyViewButton
} from "@Turtle/Components/HierarchyComponents"

import {useTranslation} from "react-i18next"
import TopBarWrapper from "@Turtle/Components/TopBarWrapper"
import {useTurtleTheme} from "@Turtle/Theme/useTurleTheme"
import {TurtleSkeleton} from "@Turtle/Components/TurtleSkeleton"
import DocColApi from "@Turtle/DocInt/Api/DocColApi"
import {FileDocument} from "@Turtle/DocInt/Data/Document"
import {useNavigate} from "react-router-dom";
import TurtleApp from "@TurtleApp/TurtleApp";
import {DocumentsCollection} from "@Turtle/DocInt/Data/DocumentsCollection";
import IconAutoRenew from "@Turtle/Icons/IconAutoRenew";
import {IconSimulation} from "@Turtle/Icons";
import IconCleaningServices from "@Turtle/Icons/IconCleaningServices";

interface CollectionDocumentsListProps {
    colUid: string;
}


export function CollectionDocumentsList({
                                            colUid
                                        }) {

    const [documents, setDocuments] = React.useState<Array<FileDocument>>([])

    const [isLoading, setIsLoading] = React.useState(true)

    const {bigPadding} = useTurtleTheme()

    const navigate = useNavigate()


    const [t] = useTranslation()


    const columns: TableProps<FileDocument>['columns'] = React.useMemo(() => ([
        {
            title: 'Id',
            key: 'id',
            render: (x, y, index) => {
                return (
                    <div>{index + 1}.</div>
                )
            }
        },
        {
            title: t("name"),
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: "Uid",
            dataIndex: 'uid',
            key: 'uid',
        },
        {
            title: t("extension"),
            dataIndex: 'extension',
            key: 'extension'
        },
        {
            title: t("actions"),
            dataIndex: 'actions',
            key: 'actions',
            render: (v, item) => {
                return (
                    <Space>
                        <HierarchyViewButton
                            onClick={() => {
                                navigate(item.GetDocIntPath())
                            }}/>
                        <HierarchyDeleteButton
                            onClick={() => {
                                removeItemFromCollection(item.uid)
                            }}/>
                    </Space>
                )
            }
        },
    ]), [])


    async function removeItemFromCollection(itemUid: string) {
        TurtleApp.Lock()
        await DocColApi.DeleteAssignment(itemUid)
        TurtleApp.Unlock()
        refresh()
    }


    async function refresh() {

        setIsLoading(true)

        const documents = await DocColApi.ListDocumentsOfCollection(colUid)
        setDocuments(documents)
        setIsLoading(false)
    }

    React.useEffect(() => {
        refresh()
    }, [])

    if (isLoading) {
        return (
            <TurtleSkeleton paragraph={{rows: 15}}/>
        )
    } else {
        return (
            <div>

                <_CollectionListTopBar
                    colUid={colUid}
                    refresh={refresh}
                />

                <div style={{
                    padding: bigPadding
                }}>
                    <Table
                        pagination={false}
                        rowKey={"uid"}
                        bordered
                        size={"small"}
                        dataSource={documents}
                        columns={columns}
                        style={{
                            border: "2px solid rgb(230, 230, 230)",
                        }}
                    />
                </div>

            </div>
        )
    }


}

interface _CollectionListTopBarProps {
    colUid: string
    refresh: any
}

function _CollectionListTopBar({
                                   colUid,
                                   refresh
                               }: _CollectionListTopBarProps) {

    const [t] = useTranslation()

    async function clearCollection() {
        TurtleApp.Lock()
        await DocColApi.ClearCollection(colUid)
        TurtleApp.Unlock()

        refresh()
    }

    async function refreshCollection() {
        TurtleApp.Lock()
        await DocColApi.RefreshCollection(colUid)
        TurtleApp.Unlock()


        refresh()
    }

    return (
        <TopBarWrapper>
            <Button
                type={"text"}
                icon={<IconAutoRenew/>}
                onClick={refreshCollection}
            >
                {t("recalculate")}
            </Button>

            <Button
                type={"text"}
                icon={<IconCleaningServices/>}
                onClick={clearCollection}
            >
                {t("clear")}
            </Button>

        </TopBarWrapper>

    )
}