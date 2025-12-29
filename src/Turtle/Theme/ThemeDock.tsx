import React from "react"
import {useTurtleTheme} from "@Turtle/Theme/useTurleTheme"
import {useParams} from "react-router-dom"
import {Splitter} from "antd"
import ThemeHierarchy from "@Turtle/Theme/ThemeHierarchy";
import ThemeEditView from "@Turtle/Theme/ThemeEditView";
import {SplitterWithHeader} from "@Turtle/Antd/Splitter"
import ThemeTopBar from "@Turtle/Theme/ThemeTopBar"

export default function ThemeDock({}) {

    const {bigPadding} = useTurtleTheme()

    const {themeUid} = useParams()

    return (
        <SplitterWithHeader topbar={<ThemeTopBar/>}>

            <Splitter.Panel
                defaultSize="20%"
                style={{
                    backgroundColor: "white",
                    padding: bigPadding
                }}
            >
                <ThemeHierarchy/>
            </Splitter.Panel>

            <Splitter.Panel
                defaultSize="80%"
                style={{
                    height: "100vh",
                }}
            >
                {
                    themeUid && (
                        <ThemeEditView/>
                    )
                }
                <ThemeEditView/>
            </Splitter.Panel>

        </SplitterWithHeader>
    )

}