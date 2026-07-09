import React from "react";
import {useTranslation} from "react-i18next";
import {Tree, TreeDataNode, Input, Flex, Typography} from "antd";
import {FolderOutlined} from "@ant-design/icons";
import {
    HierarchyFlex,
    HierarchyAddButton,
    HierarchyDeleteButton,
    HierarchyRightFlex,
} from "@Turtle/Components/HierarchyComponents";
import {useTurtleModal} from "@Turtle/Hooks/useTurtleModal";
import {RightSubmitButton} from "@Turtle/Components/RightSubmitButton";
import FilesApi from "./FilesApi";
import FileEntry from "./FileEntry";
import TurtleApp from "@TurtleApp/TurtleApp";

const ROOT_KEY = ""

interface FilesystemHierarchyProps {
    selectedFolder?: string
    onSelectFolder?: (path: string) => void
    reloadToken?: number
}

export default function FilesystemHierarchy({selectedFolder, onSelectFolder, reloadToken}: FilesystemHierarchyProps) {

    const [t] = useTranslation()

    const {activate, deactivate} = useTurtleModal()

    const [treeData, setTreeData] = React.useState<Array<TreeDataNode>>([])

    function updateTreeData(list: Array<TreeDataNode>, key: React.Key, children: Array<TreeDataNode>): Array<TreeDataNode> {
        return list.map((node) => {
            if (node.key === key) {
                return {...node, children}
            }
            if (node.children) {
                return {...node, children: updateTreeData(node.children, key, children)}
            }
            return node
        })
    }

    function buildNode(entry: FileEntry): TreeDataNode {
        return {
            key: entry.path,
            isLeaf: false,
            title: (
                <HierarchyFlex>
                    <FolderOutlined/>
                    {entry.name}
                    <Typography.Text type={"secondary"} style={{fontSize: 12}}>
                        ({entry.count})
                    </Typography.Text>

                    <HierarchyRightFlex>
                        <HierarchyAddButton
                            onClick={() => createFolder(entry.path)}
                        />
                        <HierarchyDeleteButton
                            onClick={() => deleteEntry(entry.path)}
                        />
                    </HierarchyRightFlex>
                </HierarchyFlex>
            )
        }
    }

    function buildRootNode(children: Array<TreeDataNode>): TreeDataNode {
        return {
            key: ROOT_KEY,
            isLeaf: false,
            children,
            title: (
                <HierarchyFlex>
                    {t("filesystem")}

                    <HierarchyRightFlex>
                        <HierarchyAddButton
                            onClick={() => createFolder(ROOT_KEY)}
                        />
                    </HierarchyRightFlex>
                </HierarchyFlex>
            )
        }
    }

    async function refreshRoot() {
        const entries = await FilesApi.ListFiles(ROOT_KEY)
        const folders = entries.filter((entry) => entry.isDir)
        setTreeData([buildRootNode(folders.map(buildNode))])
    }

    async function onLoadData(node: any) {
        if (node.key === ROOT_KEY) {
            return
        }
        const entries = await FilesApi.ListFiles(node.key)
        const folders = entries.filter((entry) => entry.isDir)
        setTreeData((origin) => updateTreeData(origin, node.key, folders.map(buildNode)))
    }

    function createFolder(parentPath: string) {

        let folderName = ""

        activate({
            title: t("create.folder"),
            content: (
                <Flex vertical gap={15}>
                    <Input
                        placeholder={t("name") as string}
                        onChange={(e) => folderName = e.target.value}
                    />
                    <RightSubmitButton
                        label={"create"}
                        onClick={async () => {
                            if (!folderName) {
                                return
                            }
                            deactivate()
                            TurtleApp.Lock()
                            await FilesApi.CreateFolder(parentPath ? `${parentPath}/${folderName}` : folderName)
                            TurtleApp.Unlock()
                            refreshRoot()
                        }}
                    />
                </Flex>
            )
        })
    }

    async function deleteEntry(path: string) {
        TurtleApp.Lock()
        await FilesApi.DeleteEntry(path)
        TurtleApp.Unlock()
        refreshRoot()
    }

    React.useEffect(() => {
        refreshRoot()
    }, [reloadToken])

    return (
        <Tree
            key={treeData[0]?.children?.length}
            blockNode
            virtual
            showLine
            treeData={treeData}
            defaultExpandedKeys={[ROOT_KEY]}
            selectedKeys={[selectedFolder ?? ROOT_KEY]}
            loadData={onLoadData}
            onSelect={(_, info) => {
                onSelectFolder && onSelectFolder(info.node.key as string)
            }}
        />
    )

}
