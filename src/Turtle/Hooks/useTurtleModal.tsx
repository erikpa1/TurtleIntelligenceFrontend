import {Alert, ConfigProvider, Modal, ModalFuncProps} from "antd";
import React from "react"
import {useTranslation} from "react-i18next";
import ErrorBoundary from "@Turtle/Components/ErrorBoundary";

import {TurtleQueryClient} from "@Turtle/TanStack";
import {QueryClientProvider} from "react-query";
import TurtleThemeProvider from "../../../TurtleThemeProvider";
import {useTurtleTheme} from "@Turtle/Theme/useTurleTheme";


export function useTurtleModal() {

    const [t] = useTranslation()

    const {theme} = useTurtleTheme()

    const guard: any = React.useMemo(() => ({current: null}), [])

    function activate({
                          content,
                          ...props
                      }: ModalFuncProps) {


        guard.current = Modal.info({
            ...props,
            title: (<div style={{color: theme.headingFontColor}}>{t(props.title as any ?? "")}:</div>),
            icon: props.icon ?? null,
            footer: null,
            closable: true,
            content: (
                <TurtleThemeProvider>
                    <Alert.ErrorBoundary>
                        <QueryClientProvider client={TurtleQueryClient}>
                            {content}
                        </QueryClientProvider>
                    </Alert.ErrorBoundary>
                </TurtleThemeProvider>


            )


        })
    }

    function deactivate() {
        guard.current.destroy()
    }

    return {activate, deactivate}


}