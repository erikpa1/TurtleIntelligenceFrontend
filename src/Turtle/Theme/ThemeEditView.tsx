import React from "react"
import TopBarWrapper from "@Turtle/Components/TopBarWrapper";
import {Button, Flex, Tabs} from "antd";
import {useTranslation} from "react-i18next";
import {HierarchyRightFlex} from "@Turtle/Components/HierarchyComponents"
import {TurtleTheme} from "@Turtle/Theme/theme"
import {TurtleSkeleton} from "@Turtle/Components/TurtleSkeleton"
import {useIsLoading} from "@Turtle/Utils/isLoading"
import TurtleEmpty from "@Turtle/Components/TurtleEmpty"
import ThemeApi from "@Turtle/Theme/ThemeApi"
import IconExportNotes from "@Turtle/Icons/IconExportNotes"

interface ThemeEditViewProps {
    themeUid: string
}

export default function ThemeEditView({themeUid}: ThemeEditViewProps) {

    const [t] = useTranslation()

    const [isLoading, load] = useIsLoading()

    const [theme, setTheme] = React.useState<TurtleTheme | null>(null)

    async function refresh() {
        setTheme(await ThemeApi.Get(themeUid))
    }

    React.useEffect(() => {
        load(refresh)
    }, [themeUid])

    if (isLoading.IsLoading()) {
        return (
            <TurtleSkeleton/>
        )
    } else if (isLoading.IsLoading()) {
        return (
            "Error"
        )
    } else {
        if (theme) {
            return (
                <Flex vertical>
                    <TopBarWrapper>
                        <HierarchyRightFlex>
                            <_ImportButton/>
                            <_ExportButton theme={theme}/>
                        </HierarchyRightFlex>
                    </TopBarWrapper>
                </Flex>
            )
        } else {
            return (
                <TurtleEmpty/>
            )
        }
    }



}

interface _ExportButtonProps {
    theme: TurtleTheme
}

function _ExportButton({
    theme
                       }: _ExportButtonProps) {


    const [t] = useTranslation()

    function exportPressed() {
        // Convert theme to JSON string
        const jsonString = JSON.stringify(theme.ToJson(), null, 2);

        const blob = new Blob([jsonString], { type: 'application/json' });

        const url = URL.createObjectURL(blob);

        const link = document.createElement('a');
        link.href = url;
        link.download = `${theme.name}-${new Date().toISOString().slice(0, 10)}.json`;

        document.body.appendChild(link);
        link.click();

        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    }

    return (
        <Button
            type={"text"}
            onClick={exportPressed}
            icon={<IconExportNotes/>}
        >
            Export
        </Button>
    )
}

function _ImportButton({}) {

    const [t] = useTranslation()

    return (
        <Button
            type={"text"}
        >
            Import
        </Button>
    )
}