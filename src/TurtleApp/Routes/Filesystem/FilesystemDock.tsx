import React from 'react'
import {Splitter} from "antd"
import FilesystemHierarchy from "@TurtleApp/Routes/Filesystem/FilesystemHierarchy";
import FileTable from "@TurtleApp/Routes/Filesystem/FileTable";
import FilesystemTopBar from "@TurtleApp/Routes/Filesystem/FilesystemTopBar";
import { SplitterWithHeader } from '@Turtle/Antd/Splitter';

export default function FilesystemDock() {

    const [selectedFolder, setSelectedFolder] = React.useState("")

    const [reloadToken, setReloadToken] = React.useState(0)

    function refreshAll() {
        setReloadToken((token) => token + 1)
    }

    return (
        <SplitterWithHeader
            topbar={
                <FilesystemTopBar
                    folderPath={selectedFolder}
                    onChanged={refreshAll}
                    onNavigateFolder={setSelectedFolder}
                />
            }
        >

            <Splitter.Panel
                defaultSize={"20%"}
                style={{
                    backgroundColor: "white",
                    padding: "15px",
                }}
            >
                <FilesystemHierarchy
                    selectedFolder={selectedFolder}
                    onSelectFolder={setSelectedFolder}
                    reloadToken={reloadToken}
                />
            </Splitter.Panel>

            <Splitter.Panel
                style={{
                    backgroundColor: "#fafafa",
                }}
            >
                <FileTable
                    folderPath={selectedFolder}
                    reloadToken={reloadToken}
                    onSelectFolder={setSelectedFolder}
                />
            </Splitter.Panel>

        </SplitterWithHeader>
    )
}
